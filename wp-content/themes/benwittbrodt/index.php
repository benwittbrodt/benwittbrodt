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
                <!-- Add more content here as needed -->

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
        <h2>Projects</h2>

        <?php 
        // Query for the projects post types and placeing into the row/columns 
        // TODO: Add pages?, only have 1 row at the moment
         $args = array(
            'post_type' => 'project'
        );

        $query = new WP_Query($args);
        $i = 0;
        while ($query->have_posts()){ 
            $query->the_post();
            the_title(); 
            
        the_post_thumbnail('thumbnail');
      
        }
        ?>

        <div class="row">
            <div class="col-md-4 project">
                <img src="" alt="Project 1" class="img-fluid rounded">
                <div class="project-title mt-2">Project 1</div>
                <div class="project-icons">
                    <i class="fab fa-python"></i>
                    <i class="fas fa-database"></i>
                    <i class="fab fa-js"></i>
                </div>
            </div>
            <div class="col-md-4 project">
                <img src="project2.jpg" alt="Project 2" class="img-fluid rounded">
                <div class="project-title mt-2">Project 2</div>
                <div class="project-icons">
                    <i class="fab fa-python"></i>
                    <i class="fas fa-database"></i>
                    <i class="fab fa-js"></i>
                </div>
            </div>
            <div class="col-md-4 project">
                <img src="project3.jpg" alt="Project 3" class="img-fluid rounded">
                <div class="project-title mt-2">Project 3</div>
                <div class="project-icons">
                    <i class="fab fa-python"></i>
                    <i class="fas fa-database"></i>
                    <i class="fab fa-js"></i>
                </div>
            </div>
            <!-- Add more project entries as needed -->
        </div>
    </div>
<?php get_footer();  ?>