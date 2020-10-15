<?php
get_header();
?>

<div class="w-container">
<p>
    Over the last 5+ years I've been able to travel across the USA, Canada, and parts of Germany rather extensively. One of the biggest problems with going to new cities nearly every week is that the task of finding good food is always a challenge and, franky, pretty overwhelming. Sometimes I only have a week before the trip (or less), and frequently will be booking trips when I am already currently on one. So I decided to take on a project to organize the places that I have found over the years where not only I can look back and have options when I'm in the same city again, but you can use this to see if I've been to a city you're planning to visit, and just maybe your task of finding good food is a little easier. 
    <br>
    Please use the listing below to search, and let me know if it has helped you!
</p>
    <h1 class="taxonomy_heading">All Restaurants</h1>
    <?php
    $terms = get_terms('locations', array(
        'orderby'    => 'ASC',
        'hide_empty' => 0,
        'parent' => 0
    ));
    // now run a query for each state in "locations"
    foreach ($terms as $term) {
        $main_id = $term->term_id;
        // output the term name in a heading tag ?>
        
        <h2>
            <a class="restaurant_state" href="<?php echo get_term_link($main_id, $taxonomy_name); ?>"><?php echo $term->name; ?></a>
        </h2>
        
        <?php
        $term_id = $term->term_id;
        $taxonomy_name = 'locations';
        $termchildren = get_term_children($term_id, $taxonomy_name);
        ?>
        <ul class="restaurant_list">
            <?php foreach ($termchildren as $child) {
                $term = get_term_by('id', $child, $taxonomy_name); ?>
                <li class="restaurant_list">
                    <h3>
                        <a class="restaurant_list" href="<?php echo get_term_link($child, $taxonomy_name); ?>"><?php echo $term->name; ?></a>
                    </h3>
                    <ul>
                        <?php
                        $args = array(
                            'post_type' => 'restaurant',
                            'locations' => $term->slug
                        );

                        $query = new WP_Query($args);
                        // Start the Loop
                        while ($query->have_posts()) : $query->the_post(); ?>

                            <li class="restaurant_list" id="post-<?php the_ID(); ?>">
                                <h4>
                                    <a class="restaurant_list" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
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