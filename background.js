/************************************************************************/
/*                                                                      */
/*      Search Site WE - Generic WebExtension - Background Page         */
/*                                                                      */
/*      Javascript for Background Page                                  */
/*                                                                      */
/*      Last Edit - 02 Nov 2017                                         */
/*                                                                      */
/*      Copyright (C) 2009-2017 DW-dev                                  */
/*                                                                      */
/*      Forked and modified for Search Monster by Syed Noman Ahmed      */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE2.txt file and http://www.gnu.org/licenses/          */
/*                                                                      */
/************************************************************************/

"use strict";

var isFirefox;
var ffVersion;

var defaultDomain;
var searchEngine,countryCode;
var showSubmenu,onlyDefault,encloseQuotes,openNewTab;

var globalEngines = new Array("https://www.google.com/search?gws_rd=cr&num=30&q=",
                              "https://www.bing.com/search?q=",
                              "https://search.yahoo.com/search?p=",
                              "http://www.ask.com/web?q=",
                              "https://duckduckgo.com/?q=");

var localEngines = new Array("https://www.google.##/search?num=30&q=",
                             "https://www.bing.com/search?cc=##&q=",
                             "https://##.search.yahoo.com/search?p=",
                             "http://##.ask.com/web?q=",
                             "");

isFirefox = (navigator.userAgent.indexOf("Firefox") >= 0);

if (isFirefox)
{
    chrome.runtime.getBrowserInfo(
    function(info)
    {
        ffVersion = info.version.substr(0,info.version.indexOf("."));
        
        initialize();
    });
}
else initialize();

