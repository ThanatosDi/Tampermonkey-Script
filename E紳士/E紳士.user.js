// ==UserScript==
// @name         E紳士
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在E紳士看本本時不用一頁一頁看，直接幫你拉成直條滑著看～一時看本一時爽，一直看本一直爽(?)，主要作者:SentenceDot，協助:ThanatosDi
// @icon         https://www.google.com/s2/favicons?domain=e-hentai.org
// @author       SentenceDot, ThanatosDi
// @match        https://exhentai.org/g/*
// @match        https://e-hentai.org/g/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==
var fetch_urls = []
var Imgurls = []
const reply = document.getElementById('cdiv')
const div = document.createElement('div')
setAttributes(div, {'id':'images', 'style': 'margin:10px auto;width:720px;max-width:100%;'})
var pages = document.querySelector('#gdd > table > tbody > tr:nth-child(6) > td.gdt2').innerText.match(/\d+/)[0]
console.log('total ' + pages + ' imgs')

function main(){
	GetAllImgs(0)
}

function GetAllImgs(index){
	console.log(index)
	var target = window.location.href + `?p=${index}`
	fetch(target)
	.then(data=>{return data.text()})
	.then(htmlbody=>{
		var container = document.implementation.createHTMLDocument().documentElement;
        container.innerHTML = htmlbody
        if(container.querySelectorAll('.gdtm a').length>0){
            container.querySelectorAll('.gdtm a').forEach(ele=>{fetch_urls.push(ele.href)})
        }else{
            container.querySelectorAll('.gdtl a').forEach(ele=>{fetch_urls.push(ele.href)})
        }
        //container.querySelectorAll('.gdtm a').forEach(ele=>{fetch_urls.push(ele.href)})
        //console.log(container.querySelectorAll('.gdtm a'))
	})
	.then(()=>{
		console.log(fetch_urls)
		console.log(index,pages/40)
		if(index < pages/40-1){
			index+=1
			GetAllImgs(index)
		}
		else
			fetchImgUrl(0)
	})
}


function fetchImgUrl(index){
	fetch(fetch_urls[index])
	.then(data=>{return data.text()})
	.then(htmlbody=>{
			    var container = document.implementation.createHTMLDocument().documentElement;
                const img = document.createElement('img')
		        container.innerHTML = htmlbody
		        var Imgurl = container.querySelector('#img').src;
		        console.log(Imgurl)
		        Imgurls.push(Imgurl)
                setAttributes(img, {'id': 'img_'+(index+1), 'style': 'display:block;margin:4px auto;max-width:100%;min-width:100px;min-height:100px;background:#000;', 'src': Imgurl})
                div.appendChild(img)
                reply.parentNode.insertBefore(div, reply)
	})
	.then(()=>{
		if(index != fetch_urls.length-1){
			console.log(index,fetch_urls.length-1)
			index += 1
			fetchImgUrl(index)
		}
	})
}
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

(function() {
    main()
})();