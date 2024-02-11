<?php
require("dry_functions.php");

function benwittbrodt_files()
{
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
//   wp_enqueue_style('font-awesome', 'https://use.fontawesome.com/releases/v5.13.0/css/all.css');
//   wp_enqueue_style('tailwind', get_template_directory_uri() . '/assets/css/main.css', array());
//   wp_enqueue_script('script', get_theme_file_uri('/js/script.js'), NULL, '1.0', true);
}

add_action('wp_enqueue_scripts', 'benwittbrodt_files');

function benwittbrodt_features()
{
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('background', 325, 0, false);
  add_image_size('homeLogo', 80, 80, false);
}

add_action('after_setup_theme', 'benwittbrodt_features');

function my_post_types()
{
  //Background Post Type
  register_post_type('background', 
    array(
      'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
      'rewrite' => array('slug'=>'background'),
      'taxonomies' => array('category', 'post_tag'),
      'show_in_rest' => true,
      'has_archive' => true,
      'public' => true,
      'menu_icon' => 'dashicons-businessperson',
      'labels' => array(
        'name' => __('Background'),
        'add_new_item' => __('Add New Background'),
        'edit_item' => __('Edit Background'),
        'all_items' => __('All Backgrounds'),
        'singular_name' => __('Background')
      )
  ));
  register_post_type('project', array(
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    'rewrite' => array('slug' => 'projects'),
    'show_in_rest' => true,
    'has_archive' => true,
    'public' => true,
    'menu_icon' => 'dashicons-clipboard',
    'labels' => array(
      'name' => __('Projects'),
      'add_new_item' => __('Add New Project'),
      'edit_item' => __('Edit Project'),
      'all_items' => __('All Projects'),
    )
  ));
}
add_action('init', 'my_post_types');

//Add new taxonomy for projects so I can add in coding languages etc.

add_action('init', 'create_projects_taxonomy', 0);
function create_projects_taxonomy()
{

  //Define the options present within the taxonomy
  //Currently set up to be heirarchical, but likely will remove
  $labels = array(
    'name' => _x('Technologies', 'taxonomy general name'),
    'singular_name' => _x('Technology', 'taxonomy singular name'),
    'search_items' => __('Search Technologies'),
    'all_items' => __('All Technologies'),
    'parent_item_colon' => __('Parent Technology:'),
    'edit_item' => __('Edit Technology'),
    'update_item' => __('Update Technology'),
    'add_new_item' => __('Add New Technology'),
    'new_item_name' => __('New Technology Name'),
    'menu_name' => __('Technologies'),
  );

  register_taxonomy('technologies', array('project'), array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_in_rest' => true,
    'show_admin_column' => true,
    'query_var' => true,
  ));
}


add_action( 'pre_get_posts', 'background_custom_wp_query', 10 );

/**
 * Sorts portfolio project posts by most recent start date.
 *
 * @param \WP_Query $query The WP_Query instance (passed by reference).
 */
function background_custom_wp_query( $query ) {
	if ( $query->is_post_type_archive( 'background' ) ) {
		// Sort portfolio posts by project start date.
		$query->set( 'order', 'DESC' );
		$query->set( 'orderby', 'meta_value_num' );
		// ACF date field value is stored like 20220328 (YYYYMMDD).
		// $query->set( 'meta_key', 'end_date' );
	}
}