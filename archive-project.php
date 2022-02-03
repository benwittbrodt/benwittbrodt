<?php get_header(); ?>
<div class="flex justify-center my-4">
  <h2 class="text-4xl pb-1 border-b-2 border-violet-500">All Projects</h2>
</div>


<div class="max-w-screen-lg mx-auto mb-10">
  <div>
    <p>A brief highlight of web based projects and some design related projects that I have been working on. If you are looking to revamp your online presence and need something from a single landing page to a whole website redesign and software asset package to match, reach out via my contact page and we can discuss your project further!</p>
    <a href="<?php echo site_url('contact'); ?>"><button class="w-36 text-lg bg-emerald-800 rounded-full m-2 px-4 py-2 text-white hover:bg-emerald-600 ease-in-out duration-200">Contact Me</button></a>
  </div>
  <div class="flex flex-row flex-wrap justify-center sm:justify-around">
    <?php
    while (have_posts()) {
      the_post();
    ?>

      <!-- Creating the "card" for each project - eeverything within the anchor tag so the whole card is clickable -->
      <a class="basis-full sm:basis-5/12 md:basis-44 p-2 sm:m-2 rounded-lg shadow-md hover:scale-105 transition duration-300" href="<?php echo get_the_permalink(); ?>">
        <div class="flex flex-col flex-wrap">
          <div class="flex justify-center">
            <?php the_post_thumbnail('thumbnail'); ?>
          </div>
          <h2 class="text-xl text-center"><?php the_title(); ?></h2>
          <hr class="border-1 border-black">
          <?php
          //Gettign the "technologies" terms associated with each post
          $term_obj_list = get_the_terms($post->ID, 'technologies');
          ?>
          <div class="flex flex-row justify-center">
            <?php
            foreach ($term_obj_list as $key) {
              $icon = $key->slug;
              //grab svg images for all icons based on the taxonomy list
            ?>
              <img class="h-10 mx-2" src="<?php icon_src('icons8-' . $icon); ?>" />
            <?php
            }
            ?>
          </div>
        </div>
      </a>

    <?php
    }
    ?>
  </div>
</div>
<?php get_footer(); ?>