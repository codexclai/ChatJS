'use strict';
const MAX_PICKED_FILES=10,MAX_PICKED_FILE_BYTES=20*1024*1024,MAX_PICKED_TOTAL_BYTES=25*1024*1024,MAX_FILE_NAME_LENGTH=512,MAX_MIME_TYPE_LENGTH=128,MAX_IMAGE_DIMENSION=32768;
const DOCUMENT_ACCEPT_TYPES=Object.freeze(['.csv','.doc','.docx','.json','.md','.pdf','.ppt','.pptx','.txt','.xls','.xlsx','application/json','application/pdf','text/csv','text/markdown','text/plain']);
const IMAGE_ACCEPT_TYPES=Object.freeze(['image/gif','image/jpeg','image/png','image/webp']);
const ATTACHMENT_ACCEPT_TYPES=Object.freeze([...DOCUMENT_ACCEPT_TYPES,...IMAGE_ACCEPT_TYPES]);
const ALLOWED_STORAGE_HOST_SUFFIXES=Object.freeze(['.blob.core.windows.net','.blob.storage.azure.net','.amazonaws.com','.oaiusercontent.com']);
const ESTUARY_UPLOAD_AND_FINALIZE_PATH='/api/estuary/upload_content_and_finalize',ESTUARY_UPLOAD_CONTENT_BYTES_PATH='/api/estuary/upload_content_bytes';
const MIME_TYPE_PATTERN=/^[A-Za-z\d][A-Za-z\d!#$&^_.+-]*\/[A-Za-z\d][A-Za-z\d!#$&^_.+-]*$/;
const INVALID_NAME_CHARACTER_PATTERN=/[\u0000-\u001f\u007f/\\"]/;
const BASE64_PATTERN=/^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?$/;
class ChatGPTAttachmentPolicyError extends Error{constructor(code,message,options={}){super(message,options.cause===undefined?undefined:{cause:options.cause});this.name='ChatGPTAttachmentPolicyError';this.code=code;}}
function fail(code,message){throw new ChatGPTAttachmentPolicyError(code,message);}
function isRecord(value){return value!==null&&typeof value==='object'&&!Array.isArray(value);}
function validateMimeType(mimeType){if(typeof mimeType!=='string'||mimeType.length===0||mimeType.length>MAX_MIME_TYPE_LENGTH||!MIME_TYPE_PATTERN.test(mimeType))fail('CHATGPT_ATTACHMENT_INVALID_MIME_TYPE','The attachment MIME type is invalid.');}
function validateAttachmentFile(file){
 if(!isRecord(file))fail('CHATGPT_ATTACHMENT_INVALID_FILE','An attachment must be a file-like object.');
 const {name,mimeType,size}=file;
 if(typeof name!=='string'||name.length===0||name.length>MAX_FILE_NAME_LENGTH||INVALID_NAME_CHARACTER_PATTERN.test(name))fail('CHATGPT_ATTACHMENT_INVALID_NAME','The attachment file name is invalid.');
 validateMimeType(mimeType);
 const lowerName=name.toLowerCase(),acceptedByName=DOCUMENT_ACCEPT_TYPES.some(type=>type.startsWith('.')&&lowerName.endsWith(type)),acceptedByMime=IMAGE_ACCEPT_TYPES.includes(mimeType)||DOCUMENT_ACCEPT_TYPES.includes(mimeType);
 if(!acceptedByName&&!acceptedByMime)fail('CHATGPT_ATTACHMENT_UNSUPPORTED_TYPE','The attachment file type is not supported.');
 if(!Number.isSafeInteger(size)||size<=0)fail('CHATGPT_ATTACHMENT_INVALID_SIZE','The attachment size must be a positive safe integer.');
 if(size>MAX_PICKED_FILE_BYTES)fail('CHATGPT_ATTACHMENT_FILE_TOO_LARGE','The attachment exceeds the per-file size limit.');
 return Object.freeze({name,mimeType,size});
}
function validatePickedFiles(files){
 if(!Array.isArray(files))fail('CHATGPT_ATTACHMENT_INVALID_LIST','Attachments must be supplied as an array.');
 if(files.length>MAX_PICKED_FILES)fail('CHATGPT_ATTACHMENT_TOO_MANY','Too many attachments were selected.');
 let totalBytes=0;
 const validated=files.map(file=>{const metadata=validateAttachmentFile(file);totalBytes+=metadata.size;if(totalBytes>MAX_PICKED_TOTAL_BYTES)fail('CHATGPT_ATTACHMENT_TOTAL_TOO_LARGE','The selected attachments exceed the combined upload size limit.');return metadata;});
 return Object.freeze(validated);
}
function decodeAttachmentDataUrl(file){
 const metadata=validateAttachmentFile(file),dataUrl=file.dataUrl,prefix='data:'+metadata.mimeType+';base64,';
 if(typeof dataUrl!=='string'||!dataUrl.startsWith(prefix))fail('CHATGPT_ATTACHMENT_INVALID_DATA_URL','The attachment contents do not match the declared MIME type.');
 const encoded=dataUrl.slice(prefix.length);
 if(encoded.length===0||encoded.length%4!==0||!BASE64_PATTERN.test(encoded))fail('CHATGPT_ATTACHMENT_INVALID_DATA_URL','The attachment contents are not valid padded Base64.');
 const expectedEncodedLength=4*Math.ceil(metadata.size/3);
 if(encoded.length!==expectedEncodedLength)fail('CHATGPT_ATTACHMENT_INVALID_DATA_URL','The attachment Base64 length does not match its declared size.');
 const bytes=Buffer.from(encoded,'base64');
 if(bytes.byteLength!==metadata.size)fail('CHATGPT_ATTACHMENT_INVALID_DATA_URL','The attachment content length does not match its declared size.');
 return bytes;
}
function parseBackendBaseUrl(baseUrl){
 if(typeof baseUrl!=='string'||baseUrl.length===0)return undefined;
 let parsed;try{parsed=new URL(baseUrl);}catch(cause){throw new ChatGPTAttachmentPolicyError('CHATGPT_ATTACHMENT_INVALID_BASE_URL','The ChatGPT backend base URL is invalid.',{cause});}
 if(parsed.protocol!=='https:'||parsed.username!==''||parsed.password!==''||(parsed.port!==''&&parsed.port!=='443'))fail('CHATGPT_ATTACHMENT_INVALID_BASE_URL','The ChatGPT backend base URL must use HTTPS on the default port.');
 return Object.freeze({origin:'https://'+parsed.hostname.toLowerCase()});
}
function parseUploadDestination(uploadUrl,backendBaseUrl){
 if(typeof uploadUrl!=='string'||uploadUrl.length===0||/[\u0000-\u001f\u007f\\]/.test(uploadUrl)||uploadUrl.includes('#'))fail('CHATGPT_ATTACHMENT_INVALID_DESTINATION','The attachment upload destination is malformed.');
 const backend=parseBackendBaseUrl(backendBaseUrl);let absoluteUrl=uploadUrl;
 if(uploadUrl.startsWith('/')){if(uploadUrl.startsWith('//')||backend===undefined)fail('CHATGPT_ATTACHMENT_INVALID_DESTINATION','A relative attachment destination requires a safe ChatGPT backend URL.');absoluteUrl=backend.origin+uploadUrl;}
 const urlMatch=/^https:\/\/([^/?#]+)(\/[^?#]*)?(\?[^#]*)?$/.exec(absoluteUrl);
 if(!urlMatch)fail('CHATGPT_ATTACHMENT_INVALID_DESTINATION','The attachment destination must be an HTTPS URL.');
 const authority=urlMatch[1];if(authority.includes('@'))fail('CHATGPT_ATTACHMENT_INVALID_DESTINATION','The attachment destination must not contain user information.');
 const authorityMatch=/^([A-Za-z\d.-]+)(?::(\d+))?$/.exec(authority);if(!authorityMatch)fail('CHATGPT_ATTACHMENT_INVALID_DESTINATION','The attachment destination authority is invalid.');
 const hostname=authorityMatch[1].toLowerCase(),port=authorityMatch[2];
 if(hostname.startsWith('.')||hostname.endsWith('.')||hostname.includes('..')||(port!==undefined&&port!=='443'))fail('CHATGPT_ATTACHMENT_INVALID_DESTINATION','The attachment destination host or port is invalid.');
 const origin='https://'+hostname,isBackendOrigin=backend!==undefined&&origin===backend.origin,isAllowedStorageHost=ALLOWED_STORAGE_HOST_SUFFIXES.some(suffix=>hostname.endsWith(suffix));
 if(!isBackendOrigin&&!isAllowedStorageHost)fail('CHATGPT_ATTACHMENT_UNTRUSTED_DESTINATION','The attachment destination is not a trusted first-party storage host.');
 const pathname=urlMatch[2]||'/',query=urlMatch[3]||'',href=origin+(port===undefined?'':':443')+pathname+query;
 return Object.freeze({href,hostname,origin,pathname,query});
}
function getUploadPlan(uploadUrl,mimeType,backendBaseUrl){
 validateMimeType(mimeType);const destination=parseUploadDestination(uploadUrl,backendBaseUrl);
 if(destination.pathname.endsWith(ESTUARY_UPLOAD_AND_FINALIZE_PATH))return Object.freeze({destination,kind:'first-party-estuary-multipart-finalize',method:'POST',usesChatGPTSessionAuthorization:true,requiresSeparateProcessing:false});
 if(destination.pathname.endsWith(ESTUARY_UPLOAD_CONTENT_BYTES_PATH))return Object.freeze({destination,kind:'first-party-estuary-multipart',method:'POST',usesChatGPTSessionAuthorization:true,requiresSeparateProcessing:true});
 const headers={'Content-Type':mimeType};if(!destination.hostname.endsWith('.amazonaws.com')){headers['x-ms-blob-type']='BlockBlob';headers['x-ms-version']='2020-04-08';}
 return Object.freeze({destination,kind:'signed-storage-put',method:'PUT',headers:Object.freeze(headers),usesChatGPTSessionAuthorization:false,requiresSeparateProcessing:true});
}
module.exports=Object.freeze({MAX_PICKED_FILES,MAX_PICKED_FILE_BYTES,MAX_PICKED_TOTAL_BYTES,MAX_FILE_NAME_LENGTH,MAX_MIME_TYPE_LENGTH,MAX_IMAGE_DIMENSION,DOCUMENT_ACCEPT_TYPES,IMAGE_ACCEPT_TYPES,ATTACHMENT_ACCEPT_TYPES,ALLOWED_STORAGE_HOST_SUFFIXES,ChatGPTAttachmentPolicyError,validateAttachmentFile,validatePickedFiles,decodeAttachmentDataUrl,parseUploadDestination,getUploadPlan});
