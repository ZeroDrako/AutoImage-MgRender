// ==UserScript==
// @name          ZD AutoImage MgRender
// @namespace     https://github.com/ZeroDrako/AutoImage-MgRender
// @version       3.2
// @description   Automatic download HD-Images from MG-Render to download folder
// @author        ZeroDrako
// @license       GPLv3; https://github.com/ZeroDrako/AutoImage-MgRender/blob/master/LICENSE
// @updateURL     https://raw.githubusercontent.com/ZeroDrako/AutoImage-MgRender/master/ZD%20AutoImage%20MgRender.js
// @downloadURL   https://raw.githubusercontent.com/ZeroDrako/AutoImage-MgRender/master/ZD%20AutoImage%20MgRender.js
// @include       *mg-renders.net*
// @grant         GM_addStyle
// @grant         window.close
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @noframes
// @require       https://raw.githubusercontent.com/ZeroDrako/Libs/master/FileSaver/v1.1.20160328/FileSaver.min.js
// @require       https://raw.githubusercontent.com/ZeroDrako/Libs/master/JsZip/v3.0/jszip.min.js
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
        Auto Down:  --> Option to download a image/render file when youopne a POST page (contain some like /2015/02/ in th url)
                            Example url:
                                Page Post  ->   http://www.mg-renders.net/2016/05/high-school-dxd-himejima-akeno-render-38.html
                                           ->     http://www.mg-renders.net/2016/05/high-school-dxd-rias-gremory-render-177.html
        Down One?   --> Option to add the posibility of download just one file from a gallery or search or tag page
                            Add the same progressbar that ZipGallery add, but now the gallery is NOT downloaded,
                                and you can just click the progressbar for download only these file.
                            By default if "Files" option is set, the the progressbar over each image that is already downloaded is set to
                                100%, so you can see what images you have.
        Show URLs?  --> If you active this option, when you open a post, you can see the url to the full render hover the image.
                                This is and old option from v1, maybe removed in future versions
        Alert Dial? --> Option to show an confirm alert option , this only works if "Files" option is already set.
                                Inform you if you has already downloaded an image (to skip download again).
                                Ask yu if you wish to re-download it again, if yes tthe the download start.
        Close Wind? --> Option to close the tab after download the render, imagine you open much images and active auto download,
                                the image is download and now is very hard to close all tabs (and 12+ taps is a very high ram ater), so this
                                option is for help you to kee orden and reduce you job.
        ZipGallery? --> Option to download a gallery. A gallery is a page whit a tag or a search result, for example the pages that
                                show you the list of render under a specific tag like:
                                'HighSchool DxD' --> http://www.mg-renders.net/search/label/High%20School%20DxD?&max-results=24
                                'THE iDOLM@STER' --> http://www.mg-renders.net/search/label/THE%20iDOLM%40STER?&max-results=24
                            The script download each render an compress into a zip file whit the name of the tag + number of page
                            (Ecample 'High School DxD - 1.zip' , 'High School DxD - 2.zip', ...), and download it for you.
                            Is the better option for download all images of a tag/anime/hentai.
        Skip Zip?   --> Option to skip a file to be downloaded and add to zip , this only works if "Files" option is already set.
                            The zip is generate with all files if this option is false, but if is true then fiiles downloaded are skipped from zip.
                            Aditionally you can create a report for see what files are skipped, see "Auto Rept?".
        Auto Rept?  --> Option to generate a report of files skipped, this only works if "Files" and "Skip Zip?" options is already set.
                            If this option is set then show you a new tab whit information of files not downloaded/addzip
                            The Information is:
                                File Name: The name of the file
                                Number: A number of file, is from 1 to 24 (each page in gallery have 24 images)
                                Link: The link to direct image.
        Auto Page:  --> Option to Automatic change the page. A gallery that have more than 1 can download all pages.
                            Example: the page have 5 pages, if this option is actived then the script download the gallery of page 1,
                                     then the script change the curren page to page 2 and download the gallery of page 2,
                                     again change to page 3 and download the gallery of page 3...etc
                            This option simplifies the download of galleries with much renders and pages
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
    +Add option to skip image already downlaaded at ZipGallery download. (no include those images in the zip.) (Done v3.2)
    -Add option to auto-close on gallery/search option. (not working fine)
    +Add option to auto-load next page on gallerys (if gallery have 2 or more pages, load the next page when the zip of current page is already downloaded) (Done v3.1)
    -Add option to auto-check new images from specific gallerys and download them.
    +Add css to the download bar. (Done v3.1)
    -Imrpove code
    +Add Option to redownload a image with a option dialog (Done v3.2)
    +Add Option for download just one image, click on progressbar (Done v3.2)
    +Add Set downloaded state to progresssbar for files already downloaded (Done v3.2)
    -Merge the title of the image with Progressbar
    -------------------------------------------------CHANGELOG-------------------------------------------------
    v3.2 -  Add Option to Skip Files already downloaded from ZipGallery
            Add Option to generate a report of files skipped from zip
            Add Option to download a image, On click the progressbar
            Add Default config, now over each image is show a progressbar whit the state of the download (green > downloaded / gray > no downloaded)
            Change the variable links forn a array["linkImage"] with only links to a bi-domensional array[[fileName],[linkImage]] with names of file and links.
            Fix Dialog aler, now ask you if you wish re-download a image
            Fix Function to get the link to full image, change regx expresion for a char-array
            Add functions:
                    downloadOne(), downloadCheck()
            Imrpove code of function "master()"
            Change the url of "JSZip" and "FileSaver" libs, now located on my github. (to avoid the lib update and broke my script)
    v3.1 -  Add Option AutoPage to Panel Option. See "Auto Page" in description
            Add funcion:
                    autoPageChange()
            Change the component "PROGRESS" for a "DIV->DIV->SPAWN" for the progressbar
            Add CSS to progressbar
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
/*-------------------------------------------------Global Variables---------------------------------------------------*/
var downFiles = [],
    links = [],
    count = 0,
    report = '<h1>Automatic Report</h1><br><h3>Files Already Downloaded</h3><br>',
    url = window.location.href,
    zip = new JSZip(),
    downFiles = stringToFiles(GM_getValue("Files", ""));

