<?php 

function background_archive($post){
	// Create templte for background archive HTML/PHP to group items
	echo 'test';
}



function icon_src($name) {
  echo get_theme_file_uri('/images/icons/' . $name . '.svg');  
}



function get_social_links() {

	global $post;
	
	$social_links_group_id = 135; // Post ID of the specifications field group.
	$social_links_fields = array();
	
	$fields = acf_get_fields( $social_links_group_id );
	
	foreach ( $fields as $field ) {
		$field_value = get_field( $field['name'] );
		
		if ( $field_value && !empty( $field_value ) ) {
			$social_links_fields[$field['name']] = $field;
			$social_links_fields[$field['name']]['value'] = $field_value;
		}
	}
	
	return $social_links_fields;

}