// The MIT License (MIT)

// Copyright (c) 2015 Ruggero Enrico Visintin

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE. 

console.log("SparkViewer.js included");

JRV.setBasePath("src/js/debug/");


JRV.include("core/Renderer.js");
JRV.include("core/math/Matrix4.js");
JRV.include("core/RendererUtils.js");
JRV.include("core/RenderMaterial.js");
JRV.include("core/RenderMesh.js");
JRV.include("core/RenderModel.js");
JRV.include("core/math/Vector3.js");

function Application(canvas) {
	var mCanvas = canvas;
    var renderer;

    var backgroundColor;
    var renderModel;

    var litShaderProgram;
    var normalShaderProgram;
    var diffuseShaderProgram;
    var fullShaderProgram;
	
	var mProjectionMatrix;
	var mModelViewMatrix;
	var mCameraView;
	
	var running;

	var phi = 90 * Math.PI / 180;
	var theta = 0 * Math.PI / 180;

	var camTargetX = 0;
	var camTargetY = 0;

	var radius = 10;

	var leftMouseDown = false;
	var rightMouseDown = false;
	var wheelMouseDown = false;
	var oldMouseX;
	var oldMouseY;

	var LIT_VERTEX_SHADER_SOURCE =
        "attribute vec3 position;" 								                     +
		//"attribute vec3 color;" 								                     +
        //"attribute vec2 uv;" 									                     +
		"uniform mat4 modelViewProjectionMatrix;" 				                     +
       "varying vec3 outColor;"									                     +
        "void main(void) {" 									                     +
       "    outColor = position;"      								                 +
		"   vec4 pos = modelViewProjectionMatrix * vec4(position, 1.0);"             +
        "   gl_Position = pos;"       	                                             +
        "}"                                                 	                     ;
	
    var LIT_FRAGMENT_SHADER_SOURCE                          	                     =
        "precision highp float;" 								                     +
       "varying vec3 outColor;"                                                      +
        ""                                                                           +
        "void main(void) {"                                 	                     +
        "   gl_FragColor = vec4(outColor, 1);" 	                                     +
        "}"                                                 	                     ;

    this.init = function () {
        renderer = new Renderer();
        renderer.initWebGL(mCanvas);
        
        initBackground();
        initShaderPrograms();
        initDefaultModel();
        initMatrices();
		
        renderer.program = litShaderProgram;		
        renderer.init();

        window.addEventListener('resize', onResizeEvent, false);
        mCanvas.addEventListener('mousedown', handleMouseDown, false);
        mCanvas.addEventListener('mouseup', handleMouseUp, false);
        mCanvas.addEventListener('mousemove', handleMouseMove, false);
        mCanvas.addEventListener('mousewheel', handleMouseWheel, false);
    };

    this.run = function () {
		running = true;
        runLoop();
    };
	
	this.stop = function () {
		running = false;
	};
	
	var initMatrices = function () {
	    mModelViewMatrix = Matrix4.create();
	    mProjectionMatrix = Matrix4.create();
	    mCameraView = Matrix4.create();
		
	    Matrix4.perspective(45, mCanvas.clientWidth / mCanvas.clientHeight, 0.1, 100, mProjectionMatrix);

	    eyeX = radius * Math.sin(theta) * Math.sin(phi);
	    eyeY = radius * Math.cos(phi);
	    eyeZ = radius * Math.cos(theta) * Math.sin(phi);

	    Matrix4.lookAt([eyeX, eyeY, eyeZ], [camTargetX, camTargetY, 0], [0, 1, 0], mCameraView);
	};

	var initBackground = function() {
		backgroundColor = Vector3.create(0.0, 0.0, 0.0);
	};
	
	var initShaderPrograms = function () {
		litShaderProgram = initShaderFromString(LIT_VERTEX_SHADER_SOURCE, LIT_FRAGMENT_SHADER_SOURCE, renderer.getGfx());		
	};
	
	var initDefaultModel = function() {

	   var vertices = [
		-1.0, -1.0, -1.0, // 0
		 1.0, 1.0, -1.0, // 2
		 1.0, -1.0, -1.0, // 1
		-1.0, -1.0, -1.0, // 0
		-1.0, 1.0, -1.0, // 3
		 1.0, 1.0, -1.0, // 2

		// Y-
		-1.0, -1.0, -1.0, // 0
		 1.0, -1.0, -1.0, // 1
		 1.0, -1.0, 1.0, // 5
		-1.0, -1.0, -1.0, // 0
		 1.0, -1.0, 1.0, // 5
		-1.0, -1.0, 1.0, // 4

		// X+
		 1.0, -1.0, -1.0, // 1
		 1.0, 1.0, -1.0, // 2
		 1.0, 1.0, 1.0, // 6
		 1.0, -1.0, -1.0, // 1
		 1.0, 1.0, 1.0, // 6
		 1.0, -1.0, 1.0, // 5

		// Y+
		 1.0, 1.0, -1.0, // 2
		-1.0, 1.0, 1.0, // 7
		 1.0, 1.0, 1.0, // 6
		 1.0, 1.0, -1.0, // 2
		-1.0, 1.0, -1.0, // 3
		-1.0, 1.0, 1.0, // 7

		// X-
		-1.0, 1.0, -1.0, // 3
		-1.0, -1.0, 1.0, // 4
		-1.0, 1.0, 1.0, // 7
		-1.0, 1.0, -1.0, // 3
		-1.0, -1.0, -1.0, // 0
		-1.0, -1.0, 1.0, // 4

		// Z+		 
		-1.0, -1.0, 1.0, // 4
		 1.0, -1.0, 1.0, // 5
		 1.0, 1.0, 1.0, // 6
		-1.0, -1.0, 1.0, // 4
		 1.0, 1.0, 1.0, // 6
		-1.0, 1.0, 1.0, // 7
	   ];
		
		var renderMesh = new RenderMesh();
        var vbo = renderer.getGfx().createBuffer();

        renderer.getGfx().bindBuffer(renderer.getGfx().ARRAY_BUFFER, vbo);
        renderer.getGfx().bufferData(renderer.getGfx().ARRAY_BUFFER, new Float32Array(vertices), renderer.getGfx().STATIC_DRAW);

        renderMesh.setVertexBufferHandle(vbo);
        renderMesh.setVerticesSet(vertices);        

        var renderMaterial = new RenderMaterial();
        var renderMaterialTexture = loadTextureFromUrl("img/img.png", renderer.getGfx());
        renderMaterial.setDiffuseTextureHandle(renderMaterialTexture);

        var materialColor = Vector3.create(0.0, 1.0, 0.0);
        renderMaterial.setDiffuseColor(materialColor);

        renderModel = new RenderModel();
        renderModel.setRenderMesh(renderMesh);
        renderModel.addRenderMaterial(renderMaterial);			
	};
	
	var rotation = 1;

	var runLoop = function () {
	
	    var mvp = Matrix4.create();

	    var eyeX, eyeY, eyeZ;

	    eyeX = radius * Math.sin(theta) * Math.sin(phi) + camTargetX;
	    eyeY = radius * Math.cos(phi) + camTargetY;
	    eyeZ = radius * Math.cos(theta) * Math.sin(phi) + 0;

	    Matrix4.lookAt([eyeX, eyeY, eyeZ], [camTargetX, 0, 0], [0, 1, 0], mCameraView);

	    Matrix4.multiply(mProjectionMatrix, mCameraView, mvp);        
	    Matrix4.multiply(mvp, mModelViewMatrix, mvp);
				
        var drawCall = new DrawCall();
        drawCall.vbo = renderModel.getRenderMesh().getVertexBufferHandle();
        drawCall.shaderProgram = litShaderProgram;
        drawCall.verticesNumber = 36;

		drawCall.matrixMVP = mvp;
		drawCall.mvpLocation = renderer.getGfx().getUniformLocation(litShaderProgram, "modelViewProjectionMatrix");
        
		drawCall.textureHandle = renderModel.getRenderMaterial(0).getDiffsueTextureHandle;

        renderer.render(0, drawCall);
		
		if(running) {
			window.requestAnimationFrame(runLoop);
		}
	};

	var onResizeEvent = function () {
	    console.log("Resizing");
	    Matrix4.perspective(45, mCanvas.clientWidth / mCanvas.clientHeight, 0.1, 100, mProjectionMatrix);
	};

	var handleMouseDown = function (event) {
	    switch(event.which) {
            case 1:
	            console.log("LeftMouseDown");
	            leftMouseDown = true;
	            break;
	        case 2:
	            console.log("MiddleMouseDown");
	            wheelMouseDown = true;
	            break;

	    }
	};

	var handleMouseUp = function (event) {
	    switch (event.which) {
	        case 1:
	            console.log("RightMouseUp");
	            leftMouseDown = false;
	            break;
	        case 2:
	            console.log("MiddleMouseUp");
	            wheelMouseDown = false;
	            break;
	    }
	};

	var handleMouseMove = function (e) {
	    if (leftMouseDown) {

	        if ((oldMouseY - e.clientY) > 0) {
	            if ((phi * 180 / Math.PI) < 170) {
	                phi += (oldMouseY - e.clientY) * 0.01;	               	                
	            }
	        } else if((oldMouseY - e.clientY) < 0){ 
	            if ((phi * 180 / Math.PI) > 10) {
	                phi += (oldMouseY - e.clientY) * 0.01;	                
	            }
	        }

	        theta += (oldMouseX - e.clientX) * 0.01;
	        console.log((oldMouseX - e.clientX) * 180 / Math.PI ) 

	    }

	    oldMouseX = e.clientX;
	    oldMouseY = e.clientY;
	};

	var handleMouseWheel = function (e) {

	    var deltaRadius = radius - (e.wheelDelta / 120);
        
	    if (deltaRadius > radius) {
	        if (radius < 150) {
	            radius += 0.5;
	        }
	    } else {
	        if (radius > 0.5) {
	            radius -= 0.5;
	        }
	    }

	    return false;
	};

    return this;
}

var APPLICATION;

function SparkPreviewerMain() {

    window.onload = function () {

        APPLICATION = new Application(document.getElementById("sparkViewer"));
        APPLICATION.init();
        APPLICATION.run();
    }

    return 0;
}

SparkPreviewerMain();