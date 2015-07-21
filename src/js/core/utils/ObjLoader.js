var ObjLoader = {};

/*
* @param filePath - the file path of the .obj model
* @param callback - the function to call when the model is loaded, 
*                   the result of the loading is passed to the callback
* returns true if the filePath exists and is an objFile
*/
ObjLoader.loadObj = function (filePath, callback) {
    JRV.xmlHttpGetRequest(filePath, true, function (result) {
        if (result == null) {
            return false;
        }

        var script = result.split("\n");

        var result = {
            positions: [],
            uvs: [],

            posIndices: [],
            uvsIndices: [],

            mtlFileName: "",
            materials: [],
        };

        for (var i in script) {
            var line = script[i];

            if (line.substring(0, 2) == "v ") {
                var vertex = line.substring(2).split(" ");
                result.positions.push({
                    x: parseFloat(vertex[0]),
                    y: parseFloat(vertex[1]),
                    z: parseFloat(vertex[2])
                });
            } else if (line.substring(0, 2) == "vt") {
                var vt = line.substring(3).split(" ");
                result.uvs.push({ u: parseFloat(vt[0]), v: parseFloat(vt[1]) });

            } else if (line.substring(0, 2) == "f ") {
                var face = line.substring(2).split(" ");
                for (var i in face) {
                    if (face[i] != "") {
                        if (face[i].indexOf("/") != -1) {
                            var index;

                            if(face[i].indexOf("//") != -1) {
                                index = face[i].split("//");
                            } else {
                                index = face[i].split("/");
                                var posIndex = parseInt(index[0]);
                                var uvIndex = parseInt(index[1]);

                                if (posIndex < 0) {
                                    posIndex += 1;
                                } else {
                                    posIndex -= 1;
                                }

                                if (uvIndex < 0) {

                                } else {
                                    uvIndex -= 1;
                                }

                                result.posIndices.push(posIndex);
                                result.uvsIndices.push(uvIndex);

                                if (result.materials[result.materials.length - 1].startIndex == null) {
                                    result.materials[result.materials.length - 1].startIndex = posIndex;
                                    console.log("mtl_id: " + result.materials[result.materials.length - 1].id + ", mtl_start: " + result.materials[result.materials.length - 1].startIndex);
                                }

                                result.materials[result.materials.length - 1].endIndex = posIndex;
                            }
                        }
                    } else {
                        var posIndex = parseInt(face[i]);

                        if (posIndex < 0) {
                            posIndex += 1;
                        } else {
                            posIndex -= 1;
                        }

                        result.posIndices.push(posIndex);
                    }
                }
            } else if (line.substring(0, 6) == "mtllib") {
                result.mtlFileName = line.split(" ")[1];

                var fileName = filePath.replace(/^.*[\\\/]/, '');
                console.log(fileName);

                var path = filePath.replace(fileName, result.mtlFileName);
                console.log(path);

                result.mtlFileName = path;
            } else if (line.substring(0, 6) == "usemtl") {
                var temp = { id: null, startIndex: null, endIndex: null, diffuseTextureId: null, };
                temp.id = line.split(" ")[1];
                temp.startIndex = null;

                result.materials.push(temp);
            }
        }

        ObjLoader.loadMtl(result.mtlFileName, result, callback);       
        return true;
    });
};

ObjLoader.loadMtl = function (filePath, objModel, callback) {
    JRV.xmlHttpGetRequest(filePath, true, function (result) {
        if (result == null) {
            return false;
        }

        var script = result.split("\n");
        var tempMaterials = [];
        var material = { id: null, diffuseTextureId: null, };


        for (var i in script) {
            var line = script[i];

            if (line.substring(0, 6) == "newmtl") {
                material.id = line.split(" ")[1];
            } else if (line.substring(0, 6) == "map_Kd") {
                material.diffuseTextureId = line.split(" ")[1];

                var fileName = filePath.replace(/^.*[\\\/]/, '');
                //console.log(fileName);

                var path = filePath.replace(fileName, material.diffuseTextureId);
                //console.log(path);

                material.diffuseTextureId = path;

                for (var i in objModel.materials) {
                    if (objModel.materials[i].id === material.id) {

                        objModel.materials[i].diffuseTextureId = material.diffuseTextureId;
                        //console.log(objModel.materials[i].diffuseTextureId);

                        break;
                    }
                }
                
                //console.log("mtl_id: " + material.id + ", diffuse_texture_id: " + material.diffuseTextureId);
            }
 
        }

        //for (var i in tempMaterials) {
        //    for (var j in objModel.materials) {
        //        if (objModel.materials[j].id === tempMaterials[i].id) {
        //            objModel.materials[j].diffuseTextureId = tempMaterials[i].diffuseTextureId;

        //        }
        //    }
        //}

        callback(objModel);
    });
};