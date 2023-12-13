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
    // ->options(action: [TaskController::class, 'options']);
$router->route(path: '/task/{id}')
    ->patch(action: [TaskController::class, 'update'])
    // ->options(action: [TaskController::class, 'options'])
    ->delete(action: [TaskController::class, 'delete'])
    ->options(action: [TaskController::class, 'options']);
    
$router->run();