# MapViewer
![](https://raw.githubusercontent.com/LanskovNV/MapViewer/master/public/mapbanner.png)
## Purpose
MapViewer is the React project providing web mapping service, which offers street maps watching with data filters, containing selectivity towards streets, houses and water objects.
# Quick start guide
Here's a guide to get you started using MapViewer.

## Locale settings
You can choose one of two languages the application supports (Russian or English) by using the local toggle down below on the page. 

## Prepared maps
To see prepared maps click on the button *Choose map* on the top and choose the map from the list. 
 
## Uploading map
To upload the map click on the *Choose map* button and press ***upload your own map*** in the shortcut. In file explorer choose the file from the local storage in ***.geojson*** format.

## Learn how the map works
There are lots of ways to use MapViewer on your computer, phone or tablet. Here are some things you can do.
### Move the map
On your computer, click anywhere on the map and move your cursor holding down mouse button in any direction you need:  ***'left'*** , ***'right'*** , ***'up'*** or ***'down'***. On your phone or tablet, touch anywhere on the map and slide to quickly move through the map.  
To see more details on the map, zoom in or zoom out. On the computer you can do it by using the mouse wheel.
### Data filters
You can choose the types of data you want to see by using ***checkboxes*** down below.
## About
You can learn more about the application and developers by clicking on the *About* button on the top. 

*And now you are ready to start!*
## Limitations
MapViewer works only with maps uploaded in .geojson format. 
## Prerequisites
 - NodeJS and npm
 - git
 - WebStorm or Visual Studio Code *(optional)*  

## Command interface
### Install and run
To run the project in WebStorm on the localhost:
1) Clone project using git
2) Update project 
3) To install the project, run
```
 npm install -g yarn
 yarn install
 ```
using built-in terminal.

4) When installation completed, run 
 ```
 npm run start
 ``` 
### Other commands
Also the app provide testing
 ```
 npm run test
 ```
 and linting
 ```
 npm run lint
 ```
 If you want to test the production build on the local server, do the following:
 ```
 npm run build
 npm install -g serve
 serve -s build
 ```
 ## Issues
 1) If you have problems with jest, do the following:
 ```
 sudo npm cache clean -f
 sudo npm install -g n
 sudo n stable
```
It solves temporary problem with node 11.11.0.

2) If you have some problems with eslint, you can remove strange rules from eslint config.
