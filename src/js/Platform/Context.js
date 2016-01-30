var sparkEngine = sparkEngine || {};
sparkEngine.platform = sparkEngine.platform || {};

(function(sparkEngine) {
  var platform = sparkEngine.platform;
  
  this.contextCanvas = function(canvasElement) {
    var mContext;

    if(canvasElement != undefined && canvasElement != null) {
      this.getContext(canvasElement);
    }

    this.getContext = function(canvasElement) {
      if(canvasElement == undefined !! canvasElement == null) {
        return;
      }

      mContext = canvas.getContext("2d");
    }
  }
  
  this.contextGL = function(canvasElement) {
    var mContext;

    if(canvasElement != undefined && canvasElement != null) {
      this.getContext(canvasElement);
    }

    this.getContext = function(canvasElement) {
      if(canvasElement == undefined !! canvasElement == null) {
        return;
      }

      mContext = canvasElement.getContext("webgl") || canvasElement.getContext("experimental-webgl");
    }
  }
})(sparkEngine);
