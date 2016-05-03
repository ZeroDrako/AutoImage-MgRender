// ==UserScript==
// @name          ZD AutoImage MgRender v3.0
// @namespace     http://your.homepage/
// @version       3.0
// @description   Automatic download HD-Images from MG-Render to download folder
// @author        ZeroDrako
// @include       *mg-renders.net*
// @grant         GM_addStyle
// @grant         window.close
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @noframes
// @require       https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.min.js
// @require       https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js
// @require       file://D:\Documentos\HTML&JS\Scripts\ZD AutoImage MgRender v3.1.js
// @icon          http://i1236.photobucket.com/albums/ff444/ZeroDrako/128_zpstpkixbgq.png
// ==/UserScript==
/* 
-------------------------------------------------DESCRIPTION-------------------------------------------------
Script that make more easy download renders from "mg-renders.net" and "hentai.mg-renders.net"

-Why?
    Because i download render from that page for make wallpapers and pack for rainmeter.
    The page only let you download a "small", "medium","large" image size, but in the server of the page 
        is located the full size whith better resolution, and of course this option is hidden, for example:
        small :     250kb   
        medium:     530kb   
        large:      1.1MB   
        full:       2.3MB  (the best resolution, hidden option)
    So thi script download the full render.

-What this script do?
    Add some option in the page, you can see in the panel option named "ZD AutoImage MgRender v3"
    [OPTION]        [DESCRIPTION]
    Show URLs?  --> If you active this option, when you open a post, you can see the url to the full render hover the image.
                            This is and old option from v1, maybe removed in future versions
    Close Wind? --> Option to close the tab after download the render, imagine you open much images and active auto download,
                            the image is download and now is very hard to close all tabs (and 12+ taps is a very high ram ater), so this
                            option is for help you to kee orden and reduce you job.
    Alert Dial? --> Option to show an alert option , this only works if "Files" option is already set.
                            Inform you if you has already downloaded an image (to skip download again).
    ZipGallery? --> Option to download a gallery. A gallery is a page whit a tag or a search result, for example the pages that 
                            show you the list of render under a specific tag like:
                            'HighSchool DxD' --> http://www.mg-renders.net/search/label/High%20School%20DxD?&max-results=24
                            'THE iDOLM@STER' --> http://www.mg-renders.net/search/label/THE%20iDOLM%40STER?&max-results=24
                        The script download each render an compress into a zip file whit the name of the tag + number of page
                        (Ecample 'High School DxD - 1.zip' , 'High School DxD - 2.zip', ...), and download it for you.
                        Is the better option for download all images of a tag/anime/hentai.
    Files:      --> Option to check if an image is already downloaded. This option show a pop-up where you can choose a directory
                            where you store you renders. If the script detects that the image you're to download is already downloaded
                            skipt the image or show you an alert about it. Check "Alert Dial?" option.
                        Note 1: By default this option works recursively, detect all images in the directory and sub-directorys.
                        Note 2: Your images need to have the original name.

-------------------------------------------------NOTES-------------------------------------------------
@noframes
        Load script only 1 time per page
@grant  GM_addStyle   &&  window.close
        Allow to close tab from a JS scrip in Chrome. 
        see: 
            http://stackoverflow.com/questions/19761241/window-close-and-self-close-do-not-close-the-window-in-chrome
@grant  window.close
        Allow to close tab from a JS scrip in Chrome. (Update to Tampermonkey v4) 
        see: 
            http://stackoverflow.com/questions/19761241/window-close-and-self-close-do-not-close-the-window-in-chrome

-------------------------------------------------TO-DO-------------------------------------------------
-Add option to skip image already downlaaded at ZipGallery download. (no include those images in the zip.)
-Add option to auto-close on gallery/search option. (not working fine)
-Add option to auto-load nest page on gallerys (if gallery have 2 or more pages, load the next page when the zip of current page is already downloaded)
-Add option to auto-check new images from specific gallerys and download them.
-Add css to the download bar.
-Imrpove code

-------------------------------------------------CHANGELOG-------------------------------------------------
v3.0 -  Re-Write code again, page update, and tampermonkey update to v4, broke the script.
        Add GM_addStyle, window.close, GM_getValue, GM_setValue, GM_xmlhttpRequest to @grant (v4 tampermonkey not work if is not define).
        Add use use of "FileSaver.js" and "JsZip.js" librarys.
        Add option to Check if a file is already downloaded.
        Add option to disable auto-download of a image.
        Add option do disable auto-download of a gallery. 
        Add option to download the gallery as a zip (the name is generate whit the tag name and the number of the page).
        Add Functions:
                getGalleryLinks(), getGalleryName(), downloadGallery(), onDownGalleryComplete()
                filesToString(), stringToFiles(), blobToBase64()
        Add CSS to the "Panel Option".
        Aad coments to the code.
        Add a progressbar over the each image to see the progres of the image download.
        Add a "TO-DO" list, things to implement in future versions.
        Add a "DESCRIPTION".
        Fix code of getting the url.
        Fix autoclose and show url.


v2.2 -  Fix bugs.
        Last update of the script.

v2.1 -  Improve code, use od regex and compact some expresions.

v2.1 -  Fix some bugs.

v2.0 -  Re-Write all code again, for some reason the page update again and broke the skrip.
        Now the image is downloaded whit "XMLHttpRequest".
        Now use the "FileSaver.js" library, for save the iamge.
        Now the code check before add the option pane, if it is necesary add or not.
        Add option to show in a new tab all links from a gallery.
        Add option to auto close the page, see info about GM_addStyle.
        Add functions to make the code more easy:
            loadPreferences(), addSettingPanel(), getLink(), close(),
            getName(), downloadImage(), decodeURLRecursively(), master()
        Add NOTES for future references.
        Add @noframes.
        Add Changelog.
        Establish a time before close the tab, to make sure the image is downloaded.

v1.5 -  Fixed some code, because a page update.
        Re-write all code for make more easy to undertand.

v1.1 -  Fixed code of getting the url.

v1.0 -  Finaly add a "Option pane" in HTML.
        Add To show url over the image.
        Add option to verify if an image is already downloade.
        Add osibility to save a history downloads.


v.5  -  Add get the link from hidden DIV.
         Fix code that make the link again.
         Now support Hentai renders page.

v.4     -Add option to show url hover the image (develop purpose).

v.3     -Fix the code that make the link to full size, now using regex.

v.2     -Now remplace the link in the 'Download Render' button whit the full image link.

v.1     -Test release, alpha mode.
         Options, Show url of full image render in the console.
 */