function initialize()
{
    chrome.storage.local.get(null,
    function(object)
    {
        var context0,context1;
        
        /* Initialize or migrate options */
        
        if (!("options-defaultdomain" in object)) object["options-defaultdomain"] = 0;
        
        if (!("options-searchengine" in object)) object["options-searchengine"] = 0;
        if (!("options-countrycode" in object)) object["options-countrycode"] = "uk";
        
        if (!("options-showsubmenu" in object)) object["options-showsubmenu"] = true;
        if (!("options-onlydefault" in object)) object["options-onlydefault"] = false;
        if (!("options-enclosequotes" in object)) object["options-enclosequotes"] = false;
        if (!("options-opennewtab" in object)) object["options-opennewtab"] = false;
        
        object["popup-searchtext"] = "";
        if (!("popup-opennewtab" in object)) object["popup-opennewtab"] = false;
        
        /* Update stored options */
        
        chrome.storage.local.set(object);
        
        /* Initialize local options */
        
        defaultDomain = object["options-defaultdomain"];
        
        searchEngine = object["options-searchengine"];
        countryCode = object["options-countrycode"];
        
        showSubmenu = object["options-showsubmenu"];
        onlyDefault = object["options-onlydefault"];
        encloseQuotes = object["options-enclosequotes"];
        openNewTab = object["options-opennewtab"];
        
        /* Add context menu items */
        
        context0 = (showSubmenu && (!onlyDefault || defaultDomain == 0)) ? "selection" : "page_action";
        context1 = (showSubmenu && (!onlyDefault || defaultDomain == 1)) ? "selection" : "page_action";
        
        chrome.contextMenus.create({ id: "cofind", title: "Find", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "entiredomain", title: "Domain", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "subdomain", title: "Subdomain", contexts: [ context0, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cocl", title: "Craigslist", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "costack", title: "StackOverflow site", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cooverflow", title: "StackOverflow with Google", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coali", title: "AliExpress", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coamazon", title: "Amazon", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cobing", title: "Bing", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cobaidu", title: "Baidu", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coduck", title: "DuckDuckGo", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "co6", title: "6 Shopping", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "co7", title: "7 Travel", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "co8", title: "8 Pro", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cogmail", title: "Gmail", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cogoogle", title: "Google", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coyoutube", title: "Youtube", contexts: [ context1, "browser_action" ], enabled: true });
        
        addListeners();
    });
}

function addListeners()
{
    /* Storage changed listener */
    
    chrome.storage.onChanged.addListener(
    function(changes,areaName)
    {
        chrome.storage.local.get(null,
        function(object)
        {
            var context0,context1;
            
            defaultDomain = object["options-defaultdomain"];
            
            searchEngine = object["options-searchengine"];
            countryCode = object["options-countrycode"];
            
            showSubmenu = object["options-showsubmenu"];
            onlyDefault = object["options-onlydefault"];
            encloseQuotes = object["options-enclosequotes"];
            openNewTab = object["options-opennewtab"];
            
            if ("options-showsubmenu" in changes || "options-onlydefault" in changes || "options-defaultdomain" in changes)
            {
                chrome.contextMenus.removeAll();
                
                context0 = (showSubmenu && (!onlyDefault || defaultDomain == 0)) ? "selection" : "page_action";
                context1 = (showSubmenu && (!onlyDefault || defaultDomain == 1)) ? "selection" : "page_action";
                
                chrome.contextMenus.create({ id: "cofind", title: "Find", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "entiredomain", title: "Domain", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "subdomain", title: "Subdomain", contexts: [ context0, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cocl", title: "Craigslist", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "costack", title: "StackOverflow site", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cooverflow", title: "StackOverflow with Google", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coali", title: "AliExpress", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coamazon", title: "Amazon", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cobing", title: "Bing", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cobaidu", title: "Baidu", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coduck", title: "DuckDuckGo", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "co6", title: "6 Shopping", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "co7", title: "7 Travel", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "co8", title: "8 Pro", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cogmail", title: "Gmail", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "cogoogle", title: "Google", contexts: [ context1, "browser_action" ], enabled: true });
        chrome.contextMenus.create({ id: "coyoutube", title: "Youtube", contexts: [ context1, "browser_action" ], enabled: true });
            }
        });
    });
    
    /* Context menu listener */
    
    chrome.contextMenus.onClicked.addListener(
    function(info,tab)
    {
        var text;
        
        if (info.selectionText != null)
        {
            if (encloseQuotes) info.selectionText = "\"" + info.selectionText + "\"";
            
        switch(info.menuItemId){
        case "subdomain":
	    searchSiteForText(0,info.selectionText);
	    break;
        case "entiredomain":
	    searchSiteForText(1,info.selectionText);
	    break;
        case "cofind":
	    searchSiteForText(2,info.selectionText);
	    break;
        case "cocl":
	    searchSiteForText(4,info.selectionText);
	    break;
        case "coali":
	    searchSiteForText(5,info.selectionText);
	    break;
        case "co6":
	    searchSiteForText(6,info.selectionText);
	    break;
        case "co7":
	    searchSiteForText(7,info.selectionText);
	    break;
        case "co8":
	    searchSiteForText(8,info.selectionText);
	    break;
        case "coamazon":
	    searchSiteForText(16,info.selectionText);
	    break;
        case "cobing":
	    searchSiteForText(17,info.selectionText);
	    break;
        case "cobaidu":
	    searchSiteForText(18,info.selectionText);
	    break;
        case "coduck":
	    searchSiteForText(9,info.selectionText);
	    break;
        case "cogmail":
	    searchSiteForText(14,info.selectionText);
	    break;
        case "cogoogle":
	    searchSiteForText(10,info.selectionText);
	    break;
        case "coyoutube":
	    searchSiteForText(11,info.selectionText);
	    break;
        case "costack":
	    searchSiteForText(12,info.selectionText);
	    break;
        case "cooverflow":
	    searchSiteForText(13,info.selectionText);
	    break;
        default:
	    searchSiteForText(2,info.selectionText);
}
        }
        else
        {
            chrome.tabs.sendMessage(tab.id,{ type: "getSelection" },
            function(object)
            {
                if (encloseQuotes) object.selectionText = "\"" + object.selectionText + "\"";
                
                switch(info.menuItemId){
        case "subdomain":
	    searchSiteForText(0,info.selectionText);
	    break;
        case "entiredomain":
	    searchSiteForText(1,info.selectionText);
	    break;
        case "cofind":
	    searchSiteForText(2,info.selectionText);
	    break;
        case "cocl":
	    searchSiteForText(4,info.selectionText);
	    break;
        case "coali":
	    searchSiteForText(5,info.selectionText);
	    break;
        case "co6":
	    searchSiteForText(6,info.selectionText);
	    break;
        case "co7":
	    searchSiteForText(7,info.selectionText);
	    break;
        case "co8":
	    searchSiteForText(8,info.selectionText);
	    break;
        case "coamazon":
	    searchSiteForText(16,info.selectionText);
	    break;
        case "cobing":
	    searchSiteForText(17,info.selectionText);
	    break;
        case "cobaidu":
	    searchSiteForText(18,info.selectionText);
	    break;
        case "coduck":
	    searchSiteForText(9,info.selectionText);
	    break;
        case "cogmail":
	    searchSiteForText(14,info.selectionText);
	    break;
        case "cogoogle":
	    searchSiteForText(10,info.selectionText);
	    break;
        case "coyoutube":
	    searchSiteForText(11,info.selectionText);
	    break;
        case "costack":
	    searchSiteForText(12,info.selectionText);
	    break;
        case "cooverflow":
	    searchSiteForText(13,info.selectionText);
	    break;
        default:
	    searchSiteForText(2,info.selectionText);
        }
            });
        }
    });
    
    /* Tab event listeners */
    
    chrome.tabs.onActivated.addListener(  /* tab selected */
    function(activeInfo)
    {
        chrome.tabs.get(activeInfo.tabId,
        function(tab)
        {
            setButtonAndMenuStates(tab.id,tab.url);
        });
    });
    
    chrome.tabs.onUpdated.addListener(  /* URL updated */
    function(tabId,changeInfo,tab)
    {
        setButtonAndMenuStates(tab.id,tab.url);
    });
    
    chrome.webNavigation.onCompleted.addListener(  /* page loaded */
    function(details)
    {
        if (details.frameId == 0)
        {
            chrome.tabs.get(details.tabId,
            function(tab)
            {
                setButtonAndMenuStates(tab.id,tab.url);
            });
        }
    });
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        
    switch(message.type){
        case "keypressTextbox":
	    searchSiteForText(defaultDomain,message.text);
	    break;
        case "clickSubdomain":
	    searchSiteForText(0,message.text);
	    break;
        case "clickEntireDomain":
	    searchSiteForText(1,message.text);
	    break;
        case "clickFind":
	    searchSiteForText(2,message.text);
	    break;
        case "clickDouble":
	    searchSiteForText(3,message.text);
	    break;
        case "clickCl":
	    searchSiteForText(4,message.text);
	    break;
        case "clickAli":
	    searchSiteForText(5,message.text);
	    break;
        case "click6":
	    searchSiteForText(6,message.text);
	    break;
        case "click7":
	    searchSiteForText(7,message.text);
	    break;
        case "click8":
	    searchSiteForText(8,message.text);
	    break;
        case "clickAmazon":
	    searchSiteForText(16,message.text);
	    break;
        case "clickBing":
	    searchSiteForText(17,message.text);
	    break;
        case "clickBaidu":
	    searchSiteForText(18,message.text);
	    break;
        case "clickDuck":
	    searchSiteForText(9,message.text);
	    break;
        case "clickGoogle":
	    searchSiteForText(10,message.text);
	    break;
        case "clickYoutube":
	    searchSiteForText(11,message.text);
	    break;
        case "clickStack":
	    searchSiteForText(12,message.text);
	    break;
        case "clickOverflow":
	    searchSiteForText(13,message.text);
	    break;
        case "clickGmail":
	    searchSiteForText(14,message.text);
	    break;
        default:
	    searchSiteForText(defaultDomain,message.text);
    }});
}

