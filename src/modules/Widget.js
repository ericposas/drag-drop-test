const $ = require('jquery')

function Widget(id){
  if(!window.currentWidget){
    window.currentWidget = {};
    $('body').mousemove(function(e) {
      if(currentWidget && currentWidget.mouseIsDown == true){
        console.log(`#widget-${currentWidget.id}`)
        $(`#widget-${currentWidget.id}`).css({
          'display':'block',
          'position':'absolute'
        })
        $(`#widget-${currentWidget.id}`).css('left', e.pageX-($(`#widget-${currentWidget.id}`).width()*1.1)+'px')
        $(`#widget-${currentWidget.id}`).css('top', e.pageY-($(`#widget-${currentWidget.id}`).height()*1.65)+'px')
        console.log(e.pageX, e.pageY)
      }
    })
  }
  if(!id){
    throw Error('must supply an id parameter')
  }
  this.mouseIsDown = false
  this.style = {
    widget: `
      border: 2px solid #666;
      background-color: #999;
      display: inline-block;
      padding: 30px;
      border-radius: 8px;
      color: #FFF;
    `
    ,text: `
      pointer-events:none
    `
  }
  this.def = `
    <div id="widget-${id}" style="${this.style.widget}" class="widget-container select-none">
      <div style="${this.style.text}">widget</div>
    </div>
  `
  $('body').append(this.def)
  this.element = $(`#widget-${id}`).get(0)
  this.element.onmousedown = function(e){
    this.mouseIsDown = true
    currentWidget = { id: id, mouseIsDown: this.mouseIsDown, element: this }
    $(`#widget-${id}`).addClass('bounce')
    $(`#widget-${id}`).removeClass('settle')
  }
  this.element.onmouseup = this.element.onmouseout = function(e){
    this.mouseIsDown = false
    currentWidget = { id: id, mouseIsDown: this.mouseIsDown, element: this }
    $(`#widget-${id}`).removeClass('bounce')
    $(`#widget-${id}`).addClass('settle')
    currentWidget = null
  }

  return this.element
}

module.exports = Widget
