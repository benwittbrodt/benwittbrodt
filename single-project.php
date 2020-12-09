<?php get_header(); ?>
<div class="center post-heading">
<div style="margin-right: 5px"><?php the_post_thumbnail('homeLogo');?></div> <h2> <?php the_title();?></h2>
</div>
<div class="w-container">

    <?php 
        while ( have_posts() ) {
            the_post();
            
            //Get list of all taxonomy terms for the given post ID
            $term_obj_list = get_the_terms( $post->ID, 'technologies' );
            print_r($term_obj_list);
            the_content();
        }
    ?>

</div>

<?php get_footer(); ?>