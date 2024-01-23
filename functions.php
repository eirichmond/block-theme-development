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

?>