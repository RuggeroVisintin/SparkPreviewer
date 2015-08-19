function RenderPassManager(renderer) {
  var mRenderPasses   = [];
  
  return this;
}

RenderPassManager.prototype.addRenderPass = function(renderPass) {
  mRenderPasses.push(renderPass);
};

RenderPassManager.prototype.render = function() {
  for(var renderPass in mRenderPasses) {
    renderPass.sort();
    renderPass.render(renderer);
    renderPass.clear();
  }
};
