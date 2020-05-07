<?php get_header(); ?>

<div class="container-5 w-container">
    <div class="row-5 w-row">
        <div class="w-col w-col-6">
          <a href="<?php echo site_url('/portfolio/people');?>" class="w-inline-block">
          <img src="<?php echo get_theme_file_uri('/images/people-link.jpg');?>" style="width: 1500px"> 
          <div class="tile-text">People</div>
          </a>
        </div>

        <div class="w-col w-col-6">
          <a href="<?php echo site_url('/portfolio/places');?>" class="w-inline-block">
          <img src="<?php echo get_theme_file_uri('/images/places-link.jpg');?>" style="width: 1500px">
          <div class="tile-text">Places</div>
          </a>
        </div>
    </div>
    
    <div class="row-4 w-row">
      <div class="w-col w-col-6">
        <a href="<?php echo site_url('/portfolio/puppies');?>" class="w-inline-block">
        <img src="<?php echo get_theme_file_uri('/images/puppies-link.jpg');?>" style="width: 1500px">
        <div class="tile-text">Puppies</div>
        </a>
      </div>
      <div class="w-col w-col-6"></div>
    </div>
</div>
<div class="div-block-17"></div> <!--Might be able to reduce this to div-block-16 -->

<?php get_footer(); ?>