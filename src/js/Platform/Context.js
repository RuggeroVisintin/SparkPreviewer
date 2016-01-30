var sparkEngine = sparkEngine || {};
sparkEngine.platform = sparkEngine.platform || {};

(function(sparkEngine) 
{
  var platform = sparkEngine.platform;
  
  this.renderCommand2D = function()
  {
    return this;
  }
  
  this.renderer2D = function(canvasElement) 
  {
    var mContext;
    
    this.setContext = function (canvasElement)
    {
      if(canvasElement == undefined || canvasElement == null) {
        return;
      }
      
      mContext = canvasElement.getContext("2d");
    }

    return this;
  }
})(sparkEngine);
