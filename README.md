# vue-next-tui-editor
TOAST UI Editor for vue-next

## Install

```
npm install vue-next-tui-editor --save
```

## Usage

First add `TuiEditor` to the Vue instance.

```javascript
// main.js
import { createApp } from 'vue';
import { TuiEditor } from 'vue-next-tui-editor';

import App from './App.vue';
const app = createApp(App);
app.component('tui-editor', TuiEditor)
```

And implement `<tui-editor />` in your template.

```vue
<template>
  <div>
    <tui-editor
      v-model="editorValue"
      :height="height"
      :hideModeSwitch="true"
    ></tui-editor>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup(){
    const editorValue = ref('Hello world!')
    const height = ref('300px')
    return { editorValue, height }
  },
};
</script>
```


## Props 

| Name            | Type   | Default                    | Description                                               |
| --------------- | ------ | -------------------------- | --------------------------------------------------------- |
| initialEditType | String | 'markdown'                 | Initial editor type (markdown, wysiwyg).                   |
| height          | String | '300px'                    | This prop can control the height of the editor.           |
| previewStyle    | String | 'vertical'                 | Markdown editor's preview style (tab, vertical).           |

more props in [defaultOptions.js](./src/defaultOptions.js) .