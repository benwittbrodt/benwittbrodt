<?php get_header(); ?>
<div class="center post-heading">
    <div style="margin-right: 5px"><?php the_post_thumbnail('homeLogo');?></div> 
    <h2 style="border-right: 2px solid black; padding-right: 10px; margin-right: 10px"><?php the_title();?></h2>
    
    <?php 
     //Get list of all taxonomy terms for the given post ID
    $term_obj_list = get_the_terms( $post->ID, 'technologies' ); 
                
        foreach($term_obj_list as $key) {
            $icon = $key->slug;
            ?>
            <!-- sourcing icon for each technology type -->
            <img class="technology-icon" src="<?php echo get_theme_file_uri('images/icons/' . $icon . '_small.png');?>" alt="">
            <?php
        } ?>     
</div>

<div class="w-container">
<h4 style="color: #4F4789;" class="center">Updated on: <?php echo the_modified_time('F jS, Y'); ?></h4>
    <?php 
        while ( have_posts() ) {
            the_post();
            ?>
            
            <?php
            the_content();
        }
    ?>
</div>

<?php get_footer(); ?>