/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, CheckboxControl } from '@wordpress/components';
import { useEffect, useState } from 'react';
import { RawHTML } from '@wordpress/element';

registerBlockType(metadata.name, {
	title: __('WPFTS :: Live Search'),
	icon: 'search',
	category: 'widgets',
	attributes: {
		title: { type: 'string', default: '' },
		preset: { type: 'string', default: 'default' },
		placeholder: { type: 'string', default: __('Search...', 'fulltext-search') },
		buttonText: { type: 'string', default: __('Search', 'fulltext-search') },
		hideButton: { type: 'boolean', default: false },
		cssClass: { type: 'string', default: '' },
		resultsUrl: { type: 'string', default: window.location.origin },
	},
	edit: ({ attributes, setAttributes }) => {
		const { title, preset, placeholder, buttonText, hideButton, cssClass, resultsUrl } = attributes;
		const [ html, setHtml ] = useState('');
		const [ presets, setPresets ] = useState([]);
		const blockProps = useBlockProps();

		blockProps.className += ` wpfts_widget wpfts_search-widget preset-${preset} ${cssClass}`;

		let _wpnonce = wpApiSettings.nonce || '';

		useEffect(() => {
			fetch(`/wp-json/fulltext-search/v1/wpfts-livesearch-get-presets`, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				  'X-WP-Nonce': _wpnonce,
				},
				body: JSON.stringify({
				  postId: wp.data.select('core/editor').getCurrentPostId() //Get current post ID from Gutenberg
				}),
			})
			.then((response) => response.text())
			.then((html) => { 
				let p = html.indexOf('{"wpfts_special_tag_for_clean_html":');
				if (p > -1) {
					html = html.substring(p);
				}
				let ps = [];
				try {
					let t = JSON.parse(html);
					ps = t.wpfts_special_tag_for_clean_html.presets || [];
				} catch (e) {
					ps = [];
				}
				setPresets(ps);
			});
		}, []);

		useEffect(() => {
			fetch(`/wp-json/fulltext-search/v1/wpfts-livesearch-block-renderer`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					  'X-WP-Nonce': _wpnonce,
					},
					body: JSON.stringify({
					  title: title,
					  preset: preset,
					  placeholder: placeholder,
					  buttonText: buttonText,
					  hideButton: hideButton,
					  cssClass: cssClass,
					  resultsUrl: resultsUrl,
					  postId: wp.data.select('core/editor').getCurrentPostId() //Get current post ID from Gutenberg
					}),
				})
				.then((response) => response.text())
				.then((html) => { 
					let p = html.indexOf('{"wpfts_special_tag_for_clean_html":');
					if (p > -1) {
						html = html.substring(p);
					}
					let h2 = '';
					try {
						let t = JSON.parse(html);
						h2 = t.wpfts_special_tag_for_clean_html || '';
					} catch (e) {
						h2 = '';
					}
					setHtml(h2);
				});
		}, [preset, title, placeholder, buttonText, hideButton, cssClass, resultsUrl]);

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Search Widget Settings')}>
						<TextControl
							label={__('Title')}
							value={title}
							onChange={(value) => setAttributes({ title: value })}
						/>
						<SelectControl
							label={__('Preset')}
							value={preset}
							options={presets}
							onChange={(value) => setAttributes({ preset: value })}
						/>
						<TextControl
							label={__('Placeholder Text')}
							value={placeholder}
							onChange={(value) => setAttributes({ placeholder: value })}
						/>
						<TextControl
							label={__('Button Text')}
							value={buttonText}
							onChange={(value) => setAttributes({ buttonText: value })}
						/>
						<CheckboxControl
							label={__('Hide Button')}
							checked={hideButton}
							onChange={(value) => setAttributes({ hideButton: value ? 1 : 0 })}
						/>
						<TextControl
							label={__('CSS Class')}
							value={cssClass}
							onChange={(value) => setAttributes({ cssClass: value })}
						/>
						<TextControl
							label={__('Results URL')}
							value={resultsUrl}
							onChange={(value) => setAttributes({ resultsUrl: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<RawHTML>{ html }</RawHTML>
				</div>
			</>
		);

	},
	save: ({ attributes }) => {
		// No need to render anything here, server-side rendering handles the output
		return null;
	},
});