/************************************************************************/
/*                                                                      */
/*      Search Site WE - Generic WebExtension - Popup Page              */
/*                                                                      */
/*      Javascript for Popup Page                                       */
/*                                                                      */
/*      Last Edit - 02 Nov 2017                                         */
/*                                                                      */
/*      Copyright (C) 2009-2017 DW-dev                                  */
/*                                                                      */
/*      Forked and modified for Search Monster By Syed Noman Ahmed      */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE2.txt file and http://www.gnu.org/licenses/          */
/*                                                                      */
/************************************************************************/

"use strict";

document.addEventListener("DOMContentLoaded",onLoadPage,false);

function onLoadPage()
{
    chrome.storage.local.get(null,
    function(object)
    {
        document.getElementById("popup-textbox").value = object["popup-searchtext"];
        
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            chrome.tabs.sendMessage(tabs[0].id,{ type: "getSelection" },
            function(object)
            {
                document.getElementById("popup-textbox").value = object.selectionText;
            });
        });
        
        window.setTimeout(
        function()
        {
            document.getElementById("popup-textbox").focus();
            // document.getElementById("popup-textbox").select();
        },30);
        
        document.getElementById("popup-textbox").addEventListener("keydown",onKeypressTextbox,true);
        document.getElementById("popup-f").addEventListener("click",onClickFind,false);
        document.getElementById("popup-find").addEventListener("click",onClickFind,false);
        document.getElementById("popup-double").addEventListener("click",onClickDouble,false);
        document.getElementById("popup-subdomain").addEventListener("click",onClickSubdomain,false);
        document.getElementById("popup-entiredomain").addEventListener("click",onClickEntireDomain,false);
        document.getElementById("popup-cl").addEventListener("click",onClickCl,false);
        document.getElementById("popup-stack").addEventListener("click",onClickStack,false);
        document.getElementById("popup-overflow").addEventListener("click",onClickOverflow,false);
        document.getElementById("popup-ali").addEventListener("click",onClickAli,false);
        document.getElementById("popup-amazon").addEventListener("click",onClickAmazon,false);
        document.getElementById("popup-bing").addEventListener("click",onClickBing,false);
        document.getElementById("popup-baidu").addEventListener("click",onClickBaidu,false);
        document.getElementById("popup-duck").addEventListener("click",onClickDuck,false);
        document.getElementById("popup-6").addEventListener("click",onClick6,false);
        document.getElementById("popup-7").addEventListener("click",onClick7,false);
        document.getElementById("popup-8").addEventListener("click",onClick8,false);
        document.getElementById("popup-gmail").addEventListener("click",onClickGmail,false);
        document.getElementById("popup-google").addEventListener("click",onClickGoogle,false);
        document.getElementById("popup-youtube").addEventListener("click",onClickYoutube,false);
    });
}

function onKeypressTextbox(event)
{
    if (event.keyCode == 13)
    {
        saveNewTabOption();
        
        chrome.runtime.sendMessage({ type: "keypressTextbox", 
                                     text: document.getElementById("popup-textbox").value });
        
        window.setTimeout(function() { window.close(); },10);
    }
}

function onClickFind(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickFind", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickDouble(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickDouble", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickSubdomain(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickSubdomain", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickEntireDomain(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickEntireDomain", domain: 1,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickCl(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickCl", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickStack(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickStack", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickOverflow(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickOverflow", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickAli(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickAli", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickAmazon(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickAmazon", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickBing(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickBing", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickBaidu(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickBaidu", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickDuck(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickDuck", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClick6(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "click6", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClick7(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "click7", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClick8(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "click8", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickGmail(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickGmail", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickGoogle(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickGoogle", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function onClickYoutube(event){
    saveNewTabOption();
    chrome.runtime.sendMessage({ type: "clickYoutube", domain: 0,
                                 text: document.getElementById("popup-textbox").value });
    window.setTimeout(function() { window.close(); },10);
}

function saveNewTabOption()
{
    chrome.storage.local.set(
    {
        "popup-searchtext": document.getElementById("popup-textbox").value,
    });
}

function onChangeNewTab()
{
    document.getElementById("popup-textbox").focus();
}
