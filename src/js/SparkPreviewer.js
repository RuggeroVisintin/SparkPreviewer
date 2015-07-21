// --------------------------------------------------------------------------------
// Copyright (c) 2015 Ruggero Enrico Visintin
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE. 
// --------------------------------------------------------------------------------

console.log("SparkViewer.js included");

JRV.setBasePath("src/js/");

JRV.include("core/Renderer.js");
JRV.include("core/math/Matrix4.js");
JRV.include("core/RendererUtils.js");
JRV.include("core/RenderMaterial.js");
JRV.include("core/RenderMesh.js");
JRV.include("core/RenderModel.js");
JRV.include("core/math/Vector3.js");

if (JRV.isMobile.any() && JRV.supportTouch()) {
    JRV.include("core/input/MobileInputManager.js");
} else {
    if (JRV.supportMouse()) {
        JRV.include("core/input/PcInputManager.js");

    } else if(JRV.supportTouch()) {
        JRV.include("core/input/MobileInputManager.js");

    }
}

JRV.include("core/Camera.js");
JRV.include("core/utils/ShapeGenerator.js");
JRV.include("core/utils/ObjLoader.js");

function Application(canvas, debugCanvas) {
	var mCanvas = canvas;
	var renderer;

	var debugRenderer;

	var inputManager;

    var backgroundColor;
    var renderModel;

    var litShaderProgram;
    var normalShaderProgram;
    var diffuseShaderProgram;
    var fullShaderProgram;
	
	var mModelViewMatrix;
	var mArcballCamera;

	var running;	
	var mFps;
	var mFrameTime;

	var texture;

    var LIT_VERTEX_SHADER_SOURCE =
        "attribute vec3 position;" 								                     +
		//"attribute vec3 color;" 								                     +
        "attribute vec2 uv;" 									                     +
		"uniform mat4 modelViewProjectionMatrix;" 				                     +
       "varying vec3 outColor;" +
       "varying vec2 outUv;" +
        "void main(void) {" 									                     +
       "    outColor = position;" +
       "    outUv = uv;" +
		"   vec4 pos = modelViewProjectionMatrix * vec4(position, 1.0);"             +
        "   gl_Position = pos;"       	                                             +
        "}"                                                 	                     ;
	
    var LIT_FRAGMENT_SHADER_SOURCE                          	                     =
        "precision mediump float;" 								                     +
        "varying vec3 outColor;" +
        "varying vec2 outUv;" +
        "uniform sampler2D sampler;" +
        ""                                                                           +
        "void main(void) {"                                 	                     +
        "   gl_FragColor = texture2D(sampler, vec2(outUv.s, outUv.t));" +
        "}"                                                 	                     ;

    this.init = function () {
        console.log("mobile: " + JRV.isMobile.any());

        renderer = new Renderer();
        renderer.initWebGL(mCanvas);

        debugRenderer = debugCanvas.getContext("2d");

        debugRenderer.fillStyle = "white";
        debugRenderer.font = "11px Lucida Console";        
                
        mArcballCamera = new ArcballCamera();
        mArcballCamera.setViewport(45, mCanvas.clientWidth / mCanvas.clientHeight);

        initBackground();
        initShaderPrograms();
        initDefaultModel();
        initMatrices();
		
        renderer.program = litShaderProgram;		
        renderer.init();

        window.addEventListener('resize', onResizeEvent, false);
        if (JRV.isMobile.any() && JRV.supportTouch()) {
            inputManager = new MobileInputManager(mCanvas);
        } else {
            if (JRV.supportMouse()) {
                inputManager = new PcInputManager(mCanvas);
            } else if(supportTouch()){
                inputManager = new MobileInputManager(mCanvas);
            }
        }


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
	    mModelViewMatrix = Matrix4.translate(mModelViewMatrix, [0, -2, 0], mModelViewMatrix);
	};

	var initBackground = function() {
		backgroundColor = Vector3.create(1.0, 1.0, 1.0);
	};
	
	var initShaderPrograms = function () {
		litShaderProgram = initShaderFromString(LIT_VERTEX_SHADER_SOURCE, LIT_FRAGMENT_SHADER_SOURCE, renderer.getGfx());		
	};
	
	var initDefaultModel = function() {
	    //var vertices = ShapeGenerator.createCube().verts;
		
		//var renderMesh = new RenderMesh();
        //var vbo = renderer.getGfx().createBuffer();

        //renderer.getGfx().bindBuffer(renderer.getGfx().ARRAY_BUFFER, vbo);
        //renderer.getGfx().bufferData(renderer.getGfx().ARRAY_BUFFER, new Float32Array(vertices), renderer.getGfx().STATIC_DRAW);

        //renderMesh.setVertexBufferHandle(vbo);
        //renderMesh.setVerticesSet(vertices);        

        //var renderMaterial = new RenderMaterial();
	    loadTextureFromUrl("img/Lara_torso_D.jpg", renderer.getGfx(), function (result) {
	        texture = result;

	    });
        //renderMaterial.setDiffuseTextureHandle(renderMaterialTexture);

        //var materialColor = Vector3.create(0.0, 1.0, 0.0);
        //renderMaterial.setDiffuseColor(materialColor);

        //renderModel = new RenderModel();
        //renderModel.setRenderMesh(renderMesh);
        //renderModel.addRenderMaterial(renderMaterial);

        // --------------------------------------------------------------------------------------

	    renderModel = new RenderModel();
	    renderModel.loadFromObj("modello_prova/Lara_Croft.obj", function () {
	        var vbo = renderer.getGfx().createBuffer();

	        renderer.getGfx().bindBuffer(renderer.getGfx().ARRAY_BUFFER, vbo);
	        renderer.getGfx().bufferData(renderer.getGfx().ARRAY_BUFFER, new Float32Array(renderModel.getRenderMesh().getVerticesSet()), renderer.getGfx().STATIC_DRAW);

	        renderModel.getRenderMesh().setVertexBufferHandle(vbo);
	        //renderModel.addRenderMaterial(renderMaterial);
	    });
	};
	
	lastLoop = new Date();

	var runLoop = function () {
	    var thisLoop = new Date;

	    mFrameTime = thisLoop - lastLoop;
	    mFps = Math.round(1000 / mFrameTime);

	    updateInput();
	    updateRendering();

        debugRenderer.clearRect(0, 0, 300, 50);
        debugRenderer.fillText("Fps: " + mFps, 10, 10);
        debugRenderer.fillText("Frame Time: " + mFrameTime, 10, 30);
	
	    if (running) {
			window.requestAnimationFrame(runLoop);
		} else {
		    return;
		}

		lastLoop = thisLoop;
	};

	var onResizeEvent = function () {
	    console.log("Resizing");
	    mArcballCamera.setViewport(45, mCanvas.clientWidth / mCanvas.clientHeight);
   	};

	var updateRendering = function() 
	{
	    var mvp = Matrix4.create();
	    var camMatrices = mArcballCamera.updateMatrices();

	    Matrix4.multiply(camMatrices[0], camMatrices[1], mvp);
	    Matrix4.multiply(mvp, mModelViewMatrix, mvp);

	    if (renderModel.getRenderMesh()) {
	        var drawCall = new DrawCall();
	    
	        drawCall.vbo = renderModel.getRenderMesh().getVertexBufferHandle();
	        drawCall.shaderProgram = litShaderProgram;
	        drawCall.verticesNumber = renderModel.getRenderMesh().getVerticesSet().length / 5;

	        drawCall.matrixMVP = mvp;
	        drawCall.mvpLocation = renderer.getGfx().getUniformLocation(litShaderProgram, "modelViewProjectionMatrix");

	        console.log(texture);

	        drawCall.textureHandle = texture;
	        drawCall.textureLocation = renderer.getGfx().getUniformLocation(litShaderProgram, "sampler");

            renderer.render(0, drawCall);
	    }
	}

	var updateInput = function()
	{
	    inputManager.update();

	    if (inputManager.isLeftMouseDown()) {
	        var verticalDelta = inputManager.getMouseVerticalDelta();
	        var horizontalDelta = inputManager.getMouseHorizontalDelta();

            mArcballCamera.rotateY(verticalDelta);
            mArcballCamera.rotateX(horizontalDelta);
	    }

	    if (inputManager.getWheelDelta() != 0) {	        
	        mArcballCamera.moveRadius(inputManager.getWheelDelta() / 120);
	    }

	    inputManager.postUpdate();
	}

	return this;
}

var APPLICATION;

function SparkPreviewerMain() {

    window.onload = function () {
        var debugCanvas = document.getElementById("sparkViewer").cloneNode();

        debugCanvas.id = "sparkDebugger";
        debugCanvas.style.zIndex = "100";
        debugCanvas.style.position = "absolute";
        debugCanvas.style.left = "0";
        debugCanvas.style.top = "0";
        debugCanvas.style.pointerEvents = "none";

        document.body.appendChild(debugCanvas);

        APPLICATION = new Application(document.getElementById("sparkViewer"), debugCanvas);
        APPLICATION.init();
        APPLICATION.run();
    }

    return 0;
}

SparkPreviewerMain();