"use strict";
var downFiles = [],
    links = [],
    count = 0,
    url = window.location.href,
    zip = new JSZip();

/*-------------------------------------------------Preferences Functions-------------------------------------------------*/
function loadPreferences() {
    /*
    >Load all preferences an asing to HTML objets id auto download is disabled
    >Load list of files into array oobject
    */
    try {
        document.getElementById('ZDautodown').value = GM_getValue("AutoDownload", false);
        document.getElementById('ZDshowurl').value = GM_getValue("ShowUrl", false);
        document.getElementById('ZDautoclose').value = GM_getValue("AutoClose", false);
        document.getElementById('ZDalertdialog').value = GM_getValue("ArtDialog", false);
        document.getElementById('ZDzipgallery').value = GM_getValue("ZipGallery", false);
        document.getElementById('ZDautopage').value = GM_getValue("AutoPageGallery", false);
        document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
    } catch (event) {
        console.log(event.message);
    }
    downFiles = stringToFiles(GM_getValue("Files", ""));
}

function addSettingPanel() {
    /*
    >Add CSS and HTML to the page to show the Option Pane
    >Css = Panel Setings , Cs2 = Css ProgressBar
    >Delete 2 HTML objets (Facebook button & Unknow Element) to get space for Option Pane
    .ZdBar{padding:.3em 115px .5em;font-size:12px !important;background:#21262a !important;border:solid 1px #3a434a !important}
    */
    var css = '#ZDtitle,.ZDoption{color:#989c9f !important}#popup{border:0px solid #21262a;background-color:#000;text-align:center}#ZDtitle{font-family:Play;font-size:20px;padding-top:20px}.ZDoption{font-size:16px}#ZDautodown,#ZDautoclose,#ZDzipgallery,#ZDautopage,#ZDalertdialog,#ZDdirhelp,#ZDsave,#ZDshowurl{font-size:12px;font-weight:400;opacity:.7;float:right !important;color:#fff;border:0px solid #3a434a;background:#3a434a}#ZDdirectory{color:#666;border:1px solid #202529;background:#000}';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'ZDStyle';
    style.innerHTML = css;
    document.head.appendChild(style);
    var settingPanel = document.createElement('div');
    settingPanel.id = 'ZDpopup';
    document.getElementById('HTML5').remove();
    document.getElementById('PlusOne1').remove();
    settingPanel.innerHTML = '<div id=ZDtitle class=ZDtitle> <h4>ZD AutoImage MgRender v3</h4> </div> <div class=wrap> <form id=translateForm> <div> <h5 class=ZDoption>Auto Down? <select id=ZDautodown> <option value=false>No</option> <option value=true>Yes</option> </select> <br>Show URLs? <select id=ZDshowurl> <option value=false>No</option> <option value=true>Yes</option> </select> <br>Close Wind? <select id=ZDautoclose> <option value=false>No</option> <option value=true>Yes</option> </select> <br>Alert Dial? <select id=ZDalertdialog> <option value=false>No</option> <option value=true>Yes</option> </select> <br>Zip Gallery? <select id=ZDzipgallery> <option value=false>No</option> <option value=true>Yes</option> </select> <br>Auto Page? <select id=ZDautopage> <option value=false>No</option> <option value=true>Yes</option> </select> <br>Files: <h7 id=ZDnumfiles></h7> <input id=ZDdirselect type=file multiple webkitdirectory directory style="display: none;"> <input type=button id=ZDdirhelp value=Browse... onclick="document.getElementById(\'ZDdirselect\').click()"> </h5> </div> <p id=ZDsaved class=ZDoption>&nbsp;</p> </form> </div>';
    document.getElementById('Label1').appendChild(settingPanel);

    function hideshow(opres) {
        //Show a flashing message 3 times in 1.5s
        var saved;

        function show() {
            saved = document.getElementById("ZDsaved").innerHTML = opres;
        }

        function hide() {
            saved = document.getElementById("ZDsaved").innerHTML = "&nbsp;";
        }
        setTimeout(show, 100);
        setTimeout(hide, 200);
        setTimeout(show, 300);
        setTimeout(hide, 400);
        setTimeout(show, 500);
        setTimeout(hide, 1500);
    }
    //Add a listener to know what option is changed to save them.
    settingPanel.addEventListener('change', function(event) {
        switch (event.target.id) {
            case 'ZDautodown':
                //Convert the string "true" into object boolean
                GM_setValue("AutoDownload", document.getElementById('ZDautodown').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDshowurl':
                GM_setValue("ShowUrl", document.getElementById('ZDshowurl').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDautoclose':
                GM_setValue("AutoClose", document.getElementById('ZDautoclose').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDzipgallery':
                GM_setValue("ZipGallery", document.getElementById('ZDzipgallery').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDautopage':
                GM_setValue("AutoPageGallery", document.getElementById('ZDautopage').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDalertdialog':
                GM_setValue("ArtDialog", document.getElementById('ZDalertdialog').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDdirselect':
                /*
                >Get the list of files from the selected folder , save (GM_setValue) and update number of elements loaded.
                >Note: because chrome/chromium security, the list of files need from user permision to update, in other words, you
                    need re-load files manually in order to verific new files afther download.
                */
                var files = event.target.files;
                if (files.length !== 0) {
                    for (var i = 0, f, downFiles = []; f = files[i]; i++) {
                        downFiles.push(f.name);
                    }
                    //console.log(filesToString(downFiles));
                    GM_setValue("Files", filesToString(downFiles));
                    document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
                    hideshow("Saved!!!");
                }
                break;
            default:
                hideshow("Canceled!!!");
                break;
        }
    });
}

function addProgressBar() {
    var className;
    if (url.indexOf('hentai') !== -1) {
        className = 'entry-title';
    } else {
        className = 'mtitle';
    }
    //console.log(className);
    var toop = document.getElementsByClassName(className);

    for (var i = 0; i < toop.length; i++) {
        var progressBar = document.createElement('PROGRESS');
        var br = document.createElement('BR');
        progressBar.setAttribute("value", "0");
        progressBar.setAttribute("max", "100");
        progressBar.setAttribute("id", ("ZdBar" + i));
        progressBar.setAttribute("class", ("ZdBar"));
        toop[i].appendChild(progressBar);
        toop[i].appendChild(br);
    }
}

/*-------------------------------------------------Work Functions-------------------------------------------------*/
function getLink() {
    /*
    >Get the link of the file for download
    >Check if the page is form hentai  (hentai page not have a "Download" button) and if you select the AutoDownload,
        if yes, the get the link from a download button
    >If you not active the AutoDownload or is not a Anime page, then get the image link from a specific HTML object
        and vrifict that is the High Resolution (Automatic fix link if not).
    */
    var list = document.getElementById('size-o').getElementsByTagName('a');
    var source = list[0].href;
    //Test examples: /s0-d1/  /s0-d2/  /s0-d1600/
    if (source.indexOf("/s0/") >= 0 || /\/s(\d+)-.+\//.test(source)) {
        source = source.replace(/\/s(\d+)-.+\//, "/s0/");
        if (source.indexOf("/s0/") === -1) {
            alert("Algo Salio Mal!!!");
            console.log(source);
            return;
        }
        if (GM_getValue("ShowUrl") && !GM_getValue("AutoClose")) {
            try {
                document.getElementById("HTML7").innerHTML = source;
            } catch (e) {
                document.getElementById("size").innerHTML = source;
            }
        }
        return source;
    }
}

function getName(source) {
    //Return the las string iof URL, the filename & extension
    return decodeURLRecursively(source.substring(source.lastIndexOf("/") + 1));
}

function downloadImage(source, name) {
    if (downFiles.indexOf(name) !== -1) {
        if (GM_getValue("ArtDialog")) {
            alert("File already Downloaded!!!");
        }
        setTimeout(close, 1000);
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', source, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            if (this.status === 200) {
                var blob = this.response;
                saveAs(blob, name);
            }
            setTimeout(close, 1500);

        };
        xhr.onerror = function(e) {
            alert("Error " + e.target.status + " occurred while receiving the document.");
        };
        xhr.send();
    }
}

function getGalleryLinks() {
    /*
    >Get the links of the current page
    >If you not active the AutoDownload or is not a Anime page, then get the image link from a specific HTML object
        and vrifict that is the High Resolution (Automatic fix link if not).
    */
    var className, tagName, attrName;
    if (url.indexOf('hentai') !== -1) {
        className = 'hentry';
        tagName = 'link';
        attrName = 'href';
    } else {
        className = 'mpost';
        tagName = 'meta';
        attrName = 'content';
    }
    //console.log(className + " - " +tagName + " - "+attrName);
    var posts = document.getElementsByClassName(className);
    //console.log(posts.length);
    for (var i = 0; i < posts.length; i++) {
        var source = posts[i].getElementsByTagName(tagName)[0].getAttribute(attrName);
        if (source.indexOf("/s0/") >= 0 || /\/s(\d+)(-.+)?\//.test(source)) {
            source = source.replace(/\/s(\d+)(-.+)?\//, "/s0/");
            if (source.indexOf("/s0/") === -1) {
                console.log("Algo Salio Mal!!! \t" + source);
            } else {
                links.push(source);
            }
        }
    }
    return links;
}


function getGalleryName() {
    var names, numbr, className, tagName;
    if (url.indexOf('hentai') !== -1) {
        className = 'status-msg-wrap';
        tagName = 'b';
    } else {
        className = 'status-msg-wrap';
        tagName = 'h1';
    }
    try {
        names = document.getElementsByClassName(className)[0].getElementsByTagName(tagName)[0].innerHTML;

    } catch (e) {
        console.log(e);
        names = 'Unknown';
    }
    try {
        numbr = document.getElementsByClassName('showpagePoint')[0].innerHTML;
    } catch (e) {
        console.log(e);
        numbr = '0';
    }
    return (names + " - " + numbr);
}

function downloadGallery(url, count) {
    //console.log(("ZdBar" + count));
    var progressBar = document.getElementById(("ZdBar" + count));
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onprogress = function(e) {
        if (e.lengthComputable) {
            //console.log( (e.loaded / e.total) * 100 );
            progressBar.setAttribute("value", ((e.loaded / e.total) * 100));
            //progressBar.value = (e.loaded / e.total) * 100;
            //progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
        }
    };
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            onDownGalleryComplete(xhr.response);
        }
    };
    xhr.send(null);
}

function onDownGalleryComplete(blobData) {
    if (count < links.length) {
        blobToBase64(blobData, function(binaryData) {
            // add downloaded file to zip:

            var fileName = getName(links[count]);
            zip.file(fileName, binaryData, {
                base64: true
            });
            if (count < links.length - 1) {
                count++;
                downloadGallery(links[count], count);
            } else {
                try {
                    zip.generateAsync({
                        type: "blob"
                    }).then(function(content) {
                        try {
                            saveAs(content, getGalleryName() + ".zip");
                            setTimeout(autoPageChange, 1500);
                        } catch (e) {
                            console.log(e);
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
                // Not implement the autoclose option, not save the .zip if auto close is actived,
                // cheking code and 'GM_addStyle' for some bugs.
                //setTimeout(close, 1500);
            }
        });
    }
}

function autoPageChange() {
    if (GM_getValue("AutoPageGallery")) {
        var nextpage, pages;
        try {
            pages = document.getElementsByClassName('showpageNum');
            nextpage = pages[pages.length - 1].getElementsByTagName('a')[0];
            if (nextpage.innerHTML === 'Next') {
                nextpage.click();
            } else {
                console.log('Ultima Pagina!!!');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

/*-------------------------------------------------Utility Functions-------------------------------------------------*/
function decodeURLRecursively(url) {
    /*
    >Check if exist any "%" (encode url) and remove it.
    >Chck in exist a "+" (decodeURIComponent change the space character for + character) and reemplace for a space
    */
    if (url.indexOf('%') !== -1) {
        return decodeURLRecursively(decodeURIComponent(url));
    }
    if (url.indexOf('+') !== -1) {
        return decodeURLRecursively(url.replace("+", " "));
    }
    return url;
}

function filesToString(downFiles) {
    // Convert the list of files into string delimited by "\" charcater, to save into GM_setValue
    for (var i = 0, temp = ""; i < downFiles.length; i++) {
        temp += downFiles[i] + ((i === downFiles.length - 1) ? "" : "\\");
        /*if(i === downFiles.length-1){
            temp += downFiles[i];
        }else{
            temp += downFiles[i] + "\\";
        }*/
    }
    return temp;
}

function stringToFiles(str) {
    //Convert the string delimited by "\" charcater in to ist of files, and save in Array []
    downFiles = [];
    downFiles = str.split("\\");
    return downFiles;
}

function blobToBase64(blob, callback) {
    var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
}

function close() {
    //Check if auto Download is enabled and close target tab
    if (GM_getValue("AutoClose")) {
        window.close();
    }
}

/*-------------------------------------------------MAIN Function-------------------------------------------------*/
function master() {
    /*
    >First: Check if is a page of type "main" (load 'opton panel' only ), a "post" (url that contain some like /20xx/xx/ is a post),
                or a "search" (for add panel and start download gallery as zip if is actived)
    >Second: Check if AutoClose values is true, if yes then not show the option pane.
        (show it?,for what? the page will close in -5s)
    >Thirth: Start the download...
     */
    if (/\/\d+\/\d+\//.test(url)) {
        if (!GM_getValue("AutoClose")) {
            addSettingPanel();
        }
        loadPreferences();
        var source = getLink();
        var name = getName(source);
        if (GM_getValue("AutoDownload")) {
            downloadImage(source, name);
        }
    } else if (/search\/label/.test(url)) {
        //if (!GM_getValue("AutoClose")) {
        addSettingPanel();
        //}
        loadPreferences();
        if (GM_getValue("ZipGallery")) {
            addProgressBar();
            links = getGalleryLinks();
            downloadGallery(links[count], count);
        }
    } else {
        addSettingPanel();
        loadPreferences();
    }
}

master();