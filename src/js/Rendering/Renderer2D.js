var se = se || {};
se.rendering = se.rendering || {};
se.rendering.native = se.rendering.native || {};

(function(se) {
	var rendering = se.rendering.native;
	
	rendering.Renderer2D = function(canvasElement)
	{
		var mContext		= null;	
		var mCommandBuffer 	= [];

		if(canvasElement == undefined || canvasElement == null) {
			return;
		}	
		
		mContext = canvasElement.getContext("2d");
		
		this.pushCommand = function(renderCommand) 
		{		
			if(renderCommand == undefined || renderCommand == null) {
				console.error("null param passed");
			}
			
			console.log("pushing command");
		}
		
		this.submitBuffer = function()
		{
			console.log("submitting buffer");
		}
		
		return this;
	};
	
})(se);
