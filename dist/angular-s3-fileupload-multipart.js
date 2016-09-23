"use strict";var CONFIG=require("./config.json"),options=require("./values/options.js");angular.module(CONFIG.name,["s3uploadmultipart"]).value("s3FileUploadMultipartOptions",options).run([function(){}]),function(e){e.module("s3object",[]).factory("s3object",function(){function e(){Object.call(this),this.init(),this.addEvents(),this.addListeners()}return e.prototype=Object.create(Object.prototype,{constructor:e,init:{value:function(){},enumerable:!1,configurable:!0,writable:!1},addEvents:{value:function(){},enumerable:!1,configurable:!0,writable:!1},addListeners:{value:function(){},enumerable:!1,configurable:!0,writable:!1},apply:{value:function(e,t){for(var n in t)e[n]=t[n]},enumerable:!1,configurable:!1,writable:!1}}),new e})}(window.angular),function(e){var t={WAIT:0,SENDING:1,FINISHED:2,ERROR:3,PAUSED:4};e.module("s3chunkfile",["s3object","s3eventtarget"]).factory("s3chunkfile",function(e,n){function r(t){e.call(this),this.apply(this,t)}return r.prototype=Object.create(e.prototype,{constructor:r,bytesSent:{writable:!0,configurable:!1,value:null},state:{writable:!0,configurable:!1,value:t.WAIT},retries:{writable:!0,configurable:!1,value:0},maxretry:{writable:!0,configurable:!0,value:5},blob:{writable:!0,configurable:!0,value:null},signedUrl:{writable:!0,configurable:!0,value:null},multipartProperties:{writable:!0,configurable:!0,value:null},partNumber:{writable:!0,configurable:!0,value:null},etag:{writable:!0,configurable:!0,value:null},upload:{writable:!1,configurable:!1,value:{startsend:null,urlsigned:null,finished:null,progress:null,error:null}},init:{value:function(){this.upload.startsend=n(),this.upload.urlsigned=n(),this.upload.finished=n(),this.upload.progress=n(),this.upload.error=n()},enumerable:!1,configurable:!0,writable:!0},addListeners:{value:function(){var e=this;this.upload.startsend.addListener(function(t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&200===this.status){var n=JSON.parse(this.responseText);t.signedUrl=n.data.Url,t.upload.urlsigned.fire(e,t)}};var r={UploadId:t.multipartProperties.uploadId,Key:t.multipartProperties.key,partNumber:t.partNumber,ContentLength:t.blob.size};n.open("POST",t.multipartProperties.signUrl,!0),n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(JSON.stringify(r))}),this.upload.urlsigned.addListener(function(n){var r=new XMLHttpRequest;r.onreadystatechange=function(){this.readyState===XMLHttpRequest.DONE&&200===this.status&&(n.etag=this.getResponseHeader("ETag").replace(/"/g,""),n.upload.finished.fire(e,n))},r.upload.error=function(r){n.state=t.ERROR,n.upload.error.fire(e,n)},r.upload.onprogress=function(r){r.lengthComputable&&(n.state=t.SENDING,n.bytesSent=r.loaded,n.upload.progress.fire(e,n))},r.open("PUT",n.signedUrl,!0),r.send(n.blob)}),this.upload.finished.addListener(function(e){e.state=t.FINISHED})},enumerable:!1,configurable:!0,writable:!0},send:{value:function(){this.upload.startsend.fire(this,this)}},retry:{value:function(){this.retries<this.maxretry?(this.retries++,this.upload.startsend.fire(this,this)):this.state=t.PAUSED}}}),function(e){return new r(e)}}).constant("s3chunkfilestate",t)}(window.angular),function(e){e.module("s3multipartproperties",["s3object"]).factory("s3multipartproperties",function(e){function t(t){e.call(this),this.apply(this,t)}return t.prototype=Object.create(e.prototype,{constructor:t,key:{writable:!0,configurable:!0,value:null},uploadId:{writable:!0,configurable:!0,value:null},signUrl:{writable:!0,configurable:!0,value:null}}),function(e){return new t(e)}})}(window.angular),function(e){e.module("s3uploadetag",["s3object"]).factory("s3uploadetag",function(e){function t(t){e.call(this),this.apply(this,t)}return t.prototype=Object.create(e.prototype,{constructor:t,ETag:{writable:!0,configurable:!0,value:null},PartNumber:{writable:!0,configurable:!0,value:null}}),function(e){return new t(e)}})}(window.angular),function(e){var t=["s3object","s3eventtarget","s3queue","s3stack","s3uploadmultipartconfig","s3multipartproperties","s3chunkfile","s3uploadetag"];e.module("s3uploadmultipart",t).factory("s3uploadmultipart",function(e,t,n,r,a,i,u,l,o){function s(t){e.call(this),this.apply(this.config,t)}return s.prototype=Object.create(e.prototype,{constructor:s,totalBytesSent:{writable:!0,configurable:!1,value:null},percentageSent:{configurable:!1,get:function(){return parseInt(this.totalBytesSent/this.config.blob.size*100,10)}},config:{writable:!0,configurable:!0,value:null},chunks:{writable:!0,configurable:!1,value:null},etags:{writable:!0,configurable:!1,value:null},multipartProperties:{writable:!0,configurable:!0,value:null},upload:{writable:!0,configurable:!0,value:{create:null,progress:null,send:null,completed:null,abort:null}},PART_SIZE:{configurable:!1,get:function(){return 1024*this.config.chunkSize*1024}},init:{value:function(){this.upload.create=t(),this.upload.progress=t(),this.upload.send=t(),this.upload.completed=t(),this.upload.abort=t(),this.chunks=n(),this.etags=n(),this.config=a(),this.multipartProperties=i()},enumerable:!1,configurable:!0,writable:!0},addListeners:{value:function(){var e=this;this.upload.progress.addListener(function(t){e.totalBytesSent=e.PART_SIZE*(t.partNumber-1)+t.bytesSent}),this.upload.send.addListener(function(){if(!e.chunks.empty){var t=e.chunks.peek();t.state===o.WAIT&&t.send()}}),this.upload.send.addListener(function(t){t.empty&&e.complete()}),this.upload.create.addListener(function(){for(var t=0,n=0,r=e.config.blob.size,a=e.config.blob;n<r;){t=e.PART_SIZE*e.chunks.length,n=Math.min(e.PART_SIZE*(e.chunks.length+1),r);var i=u({blob:a.slice(t,n),multipartProperties:e.multipartProperties,partNumber:e.chunks.length+1});i.upload.progress.addListener(function(t){t.state===o.SENDING&&e.upload.progress.fire(e,t)}),i.upload.finished.addListener(function(e){e.state===o.ERROR&&e.retry()}),i.upload.finished.addListener(function(t){t.state===o.FINISHED&&e.chunks.dequeue()}),i.upload.finished.addListener(function(t){t.state===o.FINISHED&&e.etags.push(l({ETag:t.etag,PartNumber:t.partNumber}))}),i.upload.finished.addListener(function(t){t.state===o.FINISHED&&e.upload.send.fire(e,e.chunks)}),e.chunks.enqueue(i)}e.upload.send.fire(e,e.chunks)})},enumerable:!0,configurable:!0,writable:!0},retry:{value:function(){me.upload.send.fire(me,me.chunks)},configurable:!1},create:{value:function(){var e=this;e.chunks.clear(),e.etags.clear();var t=new XMLHttpRequest;t.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&200===this.status){var t=JSON.parse(this.responseText);e.multipartProperties.key=t.data.Key,e.multipartProperties.uploadId=t.data.UploadId,e.multipartProperties.signUrl=e.config.signUrl,e.upload.create.fire(e,e)}};var n={Context:e.config.context,FileName:e.config.blob.name,ContentType:e.config.blob.type};t.open("POST",e.config.createMultiPartUrl,!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.send(JSON.stringify(n))}},complete:{value:function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&200===this.status){var t=JSON.parse(this.responseText);e.upload.completed.fire(e,t)}};var n={UploadId:e.multipartProperties.uploadId,Key:e.multipartProperties.key,Etags:e.etags.elements};t.open("POST",e.config.completeMultiPartUrl,!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.send(JSON.stringify(n))}},abort:{value:function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&200===this.status){var t=JSON.parse(this.responseText);e.upload.abort.fire(e,t)}};var n={UploadId:e.multipartProperties.uploadId,Key:e.multipartProperties.key};t.open("POST",e.config.abortMultiPartUrl,!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.send(JSON.stringify(n))}}}),function(e){return new s(e)}})}(window.angular),function(e){e.module("s3uploadmultipartconfig",["s3object"]).factory("s3uploadmultipartconfig",function(e){function t(t){e.call(this),this.apply(this,t)}return t.prototype=Object.create(e.prototype,{constructor:t,context:{writable:!0,configurable:!0,value:""},blob:{writable:!0,configurable:!0,value:null},chunkSize:{writable:!0,configurable:!0,value:10},createMultiPartUrl:{writable:!0,configurable:!0,value:""},completeMultiPartUrl:{writable:!0,configurable:!0,value:""},abortMultiPartUrl:{writable:!0,configurable:!0,value:""},signUrl:{writable:!0,configurable:!0,value:""}}),function(e){return new t(e)}})}(window.angular),function(e){e.module("s3enumerable",[]).factory("s3enumerable",function(){function e(){Object.call(this),this.array=new Array}return e.prototype=Object.create(Object.prototype,{constructor:e,clear:{value:function(e){this.array=new Array},configurable:!1},elements:{get:function(){return this.array},enumerable:!0,configurable:!1},length:{get:function(){return this.array.length},enumerable:!1,configurable:!1},empty:{get:function(){return 0===this.array.length},enumerable:!1,configurable:!1}}),new e})}(window.angular),function(e){e.module("s3queue",["s3enumerable"]).factory("s3queue",function(e){function t(){e.call(this)}return t.prototype=Object.create(e.prototype,{constructor:t,enqueue:{value:function(e){this.elements.push(e)},configurable:!1},dequeue:{value:function(e){return this.empty?null:this.elements.shift()},configurable:!1},peek:{value:function(){return this.empty?null:this.elements[0]},configurable:!1}}),new t})}(window.angular),function(e){e.module("s3stack",["s3enumerable"]).factory("s3stack",function(e){function t(){e.call(this)}return t.prototype=Object.create(e.prototype,{constructor:t,push:{value:function(e){this.elements.push(e)},configurable:!1},pop:{value:function(e){return this.empty?null:void this.elements.pop(e)},configurable:!1}}),new t})}(window.angular),function(e){e.module("s3eventtarget",[]).factory("s3eventtarget",function(){function e(){Object.call(this),this.handlers=new Array}return e.prototype=Object.create(Object.prototype,{constructor:e,handlers:{writable:!0,configurable:!0,value:null},addListener:{value:function(e){this.handlers.push(e)},enumerable:!1,configurable:!1,writable:!1},fire:{value:function(e,t){this.handlers.forEach(function(n){n.call(e,t)})},enumerable:!1,configurable:!1,writable:!1},removeListener:{value:function(e){this.handlers=this.handlers.filter(function(t){if(t!==e)return t})},enumerable:!1,configurable:!1,writable:!1}}),new e})}(window.angular);