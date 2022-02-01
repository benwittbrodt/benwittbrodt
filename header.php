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
    <!-- <div class="w-full text-gray-700 bg-white z-50">
      <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row lg:px-8">
        <div class="p-1 flex flex-row items-center justify-between">
          <a href="<?php echo site_url('/'); ?>" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"><img class="md:h-16 h-14 object-contain" src="<?php echo get_theme_file_uri('/images/new_logo_nav.png'); ?>"></a>

          <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
            <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
              <path x-show="!open" fill-rule="evenodd" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" clip-rule="evenodd"></path>
              <path x-show="open" fill-rule="evenodd" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <nav :class="{'flex': open, 'hidden': !open}" class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
          <a class="px-3 py-3 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline <?php if (is_home()) echo 'bg-red-300' ?>" href="<?php echo site_url('/'); ?>">Home</a>
          <a class="px-3 py-3 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline <?php if (get_post_type() == 'news') echo 'bg-red-300' ?>" href="<?php echo get_post_type_archive_link('news'); ?>">News</a>
          <a class="px-3 py-3 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline <?php if (is_page('existing-customers')) echo 'bg-red-300' ?>" href="<?php echo site_url('existing-customers'); ?>">Support</a>
          <a class="px-3 py-3 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline <?php if (is_page('about')) echo 'bg-red-300' ?>" href="<?php echo site_url('about'); ?>">About</a>
          <a class="px-3 py-3 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline <?php if (is_page('contact')) echo 'bg-red-300' ?>" href="<?php echo site_url('contact'); ?>">Contact</a>
        </nav>
      </div>
    </div> -->
    <div data-collapse="medium" data-animation="default" data-duration="400" class="mt-2 z-50 border-2 border-violet-900 rounded-full">

      <!-- Small mobile menu icon -->
      <div class="sm:hidden">
        <img style="height: 1.5rem" src="<?php echo get_theme_file_uri('images/nav/mobile-menu.svg'); ?>" alt="">
      </div>

      <div class="flex flex-row">
        <a href="<?php echo site_url('/'); ?>"><img class="h-14" src="<?php echo get_theme_file_uri('/images/new_logo_nav.png'); ?>"></a>
        <a href="<?php echo site_url('/'); ?>" class="">
          <div class="text-violet-900 text-3xl">Ben<strong class="font-semibold">Wittbrodt</strong></div>
        </a>
        <nav role="navigation" class="flex flex-row">
          <a href="<?php echo site_url('/'); ?>" class="my-4 mx-4 hover:bg-violet-800 ease-in-out transition duration-200 <?php if (is_home()) echo 'border-b-2 border-b-violet-900' ?>">Home</a>
          <a href="<?php echo site_url('/background'); ?>" class="py-4 px-4 hover:bg-violet-800 hover:text-white ease-in-out transition duration-200 <?php if (get_post_type() == 'background') echo 'current-page' ?>">Background</a>
          <a href="<?php echo site_url('/projects'); ?>" class="nav-link_pic w-nav-link <?php if (is_page('project') || get_post_type() == 'project') echo 'current-page' ?>">Projects</a>
          <a href="<?php echo site_url('/restaurants'); ?>" class="nav-link_pic w-nav-link <?php if (is_page('restaurants') || get_post_type() == "restaurant" || is_page('locations')) echo 'current-page' ?>">Food Guide</a>
          <a href="<?php echo site_url('contact'); ?>" class="nav-link_pic w-nav-link <?php if (is_page('contact')) echo 'current-page' ?>">Contact</a>
        </nav>
      </div>

    </div>

  </header>