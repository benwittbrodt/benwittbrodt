<?php get_header(); ?>
<div class="container">

    
    <h2 class=""><?php the_title(); ?></h2>

    <div class="row mb-4">
        <div  class="col d-flex align-items-center">
            <p class="text-muted my-auto">Updated on: <?php echo the_modified_time('F jS, Y'); ?></p>
        </div>
        <div style="height: 2rem;"  class="col d-flex align-items-center">

        <p class="my-auto me-2 text-muted">Using: 

        </p>
        <?php
        //Getting the "technologies" terms associated with each post
        $term_obj_list = get_the_terms($post->ID, 'technologies');
        foreach ($term_obj_list as $key) {
        $icon = $key->slug;
        ?>
        <img class="h-100 d-inline-block me-2" src="<?php echo get_theme_file_uri("assets/icons/icon_" . $icon . ".svg");?>"></img>
        
        <?php } ?>
        
        </div>
    </div>    

    

    <?php
    while (have_posts()) {
        the_post();
    ?>

    <?php
        the_content();
    }
    ?>
</div>

<?php get_footer(); ?>