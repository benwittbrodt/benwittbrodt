<?php get_header(); ?>

<div class="container-5 w-container">
<?php 
  while( have_posts() ) {
    the_post(); ?>
      <div class="w-col w-col-6" style="margin-bottom: 15px">
        <a href="<?php echo the_permalink();?>" class="w-inline-block">
          <img src="<?php echo get_the_post_thumbnail_url();?>"> 
          <div class="tile-text"><?php echo the_title(); ?></div>
        </a>
      </div>
  <?php }
?>
   
</div>
<div class="w-container">
  <a href="<?php echo site_url('photography');?>"><button class="index-button">Back to Photography</button></a>
</div>
<div class="div-block-16"></div>

<?php get_footer(); ?>