/*-------------------------------------------------Preferences Functions----------------------------------------------*/
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
        document.getElementById('ZDdownone').value = GM_getValue("DownloadOne", false);
        document.getElementById('ZDskipfile').value = GM_getValue("SkipDownFle", true);
        document.getElementById('ZDautoreport').value = GM_getValue("AutoReport", false);
        document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
    } catch (event) {
        console.log(event.message);
    }
}

function addSettingPanel() {
    /*
    >Add CSS and HTML to the page to show the Option Pane
    >Css = Panel Setings , Cs2 = Css ProgressBar
    >Delete 2 HTML objets (Facebook button & Unknow Element) to get space for Option Pane
    .ZdBar{padding:.3em 115px .5em;font-size:12px !important;background:#21262a !important;border:solid 1px #3a434a !important}
    */
    GM_addStyle('.ZDOptionTitle{padding:1%!important;color:#989c9f!important;list-style-type:none;font-size:14px;font-weight:bold}#ZDdirselect{display:none}.ZDtitle{padding-top:10%;font-size:16px;padding-top:10%;text-align:center}.ZDOptionDown{font-size:12px;font-weight:400;opacity:.7;float:right!important;color:#fff;border:0 solid #3a434a;background:#3a434a}#ZDdirectory{color:#666;border:1px solid #202529;background:#000}.main-inner .column-left-outer{box-shadow:0 0 0px rgba(0,0,0,0)!important}');
    GM_addStyle('.meter{height:10px;position:relative;background:#555;-moz-border-radius:0;-webkit-border-radius:0;padding:0}.meter > span{display:block;height:100%;background-color:#2bc253;position:relative;overflow:hidden}.meter > span:after,.animate > span > span{content:"";position:absolute;top:0;left:0;bottom:0;right:0;z-index:1;-webkit-background-size:50px 50px;-moz-background-size:50px 50px;overflow:hidde}');
    var settingPanel = document.createElement('div');
    settingPanel.id = 'ZDpopup';
    document.getElementById('HTML5').remove();
    document.getElementById('PlusOne1').remove();
    settingPanel.innerHTML = '<div class=wrap> <h4 class=ZDtitle>..:: ZD AutoImage ::..<br>MgRenders v3</h4> <form id=translateForm> <div> <li class=ZDOptionTitle>Auto Down? <select id=ZDautodown class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Down One? <select id=ZDdownone class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Show URLs? <select id=ZDshowurl class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Alert Dial? <select id=ZDalertdialog class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Close Wind? <select id=ZDautoclose class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Zip Gallery? <select id=ZDzipgallery class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Skip Zip? <select id=ZDskipfile class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Auto Rept? <select id=ZDautoreport class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Auto Page? <select id=ZDautopage class=ZDOptionDown> <option value=false>No</option> <option value=true>Yes</option> </select> </li> <li class=ZDOptionTitle>Files: <h7 id=ZDnumfiles></h7> <input id=ZDdirselect type=file multiple webkitdirectory directory> <input type=button id=ZDdirhelp class=ZDOptionDown value=Browse... onclick="document.getElementById(\'ZDdirselect\').click()"> </li> </h5> </div> <h4 id=ZDsaved class=ZDtitle>&nbsp;</h4> </form> </div>';
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
            case 'ZDdownone':
                GM_setValue("DownloadOne", document.getElementById('ZDdownone').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDskipfile':
                GM_setValue("SkipDownFle", document.getElementById('ZDskipfile').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDautoreport':
                GM_setValue("AutoReport", document.getElementById('ZDautoreport').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDdirselect':
                /*
                >Get the list of files from the selected folder (Chrome/Opera) or files selected (Firefox) , save (GM_setValue) and update number of elements loaded.
                >Note: because chrome/chromium security, the list of files need from user permision to update, in other words, you
                    need re-load files manually in order to verific new files afther download.
                */
                var files = event.target.files;
                if (files.length !== 0) {
                    for (var i = 0, f, downFiles = []; f = files[i]; i++) {
                        if (f.type.match('image.*')) {
                            downFiles.push(f.name);
                        }
                    }
                    GM_setValue("Files", filesToString(downFiles));
                    document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
                }
                hideshow("Saved!!!");
                break;
            default:
                hideshow("Canceled!!!");
                break;
        }
    });
}

