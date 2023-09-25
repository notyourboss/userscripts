// ==UserScript==
// @name         news.yahoo.co.jp go to full article
// @namespace    https://github.com/notyourboss
// @version      0.1
// @license      MIT; https://opensource.org/licenses/MIT
// @description  click 記事全文を読む
// @match        news.yahoo.co.jp/pickup/*
// @grant        none
// ==/UserScript==

(function()
{
    let as=document.getElementsByTagName('a');
    for(let i=0; i<as.length; i++)
    {
        if(as[i].innerHTML.includes('記事全文を読む'))
        {
            as[i].click();
            break;
        }
    }
})();
