// ==UserScript==
// @name         快樂玩計算總課金金額
// @namespace    https://github.com/ThanatosDi/Tampermonkey-Script/tree/master/%E5%BF%AB%E6%A8%82%E7%8E%A9
// @version      1.1
// @description  計算快樂玩平台課金總金額
// @author       ThanatosDi
// @match        https://www.mangot5.com/Index/Billing/History
// @match        https://www.mangot5.com/Index/Billing/History?cPage=*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/async/3.1.1/async.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js

// ==/UserScript==
var Price = 0
var PageNum
function GetPageNum(callback) {
    fetch(`https://www.mangot5.com/Index/Billing/History?cPage=1`)
        .then(data => { return data.text() })
        .then(
            BodyText => {
                var Body = document.implementation.createHTMLDocument().documentElement;
                Body.innerHTML = BodyText
                PageNum = Body.querySelectorAll('body > div.wrap > div > div.page.text-center ul li').length
                return callback(null, PageNum, 1);
            }
        )
}

function fetchPage(index, _index, callback) {
    fetch(`https://www.mangot5.com/Index/Billing/History?cPage=${_index}`)
        .then(data => { return data.text() })
        .then(BodyText => {
            var Body = document.implementation.createHTMLDocument().documentElement;
            Body.innerHTML = BodyText
            //console.log(`https://www.mangot5.com/Index/Billing/History?cPage=${_index}`)
            Body.querySelectorAll('tr.text-center').forEach(element => {
                //console.log(element.cells[0].textContent)
                if (element.cells[4].className == 'success') {
                    Price += parseInt(element.cells[1].textContent.replace(' TWD', ''))
                }
            })
        })
        .then(() => {
            if (_index < index - 1) {
                _index += 1
                fetchPage(index, _index, callback)
            }
            else if (_index == index - 1) {
                return callback(null, Price)
            }
        })
}

function loadElement(callback) {
    var table = document.querySelector('body > div.wrap > div > div.table-responsive.history')
    var divElement = document.createElement('div')
    divElement.id = 'total'
    divElement.innerHTML = `正在統計中...<img src="https://raw.githubusercontent.com/ThanatosDi/Tampermonkey-Script/master/%E5%BF%AB%E6%A8%82%E7%8E%A9/loading.gif">`
    table.parentNode.insertBefore(divElement, table)
    return callback(null);
}

function editElement(Price, callback) {
    var divElement = document.querySelector('#total')
    divElement.innerHTML = `總課金金額: ${Price} 元`
    return callback(null);
}


(function () {
    'use strict';
    async.waterfall([
        loadElement,
        GetPageNum,
        fetchPage,
        editElement
    ], function (err, result) {
        console.log(`Error: ${err}, Result: ${result}`)
    })
})();