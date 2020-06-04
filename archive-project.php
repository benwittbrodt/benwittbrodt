<?php get_header(); ?>

<div class="w-container">


<?php 
    while ( have_posts() ) {
        the_post();
?>   
        <a style="color: black" href="<?php echo get_the_permalink();?>">
        <div class="card w-col w-col-3">
            <div class="center">
            <?php the_post_thumbnail( 'thumbnail' );?>
            </div>
            <h2 class="center"><?php the_title();?></h2>
        </div>
        </a>
<?php    
    }
?>
</div>
<div class="div-block-16"></div>
<?php get_footer(); ?>