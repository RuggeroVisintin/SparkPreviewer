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

console.log("Renderer.js included");


function DrawCall() {
    this.shader;
    this.vao;
    this.textureHandle;

    this.verticesStart;
    this.verticesNumber;
	this.matrixMVP;
	
	this.mvpLocation;
	this.textureLocation;
	this.opacity;
	this.alphaLocation;
}

function Renderer() {
    var _status = this;
    var mGfx;

    var positionsAttribLocation 		= 0;
    var normalsAttrbLocation 			= 1;
    var uvsAttribLocation 			    = 2;

    this.getGfx = function() {
        return mGfx;
    };
   
    this.init = function () {
        mGfx.clear(mGfx.COLOR_BUFFER_BIT | mGfx.DEPTH_BUFFER_BIT);
        mGfx.clearColor(0.0, 0.0, 0.0, 1.0);
        mGfx.enable(mGfx.DEPTH_TEST);
        //mGfx.enable(mGfx.CULL_FACE);


        mGfx.enableVertexAttribArray(positionsAttribLocation);
        //mGfx.enableVertexAttribArray(normalsAttrbLocation);
        mGfx.enableVertexAttribArray(1);
    };

    this.startFrame = function (shaderProgram) {
        mGfx.clear(mGfx.COLOR_BUFFER_BIT );
        //mGfx.clearColor(0.0, 0.0, 0.0, 1.0);
        //mGfx.clear(mGfx.COLOR_BUFFER_BIT);
        mGfx.useProgram(shaderProgram);
        //mGfx.enable(mGfx.DEPTH_TEST);
    };

    this.endFrame = function () {
        //mGfx.flush();
    };

    this.render = function (deltaTime, drawCall) {
        //mGfx.blendFunc(mGfx.SRC_ALPHA, mGfx.ONE_MINUS_SRC_ALPHA);
        // mGfx.enable(mGfx.BLEND);
        

        mGfx.bindBuffer(mGfx.ARRAY_BUFFER, drawCall.vbo);
        mGfx.vertexAttribPointer(positionsAttribLocation, 3, mGfx.FLOAT, false, 4 * 5, 0);

        mGfx.bindBuffer(mGfx.ARRAY_BUFFER, drawCall.vbo);
		mGfx.vertexAttribPointer(1, 2, mGfx.FLOAT, false, 4 * 5, 3 * 4);

		mGfx.uniformMatrix4fv(drawCall.mvpLocation, false, drawCall.matrixMVP);
		
		if (drawCall.textureHandle) {
		    mGfx.activeTexture(mGfx.TEXTURE0);
		    mGfx.bindTexture(mGfx.TEXTURE_2D, drawCall.textureHandle);
		    mGfx.uniform1i(drawCall.textureLocation, 0);
		}

		mGfx.uniform1f(drawCall.alphaLocation, drawCall.opacity);


		mGfx.bindBuffer(mGfx.ARRAY_BUFFER, drawCall.vbo);
		mGfx.drawArrays(mGfx.TRIANGLES, drawCall.verticesStart, drawCall.verticesNumber);
		mGfx.bindBuffer(mGfx.ARRAY_BUFFER, null);

    };

    // initialization 
    this.initWebGL = function (canvas) {
        try {
            mGfx = canvas.getContext("webgl", { alpha: false, antialias: true}) || canvas.getContext("experimental-webgl");
        } catch (e) { }

        if (!mGfx || mGfx == undefined) {
            _status = null;

			console.log(canvas);
			
            return;
        }	
    };

    return _status;	
}
