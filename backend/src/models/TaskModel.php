<?php

declare(strict_types = 1);

namespace App\models;

use App\app\Database;


class TaskModel extends Database
{
    public function __construct(
        private ?int    $id       = null,
        private ?string $added_at = null,
        private ?string $content  = null,
        private ?bool   $done     = null
    ) {
        parent::__construct();
    }

    public function get(): array
    {
        $statement = $this->connection->prepare("SELECT * FROM tasks");

        $statement->execute([]);
    
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function find(): bool
    {
        $statement = $this->connection->prepare("SELECT * FROM tasks WHERE task_id = :task_id");

        $statement->execute(['task_id' => $this->id]);

        return $statement->fetch(\PDO::FETCH_ASSOC) ? true : false;
    }

    public function add(): bool|string
    {
        $query  = "INSERT INTO tasks (task_id, added_at, content, done) VALUES (:task_id, :added_at, :content, :done)";
        $values = [
            'task_id'  => $this->id,
            'added_at' => $this->added_at,
            'content'  => $this->content,
            'done'     => (int) $this->done
        ];
        $statement = $this->connection->prepare($query);

        $statement->execute($values);

        return $this->connection->lastInsertId();
    }

    public function update(): int
    {
        $query  = "UPDATE tasks SET done = :done WHERE task_id = :task_id";
        $values = [
            'task_id' => $this->id,
            'done'    => true
        ];
        $statement = $this->connection->prepare($query);

        $statement->execute($values);

        return $statement->rowCount();
    }

    /**
     * @return bool true on success or false on failure
     */
    public function delete(): bool
    {
        $statement = $this->connection->prepare("DELETE FROM tasks WHERE task_id = :task_id");

        return $statement->execute(['task_id' => $this->id]);
    }
}