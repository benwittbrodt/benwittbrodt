<?php get_header(); ?>
<div class="center post-heading">
    <div style="margin-right: 5px"><?php the_post_thumbnail('homeLogo');?></div> 
    <h2><?php the_title();?></h2>
</div>
<div class="w-container">
    <?php 
        while ( have_posts() ) {
            the_post();
            
            //Get list of all taxonomy terms for the given post ID
            $term_obj_list = get_the_terms( $post->ID, 'technologies' ); 
                
                foreach($term_obj_list as $key) {
                    $icon = $key->slug;
                    ?>
                    <!-- sourcing icon for each technology type -->
                    <img style="height: 90px" src="<?php echo get_theme_file_uri('images/icons/' . $icon . '_small.png');?>" alt="">
                    <?php
                }
            the_content();
        }
    ?>
</div>

<?php get_footer(); ?>