function addProgressBar() {
    /*
        Class depens of site (Anime or Hentai)
        Gets all iamges post and add a progressBar, whit a EventListener, when you click  the progressbar
            the image is downloaded.
        Add IF for check if the file is already downloaded, the add width (100% for downloaded files)
     */
    var className;
    if (url.indexOf('hentai') !== -1) {
        className = 'entry-title';
    } else {
        className = 'mtitle';
    }
    //Get Elements (images) from the post, change only the class depend of the site (hetai or anime)
    var toop = document.getElementById('Blog1').getElementsByClassName(className);
    for (var i = 0; i < toop.length; i++) {
        var name = getName(getLink(i));
        //console.log(name);
        var div2 = document.createElement('div');
        var span = document.createElement('span');
        div2.setAttribute('id', ('meter' + i));
        div2.setAttribute('class', 'meter');
        div2.addEventListener('click', downloadOne);
        span.setAttribute('id', ("ZdBar" + i));
        span.setAttribute('class', 'ZdBar');
        if (downFiles.indexOf(name) !== -1) {
            span.setAttribute('style', 'width: 100%');
            //console.log('+++++++>>>' + name);
        } else {
            span.setAttribute('style', 'width: 0%');
            //console.log('------>>>' + name);
        }
        div2.appendChild(span);
        toop[i].parentNode.insertBefore(div2, toop[i].nextSibling);
    }
}

