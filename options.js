/************************************************************************/
/*                                                                      */
/*      Search Site WE - Generic WebExtension - Options Page            */
/*                                                                      */
/*      Javascript for Options Page                                     */
/*                                                                      */
/*      Last Edit - 09 Sep 2017                                         */
/*                                                                      */
/*      Copyright (C) 2016-2017 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Refer to Google Chrome developer documentation:                     */
/*                                                                      */
/*  https://developer.chrome.com/extensions/optionsV2                   */
/*                                                                      */
/*  https://developer.chrome.com/extensions/storage                     */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

/************************************************************************/

/* Listener for options page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Initialize on page load */

function onLoadPage(event)
{
    /* Load options from local storage */
    
    chrome.storage.local.get(null,
    function(object)
    {
        document.getElementById("options-defaultdomain").elements["domain"].value = object["options-defaultdomain"];
        
        document.getElementById("options-searchengine").elements["engine"].value = object["options-searchengine"];
        document.getElementById("options-countrycode").value = object["options-countrycode"];
        
        document.getElementById("options-showsubmenu").checked = object["options-showsubmenu"];
        document.getElementById("options-onlydefault").checked = object["options-onlydefault"];
        document.getElementById("options-enclosequotes").checked = object["options-enclosequotes"];
        document.getElementById("options-opennewtab").checked = object["options-opennewtab"];
        
        document.getElementById("options-countrycode").disabled = !Boolean(document.getElementById("options-searchengine").elements["engine"].value%2);
    });
    
    /* Add listener for click on search engine radio buttons */
    
    document.getElementById("options-google-global").addEventListener("click",onClickGlobal,false);
    document.getElementById("options-bing-global").addEventListener("click",onClickGlobal,false);
    document.getElementById("options-yahoo-global").addEventListener("click",onClickGlobal,false);
    document.getElementById("options-ask-global").addEventListener("click",onClickGlobal,false);
    document.getElementById("options-duckduckgo-global").addEventListener("click",onClickGlobal,false);
    
    document.getElementById("options-google-local").addEventListener("click",onClickLocal,false);
    document.getElementById("options-bing-local").addEventListener("click",onClickLocal,false);
    document.getElementById("options-yahoo-local").addEventListener("click",onClickLocal,false);
    document.getElementById("options-ask-local").addEventListener("click",onClickLocal,false);
    
    /* Add listener for click on save button */
    
    document.getElementById("options-save-button").addEventListener("click",onClickSave,false);
}

/************************************************************************/

/* Enable or Disable options */

function onClickGlobal(event)
{
    document.getElementById("options-countrycode").disabled = true;
}

function onClickLocal(event)
{
    document.getElementById("options-countrycode").disabled = false;
}

/************************************************************************/

/* Save options */

function onClickSave(event)
{
    /* Save options to local storage */
    
    chrome.storage.local.set(
    {
        "options-defaultdomain": document.getElementById("options-defaultdomain").elements["domain"].value,
        
        "options-searchengine": document.getElementById("options-searchengine").elements["engine"].value,
        "options-countrycode": document.getElementById("options-countrycode").value,
        
        "options-showsubmenu": document.getElementById("options-showsubmenu").checked,
        "options-onlydefault": document.getElementById("options-onlydefault").checked,
        "options-enclosequotes": document.getElementById("options-enclosequotes").checked,
        "options-opennewtab": document.getElementById("options-opennewtab").checked
    });
    
    /* Display saved status for short period */
    
    document.getElementById("options-save-status").style.setProperty("visibility","visible","");
    
    setTimeout(function()
    {
        document.getElementById("options-save-status").style.setProperty("visibility","hidden","");
    }
    ,1000);
}

/************************************************************************/
