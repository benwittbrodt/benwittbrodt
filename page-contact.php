<?php get_header(); ?>

<div class="w-container">
    <div class="w-col w-col-6">
        <br><p>Please reach out via this contact form and I will get back to you regarding your question, comment, or message. Let's create something together!<br>In the meantime connect with me on social media so you can get to know me a little better</p>
        <div class="div-40">
            <a href="https://www.instagram.com/benwittbrodt/" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-instagram.svg'); ?>"></a>
            <a href="http://www.linkedin.com/in/benwittbrodt" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-linkedin.svg'); ?>"></a>
            <a href="https://www.facebook.com/benwittbrodt" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-facebook.svg'); ?>"></a>
            <a href="https://www.github.com/benwittbrodt" target="_blank" class="index-icon"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-github.svg'); ?>"></a>
        </div>
    </div>
    <div class="w-col w-col-6">
    <?php while ( have_posts() ) {
        the_post();
        
        the_content();
    }?>

    </div>
    
</div>
<?php get_footer(); ?>