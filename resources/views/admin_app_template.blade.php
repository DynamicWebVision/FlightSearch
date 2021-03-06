<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>
        @yield('title')
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta content="Admin Dashboard" name="description" />
    <meta content="ThemeDesign" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link rel="shortcut icon" href="img/browser_icon.png">

    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="assets/css/style.css" rel="stylesheet" type="text/css">
    @yield('css')

</head>


<body class="fixed-left" ng-app="app">

<!-- Begin page -->
<div id="wrapper">
    <!-- Top Bar Start -->
    <div class="topbar">
        <!-- LOGO -->
        <div class="topbar-left">
            <div class="text-center">
                <a href="/home" class="logo"><img src="img/logo_light.png" height="40"></a>
            </div>
        </div>
        <!-- Button mobile view to collapse sidebar menu -->
        <div class="navbar navbar-default" role="navigation">
            <div class="container">
                <div class="">
                    <div class="pull-left">
                        <button type="button" class="button-menu-mobile open-left waves-effect waves-light">
                            <i class="ion-navicon"></i>
                        </button>
                        <span class="clearfix"></span>

                        <div class="absolute top-0">
                            @yield('top_bar')
                        </div>
                    </div>

                    @yield('search')
                    <ul class="nav navbar-nav navbar-right pull-right">
                        <li class="dropdown">
                            <a href="" class="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" aria-expanded="false">
                                <img src="/img/browser_icon.png" alt="user-img" class="img-circle"> </a>
                            <ul class="dropdown-menu">
                                <li><a href="/home"> Home</a></li>
                                <li><a href="/logout"> Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                    @yield('nav_bar_info')
                </div>
                <!--/.nav-collapse -->
            </div>
        </div>
    </div>
    <!-- Top Bar End -->


    <!-- ========== Left Sidebar Start ========== -->

    <div class="left side-menu">
        <div class="sidebar-inner slimscrollleft">
            <!--- Divider -->
            @yield('side_nav')
            <div class="clearfix"></div>
        </div> <!-- end sidebarinner -->
    </div>
    <!-- Left Sidebar End -->

    <!-- Start right Content here -->

    <div class="content-page">
        <!-- Start content -->
        <div class="content">
            <div class="container">
                <!-- This is where Angular inserts the forms -->
                <div ng-view></div>

            </div> <!-- container -->

        </div> <!-- content -->

    </div>
    <!-- End Right content here -->

</div>
<!-- END wrapper -->


<!-- jQuery  -->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/modernizr.min.js"></script>
<script src="assets/js/detect.js"></script>
<script src="assets/js/fastclick.js"></script>
<script src="assets/js/jquery.slimscroll.js"></script>
<script src="assets/js/jquery.blockUI.js"></script>
<script src="assets/js/waves.js"></script>
<script src="assets/js/wow.min.js"></script>
<script src="assets/js/jquery.nicescroll.js"></script>
<script src="assets/js/jquery.scrollTo.min.js"></script>
<script src="assets/js/app.js"></script>

<script src="js/angular.min.1.5.6.js"></script>
<script src="js/angular_routing.min.1.2.3.js"></script>

@yield('javascript')
</body>
</html>