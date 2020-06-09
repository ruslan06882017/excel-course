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
    return createTable(50);
  }

  onMousedown(event){

 
    if (event.target.dataset.resize){
      //console.log('clicked on column');
      const $resizer = $(event.target)
      // Bad option 1
      // Bad option 2
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      const type = $resizer.data.resize
      // console.log(type);
      document.onmousemove = e => {
        if (type == 'col'){
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.css({width: value + 'px'});
          // $parent.$el.style.width = value + 'px'
          cells.forEach(el => el.style.width = value + 'px')
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({height: value + 'px'});
          //cells.forEach(el => el.style.width = value + 'px')
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onClick(){

  }


  onMousemove(){
    //console.log(`I'm nmoving`);
  }

  onMouseup(){

  }
}