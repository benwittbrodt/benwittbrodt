<?php
get_header();
?>

<div class="max-w-screen-lg mx-auto">
    <p class="my-4">
        Over the last 5+ years I've been able to travel across the USA, Canada, and parts of Germany rather extensively. One of the biggest problems with going to new cities nearly every week is that the task of finding good food is always a challenge and, franky, pretty overwhelming. Sometimes I only have a week before the trip (or less), and frequently will be booking trips when I am already currently on one. So I decided to take on a project to organize the places that I have found over the years where not only I can look back and have options when I'm in the same city again, but you can use this to see if I've been to a city you're planning to visit, and just maybe your task of finding good food is a little easier.
        <br>
        Please use the listing below to search, and let me know if it has helped you!
    </p>

    <p class="text-2xl text-emerald-600 text-center my-4">All Restaurants</p>

    <div class="flex flex-col md:flex-row flex-wrap">
        <?php
        //Taxonomy query for 'locations' to grab the parent taxonomy
        $terms = get_terms('locations', array(
            'orderby'    => 'ASC',
            'hide_empty' => 0,
            'parent' => 0
        ));
        // now run a query for each state in "locations"
        foreach ($terms as $term) {

            //isolating the main term id to use for data and linking
            $main_id = $term->term_id; ?>

            <div class="p-2 sm:m-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <!-- output the term name in a heading tag  -->
                <h2>
                    <a class="text-violet-800 text-xl font-semibold hover:text-violet-400" href="<?php echo get_term_link($main_id, $taxonomy_name); ?>"><?php echo $term->name; ?></a>
                </h2>

                <?php
                //getting the child taxonomies for each of the main_id taxonomies
                $taxonomy_name = 'locations';
                $termchildren = get_term_children($main_id, $taxonomy_name);
                ?>
                <div class="flex flex-col">
                    <?php
                    foreach ($termchildren as $child) {

                        $term = get_term_by('id', $child, $taxonomy_name); ?>
                        <div class="flex flex-col">
                            <a class="text-slate-700 text-lg border-b-2 border-violet-600 hover:text-slate-400" href="<?php echo get_term_link($child, $taxonomy_name); ?>"><?php echo $term->name; ?></a>
                            <ul>
                                <?php
                                //Arguments for getting link and title info for the list items inside the main item
                                $args = array(
                                    'post_type' => 'restaurant',
                                    'locations' => $term->slug
                                );

                                $query = new WP_Query($args);
                                // Start the Loop
                                while ($query->have_posts()) : $query->the_post(); ?>

                                    <li class="ml-3 my-1" id="post-<?php the_ID(); ?>">
                                        <a class="text-lg text-emerald-600 hover:text-emerald-400" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </li>

                                <?php endwhile;
                                ?>
                            </ul>
                        </div>
                    <?php } ?>
                </div>
            </div>
        <?php
            // use reset postdata to restore orginal query
            wp_reset_postdata();
        } ?>
    </div>
</div>

<?php
get_footer();
?>