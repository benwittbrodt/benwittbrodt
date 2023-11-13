<?php get_header(); ?>
<div class="container">

    
    <h2 class=""><?php the_title(); ?></h2>

    <?php
    //Get list of all taxonomy terms for the given post ID
    $term_obj_list = get_the_terms($post->ID, 'technologies');

    foreach ($term_obj_list as $key) {
        $icon = $key->slug;
        //grab svg images for all icons based on the taxonomy list
    ?>
        <img class="h-10 ml-2" src="<?php icon_src('icons8-' . $icon); ?>" />
    <?php
    } ?>
</div>

<div class="container">
    <h4 class="text-center text-lg text-violet-700 my-2">Updated on: <?php echo the_modified_time('F jS, Y'); ?></h4>
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