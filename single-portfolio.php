<?php get_header(); ?>
<div class="w-container">
<?php 

    while ( have_posts() ) {
        the_post();
        the_content();
    }
?>
</div>

<div class="w-container">
  <a href="<?php echo site_url('portfolio');?>" class="w-button button-4" data-ix="show-side-contact">Back to categories</a>
</div>
  <div class="div-block-16"></div>
<?php get_footer(); ?>