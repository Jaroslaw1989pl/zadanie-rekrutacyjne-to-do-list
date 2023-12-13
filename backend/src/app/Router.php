<?php

declare(strict_types = 1);

namespace App\app;


class Router
{
    private string $route;
    private array  $routes;

    public function __construct(
        private Request  $request,
        private Response $response
    ) {

    }

    public function route(string $path): Router
    {
        $this->route = $path;

        return $this;
    }

    public function get(array $action): Router
    {
        $this->routes['GET'][$this->route] = [
            'class'  => $action[0],
            'method' => $action[1]
        ];
    
        return $this;
    }

    public function post(array $action): Router
    {
        $this->routes['POST'][$this->route] = [
            'class'  => $action[0],
            'method' => $action[1]
        ];

        return $this;
    }

    public function patch(array $action): Router
    {
        $this->routes['PATCH'][$this->route] = [
            'class'  => $action[0],
            'method' => $action[1]
        ];

        return $this;
    }

    public function delete(array $action): Router
    {
        $this->routes['DELETE'][$this->route] = [
            'class'  => $action[0],
            'method' => $action[1]
        ];

        return $this;
    }

    public function options(array $action): Router
    {
        $this->routes['OPTIONS'][$this->route] = [
            'class'  => $action[0],
            'method' => $action[1]
        ];

        return $this;
    }

    public function run(): void
    {
        // echo '<pre>';
        // var_dump($this->routes);
        // exit;
        try {

            $callback = null;
            $params   = [];

            foreach ($this->routes[$this->request->method] as $route => $controller)
            {
                $expression = str_replace('/', '\/', $route);
                $expression = preg_replace('/{\w+}/', '\w+', $expression);
                
                if (preg_match("/^$expression$/", $this->request->path, $matches))
                {
                    $paramKeys   = array_map(fn ($element) => trim($element, '{}'), explode('/', $route));
                    $paramValues = explode('/', $this->request->path);

                    $params = array_combine($paramKeys, $paramValues);
                    $params = array_filter($params, fn ($key, $value) => $key !== $value, ARRAY_FILTER_USE_BOTH);

                    $callback = $controller;

                    break;
                }
            }

            if ($callback === null) $this->response->code(404)->send('Not found', []);
    
            call_user_func([new $callback['class'](), $callback['method']], $this->request, $this->response, ...$params);

        } catch (\Exception $exception) {
            echo '<pre>';
            var_dump($exception);
            exit;
        }
    }
}