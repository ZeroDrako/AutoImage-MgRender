# AutoImage-MgRender
Script that make more easy download renders from "mg-renders.net" and "hentai.mg-renders.net"
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
