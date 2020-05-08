<?php

function benwittbrodt_files() {
  wp_enqueue_script('main-university-js', get_theme_file_uri('/js/scripts-bundled.js'), NULL, '1.0', true);
  wp_enqueue_script('webflow-js', get_theme_file_uri('/js/webflow.js'), NULL, '1.0', true);
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  wp_enqueue_style('font-awesome', 'https://use.fontawesome.com/releases/v5.5.0/css/all.css');
  wp_enqueue_style('benwittbrodt_main_styles', get_stylesheet_uri());
}

add_action('wp_enqueue_scripts', 'benwittbrodt_files');

function benwittbrodt_features() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('listingLogo', 100, 100);
  add_image_size('homeLogo', 80,80, false);
}

add_action('after_setup_theme', 'benwittbrodt_features');
