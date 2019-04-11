import './scss/style.scss';
import $ from 'jquery'

let padding = 30
let widget_style = `
  border: 2px solid #666;
  background-color: #999;
  display: inline-block;
  padding: ${padding}px;
  border-radius: 8px;
  color: #FFF;
`
let widget_def = `
  <div style="${widget_style}" class="widget-container select-none">
    <div>widget</div>
  </div>
`

$('body').append(widget_def)

let widget = document.querySelector('.widget-container')
let mouseIsDown = false

widget.addEventListener('mousedown', mouseDown)
widget.addEventListener('mouseup', mouseUp)

$('body').mousemove(function(e) {
  if(mouseIsDown == true){
    widget.style.left = e.pageX-($('.widget-container').width()*1.1)+'px'
    widget.style.top = e.pageY-($('.widget-container').height()*1.65)+'px'
    console.log(e.pageX, e.pageY)
  }
})

function mouseDown(e){
  console.log('mouse down detected')
  mouseIsDown = true
  widget.style.display = 'block'
  widget.style.position = 'absolute'
  widget.offset
  $('.widget-container').addClass('bounce')
  $('.widget-container').removeClass('settle')
}

function mouseUp(e){
  mouseIsDown = false
  console.log('mouse up detected')
  $('.widget-container').removeClass('bounce')
  $('.widget-container').addClass('settle')
}
