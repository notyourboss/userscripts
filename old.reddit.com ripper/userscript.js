// ==UserScript==
// @name         old.reddit.com ripper
// @namespace    https://github.com/notyourboss
// @version      0.1
// @license      MIT; https://opensource.org/licenses/MIT
// @description  view reddit posts or linked images/videos on same page
// @match        https://old.reddit.com/r/*
// @match        https://old.reddit.com/user/*
// @grant        GM_xmlhttpRequest
// @connect      reddit.com
// @connect      redgifs.com
// ==/UserScript==

function image(event)
{
    event.currentTarget.removeAttribute('onclick');
    const div=event.currentTarget;
    div.innerHTML+='<img src="'+div.getAttribute('data-url')+'" style="max-width:100%">';
}

function post(event)
{
    event.currentTarget.removeAttribute('onclick');
    const div=event.currentTarget;
    GM_xmlhttpRequest({
        method: "GET",
        url: div.getAttribute('data-url'),
        onload: function(response) {
            let domParser = new DOMParser();
            let docElement = domParser.parseFromString(response.responseText,"text/html").documentElement;
            let sitetables=docElement.getElementsByClassName("linklisting");
            if(sitetables.length>0)
            {
                console.log(sitetables);
                var mds = sitetables[0].getElementsByClassName("md");
                if(mds.length>0)
                {
                    div.innerHTML+=mds[0].innerHTML;
                }
            }
        }
    });
}

function redgif(event)
{
    event.currentTarget.removeAttribute('onclick');
    const div=event.currentTarget;
    GM_xmlhttpRequest({
        method: "GET",
        url: div.getAttribute('data-url').replace('/watch/','/ifr/'),
        onload: function(response) {
            const matches=response.responseText.match(/"http[^"]+mp4/);
            if(matches.length>0)
            {
                div.innerHTML+='<video controls loop muted autoplay><source src="'+matches[0].substring(1)+'" type="video/mp4"></video>';
            }
        }
    });
}

function gallery(event)
{
    event.currentTarget.removeAttribute('onclick');
    const div=event.currentTarget;
    GM_xmlhttpRequest({
        method: "GET",
        url: div.getAttribute('data-url'),
        onload: function(response) {
            const matches=response.responseText.match(/"https:..preview.redd.it.[^"]+/g);
            for(let i=0; i<matches.length; i++)
            {
                if(!matches[i].includes('blur=') && !matches[i].includes('\\'))
                {
                    div.innerHTML+='<img src="'+matches[i].substring(1)+'" style="max-width:100%"><br>';
                }
            }
        }
    });
}

(function() {
    'use strict';

    const nodes = document.getElementsByTagName("div");
    for (let i = 0; i < nodes.length; i++)
    {
        if(!nodes[i].hasAttribute('data-url'))
        {
            continue;
        }

        const href=nodes[i].getAttribute('data-url');

        if(href.endsWith('.gif') || href.endsWith('.jpg') || href.endsWith('.png'))
        {
            nodes[i].onclick=image;
        }
        else if(href.startsWith('/r/'))
        {
            nodes[i].onclick=post;
        }
        else if(href.includes('redgifs.com/'))
        {
            nodes[i].onclick=redgif;
            nodes[i].style.backgroundColor='cyan';
        }
        else if(href.includes('reddit.com/gallery/'))
        {
            nodes[i].onclick=gallery;
        }
        else
        {
            nodes[i].style.backgroundColor='#600';
        }
    }
})();
