import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/dom";

import { resizeHandler } from "./table.resize";
import { shouldResize, isCell, matrix, nextSelector} from "./table.functions";
import { TableSelection } from "./tableSelection";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options){
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
      ...options
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
    this.selectCell(this.$root.find('[data-id="0:0"]'))    
    
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus();
    })

    this.$subscribe(state => {
      console.log(`Table`, state)
    })
    
  }

  selectCell($cell){
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    // this.$dispatch({type: 'TEST'})
  }

  onMousedown(event){
    if (shouldResize(event)){
      resizeHandler(this.$root, event)
    } else if (isCell(event)){
      const $target = $(event.target)
      if (event.shiftKey){
        // group
        //const target = $target.id(true)
       // const current = this.selection.current.id(true)

        const $cells = matrix($target, this.selection.current)
                       .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)

      } else {
        // this.selection.select($target)
        this.selectCell($target)
      }
     
    }
  }

  onKeydown(event){
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp'
    ]
    const {key} = event
    
    if (keys.includes(key) && (!event.shiftKey)){
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
      // this.selection.select($next)
      // this.$emit('table:select', $next)
    }
  }

  onInput(event){
    this.$emit('table:input', $(event.target))
  }

  onClick(event){
    // const res = event
    // console.log(res)
  }

  onMousemove(){

  }

  onMouseup(){

  }



}