// ==UserScript==
// @name         old.reddit.com click continue
// @namespace    https://github.com/notyourboss
// @version      0.1
// @license      MIT; https://opensource.org/licenses/MIT
// @description  auto click 'continue'
// @match        old.reddit.com/over18*
// @match        old.reddit.com/gated*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const nodes = document.getElementsByTagName("button");
    for (let i = 0; i < nodes.length; i++)
    {
        if('continue'==nodes[i].innerHTML)
        {
            nodes[i].click();
        }
    }
})();
