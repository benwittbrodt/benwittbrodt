<?php get_header(); ?>

<div class="max-w-screen-xl mx-auto">
    <div class="p-2 sm:m-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-col basis-full mr-2">
                <h3 class="text-xl my-2 font-semibold">Overview</h3>
                <p>Hello, I am a natural born problem solver with a thirst for knowledge and a desire to continute learning new things.
                    After researching 3D printing and helping to develop that technology in school I spent some time working with commercial
                    (semi-truck) tires being involved in the development of new products, process improvements in the manufacturing plant, and
                    eventually moving into a analytical role for our largest custmers. <br> Now as a business and data analyst I'm continuing
                    to hone my development skills to try and build tools for everyday use at work
                </p>
            </div>
            <div class="flex flex-col basis-full ml-2">
                <h3 class="text-xl font-semibold my-2">Information</h3>
                <div class="flex flex-row">
                    <div class="basis-1/3">
                        <h4 class="text-lg">Skills</h4>
                    </div>
                    <div class="basis-2/3">
                        <p>Data Analytics, Statistical Analaysis, Project Management</p>
                    </div>
                </div>
                <div class="flex flex-row">
                    <div class="basis-1/3">
                        <h4 class="text-lg">Software</h4>
                    </div>
                    <div class="basis-2/3">
                        <p>Microsoft Power BI, Office 365 Suite, SAP, Bootstrap, git/Github, XAMPP</p>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="basis-1/3">
                        <h4 class="text-lg">Technologies</h4>
                    </div>
                    <div class="basis-2/3 flex flex-row flex-wrap">
                        <img class="mx-1" src="<?php icon_src('icons8-javascript'); ?>" alt="">
                        <img class="mx-1" src="<?php icon_src('icons8-php'); ?>" alt="">
                        <img class="mx-1" src="<?php icon_src('icons8-mysql'); ?>" alt="">
                        <img class="mx-1" src="<?php icon_src('icons8-python'); ?>" alt="">
                        <img class="mx-1" src="<?php icon_src('icons8-html'); ?>" alt="">
                        <img class="mx-1" src="<?php icon_src('icons8-css'); ?>" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="flex flex-row justify-center">
        <button id="bg-button" class="text-md text-white bg-icon-main hover:bg-cyan-700 px-5 py-2 rounded-l-full ease-in-out transition duration-200">Education</button>
        <button id="bg-button" class="text-md p-4 hover:bg-cyan-700 ease-in-out transition duration-200">Research</button>
        <button id="bg-button" class="text-md text-white bg-icon-main hover:bg-cyan-700 px-5 py-2 rounded-r-full ease-in-out transition duration-200">Experience</button>
    </div>

    <div class="flex md:flex-row flex-col">
        <div class="flex flex-col" id="education">

            <!-- <h1 class="background_heading">Education</h1> -->

            <?php
            $education_query = new WP_Query(array(
                'post_type' => 'background',
                'category_name' => 'education',
                'order' => 'ASC',
                'orderby' => 'ID'
            ));

            while ($education_query->have_posts()) {
                $education_query->the_post(); ?>
                <div class="flex flex-col p-4 sm:m-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <div class="flex justify-center"><?php the_post_thumbnail('background'); ?></div>
                    <h3 class="text-lg font-semibold"><?php the_title(); ?></h3>
                    <h4 class="flex flex-row items-center text-lg"><img class="h-10 mr-2" src="<?php icon_src('icons8-calendar'); ?>" /> <?php echo get_field('end_date'); ?></h4>
                    <div class="">
                        <?php the_content(); ?>
                    </div>
                </div>
            <?php }
            wp_reset_postdata(); ?>
        </div>

        <div class="flex flex-col hidden" id="research">
            <!-- <h1 class="background_heading">Research</h1> -->
            <?php
            $research_query = new WP_Query(array(
                'post_type' => 'background',
                'category_name' => 'publication',
                'order' => 'ASC',
                'orderby' => 'ID'
            ));

            while ($research_query->have_posts()) {
                $research_query->the_post(); ?>
                <div class="flex flex-col p-4 sm:m-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h4 class="flex justify-center text-lg font-semibold"><?php the_title(); ?></h4>
                    <hr class="border-2 border-slate-400">
                    <div class=""><?php the_content(); ?></div>
                </div>
            <?php }
            wp_reset_postdata(); ?>
        </div>

        <div class="flex flex-col" id="experience">
            <!-- <h1 class="background_heading">Experience</h1> -->
            <?php
            $experience_query = new WP_Query(array(
                'post_type' => 'background',
                'category_name' => 'experience',
                'order' => 'DESC',
                'orderby' => 'start_date',
                'meta_key' => 'start_date',
            ));

            while ($experience_query->have_posts()) {
                $experience_query->the_post(); ?>
                <div class="flex flex-col p-4 sm:m-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <div class="flex justify-center"><?php the_post_thumbnail('background'); ?></div>
                    <h3 class="text-lg font-semibold"><?php the_title(); ?></h3>
                    <?php if (!get_field('end_date')) { ?>
                        <h4 class="flex flex-row items-center text-lg"><img class="h-10 mr-2" src="<?php icon_src('icons8-calendar'); ?>" /> <?php echo get_field('start_date') . ' - Present' ?></h4>
                    <?php } else { ?>
                        <h4 class="flex flex-row items-center text-lg"><img class="h-10 mr-2" src="<?php icon_src('icons8-calendar'); ?>" /> <?php echo get_field('start_date') . ' - ' . get_field('end_date'); ?></h4>
                    <?php } ?>
                    <h4 class="flex flex-row items-center text-lg"><img class="h-10 mr-2" src="<?php icon_src('icons8-map_pin'); ?>" /> <?php echo get_field('location'); ?></h4>
                    <div class=""><?php the_content();  ?></div>
                </div>
            <?php }
            wp_reset_postdata(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>