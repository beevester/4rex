<?php

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('current', 'AuthController@currentUser');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');
    Route::post('live-currency', 'CurrencyController@liveCurrency');
    Route::post('calculate', 'CurrencyController@calculate');
    Route::post('purchase', 'CurrencyController@purchases');

});
