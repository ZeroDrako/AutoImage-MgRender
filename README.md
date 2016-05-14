# [AutoImage MgRender v3.2](https://github.com/ZeroDrako/AutoImage-MgRender)
UserScript written in JavaScript for Chrome & Tampermonkey, that make more easy download renders from "mg-renders.net" and "hentai.mg-renders.net".
![MENU](https://raw.githubusercontent.com/ZeroDrako/AutoImage-MgRender/master/3.2.PNG)

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
  - Option to show an confirm alert option , this only works if "Files" option is already set.
  - Inform you if you has already downloaded an image (to skip download again).
  - Ask yu if you wish to re-download it again, if yes tthe the download start.

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

7. **Down One**
  - Option to add the posibility of download just one file from a gallery or search or tag page
  - Add the same progressbar that ZipGallery add, but now the gallery is NOT downloaded, and you can just click the progressbar for download only these file.
  - By default if "Files" option is set, the the progressbar over each image that is already downloaded is set to 100%, so you can see what images you have.

8. **Skip Zip**
  - Option to skip a file to be downloaded and add to zip , this only works if "Files" option is already set.
  - The zip is generate with all files if this option is false, but if is true then fiiles downloaded are skipped from zip.
  - Aditionally you can create a report for see what files are skipped, see "Auto Rept?".

9. **Auto Rept**
  - Option to generate a report of files skipped, this only works if "Files" and "Skip Zip?" options is already set.
  - If this option is set then show you a new tab whit information of files not downloaded/addzip
  - The Information is:
     - File Name: The name of the file
     - Number: A number of file, is from 1 to 24 (each page in gallery have 24 images)
     - Link: The link to direct image.

## Notes
1. **@noframes** : Load script only 1 time per page
2. **@grant GM_addStyle** , **@grant window.close** : Allow to close tab from a JS scrip in Chrome, see: [window.close and self.close do not close the window in Chrome](http://stackoverflow.com/questions/19761241/window-close-and-self-close-do-not-close-the-window-in-chrome)
3. **ZD AutoImage MgRender.greasyfork.js** : This version contains the __JsZip.jz__ and __FileSaver.js__ libs  inside the code because __Greasyfork__ don't let import code from original reps on github, and the versions on __cdnjs__ is outdated code

## ToDo
- [x] Add option to skip image already downlaaded at ZipGallery download. (Done v3.2)
- [ ] Add option to auto-close on gallery/search option. (not working fine)
- [x] Add option to auto-load nest page on gallerys (if gallery have 2 or more pages, load the next page when the zip of current page is already downloaded) (Done - v3.1)
- [ ] Add option to auto-check new images from specific gallerys and download them.
- [x] Add css to the download bar. (Done - v3.1)
- [ ] Imrpove code
- [x] Add Option to generate a report with images skipped from zip (Done v3.2)
- [x] Add Option to download just one imagen on click in the ProgressBar (Done v3.2)
- [ ] Merge ProgressBar and TitleBar (title from image) for reduce space
- [ ] Remove obsolete code (Download when open a post -> Remplace whit download on click Progressbar), (AutoClose)
- [ ] Add Option to Include news files downloaded to the "Files" (Not more re-load value manually)

## Changelog
**(Last 2 Releses, full changelog in __changelog.txt__ file)**
- v3.2
  - Add Option to Skip Files already downloaded from ZipGallery
  - Add Option to generate a report of files skipped from zip
  - Add Option to download a image, On click the progressbar
  - Add Default config, now over each image is show a progressbar whit the state of the download (green > downloaded / gray > no downloaded)
  - Change the variable links forn a array["linkImage"] with only links to a bi-domensional array[[fileName],[linkImage]] with names of file and links.
  - Fix Dialog aler, now ask you if you wish re-download a image
  - Fix Function to get the link to full image, change regx expresion for a char-array
  - Add functions:
    - downloadOne(), downloadCheck()
  - Imrpove code of function "master()"
  - Change the url of "JSZip" and "FileSaver" libs, now located on my github. (to avoid the lib update and broke my script)

- v3.1
  - Add Option AutoPage to Panel Option. See "Auto Page" in description
  - Add funcion:
      - autoPageChange()
  - Change the component "PROGRESS" for a "DIV->DIV->SPAWN" for the progressbar
  - Add CSS to progressbar
