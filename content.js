/************************************************************************/
/*                                                                      */
/*      Search Site WE - Generic WebExtension - Content Pages           */
/*                                                                      */
/*      Javascript for Content Pages                                    */
/*                                                                      */
/*      Last Edit - 02 Nov 2017                                         */
/*                                                                      */
/*      Copyright (C) 2009-2017 DW-dev                                  */
/*                                                                      */
/*      Forked and modified for o-o-0-o-o wingOwing by Vitaly Popov     */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE2.txt file and http://www.gnu.org/licenses/          */
/*                                                                      */
/************************************************************************/

"use strict";

chrome.storage.local.get(null,
function(object)
{
    addListeners();
});

function addListeners()
{
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch (message.type)
        {
            case "getSelection":
                
                var sr=window.getSelection().toString().trim();
                if((sr=="")&&(null!==document.activeElement)&&((document.activeElement.tagName=="INPUT")||(document.activeElement.tagName=="TEXTAREA"))){
                    sr=document.activeElement.value.toString().trim();
                }
                if((sr=="")&&(document.getElementsByName("q").length > 0)&&(document.getElementsByName("q")[0].tagName=="INPUT")){
                    sr=document.getElementsByName('q')[0].value.toString().trim();
                }
                if((sr=="")&&(document.querySelectorAll('input[autofocus]').length > 0)){
                    sr=document.querySelectorAll('input[autofocus]')[0].value.toString().trim();
                }
                if((sr=="")&&(document.querySelectorAll('textarea[autofocus]').length > 0)){
                    sr=document.querySelectorAll('textarea[autofocus]')[0].value.toString().trim();
                }
                if((sr=="")&&(document.querySelectorAll('input[maxlength]').length > 0)){
                    sr=document.querySelectorAll('input[maxlength]')[0].value.toString().trim();
                }
                if((sr=="")&&(document.querySelectorAll('input[placeholder]').length > 0)){
                    sr=document.querySelectorAll('input[placeholder]')[0].value.toString().trim();
                }
                if((sr=="")&&(document.querySelectorAll('input[autocomplete]').length > 0)){
                    sr=document.querySelectorAll('input[autocomplete]')[0].value.toString().trim();
                }
                if((sr=="")&&(document.getElementsByTagName('H1').length > 0)){
                    sr=document.getElementsByTagName('H1')[0].innerText.toString().trim();
                }
                if((sr=="AliExpress")&&(document.getElementsByTagName('H1').length > 1)){
                    sr=document.getElementsByTagName('H1')[1].innerText.toString().trim();
                }
                if((sr=="")&&(document.getElementsByTagName('H2').length > 0)){
                    sr=document.getElementsByTagName('H2')[0].innerText.toString().trim();
                }
                if((sr=="")&&(document.getElementsByTagName('H3').length > 0)){
                    sr=document.getElementsByTagName('H3')[0].innerText.toString().trim();
                }
                if(sr==""){ sr=document.title.toString().trim(); }
                sendResponse({ selectionText: sr });
                
                break;
        }
    });
}