/*-------------------------------------------------Work Functions-----------------------------------------------------*/
function downloadOne() {
    /*
        This function help the EventListener to download just one image.
        Get the link to the image, het the name for the image and download it.
     */
    var idImg = parseInt((this.id).replace('meter', ''));
    var source = getLink(idImg);
    var name = getName(source);
    var barId = document.getElementById(this.id).lastChild.getAttribute('id');
    downloadCheck(source, name, barId);
}

function getLink(idImg) {
    /*
    >Get the link of the file for download
    >Try get elements if is a gallery page type, or in the catch for post type page.
    >If you not active the AutoDownload or is not a Anime page, then get the image link from a specific HTML object (Catch)
        and vrifict that is the High Resolution (Automatic fix link if not).
    >Split the link in an array, and change the 7 element for 's0', then join. Why 7 element???
        Original  link: https://X.XX.blogspot.com/XXXXXXX/XXXXXXX/s1600/XXXXXXX.png     s1600 is for a large image
        Original  link: https://X.XX.blogspot.com/XXXXXXX/XXXXXXX/h240/XXXXXXX.png      h240 is for a thumb image
        Fixed     link: https://X.XX.blogspot.com/XXXXXXX/XXXXXXX/s0/XXXXXXX.png        s0 is for a full image size
    */
    var source;
    try {
        source = document.getElementById('Blog1').getElementsByClassName('mgthumb')[idImg].getAttribute('src');
    } catch (e) {
        source = document.getElementById('size-o').getElementsByTagName('a')[0].getAttribute('href');
    }
    var splt = source.split('/');
    splt[7] = 's0';
    source = splt.join("/");
    if (source.indexOf("/s0/") !== -1) {
        if (GM_getValue("ShowUrl") && !GM_getValue("AutoClose")) {
            try {
                document.getElementById("HTML7").innerHTML = source;
            } catch (e) {
                document.getElementById("size").innerHTML = source;
            }
        }
        return source;
    } else {
        console.log('Fail at \'getLink\'' + ' >>> ' + source);
        return;
    }
    return;
}

function getName(source) {
    //Return the las string iof URL, the filename & extension
    return decodeURLRecursively(source.substring(source.lastIndexOf("/") + 1));
}

function downloadCheck(source, name, barId) {
    /*
        Function to help the check proses, if a image is already downloaded
        Check if you sset the option for "Files", if yes and the image is already downloaded then show you a dialog
            to aks you if the you wish re-download, or if "Files" is not set just download
     */
    if (downFiles.indexOf(name) !== -1) {
        if (GM_getValue("ArtDialog")) {
            var r = confirm("File already Downloaded, Download Again???");
            if (r === true) {
                downloadImage(source, name, barId);
            }
        } else {
            console.log('File already Downloaded!!!');
        }
        setTimeout(close, 1000);
    } else {
        downloadImage(source, name, barId);
    }
}

