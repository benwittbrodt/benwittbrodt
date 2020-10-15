<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
    <script type="text/javascript">WebFont.load({  google: {    families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic","Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"]  }});</script>
    <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>

  </head>
<body>
<header>
  

<div data-collapse="medium" data-animation="default" data-duration="400" class="main-nav w-nav">
  <a href="<?php echo site_url('/'); ?>"><img src="<?php echo get_theme_file_uri('/images/new_logo_nav.png');?>" style="height: 60px; float: left; display: inline-block; margin-right: 10px;" alt=""></a>
  <!-- Small mobile menu icon -->
  <div class="menu-button w-nav-button">
    <div class="icon-3 w-icon-nav-menu"></div>
  </div>
  
  <div class="w-container">
  
    <a href="<?php echo site_url('/'); ?>" class="w-nav-brand">
      <div class="logo-text header">Ben<strong class="semibold">Wittbrodt</strong></div>
    </a>
    <nav role="navigation" class="nav-menu w-nav-menu">
      <a href="<?php echo site_url('/'); ?>" class="nav-link_pic w-nav-link <?php if ( is_home() ) echo 'current-page'?>">Home</a>
      <a href="<?php echo site_url('/background'); ?>" class="nav-link_pic w-nav-link <?php if ( get_post_type() == 'background') echo 'current-page'?>">Background</a>
      <a href="<?php echo site_url('/projects'); ?>" class="nav-link_pic w-nav-link <?php if ( is_page('project') || get_post_type() == 'project' ) echo 'current-page'?>">Projects</a>
      <!-- <a href="<?php echo site_url('/photography'); ?>" class="nav-link_pic w-nav-link <?php if ( is_page('photography') || get_post_type() == "portfolio" || is_page('packages') ) echo 'current-page'?>">Photography</a> -->
      <a href="<?php echo site_url('/restaurants'); ?>" class="nav-link_pic w-nav-link <?php if ( is_page('restaurants') || get_post_type() == "restaurant" || is_page('locations') ) echo 'current-page'?>">Food Guide</a>
      <a href="<?php echo site_url('contact');?>" class="nav-link_pic w-nav-link <?php if ( is_page('contact')) echo 'current-page'?>">Contact</a>
    </nav>
    <!--  -->
  </div>
  
</div>  

</header>