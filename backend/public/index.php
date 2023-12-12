<?php

require_once __DIR__.'/../vendor/autoload.php';


use App\app\Request;
use App\app\Response;
use App\app\Router;
// controllers
use App\controllers\TaskController;


$router = new Router(new Request, new Response);

/********** ROUTES **********/
$router->route(path: '/task')
    ->get(action: [TaskController::class, 'get'])
    ->post(action: [TaskController::class, 'add']);
$router->route(path: '/task/{id}')
    ->patch(action: [TaskController::class, 'update'])
    ->delete(action: [TaskController::class, 'delete']);
    
$router->run();