function downloadImage(source, name, barId) {
    /*
    >Fuction for download the image
    >Recibe:
        source = direct link to the render
        name = name for the file, whit the extension.
        barID = id for set the progress of the download to the progressbar
    >Donwload  image using XMLHttpRequest (is in the same server) and if the progres can be Computable then add
        the progress to progressbar
    */
    var xhr = new XMLHttpRequest();
    xhr.open('GET', source, true);
    xhr.responseType = 'blob';
    if (GM_getValue("DownloadOne")) {
        var progressBar = document.getElementById(barId);
        xhr.onprogress = function(e) {
            if (e.lengthComputable) {
                progressBar.setAttribute("style", 'width: ' + ((e.loaded / e.total) * 100) + '%');
            }
        };
    }
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

function getGalleryLinks() {
    /*
    >Get the links of the current page
    >If you not active the AutoDownload or is not a Anime page, then get the image link from a specific HTML object
        and vrifict that is the High Resolution (Automatic fix link if not).
    >Check if "SkipDownFle" option is False, if is flase then add all links to array
        If "SkipDownFle" is set and File name IS NO in the list of files already downloaded then add the link to array
        If "SkipDownFle" is set, File name  IS in the list of files already downloaded and "AutoReport" optioon is set
            then add a string to the report with the link and filename
    >Check if "AutoReport" is set, if yes then show a new tab whit the description
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
    var posts = document.getElementsByClassName(className);
    for (var i = 0; i < posts.length; i++) {
        var source = posts[i].getElementsByTagName(tagName)[0].getAttribute(attrName);
        var splt = source.split('/');
        splt[7] = 's0';
        source = splt.join("/");
        var nameimg = '';
        if (source.indexOf("/s0/") !== -1) {
            nameimg = getName(source).trim();
            if (!GM_getValue("SkipDownFle")) {
                links.push([nameimg, source, ('ZdBar' + i)]);
            } else if (GM_getValue("SkipDownFle") && downFiles.indexOf(nameimg) === -1) {
                links.push([nameimg, source, ('ZdBar' + i)]);
            } else if (GM_getValue("SkipDownFle") && downFiles.indexOf(nameimg) !== -1) {
                if (GM_getValue("AutoReport")) {
                    report += '<b>File ' + (i + 1) + '/24' + ':</b> ' + nameimg + '<br>' + '<b>Link: </b>' + source + '<br><br>';
                }
            }
        } else {
            console.log('Fail at \'getGalleryLinks\'' + ' >>> ' + source);
        }
    }
    if (GM_getValue("AutoReport") && GM_getValue("SkipDownFle")) {
        var newWindow = window.open();
        newWindow.document.title = "Automatic Report";
        newWindow.document.write(report);
    }
    return links;
}

function getGalleryName() {
    /*
    >Define variables to use, then check the url, if is a hentai or anime site (Class is diferen for both sites.
        The use of querySelector cause problems whit new option add in page 'Popular Post')
    >Then get the name of the gallery and get the number of the page from paginator.
    >Return the gallery anme + number of page
     */
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

function downloadGallery(count) {
    /*
    >Recibe the count variable (number o file to be downloaded)
    >Get the progressbar by id for add the progress of the download
    >Get the link forn the array links (located in the position 1),and start the request, if the progress is computable then add the progress to progressbar
    >When download is finish call "onDownGalleryComplete" function and set the data and the name of file located in
        links array in position 0
     */
    var progressBar = document.getElementById(links[count][2]);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', links[count][1], true);
    xhr.responseType = "blob";
    xhr.onprogress = function(e) {
        if (e.lengthComputable) {
            progressBar.setAttribute("style", 'width: ' + ((e.loaded / e.total) * 100) + '%');
        }
    };
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            onDownGalleryComplete(xhr.response, links[count][0]);
        }
    };
    xhr.send(null);
}

function onDownGalleryComplete(blobData, fileName) {
    /*
    >Check if the count is lower than links length
    >Convert the blobData recive to base64 whit the function "blobToBase64", then ...
    >Zip the image whith the name recived and the Base64 data
    >Add 1 to count value, and call "downloadGallery" whit new count value
    >Finally add a try to generate the zip file whit all data and zipName.
    >Call the "autoPageChange" fucntion
     */
    if (count < links.length) {
        blobToBase64(blobData, function(binaryData) {
            // add downloaded file to zip:
            zip.file(fileName, binaryData, {
                base64: true
            });
            if (count < links.length - 1) {
                count++;
                downloadGallery(count);
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
            }
        });
    }
}

