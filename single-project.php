<?php get_header(); ?>
<div class="center post-heading">
    <div style="margin-right: 5px"><?php the_post_thumbnail('homeLogo');?></div> 
    <h2 style="border-right: 2px solid black; padding-right: 10px; margin-right: 10px"><?php the_title();?></h2>
    
    <?php 
     //Get list of all taxonomy terms for the given post ID
    $term_obj_list = get_the_terms( $post->ID, 'technologies' ); 
                
    foreach($term_obj_list as $key) {
        $icon = $key->slug;
        if ($icon=="php"){
        echo '<img class="technology-icon" src="https://img.icons8.com/offices/40/000000/php-logo.png"/>';    
        }else{
          echo  '<img class="technology-icon" src="https://img.icons8.com/color/48/000000/' . $icon . '.png"/>';
        }
        ?>
        <!-- sourcing icon for each technology type -->
        
        <?php
    }?>     
</div>

<div class="w-container">
<h4 style="color: #4F4789;" class="center">Updated on: <?php echo the_modified_time('F jS, Y'); ?></h4>
    <?php 
        while ( have_posts() ) {
            the_post();
            ?>
            
            <?php
            the_content();
        }
    ?>
</div>

<?php get_footer(); ?>