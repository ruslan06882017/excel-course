import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/dom";

import { resizeHandler } from "./table.resize";
import { shouldResize } from "./table.functions";
import { TableSelection } from "./tableSelection";

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

  prepare(){
    this.selection = new TableSelection()
  }

  init(){
    super.init()   
    const $cell = this.$root.find('[data-id="0:0"]')
    // console.log($cell)
    this.selection.select($cell)
  }

  onMousedown(event){  
    if (shouldResize(event)){
      resizeHandler(this.$root, event)
    }
  }

  onClick(){

  }

  onMousemove(){

  }

  onMouseup(){

  }

}