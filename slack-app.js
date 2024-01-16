// ==UserScript==
// @name         Slack Cleanup
// @namespace    http://tampermonkey.net/
// @version      2024-01-16
// @description  try to take over the world!
// @author       You
// @match        https://app.slack.com/client/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slack.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('Slack Cleanup script')

    setInterval(() => {
        cleanupMessages();
        addFurigana();
    }, 1000)
})();

const words = [' lol', '^^', 'お疲れさまです。', 'お疲れ様です。'];

function cleanupMessages() {
    console.log('[otaku] cleanupMessages...')
    document.querySelectorAll('.p-rich_text_section').forEach(x => {
        const txt = x.innerText;
        if (words.some(wd => txt.includes(wd))) {
            console.log('x', txt)
           words.forEach(w => {
             console.log('word', w)
             let modifiedText = x.innerHTML.replaceAll(w, '');
               console.log('modifiedText', modifiedText)
             x.innerHTML = modifiedText
           });
        }
     })
}

const jWords = [
    { jp: '変更', f: 'へんこう' },
    { jp: '環境', f: 'かんきょう' }, // environment
    { jp: '関連', f: 'かんれん' }, // relation; connection; relevance
    { jp: '資料', f: 'しりょう', t: 'documents' }, // materials; data; information; documents, Primary source
    { jp: '単純', f: 'たんじゅん', t: 'simple' },
    { jp: '購入', f: 'こうにゅう', t: 'purchase' },
]

function addFurigana() {
    console.log('[otaku] addFurigana...')
    document.querySelectorAll('.p-rich_text_section').forEach(x => {
        const txt = x.innerText;
        if (jWords.some(wd => txt.includes(wd.jp)) && !x.innerHTML.includes('<ruby')) {
            console.log('[otaku] x', txt)
           jWords.forEach(w => {
             console.log('[otaku] word', w)
               const t = w.t ? `<i>(${w.t})</i>` : ''
             let modifiedText = x.innerHTML.replaceAll(w.jp, `<ruby>${w.jp}<rt>${w.f}</rt>${t}</ruby>`);
               console.log('modifiedText', modifiedText)
             x.innerHTML = modifiedText
           });
        }
     })
}
