import { $ } from "../../core/dom";

export class Excel {
  constructor(selector, options){
    this.$el = $(selector)
    this.components = options.components || [];
  }
  
  getRoot(){
    const $root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // DEBUG
      if (component.name){
        // window['c' + ]
      }
      $el.html(component.toHTML());
      $root.append($el);
      return component
    });

    return $root;
  }

  render(){
    this.$el.append(this.getRoot())
    //console.log(this.components)
    this.components.forEach(component => component.init())
  }
}