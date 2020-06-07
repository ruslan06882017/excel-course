import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/dom";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root){
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    });
  }

  toHTML(){
    return createTable(10);
  }

  onMousedown(event){
    if (event.target.dataset.resize){
      const $resizer = $(event.target)
      // Bad option 1
      // Bad option 2
      const $parent = $resizer.closest('[data-type="resizable"]')
      // console.log('Clicked' + $parent);
      const coords = $parent.getCoords();

      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        // console.log('clicked and moving ' + coords.right);
        $parent.$el.style.width = value + 'px'

      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onClick(){

  }
/* 
  onMousedown(){

  } */

  onMousemove(){
    //console.log(`I'm nmoving`);
  }

  onMouseup(){

  }
}