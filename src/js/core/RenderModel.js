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

function RenderModel() {
    var mRenderMesh;
    var mRenderMaterials = [];

    this.loadFromObj = function (filePath, callback) {
        return ObjLoader.loadObj(filePath, function (result) {
            var verticesSet = [];
            var mats = [];


            console.warn(result.uvs.length);

            for (var i in result.posIndices) {
                verticesSet.push(result.positions[result.posIndices[i]].x);
                verticesSet.push(result.positions[result.posIndices[i]].y);
                verticesSet.push(result.positions[result.posIndices[i]].z);
                verticesSet.push(result.uvs[result.uvsIndices[i]].u);
                verticesSet.push(result.uvs[result.uvsIndices[i]].v);

                /*for (var j in result.materials) {
                    if (i == result.materials[j].startIndex) {
                        var temp = result.materials[j];

                        var renderMat = new RenderMaterial;

                        mats[mats.length - 1].startIndex = verticesSet.length - 1;
                    } else if (i == result.materials[j].endIndex) {
                        mats[mats.length - 1].endIndex = verticesSet.length - 1;
                    }
                }*/
            }

            mRenderMesh = new RenderMesh();
            mRenderMesh.setVerticesSet(verticesSet);
            //mRenderMaterials = mats;

            callback();
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

    return this;
}