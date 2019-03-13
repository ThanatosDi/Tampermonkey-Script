// ==UserScript==
// @name         so-net 遊戲ID自動輸入 for 公主連結
// @namespace    https://github.com/Kutinging/svp.so-ne
// @version      1.2
// @description  so-net 遊戲ID自動輸入 for 公主連結
// @author       ThanatosDi , S.Dot
// @match        http://www.svp.so-net.tw/*
// @require https://api.kawai.moe/js/sonet.js?20190313
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
   document.querySelector("select#game_no").value = "SON009" //遊戲代號 公主連結
   document.querySelector("select#game_no").dispatchEvent(new Event('change'))
   document.querySelector("input#user_id").value="" //遊戲 UID
   document.querySelector("select#server_channel_list").value="1" //伺服器 1=美食殿堂 2=真布真布王國
   document.querySelector("input#user_id").focus();
   document.querySelector("input#vp_no").focus();
   svp()
})();
