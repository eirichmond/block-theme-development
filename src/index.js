/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Add the attribute needed for alternative image id and name.
 *
 * @since 0.1.0
 * @param { Object } settings
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
		alternativeImageName: {
			type: 'string',
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
addFilter(
	'blocks.registerBlockType',
	'holdinghands-alternative-logo/add-attributes',
	addAttributes
);

/**
 * Filter the BlockEdit object and add media upload in the settings inspector.
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
		const { alternativeImageId, alternativeImageName } = attributes;
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<div className='alternative-logo-container'>
						{/* Alternative Image Upload */}
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									setAttributes({
										alternativeImageId: media.id,
										alternativeImageName: media.filename,
									});
								}}
								value={alternativeImageId}
								render={({ open }) => (
									<Button
										variant='secondary'
										onClick={open}
										isPressed={
											alternativeImageId ? true : false
										}
										text={
											alternativeImageId
												? alternativeImageName
												: 'Select Alternative Image'
										}
									/>
								)}></MediaUpload>
						</MediaUploadCheck>
					</div>
				</InspectorControls>
			</>
		);
	};
}
addFilter(
	'editor.BlockEdit',
	'holdinghands-alternative-logo/add-inspector-controls',
	addInspectorControls
);
