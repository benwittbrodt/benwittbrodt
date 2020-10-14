<?php 
get_header();
?>

<div class="w-container">

    <h1 class="taxonomy_heading">All Restaurants</h1>
    <?php
    $terms = get_terms( 'locations', array(
        'orderby'    => 'ASC',
        'hide_empty' => 0,
        'parent' => 0
    ) );
    // now run a query for each state in "locations"
    foreach( $terms as $term ) {

        $main_id = $term->term_id;
        
        // output the term name in a heading tag                
        ?>
        <h2><a href="<?php echo get_term_link( $main_id, $taxonomy_name );?>"><?php echo $term->name; ?></a></h2>
        <?php
        $term_id = $term->term_id;
        $taxonomy_name = 'locations';
        $termchildren = get_term_children( $term_id, $taxonomy_name );
        ?>
        <ul>
            <?php foreach ( $termchildren as $child ) {
                $term = get_term_by( 'id', $child, $taxonomy_name ); ?>
                <li>
                    <h3>
                        <a href="<?php echo get_term_link( $child, $taxonomy_name );?>"><?php echo $term->name; ?></a>
                    </h3>
                    <ul>
                        <?php 
                        $args = array(
                            'post_type' => 'restaurant',
                            'locations' => $term->slug
                        );
                        
                        $query = new WP_Query( $args );
                        // Start the Loop
                        while ( $query->have_posts() ) : $query->the_post(); ?>
                    
                            <li class="animal-listing" id="post-<?php the_ID(); ?>">
                                <h4>
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h4>
                            </li>
                            
                        <?php endwhile;
                        ?>
                    </ul>
                </li>
            <?php } ?>
        </ul>
    <?php
    // use reset postdata to restore orginal query
    wp_reset_postdata();
    } ?>

</div>

<?php
get_footer();
?>