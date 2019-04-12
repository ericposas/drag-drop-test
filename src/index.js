import './scss/style.scss'
import Widget from './modules/Widget'
import DropZone from './modules/DropZone'

let widget = new Widget(1)
let widget2 = new Widget('two')
let widget3 = new Widget(3)
let dz = new DropZone(1, {x:200,y:200})
let dz2 = new DropZone(2, {x:150,y:100})
let dz3 = new DropZone(3, {x:400,y:300})
let dz4 = new DropZone(4, {x:100,y:400})
