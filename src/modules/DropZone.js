const $ = require('jquery')

function DropZone(id, position){
  if(!id){
    throw Error('must supply an id for DropZone instance')
  }
  if(!window.dropZoneInstances){
    window.dropZoneInstances = [];
  }
  this.x = position.x
  this.y = position.y
  this.width = 120
  this.height = 80
  this.style = `
    display: block;
    position: absolute;
    border: 1px dashed #000;
    width: ${this.width}px;
    height: ${this.height}px;
    top: ${position.y}px;
    left: ${position.x}px;
    border-radius: 8px;
    pointer-events: none;
    z-index: -100;
  `
  this.def = `
    <div id="dropzone-${id}" class="dropzone">
      <div style="${this.style}"></div>
    </div>
  `
  $('body').append(this.def)
  this.element = $(`#dropzone-${id}`).get(0)
  this.id = `#dropzone-${id}`
  var _obj = {
    x: this.x
    ,y: this.y
    ,width: this.width
    ,height: this.height
    ,id: this.id
    ,element: this.element
  }
  dropZoneInstances.push(_obj)
  return _obj
}

module.exports = DropZone
