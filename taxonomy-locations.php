<?php get_header(); ?>


<div id="container" class="max-w-screen-md mx-auto">
  <div id="content" role="main">
    <?php
    //Set up which taxonomy is going to be searched for
    $term = get_term_by('slug', get_query_var('term'), get_query_var('taxonomy'));
    //Define the ID of the taxonomy term
    $term_id = $term->term_id; ?>
    <p class="text-center text-2xl text-violet-800 my-4"><?php echo $term->name; ?> Restaurants</p>
    <div class="flex flex-col justify-center">
      <?php
      if (have_posts()) :
        while (have_posts()) :
          the_post();

          $taxonomy_name = 'locations';
          //Find all child terms for the given term_id 
          $termchildren = get_term_children($term_id, $taxonomy_name);
          //Check if there are no child terms - if so just display the posts associated with the term
          if (empty($termchildren)) { ?>
            <div class="">

              <a class="text-lg text-emerald-600 hover:text-emerald-400" href="<?php echo get_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark">
                <?php the_title(); ?>
              </a>


              <div class="my-2">
                <?php the_excerpt(); ?>
              </div>
            </div>

            <?php }

          //Check if there is a parent ID for the term. Any ID less than 1 (i.e. 0) means you are at the highest level of heirarchy
          if ($term->parent < 1) {
            //Loop through each child term associated with the parent term and display link and tree structure
            foreach ($termchildren as $child) {
              //Change term variable to the 1st level child of the main term on page
              $term = get_term_by('id', $child, $taxonomy_name); ?>


              <a class="text-slate-700 text-lg border-b-2 border-violet-600 hover:text-slate-400" href="<?php echo get_term_link($child, $taxonomy_name); ?>"><?php echo $term->name; ?></a>

              <ul class="flex flex-col">
                <?php
                //New wordpress query since the bottom level of the list is a post. Set up arguments to get restaurant type posts by slug for taxonomy term
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
      <?php }
          }

        endwhile;
      endif; ?>

      <a class="text-slate-800 text-lg my-2 hover:text-slate-400" href="<?php echo site_url('restaurants'); ?>">&#8592; Back to all restaurants</a>

    </div>
  </div><!-- #content -->
</div><!-- #container -->

<?php get_footer(); ?>