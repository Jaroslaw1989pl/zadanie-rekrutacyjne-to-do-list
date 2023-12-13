<?php

declare(strict_types = 1);

namespace App\controllers;

use App\app\Request;
use App\app\Response;
use App\models\TaskModel;


class TaskController
{
    public function get(Request $request, Response $response): void
    {
        try {
            $task = new TaskModel();
    
            $result = $task->get();
    
            $response->code(200)->send('OK', $result);
        } catch (\Exception $exception) {
            $response->code(500)->send('Internal Server Error', ['error' => $exception->getMessage()]);
        }
    }

    public function add(Request $request, Response $response)
    {
        try {
            if (!isset($request->body()['content']) || empty($request->body()['content']))
                $response->code(422)->send('Unprocessable Content', []);

            $task   = new TaskModel(id: time(), added_at: date('Y-m-d G:i:s'), content: $request->body()['content'], done: 0);
            $result = $task->add();
    
            $response->code(200)->send('OK', ['id' => $result]);
        } catch (\Exception $exception) {
            $response->code(500)->send('Internal Server Error', ['error' => $exception->getMessage()]);
        }
    }
    
    public function update(Request $request, Response $response, $id)
    {
        try {
            $task = new TaskModel(id: (int) $id);

            $result = $task->find();
            
            if ($result === false)
                $response->code(422)->send('Unprocessable Content', ['error' => 'Product not exists']);

            $done = $result['done'] === 0 ? 1 : 0;

            if ($task->update($done) === 0)
                $response->code(200)->send('OK', ['message' => 'Product already updated']);

            $response->code(200)->send('OK', ['id' => $id]);
        } catch (\Exception $exception) {
            $response->code(500)->send('Internal Server Error', ['error' => $exception->getMessage()]);
        }
    }

    public function delete(Request $request, Response $response, $id)
    {
        try {
            $task = new TaskModel(id: (int) $id);
            
            if ($task->find() === false)
                $response->code(422)->send('Unprocessable Content', ['error' => 'Product not exists']);
            if ($task->delete() === false)
                $response->code(422)->send('Unprocessable Content', []);
            $response->code(200)->send('OK', ['id' => $id]);
        } catch (\Exception $exception) {
            $response->code(500)->send('Internal Server Error', ['error' => $exception->getMessage()]);
        }
    }

    public function options(Request $request, Response $response, $id)
    {
        $response->code(200)->send('OK', ['id' => $id]);
    }
}