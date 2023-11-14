<?php get_header(); ?>


   <!-- Page Content -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <img src="<?php echo get_theme_file_uri('/assets/headshot-ben.jpg'); ?>" alt="Ben Wittbrodt" class="img-fluid rounded-circle">
            </div>
            <div class="col-md-6">
                <h1 class="mt-5">Ben Wittbrodt</h1>
                <p class="lead">Data Analytics Leader</p>
                <p>Welcome to my personal website. I am passionate about data analytics and strive to make
                    data-driven decisions that impact business outcomes positively.</p>
                

                <!-- Placeholder Buttons for LinkedIn and GitHub -->
                <div class="mt-4">
                    <a href="https://www.linkedin.com/in/benwittbrodt/" class="btn btn-primary me-2"><i class="fab fa-linkedin"></i> LinkedIn</a>
                    <a href="https://github.com/benwittbrodt" class="btn btn-dark"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Placeholder for Projects -->
    <div class="container mt-5">
        <h2>Recently Updated Projects</h2>
        
        <div class="row">
            <?php 
            // Query for the projects post types and placeing into the row/columns 
            // TODO: Add pages?, only have 1 row at the moment
            $args = array(
                'post_type' => 'project',
                'posts_per_page' => 3
            );
            $query = new WP_Query($args);
            
            while ($query->have_posts()) :  $query->the_post();
            // getting the image URL to use below in the card 
            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
    
            <div class="col-md-4 mb-3">

                <div class="card h-100">

                    <a href="<?php the_permalink(); ?>" class="card-link">    
                    <img src="<?echo $image[0]; ?>" class="card-img-top">
                    
                    <div class="card-body">
                        <h5 class="card-title"><?php the_title(); ?></h5>
                    </a>
                    <div class="project-icons">
                        <i class="fab fa-python"></i>
                        <i class="fas fa-database"></i>
                        <i class="fab fa-js"></i>
                    </div>    
                    </div>
                </div>
            </div>
            <?php    
            endwhile;
            wp_reset_postdata();
            ?>
            
        </div>
        
    </div>
    <!-- END placeholder for Projects -->
<?php get_footer();  ?>

