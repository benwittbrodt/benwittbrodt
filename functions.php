<?php

function benwittbrodt_files() {
  wp_enqueue_script('main-university-js', get_theme_file_uri('/js/scripts-bundled.js'), NULL, '1.0', true);
  wp_enqueue_script('webflow-js', get_theme_file_uri('/js/webflow.js'), NULL, '1.0', true);
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  wp_enqueue_style('font-awesome', 'https://use.fontawesome.com/releases/v5.13.0/css/all.css');
  wp_enqueue_style('benwittbrodt_main_styles', get_stylesheet_uri());
}

add_action('wp_enqueue_scripts', 'benwittbrodt_files');

function benwittbrodt_features() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('background', 325, 0, false);
  add_image_size('homeLogo', 80,80, false);
}

add_action('after_setup_theme', 'benwittbrodt_features');

function my_post_types() {
  //Background Post Type
  register_post_type('background',array(
      'supports' => array('title','editor', 'thumbnail', 'excerpt','revisions'),
      'taxonomies' => array('category', 'post_tag'),
      'has_archive' => true,
      'public' => true,
      'menu_icon' => 'dashicons-businessperson',
      'labels' => array(
          'name' => 'Background',
          'add_new_item' => 'Add New Background',
          'edit_item' => 'Edit Background',
          'all_items' => 'All Backgrounds',
          'singular_name' => 'Background'
      )
  ));
  register_post_type('portfolio', array(
    'supports' => array('title', 'editor','thumbnail','revisions'),
    'show_in_rest' => true,
    'has_archive' => true,
    'public' => true, 
    'menu_icon' => 'dashicons-format-gallery',
    'labels' => array(
      'name' => 'Portfolio',
      'add_new_item' => 'Add New Portfolio',
      'edit_item' => 'Edit Portfolio',
      'all_items' => 'All Portfolios',
    )
    ));
  register_post_type('project', array(
    'supports' => array('title', 'editor','thumbnail'),
    'rewrite' => array('slug' => 'projects'),
    'show_in_rest' => true,
    'has_archive' => true,
    'public' => true, 
    'menu_icon' => 'dashicons-media-code',
    'labels' => array(
      'name' => 'Projects',
      'add_new_item' => 'Add New Project',
      'edit_item' => 'Edit Project',
      'all_items' => 'All Projects',
    )
  ));
}
add_action('init','my_post_types');