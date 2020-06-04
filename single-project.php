<?php get_header(); ?>

<div class="w-container">

    <?php 
        while ( have_posts() ) {
            the_post();
            the_content();
        }
    ?>

</div>

<?php get_footer(); ?>