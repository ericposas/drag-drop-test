const $ = require('jquery')

function Widget(id){
  if(!window.currentWidget){
    window.widgetCount = 0;
    window.currentWidget = {};
    $('body').mousemove(function(e) {
      if(currentWidget && currentWidget.mouseIsDown == true){
        $(`#widget-${currentWidget.id}`).css({
          'display':'block',
          'position':'absolute'
        })
        $(`#widget-${currentWidget.id}`).css('left', e.pageX-($(`#widget-${currentWidget.id}`).width()*.5)+'px')
        $(`#widget-${currentWidget.id}`).css('top', e.pageY-($(`#widget-${currentWidget.id}`).height()*.5)+'px')
        currentWidget.x = e.pageX
        currentWidget.y = e.pageY
        if(window.dropZoneInstances){
          dropZoneInstances.forEach(function(item,i){
            if(e.pageX >= item.x && e.pageY >= item.y
                && e.pageX < (item.x + item.width)
                && e.pageY < (item.y + item.height)
              ){
              $(`#widget-${currentWidget.id}`).css('top', item.y+'px')
              $(`#widget-${currentWidget.id}`).css('left', item.x+'px')
            }
          })
        }
      }
    })
  }
  if(!id){
    throw Error('must supply an id parameter for Widget instance')
  }
  widgetCount++
  this.mouseIsDown = false
  this.width = 120
  this.height = 80
  this.style = {
    widget: `
      border: 2px solid #666;
      background-color: #999;
      display: inline-block;
      width: ${this.width}px;
      height: ${this.height}px;
      border-radius: 8px;
      color: #FFF;
    `
    ,text: `
      pointer-events:none;
      display: absolute;
      position: relative;
      text-align: center;
    `
  }
  this.def = `
    <div id="widget-${id}" style="${this.style.widget}" class="widget-container select-none">
      <div id="widget-${id}-text" style="${this.style.text}">Widget ${id}</div>
    </div>
  `
  $('body').append(this.def)
  $(`#widget-${id}-text`).css('top', this.height/2 - $(`#widget-${id}-text`).height()/2)
  $(`#widget-${id}-text`).css('left',this.width/2 - $(`#widget-${id}-text`).width()/2)
  this.element = $(`#widget-${id}`).get(0)
  this.element.onmousedown = function(e){
    this.mouseIsDown = true
    currentWidget = { id: id, mouseIsDown: this.mouseIsDown, element: this }
    $(`#widget-${id}`).addClass('bounce')
    $(`#widget-${id}`).removeClass('settle')
  }
  this.element.onmouseup = this.element.onmouseout = function(e){
    this.mouseIsDown = false
    $(`#widget-${id}`).removeClass('bounce')
    $(`#widget-${id}`).addClass('settle')
    currentWidget = null
  }

  return this.element
}

module.exports = Widget
