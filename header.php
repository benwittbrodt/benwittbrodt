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
<div data-collapse="medium" data-animation="default" data-duration="400" class="portfolio_nav w-nav">
    <div class="w-container">
        <a href="<?php echo site_url('/'); ?>" aria-current="page" class="w-nav-brand w--current">
        <div class="logo-text portfolio">Ben<strong>Wittbrodt</strong></div>
        </a>
    <nav role="navigation" class="nav-menu w-nav-menu">
        <a href="<?php echo site_url('/'); ?>" aria-current="page" class="nav-link_pic w-nav-link w--current">Home</a>
        <a href="<?php echo site_url('/about'); ?>" class="nav-link_pic w-nav-link">About</a>
        <a href="photography/portfolio.html" class="nav-link_pic w-nav-link">Portfolio</a>
        <a href="photography/packages.html" class="nav-link_pic w-nav-link">Packages</a>
        <a href="#" data-ix="show-side-contact" class="nav-link_pic w-nav-link">Contact</a>
    </nav>
    <div class="menu-button w-nav-button">
        <div class="icon-3 w-icon-nav-menu"></div>
    </div>
</div>
  
</header>