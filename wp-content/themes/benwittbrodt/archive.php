<?php get_header(); ?>

<div class="container">
    <div class="container mt-5">
        <h2><?php echo str_replace('Archives:','All',get_the_archive_title());?></h2>
        
        <div class="row">
            <?php 
            
            while(have_posts()){
                the_post();
            // getting the image URL to use below in the card 
            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
    
            <div class="col-md-4 mb-3">

                <div class="card h-100">

                    <a href="<?php the_permalink(); ?>" class="card-link">    
                    <img src="<?echo $image[0]; ?>" class="card-img-top">
                    
                    <div class="card-body">
                        <h5 class="card-title"><?php the_title(); ?></h5>
                    </a>
                    <div style="height: 2.5rem;">
                        <?php
                        //Getting the "technologies" terms associated with each post
                        $term_obj_list = get_the_terms($post->ID, 'technologies');
                        foreach ($term_obj_list as $key) {
                        $icon = $key->slug;
                        ?>
                        <img class="h-100 d-inline-block" src="<?php echo get_theme_file_uri("assets/icons/icon_" . $icon . ".svg");?>"></img>
                       
                        <?php } ?>
                    </div>    
                    </div>
                </div>
            </div>
            <?php    
                        
            }
            wp_reset_postdata();
            ?>
            
        </div>
        
    </div>
    <!-- END placeholder for Projects -->
    
</div>



<?php get_footer();?>