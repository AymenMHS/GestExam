<?php

return [

    'stateful' => explode(',', 'localhost:3000,127.0.0.1:3000,localhost:5173,127.0.0.1:5173,localhost'),

    'expiration' => null,

    'middleware' => [
        'verify_csrf_token' => Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => Illuminate\Cookie\Middleware\EncryptCookies::class,
    ],

];
