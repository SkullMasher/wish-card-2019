<?php
class WishService {

  private $logger;
  private $wish;

  function __construct($logger)
  {
    $this->logger = $logger;
    $this->wish = new Wish;
  }

  private function mt_rand_str ($l, $c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890') {
      for ($s = '', $cl = strlen($c)-1, $i = 0; $i < $l; $s .= $c[mt_rand(0, $cl)], ++$i);
      return $s;
  }

  public function addWish($data) {
    $dataCount = count($data);
    $seed = $this->mt_rand_str(6);
    $wish_message = $data[0];
    $wish_signature = $data[1];

    $this->logger->info($wish_message);

    if ($dataCount === 2) {
      // Insert to wishes table
      $this->wish->seed = $seed;
      $this->wish->message = $wish_message;
      $this->wish->signature = $wish_signature;
      $this->wish->save();

      // return a wish id
      return json_encode($seed);
    } else {
      return json_encode('nope');
    }
  }

  public function getWish($seed) {
    $wishExist = $this->wish->where('seed', '=', $seed)->exists();
    $wish = $this->wish->where('seed', '=', $seed)->first();

    if ($wishExist) {
      return $wish;
    } else {
      return null;
    }
  }
}
