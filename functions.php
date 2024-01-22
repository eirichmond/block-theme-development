<?php

/**
 * Adds a inline css style to a core block
 * 
 * register_block_style();
 *
 * @return void
 */

function holdinghands_block_styles() {
    register_block_style(
        'core/group',
        array(
            'name'         => 'animated-green-background',
            'label'        => __( 'Animated', 'holdinghands' )
        )
    );
}
add_action( 'init', 'holdinghands_block_styles' );

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
 * 
 */

function holdinghands_enqueue_scripts() {
    wp_enqueue_script('holdinghands-enqueue-scripts', get_template_directory_uri() . '/assets/js/group-animated.js', array('jquery'), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'holdinghands_enqueue_scripts' );


/**
 * Enqueue Editor assets.
 */
function example_project_enqueue_editor_assets() {
    

    $asset_file = include( get_template_directory() . '/build/index.asset.php');

    wp_enqueue_script(
        'example-editor-scripts',
        get_template_directory_uri() . '/build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_enqueue_style(
		'example-editor-scripts',
		get_template_directory_uri() . '/build/index.css',
	);
}
add_action( 'enqueue_block_editor_assets', 'example_project_enqueue_editor_assets' );

/**
 * Render icons on the frontend.
 */
function enable_column_direction_render_block_columns( $block_content, $block ) {
    $alternativeImageId = isset( $block['attrs']['alternativeImageId'] ) ? $block['attrs']['alternativeImageId'] : false;
    
    if ( ! $alternativeImageId ) {
		return $block_content;
	}

    
    // Since we will need the JavaScript for this block, now enqueue it.
    // Note: Remove if not using front-end JavaScript to control column order.
    wp_enqueue_script( 'enable-column-direction-frontend-scripts' );
    
    $additionalImg = wp_get_attachment_image( $alternativeImageId, array($block['attrs']['width']), '', array( 'class' => 'custom-logo-alternative', 'id' => 'swap-logo' ) );

    // Create a DOMDocument from the HTML string
    $dom = new DOMDocument();
    $dom->loadHTML($block_content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    // Find the parent div with class 'wp-block-site-logo'
    $logoDiv = $dom->getElementsByTagName('div')->item(0);

    // Create a new DOMDocument from the additional img HTML string
    $additionalImgDom = new DOMDocument();
    $additionalImgDom->loadHTML($additionalImg, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    // Import the additional img node to the original DOMDocument
    $importedNode = $dom->importNode($additionalImgDom->getElementsByTagName('img')->item(0), false);

    // Append the additional img node after the existing image node
    $logoDiv->appendChild($importedNode);

    $block_content = $dom->saveHTML();

    return $block_content;
}

add_filter( 'render_block_core/site-logo', 'enable_column_direction_render_block_columns', 10, 2 );

function add_custom_logo_id( $custom_logo_attr, $custom_logo_id, $blog_id ) {

    $custom_logo_attr['id'] = 'custom-logo';
    return $custom_logo_attr;

}
add_filter( 'get_custom_logo_image_attributes', 'add_custom_logo_id', 10, 3 );