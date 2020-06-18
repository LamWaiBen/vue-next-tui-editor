import { onUnmounted } from "vue";

const defaultValueMap = {
  initialEditType: 'markdown',
  initialValue: '',
  height: '300px',
  previewStyle: 'tab',
};

export function getOptions(props, ctx) {
  const options = Object.assign(
    props,
    defaultValueMap
  );
  return { editor: null, computedOptions: options };
}