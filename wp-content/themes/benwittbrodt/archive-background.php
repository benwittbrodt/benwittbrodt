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
                    <img src="<?echo $image[0]; ?>" class="card-img-top p-4">
                    
                    <div class="card-body">
                        <h5 class="card-title"><?php the_title(); ?></h5>
                    </a>
                    <p class="text-muted" ><?php echo get_field('start_date'); ?> - <?php echo get_field('end_date'); ?></p>
                    <?php the_content(); ?>
                    </div>
                </div>
            </div>
            <?php    
                        
            }
            wp_reset_postdata();
            ?>
            
        </div>
        <!-- WORKING ON: grouping experience by tags -->
        <div class="col-lg-8"> 
            <div class="row card">

         <?php 
         $query = new WP_Query( array( 
            'post_type' => 'background',
            'tag' => 'sermo' ) );
        
            ?>
            <div class="text-center">
            <img style="max-height: 175px;" class="img-fluid mx-auto d-block p-4" src="<?php echo get_theme_file_uri("/assets/bg_logos/logo_sermo.png"); ?>" alt="">
            </div>
            
            <?php
            while ( $query->have_posts() ) {
                
            
                
                $query->the_post();
                
                ?>
                
                <div>
                    <h3>
                        <?php echo get_the_title(); ?>
                    </h3>
                    
                    <h6 class="text-muted">
                        <?php echo get_field('start_date'); ?> - <?php $test = (get_field('end_date')) ? get_field('end_date') : "Present" ;echo $test ?>
                    </h6>
                    <p>
                        <?php echo get_the_content(); ?>
                    </p>
                
                </div>
                <?php 
    
            }
    wp_reset_postdata();
         ?>   
</div>


        </div>

    </div>
    
    
</div>



<?php get_footer();?>