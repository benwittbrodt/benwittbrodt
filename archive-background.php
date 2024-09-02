<?php get_header(); ?>

<div class="container">
    <div class="container mt-5">
        <h2><?php echo str_replace('Archives:','My',get_the_archive_title());?></h2>
               
        <div class="row gx-5">
        <div class="col-lg-8"> 
            <!-- Professional Experience -->
            <?php background_archive('sermo', 'experience','start_date'); ?>
            <?php background_archive('continental', 'experience','start_date'); ?>
            <?php background_archive('michigan-tech', 'experience','start_date'); ?>
            <?php background_archive('cummins', 'experience','start_date'); ?>

        </div>
        <div class="col-lg-4">
            <!-- Education -->
            <?php background_archive('michigan-tech','education','end_date'); ?>
        </div>
        </div>
    </div>
</div>




<?php get_footer();?>