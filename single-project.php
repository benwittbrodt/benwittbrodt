<?php get_header(); ?>
<div class="center post-heading">
<div style="margin-right: 5px"><?php the_post_thumbnail('homeLogo');?></div> <h2> <?php the_title();?></h2>
</div>
<div class="w-container">

    <?php 
        while ( have_posts() ) {
            the_post();
            the_content();
        }
    ?>

</div>

<?php get_footer(); ?>