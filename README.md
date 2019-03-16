# MapViewer
![](https://raw.githubusercontent.com/LanskovNV/MapViewer/develop/public/mapbanner.png)
## Purpose
Java Script project to work with maps
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
