<?php get_header(); 
$term_obj_list = get_the_terms($post->ID, 'technologies');
?>
<div class="container">
    <h2 class="mt-5"><?php the_title(); ?></h2>
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-sm-4">
        <img src="<?php echo get_the_post_thumbnail_url();?>" class="img-fluid rounded-start" >
        </div>
        <div class="col-sm-8">
        <div class="card-body">
            <h5 class="card-title">Using: </h5>
            
            <?php
        //Getting the "technologies" terms associated with each post
        
        foreach ($term_obj_list as $key) {
        $icon = $key->slug;
        ?>
        <img class="d-inline-block me-2" style="height: 2.5rem;" src="<?php echo get_theme_file_uri("assets/icons/icon_" . $icon . ".svg");?>"></img>
        
        <?php } ?>
            <p class="text-muted mb-0 pt-2">Updated on: <?php echo the_modified_time('F jS, Y'); ?></p>
        </div>
        </div>
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