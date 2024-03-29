import { Field, FieldType, PanelPlugin } from '@grafana/data';

import { ImagePanel } from './components';
import { BUTTONS_OPTIONS, DEFAULT_OPTIONS, IMAGE_SCALE_OPTIONS, SIZE_MODE_OPTIONS, ZOOM_OPTIONS } from './constants';
import { ButtonType, ImageSizeMode, PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(ImagePanel).setNoPadding().setPanelOptions((builder) => {
  builder
    .addFieldNamePicker({
      path: 'name',
      name: 'Field name',
      description:
        'Name of the field with encoded image, video, audio or PDF. If not specified, first field will be taken.',
      settings: {
        filter: (f: Field) => f.type === FieldType.string,
        noFieldsMessage: 'No strings fields found',
      },
    })
    .addFieldNamePicker({
      path: 'description',
      name: 'Field description',
      description: `Name of the field with file description. If not specified, the description won't be shown.`,
      settings: {
        filter: (f: Field) => f.type === FieldType.string,
        noFieldsMessage: 'No strings fields found',
      },
    })
    .addTextInput({
      path: 'noResultsMessage',
      name: 'No Results Message',
      description: 'Specifies no results message text.',
      defaultValue: DEFAULT_OPTIONS.noResultsMessage,
    });

  /**
   * ToolBar
   */
  builder
    .addRadio({
      path: 'toolbar',
      name: 'Images and PDF only.',
      settings: {
        options: [
          { value: true, label: 'Enabled' },
          { value: false, label: 'Disabled' },
        ],
      },
      category: ['Toolbar'],
      defaultValue: DEFAULT_OPTIONS.toolbar,
    })
    .addMultiSelect({
      path: 'buttons',
      name: 'Select buttons to display on toolbar. Images only.',
      settings: {
        options: BUTTONS_OPTIONS,
      },
      defaultValue: DEFAULT_OPTIONS.buttons as unknown,
      category: ['Toolbar'],
      showIf: (options: PanelOptions) => options.toolbar,
    })
    .addRadio({
      path: 'zoomType',
      name: 'Select zoom mode.',
      settings: {
        options: ZOOM_OPTIONS,
      },
      defaultValue: DEFAULT_OPTIONS.zoomType,
      category: ['Toolbar'],
      showIf: (options: PanelOptions) => options.toolbar && options.buttons.includes(ButtonType.ZOOM),
    });

  /**
   * URL
   */
  builder
    .addTextInput({
      path: 'url',
      name: 'Image URL',
      description: 'Specifies the URL of the page the click on image goes to.',
      category: ['URL'],
    })
    .addTextInput({
      path: 'title',
      name: 'Title',
      category: ['URL'],
    });

  /**
   * Width
   */
  builder
    .addRadio({
      path: 'widthMode',
      name: 'Width',
      settings: {
        options: SIZE_MODE_OPTIONS,
      },
      category: ['Width'],
      defaultValue: DEFAULT_OPTIONS.widthMode,
    })
    .addFieldNamePicker({
      path: 'widthName',
      name: 'Field name',
      description: 'Name of the field with width in px.',
      settings: {
        filter: (f: Field) => f.type === FieldType.number,
        noFieldsMessage: 'No number fields found',
      },
      category: ['Width'],
      showIf: (options: PanelOptions) => options.widthMode === ImageSizeMode.CUSTOM,
    })
    .addNumberInput({
      path: 'width',
      name: 'Custom width (px)',
      defaultValue: DEFAULT_OPTIONS.width,
      category: ['Width'],
      showIf: (options: PanelOptions) => options.widthMode === ImageSizeMode.CUSTOM,
    });

  /**
   * Height
   */
  builder
    .addRadio({
      path: 'heightMode',
      name: 'Height',
      settings: {
        options: SIZE_MODE_OPTIONS,
      },
      category: ['Height'],
      defaultValue: DEFAULT_OPTIONS.heightMode,
    })
    .addFieldNamePicker({
      path: 'heightName',
      name: 'Field name',
      description: 'Name of the field with height in px.',
      settings: {
        filter: (f: Field) => f.type === FieldType.number,
        noFieldsMessage: 'No number fields found',
      },
      category: ['Height'],
      showIf: (options: PanelOptions) => options.heightMode === ImageSizeMode.CUSTOM,
    })
    .addNumberInput({
      path: 'height',
      name: 'Custom height (px)',
      defaultValue: DEFAULT_OPTIONS.height,
      category: ['Height'],
      showIf: (options: PanelOptions) => options.heightMode === ImageSizeMode.CUSTOM,
    });

  /**
   * Image
   */
  builder.addSelect({
    path: 'scale',
    name: 'Scale Algorithm',
    category: ['Image'],
    settings: {
      options: IMAGE_SCALE_OPTIONS,
    },
    defaultValue: DEFAULT_OPTIONS.scale,
  });

  /**
   * Video / Audio
   */
  builder
    .addRadio({
      path: 'controls',
      name: 'Controls',
      description: 'When enabled, it specifies that video and audio controls should be displayed.',
      settings: {
        options: [
          { value: true, label: 'Enabled' },
          { value: false, label: 'Disabled' },
        ],
      },
      category: ['Video/Audio'],
      defaultValue: DEFAULT_OPTIONS.controls,
    })
    .addRadio({
      path: 'autoPlay',
      name: 'Auto Play',
      description: 'When enabled, the video and audio will automatically start playing without sound.',
      settings: {
        options: [
          { value: true, label: 'Enabled' },
          { value: false, label: 'Disabled' },
        ],
      },
      category: ['Video/Audio'],
      defaultValue: DEFAULT_OPTIONS.autoPlay,
    })
    .addRadio({
      path: 'infinityPlay',
      name: 'Infinity Play',
      description: 'When enabled, the video and audio will be played back repeatedly.',
      settings: {
        options: [
          { value: true, label: 'Enabled' },
          { value: false, label: 'Disabled' },
        ],
      },
      category: ['Video/Audio'],
      defaultValue: DEFAULT_OPTIONS.infinityPlay,
    });

  return builder;
});
