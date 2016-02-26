var se = se || {};
se.rendering = se.rendering || {};
se.rendering.native = se.rendering.native || {};

(function(se) {
	var rendering = se.rendering.native;
	
	rendering.DrawCommand = function()
	{
		this.image      = null;
		this.xPosition  = null;
		this.yPosition  = null;
	 	this.zLayer     = null;
	  
	  	this.execute = function(gfx) {
	  		console.log("executing command");
	  	}
	  
	  	return this;
	};
	
})(se);
