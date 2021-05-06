<?php get_header(); ?>

<div class="w-big-container">
    <div class="card">
        <div class="bg-row">
            <div class="bg-col">
                <div class="bg-intro-card">
                    <h3 style="margin-top: 0px">Overview</h3>
                    <p>Hello, I am a natural born problem solver with a thirst for knowledge and a desire to continute learning new things.
                        After researching 3D printing and helping to develop that technology in school I spent some time working with commercial
                        (semi-truck) tires being involved in the development of new products, process improvements in the manufacturing plant, and
                        eventually moving into a analytical role for our largest custmers. <br> Now as a business and data analyst I'm continuing
                        to hone my development skills to try and build tools for everyday use at work
                    </p>
                </div>
            </div>
            <div class="bg-col">
                <div class="bg-intro-card">
                    <h3 style="margin-top: 0px">Information</h3>

                    <div class="bg-row">
                        <div class="third-col">
                            <h4 style="margin-top: 0px">Skills</h4>
                        </div>
                        <div class=" twothird-col">
                            <p>Data Analytics, Statistical Analaysis, Project Management</p>
                        </div>
                    </div>
                    <div class="bg-row">
                        <div class="third-col">
                            <h4 style="margin-top: 0px">Software</h4>
                        </div>
                        <div class=" twothird-col">
                            <p>Microsoft Power BI, Office 365 Suite, SAP, Bootstrap, git/Github, XAMPP</p>
                        </div>
                    </div>

                    <div class="bg-row">
                        <div class="third-col">
                            <h4 style="margin-top: 0px">Technologies</h4>
                        </div>
                        <div class=" twothird-col">
                            <img src="<?php icon_src('icons8-javascript'); ?>" alt="">
                            <img src="<?php icon_src('icons8-php'); ?>" alt="">
                            <img src="<?php icon_src('icons8-mysql'); ?>" alt="">
                            <img src="<?php icon_src('icons8-python'); ?>" alt="">
                            <img src="<?php icon_src('icons8-html'); ?>" alt="">
                            <img src="<?php icon_src('icons8-css'); ?>" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex-bg">
        <div class="section-btns">
            <button class="background-button selected">
                <h3>Education</h3>
            </button><button class="background-button">
                <h3>Research</h3>
            </button><button class="background-button selected">
                <h3>Experience</h3>
            </button>
        </div>
    </div>

    <div class="flex-bg content-block">
        <div class="flex-col" id="education">

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
                <div class="bg-item card">
                    <div class="card-logo-img"><?php the_post_thumbnail('background'); ?></div>
                    <h3 class="extramargin"><?php the_title(); ?></h3>
                    <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-calendar'); ?>" /> <?php echo get_field('end_date'); ?></h4>
                    <div class="extramargin">
                        <?php the_content(); ?>
                    </div>
                </div>
            <?php }
            wp_reset_postdata(); ?>
        </div>

        <div class="flex-col bg-hidden" id="research">
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
                <div class="bg-item card">
                    <h4 class="extramargin"><?php the_title(); ?></h4>
                    <hr class="hr2">
                    <div class="research-content extramargin"><?php the_content(); ?></div>
                </div>
            <?php }
            wp_reset_postdata(); ?>
        </div>

        <div class="flex-col" id="experience">
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
                <div class="bg-item card">
                    <div class="card-logo-img"><?php the_post_thumbnail('background'); ?></div>
                    <h3 class="extramargin"><?php the_title(); ?></h3>
                    <?php if (!get_field('end_date')) { ?>
                        <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-calendar'); ?>" /> <?php echo get_field('start_date') . ' - Present' ?></h4>
                    <?php } else { ?>
                        <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-calendar'); ?>" /> <?php echo get_field('start_date') . ' - ' . get_field('end_date'); ?></h4>
                    <?php } ?>
                    <h4 class="extramargin"><img class="background-icon" src="<?php icon_src('icons8-map_pin'); ?>" /> <?php echo get_field('location'); ?></h4>
                    <div class="extramargin"><?php the_content();  ?></div>
                </div>
            <?php }
            wp_reset_postdata(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>