<?php get_header(); ?>
<!-- TO BE USED TO DEVELOP NEW LANDING PAGE THAT ISN'T JUST PHOTOGRAPHY BASED -->
<div class="row w-row">
  <div class="w-col w-col-6">
    <img src="<?php echo get_theme_file_uri('/images/headshot-ben.jpg'); ?>"" style=" width: 825px">
  </div>
  <div class="w-col w-col-6">
    <div class="index-div">
      <div class="text-block-3">Ben Wittbrodt</div>
      <div class="text-block-4">Data Analytics | Web Development</div>
      <div class="w-row margin">
        <a href="<?php echo site_url('background'); ?>"><button class="index-button">Professional<br>Background</button></a>
        <a href="<?php echo site_url('projects'); ?>"><button class="index-button">Coding<br>Projects</button></a>
        <a href="<?php echo site_url('restaurants'); ?>"><button class="index-button">Food<br>Guide</button></a>
        <a href="http://wiki.benwittbrodt.com" target="_blank"><button class="index-button">Visit My<br>Wiki</button></a>
      </div>

      <div class="div-40">
        <a href="https://www.instagram.com/benwittbrodt/" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-instagram.svg'); ?>"></a>
        <a href="http://www.linkedin.com/in/benwittbrodt" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-linkedin.svg'); ?>"></a>
        <a href="https://www.facebook.com/benwittbrodt" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-facebook.svg'); ?>"></a>
        <a href="https://www.github.com/benwittbrodt" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-github.svg'); ?>"></a>
      </div>
    </div>
  </div>
</div>
<div class="whitespace"></div>

<?php get_footer(); ?>