import { PanelModel } from '@grafana/data';
import semver from 'semver';
import { v4 as uuidv4 } from 'uuid';

import { MediaFormat, MediaSourceConfig, PanelOptions } from './types';

/**
 * Outdated Panel Options
 */
interface OutdatedPanelOptions extends PanelOptions {
  /**
   * URL
   *
   * Removed in 5.2.0
   */
  url?: string;

  /**
   * Title
   *
   * Removed in 5.2.0
   */
  title?: string;

  /**
   * Title
   *
   * Removed in 5.2.0
   */
  name?: string;

  /**
   * Title
   *
   * Removed in 5.2.0
   */
  formats?: MediaFormat[];

  /**
   * Title
   *
   * Removed in 5.2.0
   */
  videoUrl?: string;

  /**
   * Title
   *
   * Removed in 5.2.0
   */
  imageUrl?: string;
}

/**
 * Get Migrated Options
 * @param panel
 */
export const getMigratedOptions = (panel: PanelModel<OutdatedPanelOptions>): PanelOptions => {
  const { ...options } = panel.options;

  /**
   * Remove Legacy option url
   */
  if (options.hasOwnProperty('url')) {
    delete options.url;
  }

  /**
   * Remove Legacy option formats
   */
  if (options.hasOwnProperty('formats')) {
    delete options.formats;
  }

  /**
   * Remove Legacy option title
   */
  if (options.hasOwnProperty('title')) {
    delete options.title;
  }

  /**
   * Add mediaSources
   */
  if (panel.pluginVersion && semver.lt(panel.pluginVersion, '5.2.0')) {
    const mediaSources: MediaSourceConfig[] = [];

    /**
     * Migrate videoUrl
     */
    if (options.hasOwnProperty('videoUrl')) {
      const videoSource = {
        type: MediaFormat.VIDEO,
        id: uuidv4(),
        field: options.videoUrl ?? '',
        refId: '',
      };
      mediaSources.push(videoSource);
      delete options.videoUrl;
    }

    /**
     * Migrate imageUrl
     */
    if (options.hasOwnProperty('imageUrl')) {
      const imageSource = {
        type: MediaFormat.IMAGE,
        id: uuidv4(),
        field: options.imageUrl ?? '',
        refId: '',
      };
      mediaSources.push(imageSource);
      delete options.imageUrl;
    }

    /**
     * Migrate name
     */
    if (options.hasOwnProperty('name')) {
      const imageSource = {
        type: MediaFormat.IMAGE,
        id: uuidv4(),
        field: options.name ?? '',
        refId: '',
      };
      mediaSources.push(imageSource);
      delete options.name;
    }

    options.mediaSources = mediaSources;
  }

  return options as PanelOptions;
};
