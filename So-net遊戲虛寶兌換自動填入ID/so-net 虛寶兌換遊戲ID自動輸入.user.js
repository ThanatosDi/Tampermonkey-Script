// ==UserScript==
// @name         so-net 虛寶兌換遊戲ID自動輸入
// @namespace    https://github.com/Kutinging/svp.so-net
// @version      1.1
// @description  so-net 虛寶兌換遊戲ID自動輸入，本版本為全遊戲收錄，請自行輸入遊戲ID，PC使用chrome或firefox，Android請使用firefox，請自行安裝Tampermonkey
// @author       ThanatosDi , S.Dot
// @match        http://www.svp.so-net.tw/
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

async function UID(game_no){
    var ID = '';
    var UID = {};
    UID['SON010'] = 'SON010'; //東京偶像計畫
    UID['SON009'] = 'SON008'; //超異域公主連結☆Re：Dive
    UID['SON008'] = 'SON008'; //神式一閃 頂上決戰
    UID['SON004'] = 'SON004'; //戰鬥女子學園
    UID['SON007'] = 'SON007'; //轉吧！小海女！
    document.querySelector("input#user_id").value=UID[game_no];
    document.querySelector('input#user_id').focus();
    document.querySelector('input#vp_no').focus();
}

(function() {
    'use strict';
    UID('SON010');
    addfunc(UID);
    addfunc(getGame);
    //addfunc(sleep);
    addlistener();
    var form = document.getElementsByTagName('form')[0];
    var label = document.createElement("div");
    var span = (document.createElement("span"));
    span.className = 'f_size';
    var t = document.createTextNode("► 4.");
    span.appendChild(t);
    var t2 = document.createTextNode("腳本開發人員 : ThanatosDi , S.Dot");
    label.appendChild(span)
    label.appendChild(t2)
    form.insertBefore(label,document.getElementById('btn_conf'));
})();

function addfunc(func){
    var script = document.createElement('script');
    var f = document.createTextNode(func)
    script.appendChild(f);
    (document.body || document.head || document.documentElement).appendChild(script);
}

function addlistener(){
    var g = (document.getElementById('game_no'))
    g.setAttribute("onchange",'UID(getGame());');
}

function getGame(){
    return document.querySelector("select#game_no").value;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