function searchSiteForText(domainType,searchText)
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        var i,currentURL,suffixLength,domain,searchURL;
        var fields = new Array();
        var parts = new Array();
        
        currentURL = tabs[0].url;
        
        if (currentURL.substr(0,5) == "http:" || currentURL.substr(0,6) == "https:")
        {
            fields = currentURL.match(/(.+:\/\/)([^:/?#]*)(:[^/?#]*)?(\/[^?#]*)?(\?[^#]*)?(#.*)?/);
            
            parts = fields[2].split(".");
            suffixLength = getPublicSuffix(fields[2]).split(".").length;
            
            if (domainType == 0) domain = fields[2];
            else if (domainType == 2) domain = "";
            else
            {
                domain = parts[parts.length-suffixLength-1];
                for (i = parts.length-suffixLength; i < parts.length; i++) domain += "." + parts[i];
            }
            
            if (domainType < 2) searchText += "+site:" + domain;
            
            searchURL = "https://www.google.com/search?num=30&q=";
            
            if (domainType == 2){ searchURL = "http://searchmonster.net/search.php?s_submit=Submit&search="; }
            if (domainType == 3){ searchText = ""; searchURL = currentURL; }
            if (domainType == 4){ searchText += "+site%3Acraigslist.org"; }
            if (domainType == 5){ searchURL = "https://www.aliexpress.com/wholesale?SortType=total_tranpro_desc&isRtl=yes&SearchText="; }
            if (domainType == 6){ searchURL = "http://searchmonster.net/search.php?s_submit=Submit&search="; }
            if (domainType == 7){ searchURL = "http://searchmonster.net/search.php?s_submit=Submit&search="; }
            if (domainType == 8){ searchURL = "http://searchmonster.net/search.php?s_submit=Submit&search="; }
            if (domainType == 16){ searchURL = "https://www.amazon.com/gp/search?tag=ilovevitaly-20&keywords="; }
            if (domainType == 17){ searchURL = "https://www.bing.com/search?q="; }
            if (domainType == 18){ searchURL = "https://www.baidu.com/s?wd="; }
            if (domainType == 9){ searchURL = "https://duckduckgo.com/?q="; }
            if (domainType == 10){ searchURL = "https://www.google.com/search?num=30&q="; }
            if (domainType == 11){ searchURL = "https://www.youtube.com/results?search_query="; }
            if (domainType == 12){ searchURL = "https://stackoverflow.com/search?q="; }
            if (domainType == 13){ searchText += "+site%3Astackoverflow.com"; }
            if (domainType == 14){ searchURL = "https://mail.google.com/mail/u/0/#search/"; }
            
            chrome.tabs.create({ url: searchURL + searchText, index: tabs[0].index+1, active: true });
        }
    });
}

