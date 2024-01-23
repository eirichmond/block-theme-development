<?php

/**
 * Add a filter at block level 
 *
 * @param string $block_content
 * @param array $block
 * @return void
 */
function holdinghands_template_part( $block_content, $block ) {
    
    // return if not header
    if(isset($block['attrs']['tagName']) && $block['attrs']['tagName'] != 'header' ) {
        return $block_content;
    }

    // Append the custom class to the block.
    $p = new WP_HTML_Tag_Processor( $block_content );
    if ( $p->next_tag() ) {
        $p->add_class( 'site-header' );
    }

    $block_content = $p->get_updated_html();
    return $block_content;

}
add_filter( 'render_block_core/template-part', 'holdinghands_template_part', 10, 2 );

/**
 * Enqueue javascript file for the front end functionality
 *
 * @return void
 */
function holdinghands_enqueue_scripts() {
    wp_enqueue_script( 'holdinghands-enqueue-scripts', get_template_directory_uri() . '/assets/js/group-animated.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'holdinghands_enqueue_scripts' );

/**
 * Adds css style sheet at block level
 * 
 * wp_enqueue_block_style();
 *
 * @return void
 */
function holdinghands_enqueue_block_styles() {
    wp_enqueue_block_style(
        'core/group',
        array(
            'handle' => 'animated-green-background',
            'src' => get_stylesheet_directory_uri() . '/assets/css/group-animated.css',
            'version' => wp_get_theme( get_template() )->get( 'Version' ),
            'path' => get_stylesheet_directory_uri() . '/assets/css/group-animated.css'
        )
    );
}
add_action( 'init', 'holdinghands_enqueue_block_styles' );

/**
 * Enqueue Editor assets.
 */
function holdinghands_enqueue_editor_assets() {
    $asset_file = include( get_template_directory() . '/build/index.asset.php');

    wp_enqueue_script(
        'holdinghands-editor-scripts',
        get_template_directory_uri() . '/build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_enqueue_style(
		'holdinghands-editor-styles',
		get_template_directory_uri() . '/build/index.css',
	);

}
add_action( 'enqueue_block_editor_assets', 'holdinghands_enqueue_editor_assets' );

/**
 * Add a filter at block level 
 *
 * @param string $block_content
 * @param array $block
 * @return void
 */
function holdinghands_append_swap_logo( $block_content, $block ) {
    $alternativeImageId = isset( $block['attrs']['alternativeImageId'] ) ? $block['attrs']['alternativeImageId'] : false;
    
    if ( ! $alternativeImageId ) {
		return $block_content;
	}
    
    $additional_image_url = wp_get_attachment_image_url( $alternativeImageId, array($block['attrs']['width']) );
    $additional_image_src = wp_get_attachment_image_srcset( $alternativeImageId, array($block['attrs']['width']) );

    // Create a DOMDocument object
    $dom = new DOMDocument();
    $dom->loadHTML($block_content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    // Create a DOMXPath object
    $xpath = new DOMXPath($dom);

    // Find the existing img element
    $imgNode = $xpath->query('//div[@class="wp-block-site-logo"]//img')->item(0);

    if ($imgNode) {
        // Create a new img element
        $newImg = $dom->createElement('img');
        $newImg->setAttribute('width', $block['attrs']['width']);
        $newImg->setAttribute('src', $additional_image_url);
        $newImg->setAttribute('srcset', $additional_image_src);
        $newImg->setAttribute('class', 'custom-logo-alternative');
        $newImg->setAttribute('id', 'swap-logo');

        // Append the new img element after the existing img
        $imgNode->parentNode->appendChild($newImg);
    }

    $block_content = $dom->saveHTML();

    return $block_content;
}
add_filter( 'render_block_core/site-logo', 'holdinghands_append_swap_logo', 10, 2 );

/**
 * Filter the custom logo and add an id for use with javascript 
 *
 * @param array $custom_logo_attr
 * @param int $custom_logo_id
 * @param int $blog_id
 * @return void
 */
function holdinghands_add_custom_logo_id( $custom_logo_attr, $custom_logo_id, $blog_id ) {
    $custom_logo_attr['id'] = 'custom-logo';
    return $custom_logo_attr;
}
add_filter( 'get_custom_logo_image_attributes', 'holdinghands_add_custom_logo_id', 10, 3 );


?>