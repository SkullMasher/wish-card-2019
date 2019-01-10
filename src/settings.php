<?php
return [
  'settings' => [
    'displayErrorDetails' => true, // set to false in production
    'addContentLengthHeader' => false, // Allow web server to send the content-length header
    'determineRouteBeforeAppMiddleware' => false, // Slimm cookbook eloquent
    // Renderer settings
    'renderer' => [
      'template_path' => __DIR__ . '/../templates/',
    ],
    // Monolog settings
    'logger' => [
      'name' => 'slim-app',
      'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
      'level' => \Monolog\Logger::DEBUG,
    ],
    // Eloquent settings
    'db' => [
      'driver' => 'mysql',
      'host' => 'localhost',
      'database' => 'wish_card_2019',
      'username' => 'skullmasher',
      'password' => '',
      'charset'   => 'utf8',
      'collation' => 'utf8_unicode_ci',
      'prefix'    => '',
    ]
  ],
];
