<?php
class WishService {

  function __construct($container)
  {
    $this->logger = $container['logger'];
    $this->db = $container['db'];
  }

  public function createWish($data) {

    $dataCount = count($data);
    $wishText = filter_var($data[0], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $wishSign = filter_var($data[1], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if ($dataCount === 2) {
      // Add to DB the filtered field
      // return a wish id
      return json_encode('3216QZdQd54897');
    } else {
      return json_encode('nope');
    }
  }
}
