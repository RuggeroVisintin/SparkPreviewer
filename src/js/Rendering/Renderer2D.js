var se = se || {};
se.rendering = se.rendering || {};

(function(sparkengine) {
	var rendering = se.rendering;
	
	rendering.Renderer2D = function(canvasElement)
	{
		var mContext	= null;	
		var mCommands 	= [];
		
		if(canvasElement == undefined || canvasElement == null) {
			return;
		}	
		
		mContext = canvasElement.getContext("2d");
		
		this.pushCommand = function(renderCommand) 
		{			
			console.log("pushing command");
		}
		
		return this;
	}
	
})(sparkengine);
