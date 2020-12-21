<?php get_header(); 


?>

<div class="w-big-container">
    <div class="flex-bg">
        <div class="flex-col">
            <h1 class="background_heading">Education</h1>
            <?php
            $education_query = new WP_Query( array( 
                'post_type'=> 'background',
                'category_name' => 'education', 
                'order' => 'ASC',
                'orderby' => 'ID'
                ) );

            while ( $education_query->have_posts() ) {
                $education_query->the_post();?>
                <div class="bg-item card">
                    <div class="card-logo-img"><?php the_post_thumbnail('background');?></div>
                    <h3 class="extramargin"><?php the_title();?></h3>
                    <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-calendar'); ?>"/> <?php echo get_field('end_date'); ?></h4>
                    <div class="extramargin">
                    <?php the_content(); ?>
                    </div>
                </div>
            <?php } wp_reset_postdata();?>
        </div>
        <div class="flex-col">
            <h1 class="background_heading">Research</h1>
            <?php
            $research_query = new WP_Query( array( 
                'post_type'=> 'background',
                'category_name' => 'publication', 
                'order' => 'ASC',
                'orderby' => 'ID'
                ) );

            while ( $research_query->have_posts() ) {
                $research_query->the_post();?>
                <div class="bg-item card">
                <h4 class="extramargin"><?php the_title();?></h4>
                <hr class="hr2">
                <div class="research-content extramargin"><?php the_content(); ?></div>
                </div>
            <?php } wp_reset_postdata();?>
        </div>
        
        <div class="flex-col">
            <h1 class="background_heading">Experience</h1>
            <?php
            $experience_query = new WP_Query( array( 
                'post_type'=> 'background',
                'category_name' => 'experience',
                'order' => 'ASC',
                'orderby' => 'ID'
                 ) );

            while ( $experience_query->have_posts() ) {
                $experience_query->the_post();?>
                <div class="bg-item card">
                    <div class="card-logo-img"><?php the_post_thumbnail('background');?></div>
                    <h3 class="extramargin"><?php the_title();?></h3>
                    <?php if ( ! get_field( 'end_date' ) ) { ?>
                    <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-calendar'); ?>"/> <?php echo get_field('start_date') . ' - Present'?></h4>
                    <?php } else { ?>
                    <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-calendar'); ?>"/> <?php echo get_field('start_date') . ' - ' . get_field('end_date'); ?></h4>
                    <?php } ?>
                    <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-map_pin'); ?>"/> <?php echo get_field('location'); ?></h4>
                    <div class="extramargin"><?php the_content();  ?></div>
                </div>
            <?php } wp_reset_postdata();?>
        </div>        
    </div>
</div>

<?php get_footer(); ?>