<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
$app->get('/[{wishSeed}]', function (Request $request, Response $response, array $args) {

  if (isset($args['wishSeed'])) {
    $wishSeed = $args['wishSeed'];
    $wishSeed_length = strlen($args['wishSeed']);

    if ($wishSeed_length === 6) {
      $wish = $this->wish_service->getWish($wishSeed);
      if ($wish === null) {
        return $this->renderer->render($response, 'index.phtml');
      } else {
        $this->logger->info('GET /' . $wishSeed);

        return $this->renderer->render($response, 'wish.phtml', [
          'seed' => $wishSeed,
          'message' => $wish->message,
          'signature' => $wish->signature
        ]);
      }
    } else {
      $this->logger->info('GET /');
      return $this->renderer->render($response, 'index.phtml');
    }
  }

  return $this->renderer->render($response, 'index.phtml');

})->setName('index');

$app->post('/', function (Request $request, Response $response) {
  $this->logger->info('POST /topkek');
  $data = $request->getParsedBody();

  return $this->wish_service->addWish($data);
});
