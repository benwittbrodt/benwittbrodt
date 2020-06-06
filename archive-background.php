<?php get_header(); ?>

<div class="w-container">
    <div class="w-row">
        <div class="w-col w-col-6">
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
                <div class="w-richtext">
                <div><?php the_post_thumbnail('background');?></div>
                <h3><?php the_title();?></h3>
                <h4><?php echo get_field('end_date'); ?></h4>
                <?php 
                the_content();  ?>
            </div>
            <?php } wp_reset_postdata();?>

        <h1 class="background_heading">Research</h1>
          <div class="w-richtext">
            <p>Life-cycle economic analysis of distributed manufacturing with open-source 3-D printers</p>
            <p>B.T. Wittbrodt, A.G. Glover, J. Laureto, G.C. Anzalone, D. Oppliger, J. L. Irwin, J.M. Pearce,Mechatronics, 23, pp. 713-726</p>
            <p>‍<a href="http://bit.ly/1jGmOBJ">Open Access Link</a></p>
            <p><a href="http://bit.ly/1wFRns0">Gained U.S. and international press attention</a><br></p>
          </div>
        </div>
        <div class="w-col w-col-6">
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
                <div class="w-richtext">
                <div><?php the_post_thumbnail('background');?></div>
                <h3><?php the_title();?></h3>
                <?php if ( ! get_field( 'end_date' ) ) { ?>
                    <h4><?php echo get_field('start_date') . ' - Present'?></h4>
                <?php } else { ?>
                <h4><?php echo get_field('start_date') . ' - ' . get_field('end_date'); ?></h4>
                <?php } ?>
                <?php 
                the_content();  ?>
            </div>
            <?php } wp_reset_postdata();?>
        </div>        

    </div>
    <div class="whitespace"></div>
</div>

<?php get_footer(); ?>