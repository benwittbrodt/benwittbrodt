<?php 
//Seetting attribution link to show on pages where icons are called
if ( is_page('project') || get_post_type() == 'project' ){
?>
<div class="w-container">
  <img src="https://img.icons8.com/material/24/000000/icons8-new-logo.png"/>
  <a style="color: #888888" href="https://icons8.com/icon/118522/icons8">Icons by Icons8</a>
</div>
<?php } ?>

<div class="footer-section">
  <div class="w-container">
    <div class="w-row">
      <div class="w-col w-col-3">
        <a href="<?php echo site_url('/'); ?>" aria-current="page" class="w-nav-brand">
          <div class="logo-text footer">Ben<strong class="semibold">Wittbrodt</strong></div>
        </a>
      </div>
      <div class="w-col w-col-9">
        <div class="social-icons-footer">
          <a href="https://www.instagram.com/benwittbrodt/" target="_blank"><i class="fab fa-instagram footer_link"></i></a>
          <a href="http://www.linkedin.com/in/benwittbrodt" target="_blank"><i class="fab fa-linkedin footer_link"></i></a>
          <a href="https://www.facebook.com/benwittbrodt" target="_blank"><i class="fab fa-facebook-square footer_link"></i></a>
          <a href="https://www.github.com/benwittbrodt" target="_blank"><i class="fab fa-github footer_link"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js?site=58ff3b84d37f1011096e8281" type="text/javascript" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="js/webflow.js" type="text/javascript"></script>

<?php wp_footer(); ?>

</body>
</html>