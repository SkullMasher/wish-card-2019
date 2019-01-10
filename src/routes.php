<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
$app->get('/[{wishid}]', function (Request $request, Response $response, array $args) {
  $this->logger->info('GET /');

  return $this->renderer->render($response, 'index.phtml', $args);
})->setName('index');

$app->post('/', function (Request $request, Response $response) {
  $this->logger->info('POST /topkek');
  $data = $request->getParsedBody();

  return $this->wish_service->createWish($data);
});
