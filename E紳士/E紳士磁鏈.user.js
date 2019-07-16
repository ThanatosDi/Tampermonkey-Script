// ==UserScript==
// @name         E紳士磁鏈
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在本本網頁上加入磁力鏈結超連結，點擊後即可開啟BT下載
// @icon         https://www.google.com/s2/favicons?domain=e-hentai.org
// @author       ThanatosDi
// @match        https://exhentai.org/g/*
// @match        https://e-hentai.org/g/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

async function fetchAsync(url) {
    // 取得本本的 html
    console.log('gallery page link: '+url)
    const promise = await fetch(url,{headers:{'User-Agent': 'Hellow, World!'}});
    const link = $('#gd5 > p:nth-child(3) > a',await promise.text())["0"].attributes[1].value
    return (Promise.resolve(link))
}

async function torrent(url) {
    //取得 torrent 頁面 html
    try{
        console.log('torrent page link: '+url)
        const promise = await fetch(url,{headers:{'User-Agent': 'Hellow, World!'}});
        const link = $('#torrentinfo > div:nth-child(1) > form > div > table > tbody > tr:nth-child(3) > td > a',await promise.text())["0"].href
        return (Promise.resolve(link))
    }
    catch(e){
        return null
    }
}

function re(text, regex){
    //正規表示法取得字串
    let m;
    while ((m = regex.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            return match
        })
    }
}

function addelement(manget){
    //修改本本頁面的 html 插入一行磁鏈超連結
    const list = document.getElementById('gd5')
    const p = document.createElement('p')//外部框
    const img = document.createElement('img')//圖片
    const a = document.createElement('a')//超連結內容
    setAttributes(img, {"src": 'https://exhentai.org/img/mr.gif'})
    setAttributes(a, {'id': 'manget', 'href': 'magnet:?xt=urn:btih:'+manget})
    a.text = ' 磁力鏈結'
    p.appendChild(img)
    p.appendChild(a)
    p.className = 'g2'
    list.appendChild(p)
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

(function() {
    const value = fetchAsync(location.href)
    value.then(function(torrent_page){
        if(torrent_page.match(/\'\S+\'/gm)!=null){
            //取得 Torrent Download 超連結網址
            var _torrent = torrent(torrent_page.match(/\'\S+\'/gm)[0].replace(/'/g,''))
            _torrent.then(function(torrent_link){
                if(torrent_link==null){
                    console.log('捕捉磁鏈失敗，可能該圖庫未提供 torrent鏈結或網路錯誤')
                    return
                }
                const manget = torrent_link.match(/\/\w+.torrent/gm)[0].replace('/','').replace('.torrent','')
                console.log(manget)
                addelement(manget)
            })
        }
    })
})();