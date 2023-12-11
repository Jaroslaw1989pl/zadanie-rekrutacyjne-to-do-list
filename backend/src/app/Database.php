<?php

declare(strict_types = 1);

namespace App\app;


class Database
{
    protected ?\PDO $connection;

    public function __construct()
    {
        try {
            $this->connection = new \PDO('mysql:host=db;port=3306;dbname=docker_php_backend', 'jaroslaw', 'password');
            $this->connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->connection->exec(
                "CREATE TABLE IF NOT EXISTS tasks (
                    id int NOT NULL AUTO_INCREMENT,
                    task_id int NOT NULL,
                    added_at timestamp NOT NULL,
                    content text NOT NULL,
                    done boolean NOT NULL,
                    PRIMARY KEY (id)
                );"
            );
        } catch (\PDOException $exception) {
            throw new \Exception($exception->getMessage(), $exception->getCode());
        }
    }

    public function __destruct()
    {
        $this->connection = null;
    }
}