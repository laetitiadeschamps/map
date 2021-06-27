<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get(
    '/',
    [
        'uses' => 'MainController@home',
        'as'   => 'main-home'
    ]
);
$router->get(
    '/categories',
    [
        'uses' => 'CategoryController@list',
        'as'   => 'category-list'
    ]
);

$router->get(
    '/categories/{id}',
    [
        'uses' => 'CategoryController@readOne',
        'as'   => 'category-readOne'
    ]
);
$router->get(
    '/markers',
    [
        'uses' => 'MarkerController@list',
        'as'   => 'Marker-list'
    ]
);
$router->post(
    '/markers',
    [
        'uses' => 'MarkerController@store',
        'as'   => 'Marker-store'
    ]
);
