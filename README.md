# MapViewer
![](https://raw.githubusercontent.com/LanskovNV/MapViewer/develop/public/mapbanner.png)
## Purpose
Java Script project to work with maps
### Quick start guide

1. For the very beginning you need to choose one of two languages the application supports: Russian or English. You can do it by using the local toggle situated down below.

*And when you can read and understand the necessary data, let's continue our gentle introduction.*

2. Then you need to choose the map you want to parse. You might choose the prepared map from the list *(it is located on the home page)* or ***upload your own map*** from the local drive in ***.json*** format.

*Now let's move to the map page and research what you can do with the map.*

3. Using buttons ***'left'*** , ***'right'*** , ***'up'*** and ***'down'*** you can navigate the map.
4. By clicking on ***'+'*** and ***'-'*** buttons down below or by rotating the mouse wheel, you can ***zoom in / zoom out*** your map.
5. You can choose all the necessary types of data you want to see now using ***checkboxes***.

*And now you are ready to start!*
## Limitations
 For now provided only react mapviewer in dev branch
## Prerequisites
 - NodeJS and npm
 - git
 - WebStorm *// optional*  
## Command interface
 To run the projectnpx in WebStorm on localhost:
 1) Clone project with git
 2) If you want to work with develop version, check out develop
    branch and update project
 3) open built-in terminal and run 
 ```
 npm install
 ```
 4) when installation completed, run 
 ```
 npm start
 ``` 
 ## Issues
 1) If you have problems with jest, do the following:
 ```
 sudo npm cache clean -f
 sudo npm install -g n
 sudo n stable
```
It solves temporary problem with node 11.11.0
2) If you have some problems with eslint - you can remove strange rules from eslint config.