function autoPageChange() {
    /*
    >Change automatic the page to the next (1,2,3,4....)
    >Check if the "AutoPageGallery" is set, is yes then get the next button and click.
     */
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

/*-------------------------------------------------Utility Functions--------------------------------------------------*/
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
    /*
    >Convert the blob content to base 64, to save the image
     */
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

function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    }
    /*else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    }*/
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    }
    /*else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        //IF IE > 10
        alert('IE');
    } */
    else {
        return 'unknown';
    }
}
/*
function resetOptions() {
    GM_setValue("AutoDownload", false);
    GM_setValue("ShowUrl", false);
    GM_setValue("AutoClose", false);
    GM_setValue("ArtDialog", false);
    GM_setValue("ZipGallery", false);
    GM_setValue("AutoPageGallery", false);
    GM_setValue("DownloadOne", true);
    GM_setValue("DownloadOrig",true);
    GM_setValue("SkipDownFle", false);
    GM_setValue("AutoReport", false);
    GM_setValue("Files", "");
}

function deleteOptions() {
    var keys = GM_listValues();
    for (var i=0, key=null; key=keys[i]; i++) {
      GM_deleteValue(key);
    }
}

function firstLaunch() {
    console.log('Call to FirstLAunch');
    var defaultValues = [
        ["FirstLaunch",false],
        ["AutoDownload", false],
        ["ShowUrl", false],
        ["AutoClose", false],
        ["ArtDialog", false],
        ["ZipGallery", false],
        ["AutoPageGallery", false],
        ["DownloadOne", true],
        ["DownloadOrig",true],
        ["SkipDownFle", false],
        ["AutoReport", false],
        ["Files", ""]
    ];
    for (var i=0; i < defaultValues.length; i++) {
        if(GM_getValue(defaultValues[i][0]) === undefined) {
            GM_setValue(defaultValues[i][0],defaultValues[i][1]);
        }
    }
}

function showSavedValues() {
    var keys = GM_listValues();
    for (var i=0,key=null; key=keys[i]; i++) {
        console.log(key + " >>> " + GM_getValue(key));
    }
}
*/
/*-------------------------------------------------MAIN Function------------------------------------------------------*/
function master() {
    /*
    >Function to load parts (call funcitons) of the script depends of your preferenses of the page.
    >1.IF Page is a POST (page with only one image)
        1.Check if page url contain some like "/2001/20/"
        2.Check if "AutoClose" is set, if yes then not add the "SettingPanel" (why? page will be closed soon. )
        3.Get source od image (direct link to image) and name of image
        4. Check if "AutoDownload" option is set, if yes then start the download by call funcion "downloadCheck"
    >2.If page is a Gallery (Contain a tag or a common term for more tan one image)
        1.Check if page url contain some like "/search/label/"
        2.Add "SettingPanel" and "loadPreferences"
        3.Check if "ZipGallery" is set, if yes then add "ProgressBar" and get all links "getGalleryLinks"
        4.Check if links array is not empty, then call "downloadGallery" to start the download
            Note: the links array may be empty if you set options "Files", "SkipDownFle" and all files are already downloaded
        5.If "DownloadOne" option is set (but not "ZipGallery" ) then just add "ProgressBar"
    >3.If is not a tag page or a image post then
        1.Add "SettingPanel"
        2.Load "loadPreferences"
        3.Add "addProgressBar"
     */
    if (/\/\d+\/\d+\//.test(url)) {
        if (!GM_getValue("AutoClose")) {
            addSettingPanel();
            loadPreferences();
        }
        var source = getLink();
        var name = getName(source);
        if (GM_getValue("AutoDownload")) {
            downloadCheck(source, name);
        }
    } else if (/search\/label/.test(url)) {
        addSettingPanel();
        loadPreferences();
        if (GM_getValue("ZipGallery")) {
            addProgressBar();
            links = getGalleryLinks();
            if (links.length > 0) {
                downloadGallery(count);
            }
        } else if (GM_getValue("DownloadOne")) {
            addProgressBar();
        }
    } else {
        addSettingPanel();
        loadPreferences();
        if (GM_getValue("DownloadOne")) {
            addProgressBar();
        }
    }
}

master();
