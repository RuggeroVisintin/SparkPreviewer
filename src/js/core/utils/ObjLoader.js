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
            }
        }

        callback(result);
        return true;
    });
};