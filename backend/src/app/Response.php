<?php

declare(strict_types = 1);

namespace App\app;


class Response
{
    private string $protocol;
    private int    $code;
    private array  $headers;

    public function __construct()
    {
        $this->protocol = $_SERVER['SERVER_PROTOCOL'];
        $this->code     = 200;
        $this->headers  = [];
    }

    public function code(int $code): Response
    {
        $this->code = $code;

        return $this;
    }

    public function headers(array $headers): Response
    {
        $this->headers = $headers;

        return $this;
    }

    public function send(string $message, array $data): void
    {
        header_remove();
        header($this->protocol.' '.$this->code.' '.$message);
        header('Content-Type: application/json; charset=utf-8');
        // header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
        
        foreach ($this->headers as $key => $value) header($key.': '.$value);

        http_response_code($this->code);

        $response = [
            'status'  => $this->code,
            'message' => $message,
            'data'    => $data
        ];

        echo json_encode($response);

        exit();
    }
}