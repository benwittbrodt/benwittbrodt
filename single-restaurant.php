<?php
get_header();
?>

<?php
while( have_posts() ) {
    the_post(); 


    $breadcrumbs = get_the_terms($post->ID,'locations');

    if( $breadcrumbs[0]->parent ) {
    
        $the_state = get_term_by('id',$breadcrumbs[0]->parent,'locations');
    
    }   ?>

    <div class="w-container">
        <div class="breadcrumb-flex">
            <a class="breadcrumb" href="<?php echo get_post_type_archive_link('restaurant'); ?>">
                <i class="fa fa-store" aria-hidden="true"></i> All Restaurants
            </a> 
            <a class="breadcrumb breadcrumb--state" href="<?php echo get_term_link($breadcrumbs[0]->parent, 'locations'); ?>"><?php echo $the_state->name; ?></a>
            <a class="breadcrumb breadcrumb--city" href="<?php echo get_term_link($breadcrumbs[0]->term_id, 'locations'); ?>"><?php echo $breadcrumbs[0]->name; ?></a>
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
            //Calls the social links function to place all social media links in each restaurant listing depending on which fields are present
            $social_links_fields = get_social_links();
                   
            foreach ( $social_links_fields as $name => $field ):
                //returns the value of each field -> the link in this case
                $value = $field['value'];
            ?>     

                <li>
                    <a href="<?php echo $value;?>" target="_blank" class="social-color-<?php echo $name;?>">
                    <?php 
                        //adapting name to fit format for icon source function
                        $name = "icons8-" . $name . "_outline";
                    ?>
                        <img src="<?php icon_src($name);?>" alt="">
                    </a>
                </li>
                     
            <?php endforeach; ?>
           
        </ul>

        <?php $api = 'AIzaSyDrNsup_wGpCdCSScc_ICkcrp1_hjJSp7M'; ?>
        <div id="gmap" style="margin-top:20px"></div>
        <iframe width="100%" height="400px" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=<?php echo get_field('address'); ?>&key=<?php echo $api; ?>" allowfullscreen></iframe>

        <!-- <hr class="section-break"> -->

</div>

<?php }

get_footer();
?>