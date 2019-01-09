<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/', function (Request $request, Response $response, array $args) {
    $this->logger->info('GET /');

    return $this->renderer->render($response, 'index.phtml', $args);
})->setName('index');

$app->post('/', function (Request $request, Response $response, array $args) {
    $this->logger->info('POST /');

    $url = $this->router->pathFor('index');
    return $response->withRedirect($url, 303);
});

$app->get('/sharewish', function (Request $request, Response $response, array $args) {
    $this->logger->info('GET /sharewish');

    return $this->renderer->render($response, 'sharewish.phtml', $args);
})->setName('sharewish');

$app->get('/wish/[{wishid}]', function (Request $request, Response $response, array $args) {
    $this->logger->info('GET /wish/');

    return $this->renderer->render($response, 'wish.phtml', $args);
});

$app->post('/topkek', function (Request $request, Response $response, array $args) {
    $this->logger->info('POST /topkek');

    return 'topkek! ';
});
