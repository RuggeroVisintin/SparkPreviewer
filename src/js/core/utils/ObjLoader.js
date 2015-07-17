var ObjLoader = {};

ObjLoader.loadObj = function (filePath) {
    var rightFilePath = filePath.replace(".obj", ".txt");

    JRV.xmlHttpGetRequest("prova.txt", true, function (result) {
        console.log(result);
    });
};