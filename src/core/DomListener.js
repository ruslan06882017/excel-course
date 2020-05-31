import { capitalize } from "./utils";

export class DomListener {
  constructor($root, listeners = []){
    if (!$root){
      throw new Error('No $root provided for DOMlistener');
    }
    this.$root = $root
    this.listeners = listeners 
  }

  initDOMListeners(){
    this.listeners.forEach(listener => {
      const method = 'on' + capitalize(listener)
      console.log('info = ', method);
      // Тоже самое что и Add event lister
      this.$root.on(listeners, () => {});
    })
  }

  removeDOMListeners(){
    
  }
  

}