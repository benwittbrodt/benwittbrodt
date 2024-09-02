<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    
    <title>Ben Wittbrodt - Data Analytics Leader</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

</head>



    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="<?php echo site_url(); ?>">Ben Wittbrodt</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item active">
                        <a class="nav-link <?php if (is_home()) echo 'active';?>" href="<?php echo site_url(); ?>">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php if (is_page('project') || get_post_type() == 'project') echo 'active'?>" href="<?php echo site_url('projects'); ?>">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link  <?php if (is_page('background') || get_post_type() == 'background') echo 'active'?>" href="<?php echo site_url('background'); ?>">Background</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php if (is_page('contact')) echo 'active' ?>" href="<?php echo site_url('contact'); ?>">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

<body>