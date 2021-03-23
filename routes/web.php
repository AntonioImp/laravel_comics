<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::check())
        return view('/home');
    else
        return view('Auth/login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/user/{us}', 'UserController@user');
Route::get('/user', function() {
    return -1;
})->middleware('auth');

Route::post('/load', 'ArchiveController@load')->middleware('auth');
Route::post('/store', 'ArchiveController@store')->middleware('auth');
Route::post('/delete', 'ArchiveController@delete')->middleware('auth');

Route::get('/raccolta/{id}', 'ContentController@nome')->middleware('auth');
Route::get('/raccolta', function() {
    return redirect('/home');
})->middleware('auth');
Route::get('/carica/{id}', 'ContentController@carica')->middleware('auth');
Route::get('/carica', function() {
    return redirect('/home');
})->middleware('auth');
Route::post('/elimina', 'ContentController@elimina')->middleware('auth');

Route::get('/search', function(){
    return view('search');
})->middleware('auth');
Route::post('/doSearch', 'SearchController@search')->middleware('auth');
Route::post('/raccolteUtente', 'SearchController@raccolte')->middleware('auth');
Route::post('/aggiungi', 'SearchController@aggiungi')->middleware('auth');
