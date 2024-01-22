/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

import './editor.scss';


/**
 * Add the attribute needed for reversing column direction on mobile.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes(settings) {
  if ('core/site-logo' !== settings.name) {
    return settings;
  }

  // Add the attribute.
  const logoAttributes = {
    alternativeImageId: {
      type: 'number',
      default: 0, // Default value for the alternative image ID
    },
  };

  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...logoAttributes,
    },
  };

  return newSettings;
}

addFilter('blocks.registerBlockType', 'enable-column-direction/add-attributes', addAttributes);

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function addInspectorControls(BlockEdit) {
  return (props) => {
    if (props.name !== 'core/site-logo') {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const { alternativeImageId } = attributes;

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <div className="enable-reverse-direction-container">

            {/* Alternative Image Upload */}
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  setAttributes({
                    alternativeImageId: media.id,
                  });
                }}
                value={alternativeImageId}
                render={({ open }) => (
                  <Button variant="secondary" onClick={open}>Select Alternative Image</Button>
                )}
              />
            </MediaUploadCheck>
          </div>
        </InspectorControls>
      </>
    );
  };
}

addFilter('editor.BlockEdit', 'enable-column-direction/add-inspector-controls', addInspectorControls);

/**
 * Add icon and position classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses(BlockListBlock) {
  return (props) => {
    const { name, attributes } = props;

    if ('core/site-logo' !== name || !attributes?.isReversedDirectionOnMobile) {
      return <BlockListBlock {...props} />;
    }

    const classes = classnames(props?.className, {
      'is-reversed-direction-on-mobile': attributes?.isReversedDirectionOnMobile,
    });

    return <BlockListBlock {...props} className={classes} />;
  };
}

addFilter('editor.BlockListBlock', 'enable-column-direction/add-classes', addClasses);
