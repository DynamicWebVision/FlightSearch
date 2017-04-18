
@extends('admin_app_template')

@section('css')
    <link rel="stylesheet" type="text/css" href="css/style.css">
@stop

@section('title')
    Flights
@stop

@section('javascript')
    <script src="/js/app/home_app.js"></script>
    <script src="/js/angular_directives.js"></script>

    <!– Angular Factories and Services ->
    <script src="/js/factory/merchant.js"></script>
    <script src="/js/factory/lookup.js"></script>
    <script src="/js/factory/transactions.js"></script>
    <script src="/js/service/utility.js"></script>

    <!– Angular Controllers ->
    <script src="/js/controllers/merchant/side_nav.js"></script>
    <script src="/js/controllers/transaction.js"></script>
    <script src="/js/controllers/user_preference.js"></script>
@stop

@section('side_nav')
    <div id="sidebar-menu" ng-controller="SideNavController">
        <ul>
            <li>
                <a href="#transactions" class="waves-effect">
                    <i class="fa fa-info" aria-hidden="true"></i>
                    <span> Info </span> <span class="pull-right"></span>
                </a>
            </li>
        </ul>
    </div>
@stop
