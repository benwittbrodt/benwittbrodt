<?php get_header(); ?>

<?php $term = get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) ); ?>
  <div id="container" class="w-container">
    <div id="content" role="main">

      <h1 class="taxonomy_heading"><?php echo $term->name; ?> Archives</h1>

      <?php if (have_posts()) : 
        while (have_posts()) : 
          the_post(); ?>
          
          <div class="post type-post hentry">
            <h2 class="entry-title">
              <a href="<?php echo get_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark">
                <?php the_title(); ?>
              </a>
            </h2>
           
            <div class="entry-summary">
              <?php the_excerpt(); ?>
            </div><!-- .entry-summary -->
          </div>

        <?php endwhile; ?>
      <?php endif; ?>

    </div><!-- #content -->
  </div><!-- #container -->

<?php get_footer(); ?>