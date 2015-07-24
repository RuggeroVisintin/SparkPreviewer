Enjoy SparkPreviewer HTML5 WebGL based runtime model previewer, now with brand new .obj models nearly total support, yeaaah.

If you want to check for update you only need click on this link:
http://www.quartaibvisintin.altervista.org/Canvas%20Examples/webgl_previewer/index.html

To use SparkPreviewer libs folder and SparkViewer.js has to stay togheter so

1) You MUST have "SparkPreviewer.js" file and "core" folder in the same location of the filesystem otherwhise the previewer is not going to work.

2) do NOT DELETE the "SparkPreviewer.js" file NOR the "core" folder otherwhise the previewer is not going to work.

3) you have to copy and paste the following lines of HTML code where you want the previewer to appear and also replace the "src" string to match your "SparkPreviewer.js" file location:

```
<!--replace the path with a correct one-->
<script src= "path/to/SparkPreviewer.js"></script>
<script src= "path/to/JRV.js"></script>
       <canvas id = "sparkViewer" width = "800" height = "600">
              You have to update your broswer to use the SparkViewer viewer
       </canvas>
```
4) additionally if you want to use the default style of the editor you also have to add the following lines of code:

NOTE: remember to add the following lines in the web.config file, otherwise you may get a 404 error from broswer when trying to load files such .obj

```
<system.webServer>
       <staticContent>
              <mimeMap fileExtension=".obj" mimeType="text/plain"/>
              <mimeMap fileExtension=".tga" mimeType="application/tga"/>
              <mimeMap fileExtension=".mtl" mimeType="text/plain"/>
       </staticContent>
</system.webServer>
```
