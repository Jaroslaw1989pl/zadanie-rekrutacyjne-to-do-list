<?php

declare(strict_types = 1);

namespace App\app;


class Request
{
    public readonly string $method;
    public readonly string $path;
    public readonly string $query;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path   = $_SERVER['REQUEST_URI'];
        $this->query  = $_SERVER['QUERY_STRING'];
    }

    public function body(): array
    {
        $body = [];

        switch ($this->method)
        {
            case 'GET': $body = $_GET;
                break;
            case 'POST': $body = $_POST;
                break;
            default: $body = [];
                break;
        }

        return $body;
    }
}