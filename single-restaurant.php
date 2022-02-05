<?php
get_header();
?>

<?php
while (have_posts()) {
    the_post();


    $breadcrumbs = get_the_terms($post->ID, 'locations');

    if ($breadcrumbs[0]->parent) {

        $the_state = get_term_by('id', $breadcrumbs[0]->parent, 'locations');
    }   ?>

    <div class="max-w-screen-lg mx-auto">
        <div class="flex flex-row my-2">
            <div class="flex flex-row">
                <a class="text-md text-white my-auto px-5 py-2 border-y-2 rounded-l-full border-emerald-800 bg-emerald-800 hover:bg-emerald-500 hover:border-emerald-500 ease-in-out transition duration-200" href="<?php echo get_post_type_archive_link('restaurant'); ?>">
                    <i class="fa fa-store" aria-hidden="true"></i> All Restaurants
                </a>
                <a class="text-md text-white my-auto px-5 py-2 border-y-2 border-emerald-800 bg-emerald-800 hover:bg-emerald-500 hover:border-emerald-500 ease-in-out transition duration-200" href="<?php echo get_term_link($breadcrumbs[0]->parent, 'locations'); ?>"><?php echo $the_state->name; ?></a>
                <a class="text-md text-white my-auto px-5 py-2 border-y-2 border-emerald-800 bg-emerald-800 hover:bg-emerald-500 hover:border-emerald-500 ease-in-out transition duration-200" href="<?php echo get_term_link($breadcrumbs[0]->term_id, 'locations'); ?>"><?php echo $breadcrumbs[0]->name; ?></a>
                <span class="text-md text-emerald-800 my-auto border-2 border-emerald-800 rounded-r-full px-5 py-2"><?php the_title(); ?></span>
            </div>

        </div>

        <div class="">
            <?php if (!is_post_type_archive()) the_post_thumbnail('medium'); ?>
        </div>

        <div class=""><?php the_content(); ?></div>
        <?php if (get_field('phone_number')) { ?>
            <p class="my-2 text-lg"><i class="fa fa-phone" aria-hidden="true"></i> - <?php the_field('phone_number'); ?></p>
        <?php } ?>

        <br>

        <div class="flex flex-row justify-center">

            <?php
            //Calls the social links function to place all social media links in each restaurant listing depending on which fields are present
            $social_links_fields = get_social_links();

            foreach ($social_links_fields as $name => $field) :
                //returns the value of each field -> the link in this case
                $value = $field['value'];
            ?>
                <a href="<?php echo $value; ?>" target="_blank" class="bg-violet-800 rounded-full p-3 mx-2 hover:bg-slate-800 duration-200 transition ease-in-out">
                    <?php
                    //adapting name to fit format for icon source function
                    $name = "icons8-" . $name . "_outline";
                    ?>
                    <img src="<?php icon_src($name); ?>" class="h-8">
                </a>
            <?php endforeach; ?>

        </div>

        <?php $api = 'AIzaSyDrNsup_wGpCdCSScc_ICkcrp1_hjJSp7M'; ?>
        <div id="gmap" style="margin-top:20px"></div>
        <iframe width="100%" height="400px" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=<?php echo get_field('address'); ?>&key=<?php echo $api; ?>" allowfullscreen></iframe>

        <!-- <hr class="section-break"> -->

    </div>

<?php }

get_footer();
?>