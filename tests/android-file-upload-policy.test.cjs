'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),policy=require('../src/chatgpt/file-upload-policy.cjs');
function file(overrides={}){return {name:'report.pdf',mimeType:'application/pdf',size:3,...overrides};}
function assertPolicyError(fn,code){assert.throws(fn,error=>error instanceof policy.ChatGPTAttachmentPolicyError&&error.code===code);}
test('exposes the Android file-picker selection and byte limits',()=>{
 assert.equal(policy.MAX_PICKED_FILES,10);assert.equal(policy.MAX_PICKED_FILE_BYTES,20*1024*1024);assert.equal(policy.MAX_PICKED_TOTAL_BYTES,25*1024*1024);
 assert.equal(policy.MAX_FILE_NAME_LENGTH,512);assert.equal(policy.MAX_MIME_TYPE_LENGTH,128);assert.equal(policy.MAX_IMAGE_DIMENSION,32768);assert.ok(Object.isFrozen(policy.ATTACHMENT_ACCEPT_TYPES));
});
test('validates file metadata and accepts packaged document extensions and MIME types',()=>{
 const files=[file(),file({name:'sheet.xlsx',mimeType:'application/octet-stream'}),file({name:'notes.MD',mimeType:'text/plain'}),file({name:'diagram.png',mimeType:'image/png'}),file({name:'photo.jpeg',mimeType:'image/jpeg'}),file({name:'animation.gif',mimeType:'image/gif'}),file({name:'graphic.webp',mimeType:'image/webp'})];
 assert.equal(policy.validatePickedFiles(files).length,files.length);
});
test('accepts ten files but rejects an eleventh',()=>{
 assert.equal(policy.validatePickedFiles(Array.from({length:10},()=>file())).length,10);
 assertPolicyError(()=>policy.validatePickedFiles(Array.from({length:11},()=>file())),'CHATGPT_ATTACHMENT_TOO_MANY');
});
test('enforces the per-file limit and allows the exact boundary',()=>{
 assert.equal(policy.validateAttachmentFile(file({size:policy.MAX_PICKED_FILE_BYTES})).size,policy.MAX_PICKED_FILE_BYTES);
 assertPolicyError(()=>policy.validateAttachmentFile(file({size:policy.MAX_PICKED_FILE_BYTES+1})),'CHATGPT_ATTACHMENT_FILE_TOO_LARGE');
});
test('enforces the aggregate selection limit and allows the exact boundary',()=>{
 const half=policy.MAX_PICKED_TOTAL_BYTES/2,pair=[file({size:half}),file({name:'second.pdf',size:half})];
 assert.equal(policy.validatePickedFiles(pair).reduce((sum,entry)=>sum+entry.size,0),policy.MAX_PICKED_TOTAL_BYTES);
 assertPolicyError(()=>policy.validatePickedFiles([...pair,file({name:'third.pdf',size:1})]),'CHATGPT_ATTACHMENT_TOTAL_TOO_LARGE');
});
test('rejects invalid names, MIME declarations, sizes, and unsupported formats',()=>{
 for(const name of ['../report.pdf','folder\\report.pdf','bad"name.pdf','bad\nname.pdf',''])assertPolicyError(()=>policy.validateAttachmentFile(file({name})),'CHATGPT_ATTACHMENT_INVALID_NAME');
 assertPolicyError(()=>policy.validateAttachmentFile(file({mimeType:'application/pdf\r\nX: y'})),'CHATGPT_ATTACHMENT_INVALID_MIME_TYPE');
 assertPolicyError(()=>policy.validateAttachmentFile(file({mimeType:'a'.repeat(129)})),'CHATGPT_ATTACHMENT_INVALID_MIME_TYPE');
 assertPolicyError(()=>policy.validateAttachmentFile(file({name:'archive.zip',mimeType:'application/zip'})),'CHATGPT_ATTACHMENT_UNSUPPORTED_TYPE');
 assertPolicyError(()=>policy.validateAttachmentFile(file({size:0})),'CHATGPT_ATTACHMENT_INVALID_SIZE');
 assertPolicyError(()=>policy.validateAttachmentFile(file({size:Number.MAX_SAFE_INTEGER+1})),'CHATGPT_ATTACHMENT_INVALID_SIZE');
 assertPolicyError(()=>policy.validatePickedFiles({0:file(),length:1}),'CHATGPT_ATTACHMENT_INVALID_LIST');
});
test('decodes only matching, valid Base64 attachment data URLs of the declared byte length',()=>{
 const decoded=policy.decodeAttachmentDataUrl(file({dataUrl:'data:application/pdf;base64,YWJj'}));assert.deepEqual(decoded,Buffer.from('abc'));
 assertPolicyError(()=>policy.decodeAttachmentDataUrl(file({dataUrl:'data:text/plain;base64,YWJj'})),'CHATGPT_ATTACHMENT_INVALID_DATA_URL');
 assertPolicyError(()=>policy.decodeAttachmentDataUrl(file({dataUrl:'data:application/pdf;base64,YWJ!'})),'CHATGPT_ATTACHMENT_INVALID_DATA_URL');
 assertPolicyError(()=>policy.decodeAttachmentDataUrl(file({size:4,dataUrl:'data:application/pdf;base64,YWJj'})),'CHATGPT_ATTACHMENT_INVALID_DATA_URL');
});
test('accepts the backend origin and the explicit Azure, S3, and OAI storage hosts',()=>{
 const cases=[['https://chatgpt.com/backend-api/files/upload','chatgpt.com'],['https://acct.blob.core.windows.net/container/blob?sig=abc','acct.blob.core.windows.net'],['https://acct.blob.storage.azure.net/container/blob?sig=abc','acct.blob.storage.azure.net'],['https://bucket.s3.amazonaws.com/object?sig=abc','bucket.s3.amazonaws.com'],['https://uploads.oaiusercontent.com/object?sig=abc','uploads.oaiusercontent.com']];
 for(const [raw,hostname] of cases)assert.equal(policy.parseUploadDestination(raw,'https://chatgpt.com').hostname,hostname);
});
test('accepts only safe relative backend paths and trusted HTTPS destinations',()=>{
 assert.equal(policy.parseUploadDestination('/backend-api/files/upload','https://chatgpt.com').origin,'https://chatgpt.com');
 const rejected=[['http://chatgpt.com/upload','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['//evil.example/upload','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['https://user@acct.blob.core.windows.net/blob','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['https://attacker.example/blob','CHATGPT_ATTACHMENT_UNTRUSTED_DESTINATION'],['https://bucket.s3.amazonaws.com:8443/blob','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['https://bucket..s3.amazonaws.com/blob','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['https://.bucket.s3.amazonaws.com/blob','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['https://bucket.s3.amazonaws.com./blob','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['https://bucket.s3.amazonaws.com/blob#fragment','CHATGPT_ATTACHMENT_INVALID_DESTINATION'],['relative/path','CHATGPT_ATTACHMENT_INVALID_DESTINATION']];
 for(const [raw,code] of rejected)assertPolicyError(()=>policy.parseUploadDestination(raw,'https://chatgpt.com'),code);
});
test('routes Estuary URLs separately from signed storage PUTs',()=>{
 const finalize=policy.getUploadPlan('https://chatgpt.com/api/estuary/upload_content_and_finalize','application/pdf','https://chatgpt.com');
 assert.equal(finalize.kind,'first-party-estuary-multipart-finalize');assert.equal(finalize.method,'POST');assert.equal(finalize.usesChatGPTSessionAuthorization,true);assert.equal(finalize.requiresSeparateProcessing,false);
 const process=policy.getUploadPlan('https://chatgpt.com/api/estuary/upload_content_bytes','application/pdf','https://chatgpt.com');
 assert.equal(process.kind,'first-party-estuary-multipart');assert.equal(process.requiresSeparateProcessing,true);
});
test('uses storage-specific PUT headers without forwarding ChatGPT session authorization',()=>{
 const azure=policy.getUploadPlan('https://acct.blob.core.windows.net/container/blob?sig=abc','image/png','https://chatgpt.com');
 assert.equal(azure.kind,'signed-storage-put');assert.equal(azure.method,'PUT');assert.equal(azure.usesChatGPTSessionAuthorization,false);
 assert.equal(azure.headers['Content-Type'],'image/png');assert.equal(azure.headers['x-ms-blob-type'],'BlockBlob');assert.equal(azure.headers['x-ms-version'],'2020-04-08');
 const s3=policy.getUploadPlan('https://bucket.s3.amazonaws.com/object?sig=abc','application/pdf','https://chatgpt.com');
 assert.equal(s3.method,'PUT');assert.equal(s3.headers['Content-Type'],'application/pdf');assert.equal(Object.hasOwn(s3.headers,'x-ms-blob-type'),false);
});
test('rejects malformed backend URLs and invalid upload MIME declarations',()=>{
 assertPolicyError(()=>policy.parseUploadDestination('/upload','http://chatgpt.com'),'CHATGPT_ATTACHMENT_INVALID_BASE_URL');
 assertPolicyError(()=>policy.getUploadPlan('https://uploads.oaiusercontent.com/file','not a mime','https://chatgpt.com'),'CHATGPT_ATTACHMENT_INVALID_MIME_TYPE');
});
