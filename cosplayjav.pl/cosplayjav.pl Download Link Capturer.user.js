// ==UserScript==
// @name         cosplayjav.pl Download Link Capturer.
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  fast to get the video download links.
// @author       ThanatosDi
// @match        cosplayjav.pl/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function() {
    'use strict';
    var lists = $('.item-parts')
    var dlpage
    var dlink = [];
    var div = document.getElementsByClassName('item-parts')[0]
    for(var index=0; index < (lists.children()).length ; index++){
        dlpage = lists.children()[index].href
        var promise_obj = fetchAsync(dlpage)
        promise_obj
            .then(function(result){
            dlink.push(result)
            _dlen(dlink, index)
        })
    }
})();

function _dlen(Array,len){
    var div = document.getElementsByClassName('item-parts')[0]
    if(len==Array.length){
        for(var i=0;i<len;i++){
            addElement(div, Array[i], i+1)
            //print(i)
        }
        return Array
    }
}
async function fetchAsync(url) {
    const promise = await fetch(url);
    const link = $('a.btn.btn-primary.btn-download',await promise.text())[0].href
    return (Promise.resolve(link))
    //const data = await promise.json();
    //return data;
}
function print(str){
    return console.log(str);
}
function addElement(parent, URL, index){
    var a = document.createElement('a');
    var p = document.createElement('p');
    a.href = URL;
    a.text = 'Download Link Part '+index
    p.appendChild(a)
    parent.appendChild(p)
}