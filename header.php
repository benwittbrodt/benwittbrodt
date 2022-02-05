<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
  <script type="text/javascript">
    WebFont.load({
      google: {
        families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic", "Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"]
      }
    });
  </script>
  <script type="text/javascript">
    ! function(o, c) {
      var n = c.documentElement,
        t = " w-mod-";
      n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
    }(window, document);
  </script>
  <script src="https://kit.fontawesome.com/a82aa71cb1.js" crossorigin="anonymous"></script>

</head>

<body>
  <header>
    <!-- New navbar -->

    <div id="menu-border" data-collapse="medium" data-animation="default" data-duration="400" class="max-w-screen-xl mx-auto mt-2 z-50 md:border-2 border-violet-900 md:rounded-full border-0">

      <nav class="
          flex flex-wrap
          items-center
          justify-between
          w-full
          text-lg text-gray-700
        ">
        <div class="flex flex-row">
          <a href="<?php echo site_url('/'); ?>"><img class="h-16 w-16 flex md:ml-0 ml-4" src="<?php echo get_theme_file_uri('/images/new_logo_nav.png'); ?>"></a>
          <a href="<?php echo site_url('/'); ?>" class="hidden sm:flex my-auto mx-2 text-violet-900 text-3xl hover:text-violet-900">Ben<strong class="font-semibold">Wittbrodt</strong></a>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" id="menu-button" class="h-6 w-6 cursor-pointer mr-4 md:hidden block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <div class="hidden w-full md:flex md:items-center md:w-auto md:bg-transparent bg-slate-200" id="menu">
          <ul class="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0">
            <li>
              <a class="flex justify-center md:block md:p-4 py-2 hover:text-purple-400 <?php if (is_home()) echo 'text-violet-500' ?>" href="<?php echo site_url('/'); ?>">Home</a>
            </li>
            <li>
              <a class="flex justify-center md:block md:p-4 py-2 hover:text-purple-400 <?php if (get_post_type() == 'background') echo 'text-violet-500' ?>" href="<?php echo site_url('/background'); ?>">Background</a>
            </li>
            <li>
              <a class="flex justify-center md:block md:p-4 py-2 hover:text-purple-400 <?php if (is_page('project') || get_post_type() == 'project') echo 'text-violet-500' ?>" href="<?php echo site_url('/projects'); ?>">Projects</a>
            </li>
            <li>
              <a class="flex justify-center md:block md:p-4 py-2 hover:text-purple-400 <?php if (is_page('restaurants') || get_post_type() == "restaurant" || is_page('locations')) echo 'text-violet-500' ?>" href="<?php echo site_url('/restaurants'); ?>">Restaurants</a>
            </li>
            <li>
              <a class="flex justify-center md:block md:p-4 py-2 hover:text-purple-400 <?php if (is_page('contact')) echo 'text-violet-500' ?>" href="<?php echo site_url('contact'); ?>">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>