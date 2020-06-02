<?php get_header(); ?>
test
<?php 

    while ( have_posts() ) {
        the_post();
      echo the_title();
    }
?>


<div class="w-container">
  <a href="<?php echo site_url('portfolio');?>" class="w-button button-4" data-ix="show-side-contact">Back to categories</a>

  <div class="div-block-16"></div>
<?php get_footer(); ?>