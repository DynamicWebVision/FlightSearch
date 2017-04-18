<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'UserController@index');
Route::get('/login', 'UserController@loginView');
Route::post('login_attempt', 'UserController@loginAttempt');

Route::get('create_user', 'UserController@createUser');

Route::group(['middleware' => 'auth'], function () {

    Route::get('home', 'UserController@home');

    //Places Routes
    Route::get('list_places', 'PlacesController@getPlacesCategory');


    Route::get('user_preferences', 'UserController@userPreferences');
    Route::post('user_preferences', 'UserController@updateUserPreferences');

    Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

    Route::get('two_flights', 'FlightController@processTwoFlights');

});


Route::get('/', function () {
    return view('welcome');
});

Route::get('/trip', function () {
    return view('trip');
});

Route::get('/php', function() {
    echo phpinfo();
});

Route::get('/roundtrip', 'FlightController@flightSearch');

Route::get('flight_options', 'FlightController@flightOptions');

Route::get('processTrips', 'FlightController@processFlights');


