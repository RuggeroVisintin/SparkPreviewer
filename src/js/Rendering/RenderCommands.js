var se = se || {};
se.rendering = se.rendering || {};
se.rendering.native = se.rendering.native || {};

(function(sparkengine) {
	var rendering = se.rendering.native;
	
	rendering.DrawCommand = function()
	{
	  this.image      = null;
	  this.xPosition  = null;
	  this.yPosition  = null;
	  this.zLayer     = null;
	  
	  return this;
	};
	
})(sparkengine);
