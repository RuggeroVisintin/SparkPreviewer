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

console.log("RenderModel.js included");

JRV.include("core/RenderMaterial.js");
JRV.include("core/utils/ObjLoader.js");
JRV.include("core/utils/TgaLoader.js");

function RenderModel() {
    var mRenderMesh;
    var mRenderMaterials = [];

    this.loadFromObj = function (filePath, gfx, callback) {
        return ObjLoader.loadObj(filePath, function (result) {
            var verticesSet = [];
            var mats = result.materials;

            var startIndices = [];
            var endIndices = [];

            console.warn(result.positions.length);
            console.warn(result.uvsIndices.length);

            var count = 0;

            for (var i = 0; i < result.posIndices.length; i++) {
                verticesSet.push(result.positions[result.posIndices[i]].x);
                verticesSet.push(result.positions[result.posIndices[i]].y);
                verticesSet.push(result.positions[result.posIndices[i]].z);
                verticesSet.push(result.uvs[result.uvsIndices[i]].u);
                verticesSet.push(result.uvs[result.uvsIndices[i]].v);
             }
          
            console.log("count: " + count);

            mRenderMesh = new RenderMesh();
            mRenderMesh.setVerticesSet(verticesSet);


            var tempMat;
            var imagesCount = 0;

            function postLoad() {
                tempMat = new RenderMaterial();

                tempMat.setStartIndex(mats[imagesCount].startIndex);
                tempMat.setEndIndex(mats[imagesCount].endIndex);

                // have to write a good image loader, for you have to use png
                var extension = mats[imagesCount].diffuseTextureId.split(".")[1];
                mats[imagesCount].diffuseTextureId = mats[imagesCount].diffuseTextureId.replace("." + extension, ".png");
            
                if (imagesCount != (mats.length - 1)) {
                    loadTextureFromUrl(mats[imagesCount].diffuseTextureId, gfx, function (text) {

                        tempMat.setDiffuseTextureHandle(text);
                        mRenderMaterials.push(tempMat);

                        postLoad();

                        imagesCount++;
                    });
                } else {
                    callback();
                }

            }

            postLoad();
                                        
            
        });
    };

    this.setRenderMesh = function (renderMesh) {
        mRenderMesh = renderMesh;
    };

    this.getRenderMesh = function () {
        return mRenderMesh;
    };

    this.addRenderMaterial = function (renderMaterial) {
        mRenderMaterials.push(renderMaterial);
    };

    this.getRenderMaterial = function (index) {
        return mRenderMaterials[index];
    };

    this.getRenderMaterialsCount = function () {
        return mRenderMaterials.length;
    };

    return this;
}