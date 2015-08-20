function ForwardOpaquePass() 
{
  // not implemented yet
  throw "Not implemented";
  
  var mOpaqueInstances  = [];
  var mLightInstances   = [];
  
  return this;
}

ForwardOpaquePass.prototype.addRenderInstance(renderInstance)
{
  if(renderInstance.getType() == renderInstance.InstanceTypes.MESH) {
    if(!renderInstance.isTransparent()) {
      mOpaqueInstances.push(renderInstance);
    }
  } else if(renderInstace.getType() == renderInstance.InstanceTypes.LIGHT) {
    mLightInstances.push(renderInstance);
  }
}

ForwardOpaquePass.prototype.sort() 
{
  
}

ForwardOpaquePass.prototype.render(renderer) 
{
  
}

ForwardOpaquePass.prototype.clear()
{
  mOpaqueQueue = [];
  mLightQueue = [];
}
