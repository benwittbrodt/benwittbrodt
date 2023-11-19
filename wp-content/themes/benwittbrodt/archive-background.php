<?php get_header(); ?>

<div class="container">
    <div class="container mt-5">
        <h2><?php echo str_replace('Archives:','All',get_the_archive_title());?></h2>
        
       
        <!-- WORKING ON: grouping experience by tags -->
        <div class="row gx-5">
        <div class="col-lg-8"> 
            <?php background_archive('sermo', 'experience','start_date'); ?>
            <?php background_archive('michigan-tech', 'experience','start_date'); ?>

            
        </div>
        <div class="col-lg-4">
            <?php background_archive('michigan-tech','education','end_date'); ?>
        </div>
        </div>

    </div>
    
    
</div>




<?php get_footer();?>