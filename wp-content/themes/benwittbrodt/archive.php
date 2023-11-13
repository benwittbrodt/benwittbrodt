<?php get_header(); ?>

<div class="container">
    
    <?php 
    echo str_replace('Archives:','All',get_the_archive_title());
    while(have_posts()) {
        
        the_post();
        ?>
        <ul>
            <li>
            <a href="<?php echo get_the_permalink(); ?>"><?php the_title();?></a></li>
        </ul>
        
    <?php } ?>
</div>



<?php get_footer();?>