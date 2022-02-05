<?php get_header(); ?>
<div class="max-w-screen-xl mx-auto">
  <div class="flex flex-col md:flex-row">
    <div class="basis-full md:basis-3/6 mt-10 md:mt-0 md:my-10">
      <img src="<?php echo get_theme_file_uri('/images/headshot-ben.jpg'); ?>"" style=" width: 825px">
    </div>

    <div class="basis-full md:basis-3/6 my-10">

      <div class="flex justify-center md:justify-start text-5xl tracking-widest">Ben Wittbrodt</div>
      <div class="flex justify-center md:justify-start text-2xl text-slate-500 tracking-widest">Data Analytics | Web Development</div>
      <div class="flex flex-row flex-wrap justify-around">
        <a href="<?php echo site_url('background'); ?>"><button class="w-36 text-lg bg-icon-main rounded-full m-2 px-4 py-2 text-white hover:bg-cyan-800 ease-in-out duration-200">Professional Background</button></a>
        <a href="<?php echo site_url('projects'); ?>"><button class="w-36 text-lg bg-icon-main rounded-full m-2 px-4 py-2 text-white hover:bg-cyan-800 ease-in-out duration-200">Coding<br>Projects</button></a>
        <a href="<?php echo site_url('restaurants'); ?>"><button class="w-36 text-lg bg-icon-main rounded-full m-2 px-4 py-2 text-white hover:bg-cyan-800 ease-in-out duration-200">Food<br>Guide</button></a>
        <a href="http://wiki.benwittbrodt.com" target="_blank"><button class="w-36 text-lg bg-icon-main rounded-full m-2 px-4 py-2 text-white hover:bg-cyan-800 ease-in-out duration-200">Visit My<br>Wiki</button></a>
      </div>

      <div class="flex flex-row justify-center">
        <a href="https://www.instagram.com/benwittbrodt/" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-instagram.svg'); ?>"></a>
        <a href="http://www.linkedin.com/in/benwittbrodt" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-linkedin.svg'); ?>"></a>
        <a href="https://www.facebook.com/benwittbrodt" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-facebook.svg'); ?>"></a>
        <a href="https://www.github.com/benwittbrodt" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-github.svg'); ?>"></a>
      </div>

    </div>
  </div>
</div>


<?php get_footer(); ?>