function setButtonAndMenuStates(tabId,url)
{
    if (url.substr(0,5) == "http:" || url.substr(0,6) == "https:")
    {
        chrome.browserAction.enable(tabId);
        
        if (isFirefox && ffVersion <= 54) chrome.browserAction.setIcon({ tabId: tabId, path: "icon16.png"});  /* Firefox 54- - icon not changed */

chrome.contextMenus.update("subdomain",{ enabled: true });
chrome.contextMenus.update("entiredomain",{ enabled: true });
chrome.contextMenus.update("cofind",{ enabled: true });
chrome.contextMenus.update("cocl",{ enabled: true });
chrome.contextMenus.update("coali",{ enabled: true });
chrome.contextMenus.update("co6",{ enabled: true });
chrome.contextMenus.update("co7",{ enabled: true });
chrome.contextMenus.update("co8",{ enabled: true });
chrome.contextMenus.update("coamazon",{ enabled: true });
chrome.contextMenus.update("cobing",{ enabled: true });
chrome.contextMenus.update("cobaidu",{ enabled: true });
chrome.contextMenus.update("coduck",{ enabled: true });
chrome.contextMenus.update("cogmail",{ enabled: true });
chrome.contextMenus.update("cogoogle",{ enabled: true });
chrome.contextMenus.update("coyoutube",{ enabled: true });
chrome.contextMenus.update("costack",{ enabled: true });
chrome.contextMenus.update("cooverflow",{ enabled: true });
    }
    else
    {
        chrome.browserAction.disable(tabId);
        
        if (isFirefox && ffVersion <= 54) chrome.browserAction.setIcon({ tabId: tabId, path: "icon16-disabled.png"});  /* Firefox 54- - icon not changed */
        
chrome.contextMenus.update("subdomain",{ enabled: false });
chrome.contextMenus.update("entiredomain",{ enabled: false });
chrome.contextMenus.update("cofind",{ enabled: false });
chrome.contextMenus.update("cocl",{ enabled: false });
chrome.contextMenus.update("coali",{ enabled: false });
chrome.contextMenus.update("co6",{ enabled: false });
chrome.contextMenus.update("co7",{ enabled: false });
chrome.contextMenus.update("co8",{ enabled: false });
chrome.contextMenus.update("coamazon",{ enabled: false });
chrome.contextMenus.update("cobing",{ enabled: false });
chrome.contextMenus.update("cobaidu",{ enabled: false });
chrome.contextMenus.update("coduck",{ enabled: false });
chrome.contextMenus.update("cogmail",{ enabled: false });
chrome.contextMenus.update("cogoogle",{ enabled: false });
chrome.contextMenus.update("coyoutube",{ enabled: false });
chrome.contextMenus.update("costack",{ enabled: false });
chrome.contextMenus.update("cooverflow",{ enabled: false });
    }
}

function debugNotify(message)
{
    chrome.notifications.create("debug",{ type: "basic", iconUrl: "o-o-0-o-o32.png", title: "o-o-0-o-o - DEBUG", message: "" + message });
}
