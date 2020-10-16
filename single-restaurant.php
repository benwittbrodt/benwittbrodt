<?php
get_header();
?>

<?php
while( have_posts() ) {
  the_post(); 

$bread = get_the_terms($post->ID,'locations');

if( $bread[0]->parent ) {
    
    $the_state = get_term_by('id',$bread[0]->parent,'locations');
    
}
?>

    <div class="w-container">
        <div class="breadcrumb-flex">
                <a class="breadcrumb" href="<?php echo get_post_type_archive_link('restaurant'); ?>">
                    <i class="fa fa-store" aria-hidden="true"></i> All Restaurants
                </a> 
                <a class="breadcrumb breadcrumb--state" href="<?php echo get_term_link($bread[0]->parent, 'locations'); ?>"><?php echo $the_state->name; ?></a>
                <a class="breadcrumb breadcrumb--city" href="<?php echo get_term_link($bread[0]->term_id, 'locations'); ?>"><?php echo $bread[0]->name; ?></a>
                <span class="breadcrumb breadcrumb--title"><?php the_title(); ?></span>
        </div>

        <div class="page-links">
            <?php if (! is_post_type_archive()) the_post_thumbnail('medium'); ?>
        </div>

        <div class="generic-content"><?php the_content(); ?></div>
        <?php if ( get_field('phone_number') ) { ?>
          <h3><i class="fa fa-phone" aria-hidden="true"></i> - <?php the_field('phone_number');?></h3>
        <?php } ?>
        
        <br>
        <ul class="min-list social-icons-list">

            <?php 
            //Creates social media links only if they exist for the entry  
            if ( get_field('website') ) {
            ?>
            <li>
                <a href="<?php echo get_field('website');?>" target="_blank" class="social-color-website">
                    <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                </a>
            </li>
            <?php }

            if ( get_field('facebook') ) {
            ?>
            <li>
                <a href="<?php echo get_field('facebook');?>" target="_blank" class="social-color-facebook">
                    <i class="fab fa-facebook-square" aria-hidden="true"></i>
                </a>
            </li>
            <?php }
        
            if ( get_field('instagram') ) {
            ?>
            <li>
                <a href="<?php echo get_field('instagram');?>" target="_blank" class="social-color-instagram">
                    <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
            </li>
            <?php }
        
            if ( get_field('twitter') ) {
            ?>
            <li>
                <a href="<?php echo get_field('twitter');?>" class="social-color-twitter">
                    <i class="fab fa-twitter" aria-hidden="true"></i>
                </a>
            </li>
            <?php } ?>
        
        </ul>
        <?php $api = 'AIzaSyDrNsup_wGpCdCSScc_ICkcrp1_hjJSp7M'; ?>
        <div id="gmap" style="margin-top:20px"></div>
        <iframe width="500px" height="400px" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=<?php echo get_field('address'); ?>&key=<?php echo $api; ?>" allowfullscreen></iframe>

        <!-- <hr class="section-break"> -->

</div>

<?php }

get_footer();
?>