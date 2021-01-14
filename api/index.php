<?php

error_reporting(-1);

require_once ('application/Application.php');

function router($params) {
    $method = $params ['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            // user
            case 'login' : return $app->login($params);
            case 'logout' : return $app->logout($params);
            case 'registration' : return $app->registration($params);
            // game
            case 'getRecords' : return $app->getRecords();
            case 'sendScore' : return $app->sendScore($params);
        }
    }
    return false;
}

function answer($data) {
    if ($data){
        return array(
            'result' =>'ok',
            'data' => $data
        );
    }
    return array ('result' => 'error');
}

echo json_encode(answer(router($_GET)));