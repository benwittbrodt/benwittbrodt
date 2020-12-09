<?php get_header(); ?>

<h2 class="center archive-heading">All Web Projects</h2>
    <div class="w-container">
    <div>
    <p>A brief highlight of web based projects and some design related projects that I have been working on. If you are looking to revamp your online presence and need something from a single landing page to a whole website redesign and software asset package to match, reach out via my contact page and we can discuss your project further!</p>
   <a href="<?php echo site_url('contact');?>"><button class="index-button">Contact Me</button></a>
    </div>
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
                <?php 
                $term_obj_list = get_the_terms( $post->ID, 'technologies' );
             
                foreach($term_obj_list as $key) {
                $icon = $key->slug;
                ?>
                <i style="color: black" class="fab fa-<?php echo $icon;?>"></i>
                <?php
                }
                ?>
            </div>
            </a>
        <?php    
        }
        ?>
</div>

<div class="whitespace"></div>

<?php get_footer(); ?>