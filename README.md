Enjoy SparkPreviewer HTML5 WebGL based runtime model previewer, please note that the script is in early stage status so it is only showing a rotating triangle 8(.

If you want to check for update you only need click on this link:

http://www.quartaibvisintin.altervista.org/Canvas%20Examples/webgl_previewer/index.html

To use SparkPreviewer libs folder and SparkViewer.js has to stay togheter so

1. You MUST have "SparkPreviewer.js" file and "core" folder in the same location of the filesystem otherwhise the previewer is not going to work.

2. do NOT DELETE the "SparkPreviewer.js" file NOR the "core" folder otherwhise the previewer is not going to work.

3. you have to copy and paste the following lines of HTML code where you want the previewer to appear and also replace the "src" string to match your "SparkPreviewer.js" file location:

============================================================================= 

<xmp>
        <script src= "path/to/SparkPreviewer.js"></script> <!-- REPLACE THE SRC PATH the script will do the rest -->
</xmp>
<br/>
<xmp>
        <canvas id = "sparkViewer" width = "800" height = "600">
</xmp>
<br/>
<xmp>
                You have to update your broswer to use the SparkViewer viewer
</xmp>
<br/>
<xmp>
        </canvas>
</xmp>

 =============================================================================
        
4. additionally if you want to use the default style of the editor you also have to add the following lines of code:

============================================================================= 

<!-- the following lines are optional and usefull only if you want the previewer to activate on a mouseClick-->
<xmp>
        <style>
                #sparkViewer {
                        background-image: url(location/To/Image/You/Want/To/Use/As/Background);   /* replace this string */
                        background-position: center;
                        background-repeat: no-repeat;
                }
        </style>
</xmp>

 =============================================================================
