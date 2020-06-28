import { Editor } from "./src/index";

export default Editor;

if(typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('tui-editor', Editor);
}