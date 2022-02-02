<?php get_header(); ?>
<div class=w-big-container>
  <div class="row w-row">
    <div class="w-col w-col-6">
      <img src="<?php echo get_theme_file_uri('/images/headshot-ben.jpg'); ?>"" style=" width: 825px">
    </div>
    <div class="w-col w-col-6">
      <div class="index-div">
        <div class="text-block-3">Ben Wittbrodt</div>
        <div class="text-block-4">Data Analytics | Web Development</div>
        <div class="flex flex-row flex-wrap justify-around">
          <a href="<?php echo site_url('background'); ?>"><button class="w-40 h-16 bg-emerald-800 rounded-full my-2 px-4 py-2 text-white hover:bg-emerald-600 ease-in-out duration-200">Professional<br>Background</button></a>
          <a href="<?php echo site_url('projects'); ?>"><button class="w-40 h-16 bg-emerald-800 rounded-full my-2 px-4 py-2 text-white hover:bg-emerald-600 ease-in-out duration-200">Coding<br>Projects</button></a>
          <a href="<?php echo site_url('restaurants'); ?>"><button class="w-40 h-16 bg-emerald-800 rounded-full my-2 px-4 py-2 text-white hover:bg-emerald-600 ease-in-out duration-200">Food<br>Guide</button></a>
          <a href="http://wiki.benwittbrodt.com" target="_blank"><button class="w-40 h-16 bg-emerald-800 rounded-full my-2 px-4 py-2 text-white hover:bg-emerald-600 ease-in-out duration-200">Visit My<br>Wiki</button></a>
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
</div>


<?php get_footer(); ?>