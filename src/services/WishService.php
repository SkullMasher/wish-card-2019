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

  private function strip_whitespace($str) {
      return preg_replace('/\s+/', ' ', $str);
  }

  private function sanitize($data) {
    $data_count = count($data);

    for ($i=0; $i < $data_count; $i++) {
      // Strip whitespace in and out
      // $data[$i] = trim($data[$i]);
      $data[$i] = $this->strip_whitespace($data[$i]);
      // Convert new lines
      $data[$i] = str_replace("<br>", "\n", $data[$i]);
      $data[$i] = str_replace("</p>", "\n", $data[$i]);
      $data[$i] = str_replace("</div>", "\n", $data[$i]);
      // Avoid XSS
      $data[$i] = filter_var($data[$i], FILTER_SANITIZE_STRING);
      $this->logger->info($data[$i]);
    }

    return $data;
  }

  public function addWish($data) {
    $dataCount = count($data);

    if ($dataCount === 2) {
      $seed = $this->mt_rand_str(6); // get a new seed
      $sanitized_data = $this->sanitize($data);
      $wish_message = $sanitized_data[0];
      $wish_signature = $sanitized_data[1];
      // Insert to wishes table
      $this->wish->seed = $seed;
      $this->wish->message = $wish_message;
      $this->wish->signature = $wish_signature;
      $this->wish->save();

      return json_encode($seed); // return a wish id
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
