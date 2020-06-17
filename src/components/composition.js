import { onUnmounted } from "vue";

const editorEvents = ['load', 'change', 'stateChange', 'focus', 'blur'];
const defaultValueMap = {
  initialEditType: 'markdown',
  initialValue: '',
  height: '300px',
  previewStyle: 'tab',
};

export function getOptions(props, ctx) {
  const eventOptions = {};
  editorEvents.forEach((event) => {
    eventOptions[event] = (...args) => {
      ctx.emit(event, ...args);
    };
  });
  const options = Object.assign(
    { event: eventOptions },
    props,
    defaultValueMap
  );
  return { editor: null, computedOptions: options };
}

export function getMethods(ctx) {
  const invoke = function(methodName, ...args) {
    let result = null;
    if (this.editor[methodName]) {
      result = this.editor[methodName](...args);
    }
    return result;
  }.bind(ctx);
  return { invoke };
}

export function onLifeCycle(editor) {
  onUnmounted(() => {
      editorEvents.forEach((event) => {
        editor.off(event);
      });
      editor.remove();
  })
}
