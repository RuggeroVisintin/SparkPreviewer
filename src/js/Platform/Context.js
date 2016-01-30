var sparkEngine = sparkEngine || {};
sparkEngine.platform = sparkEngine.platform || {};

(function(sparkEngine) {
  var platform = sparkEngine.platform;
  
  this.contextCanvas = function(canvasElement) {
    var mCanvas;

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
})(sparkEngine);
