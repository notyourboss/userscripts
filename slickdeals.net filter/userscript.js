// ==UserScript==
// @name         slickdeals.net filter
// @namespace    https://github.com/notyourboss
// @version      0.1
// @license      MIT; https://opensource.org/licenses/MIT
// @description  filter out specified deals
// @match        https://slickdeals.net/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ignores='solar,laptop'.toLowerCase().split(',');
    let es=document.getElementsByClassName('frontpageGrid__feedItem');
    for(let i=0; i<es.length; i++)
    {
        let html=es[i].innerHTML.toLowerCase();
        for(let j=0; j<ignores.length; j++)
        {
            if(html.includes(ignores[j]))
            {
                es[i].remove();
                i--;
                break;
            }
        }
    }
})();
