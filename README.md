# [AutoImage MgRender](https://github.com/ZeroDrako/AutoImage-MgRender)
UserScript written in JavaScript for Chrome & Tampermonkey, that make more easy download renders from "mg-renders.net" and "hentai.mg-renders.net".
![MENU](https://raw.githubusercontent.com/ZeroDrako/AutoImage-MgRender/master/0.PNG)

### Why?
Because i download render from that page for make wallpapers and pack for rainmeter.
The page only let you download a "small", "medium","large" image size, but in the server of the page is located the full size whith better resolution:
- small :     250kb
- medium:     530kb
- large:      1.1MB
- full:       2.3MB (the best resolution)
 
So thi script download the full render.

### What this script do?
Add some option in the page, you can see in the panel option named "ZD AutoImage MgRender v3"

**OPTIONS**

1. **Show URLs?**
  - If you active this option, when you open a post, you can see the url to the full render hover the image. This is and old option from v1, maybe removed in future versions

2. **Close Wind?**
  - Option to close the tab after download the render, imagine you open much images and active auto download, the image is download and now is very hard to close all tabs (and 12+ taps is a very high ram ater), so this option is for help you to kee orden and reduce you job.

3. **Alert Dial?**
  - Option to show an alert option , this only works if *__Files__* option is already set. Inform you if you has already downloaded an image (to skip download again).

4. **ZipGallery?**
  - Option to download a gallery. A gallery is a page whit a tag or a search result, for example the pages that show you the list of render under a specific tag like: 
  ```HighSchool DxD --> http://www.mg-renders.net/search/label/High%20School%20DxD?&max-results=24```
  - The script download each render an compress into a zip file whit the name of the tag + number of page for example:
  ```High School DxD - 1.zip``` , ```High School DxD - 2.zip``` , ```...```
  and download it for you. *__Is the better option for download all images of a tag/anime/hentai.__*

5. **Files**
  - Option to check if an image is already downloaded. This option show a pop-up where you can choose a directory where you store you renders. If the script detects that the image you're to download is already downloaded skipt the image or show you an alert about it. Check "Alert Dial?" option.
    - **Note 1:** *By default this option works recursively, detect all images in the directory and sub-directorys.*
    - **Note 2:** *Your images need to have the original name.*

6. **Auto Page**
  - Option to Automatic change the page. A gallery that have more than 1 can download all pages.
  - Example: the page have 5 pages, if this option is actived then the script download the gallery of page 1, then the script change the curren page to page 2 and download the gallery of page 2, again change to page 3 and download the gallery of page 3...etc
  - **This option simplifies the download of galleries with much renders and pages**

## Notes
1. **@noframes** : Load script only 1 time per page
2. **@grant GM_addStyle** , **@grant window.close** : Allow to close tab from a JS scrip in Chrome, see: [window.close and self.close do not close the window in Chrome](http://stackoverflow.com/questions/19761241/window-close-and-self-close-do-not-close-the-window-in-chrome)
3. **ZD AutoImage MgRender.greasyfork.js** : This version contains the __JsZip.jz__ and __FileSaver.js__ libs  inside the code because __Greasyfork__ don't let import code from original reps on github, and the versions on __cdnjs__ is outdated code

## ToDo
- [ ] Add option to skip image already downlaaded at ZipGallery download. (no include those images in the zip.)
- [ ] Add option to auto-close on gallery/search option. (not working fine)
- [x] Add option to auto-load nest page on gallerys (if gallery have 2 or more pages, load the next page when the zip of current page is already downloaded) (Done - v3.1)
- [ ] Add option to auto-check new images from specific gallerys and download them.
- [x] Add css to the download bar. (Done - v3.1)
- [ ] Imrpove code

## Changelog
**(Last 2 Releses, full changelog in __changelog.txt__ file)**
- v3.1
  - Add Option AutoPage to Panel Option. See "Auto Page" in description
  - Add funcion:
      - autoPageChange()
  - Change the component "PROGRESS" for a "DIV->DIV->SPAWN" for the progressbar
  - Add CSS to progressbar

- v3.0
  - Re-Write code again, page update, and tampermonkey update to v4, broke the script.
  - Add GM_addStyle, window.close, GM_getValue, GM_setValue, GM_xmlhttpRequest to @grant (v4 tampermonkey not work if is not define).
  - Add use use of "FileSaver.js" and "JsZip.js" librarys.
  - Add option to Check if a file is already downloaded.
  - Add option to disable auto-download of a image.
  - Add option do disable auto-download of a gallery. 
  - Add option to download the gallery as a zip (the name is generate whit the tag name and the number of the page).
  - Add Functions:
    - getGalleryLinks()
    - getGalleryName()
    - downloadGallery()
    - onDownGalleryComplete()
    - filesToString()
    - stringToFiles()
    - blobToBase64()
  - Add CSS to the "Panel Option".
  - Aad coments to the code.
  - Add a progressbar over the each image to see the progres of the image download.
  - Add a "TO-DO" list, things to implement in future versions.
  - Add a "DESCRIPTION".
  - Fix code of getting the url.
  - Fix autoclose and show url.
