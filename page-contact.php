<?php get_header(); ?>

<div class="max-w-screen-lg mx-auto flex md:flex-row flex-col my-10">
    <div class="flex flex-col basis-1/2">
        <p>Please reach out via this contact form and I will get back to you regarding your question, comment, or message. Let's create something together!<br>In the meantime connect with me on social media so you can get to know me a little better</p>
        <div class="flex flex-row justify-center">
            <a href="https://www.instagram.com/benwittbrodt/" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-instagram.svg'); ?>"></a>
            <a href="http://www.linkedin.com/in/benwittbrodt" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-linkedin.svg'); ?>"></a>
            <a href="https://www.facebook.com/benwittbrodt" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-facebook.svg'); ?>"></a>
            <a href="https://www.github.com/benwittbrodt" target="_blank" class="h-14 w-14 hover:scale-110 transition ease-in-out duration-200"><img src="<?php echo get_theme_file_uri('/images/icons/icons8-github.svg'); ?>"></a>
        </div>
    </div>
    <div class="flex basis-1/2">
        <?php while (have_posts()) {
            the_post();

            the_content();
        } ?>

    </div>
</div>

<?php get_footer(); ?>