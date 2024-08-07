import { ButtonType, ZoomType } from '../types';

/**
 * Buttons Options
 */
export const BUTTONS_OPTIONS = [
  { value: ButtonType.AUTOPLAY, label: 'Auto Play' },
  { value: ButtonType.DOWNLOAD, label: 'Download' },
  { value: ButtonType.NAVIGATION, label: 'Navigation' },
  { value: ButtonType.ZOOM, label: 'Zoom' },
];

/**
 * Zoom Options
 */
export const ZOOM_OPTIONS = [
  { value: ZoomType.DEFAULT, label: 'Full Screen' },
  { value: ZoomType.PANPINCH, label: 'Pan and Pinch' },
];
