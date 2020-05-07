<?php get_header(); ?>

<div class="w-container">
    <div class="w-col w-col-6">
        <br><p>Please reach out via this contact form and I will get back to you regarding your question, comment, or message. Let's create something together!<br>In the meantime connect with me on social media so you can get to know me a little better</p>
    </div>
    <div class="w-col w-col-6">
    <?php while ( have_posts() ) {
        the_post();
        
        the_content();
    }?>

    </div>
    
</div>
<?php get_footer(); ?>