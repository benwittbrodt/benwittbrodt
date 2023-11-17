<?php get_header(); ?>
<div class="container">

    
    <h2 class=""><?php the_title(); ?></h2>

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

<div class="container">
    <h4 class="">Updated on: <?php echo the_modified_time('F jS, Y'); ?></h4>
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