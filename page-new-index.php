<?php get_header(); ?>
<!-- TO BE USED TO DEVELOP NEW LANDING PAGE THAT ISN'T JUST PHOTOGRAPHY BASED -->
<div class="row w-row">
    <div class="w-col w-col-6 w-col-medium-6">
        <img src="<?php echo get_theme_file_uri('/images/headshot-ben.jpg');?>"" style="width: 825px">
    </div>
    <div class="column-4 w-col w-col-6 w-col-medium-6">
      <div class="index-div">
        <div class="text-block-3">Ben Wittbrodt</div>
        <div class="text-block-4">M.S. Materials Science and Engineering</div>
        <div class="w-row margin">
          <a href="<?php echo site_url('background'); ?>"><button class="index-button">Background</button></a>
          <a href="<?php echo site_url('projects') ?>"><button class="index-button">Web Projects</button></a>
        </div>
        <div class="div-40">
            <a href="https://www.instagram.com/benwittbrodt/" target="_blank" class="index-icon w-inline-block"><img src="<?php echo get_theme_file_uri('/images/instagram.png'); ?>"></a>
            <a href="http://www.linkedin.com/in/benwittbrodt" target="_blank" class="index-icon w-inline-block"><img src="<?php echo get_theme_file_uri('/images/linkedin.png'); ?>"></a>
            <a href="https://www.facebook.com/benwittbrodt" target="_blank" class="index-icon w-inline-block"><img src="<?php echo get_theme_file_uri('/images/facebook.png'); ?>"></a>
            <a href="https://www.github.com/benwittbrodt" target="_blank" class="index-icon w-inline-block"><img src="<?php echo get_theme_file_uri('/images/github.png'); ?>"></a>
        </div>
      </div>
    </div>
  </div>
  <div class="whitespace"></div>

<?php get_footer(); ?>