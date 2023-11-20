<?php 

function background_archive($tag, $category, $sortby){
	// Create templte for background archive HTML/PHP to group items
	?> 
	
	<div class="row card mb-2">

         <?php 
         $query = new WP_Query( array( 
            'post_type' => 'background',
            'tag' => $tag,
			'category_name'=> $category, 
			'meta_key'=> $sortby ) );
        
            ?>
            <div class="text-center">
            <img style="max-height: 150px;" class="img-fluid mx-auto d-block p-4" src="<?php echo get_theme_file_uri("/assets/bg_logos/logo_".$tag .".png"); ?>" alt="">
            </div>
            
            <?php
            while ( $query->have_posts() ) {
                $query->the_post();
                ?>
                
                <div>
                    <h3 class="d-flex justify-content-between">
                       <span class="mr-auto" >
                        <?php echo get_the_title(); ?>
                       </span> 
                    
                    
                    <span class="text-muted h5">
                       <?php  $startDate = get_field('start_date');
							$endDate = get_field('end_date');

							if ($startDate && !$endDate) {
							$dateString = "Since " . $startDate;
							} elseif (!$startDate && $endDate) {
							$dateString = $endDate;
							} elseif ($startDate && $endDate) {
							$dateString = $startDate . " - " . $endDate;
							} else {
							$dateString = ""; // No dates available
							}

							echo $dateString;?> 
                    </span>
                    </h3>
                    <p>
                        <?php echo get_the_content(); 
				
							
						
						?>
                    </p>
                
                </div>

                <?php 
            } 
			
		wp_reset_postdata();	?>
	</div>
<?php
		}


function technology_icons($post){
    ?>
    <div style="height: 2.5rem;">
        <?php
        //Getting the "technologies" terms associated with each post
        $term_obj_list = get_the_terms($post->ID, 'technologies');
        foreach ($term_obj_list as $key) {
        $icon = $key->slug;
        ?>
        <img class="h-100 d-inline-block" src="<?php echo get_theme_file_uri("assets/icons/icon_" . $icon . ".svg");?>"></img>
        
        <?php } ?>
    </div>    
<?php } ?>