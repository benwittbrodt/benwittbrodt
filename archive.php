<?php 
get_header();
?>

<div class="w-container">
    <?php
    while(have_posts()) {
        the_post();
        ?>
        <ul>
            <li><?php the_title();?></li>
        </ul>
        
    <?php } ?>
</div>



<?php
get_footer();
?>