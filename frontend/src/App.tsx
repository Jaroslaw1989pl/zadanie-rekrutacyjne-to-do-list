// built-in modules
import { useState, useEffect } from 'react';
// custom modules
import { Form } from './modules/form';
import ListItem from './modules/list-item';
import { getRequest, deleteRequest } from './request';
// styles
import './App.css';


type taskType = {
    id: number
    task_id: number,
    content: string,
    added_at: string,
    done: number
};
type errorType = {
    code: number,
    message: string
}

export const App = () => {

    const [tasks, setTasks] = useState<taskType[]>([]);
    const [error, setError] = useState<errorType|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        getRequest('http://localhost:8000/task')
        .then((res: any) => setTasks(res.data))
        .catch((err: any) => setError({code: err.status, message: err.message}))
        .finally(() => setIsLoading(false));
    }, [isLoading]);

    const taskDelete = (id: number) => {
        deleteRequest('http://localhost:8000/task/' + id)
        .then((res: any) => setTasks(tasks.filter((item) => item.task_id !== id)))
        .catch((err: any) => setError({code: err.status, message: err.message}));
    };
  
    return error 
    ? <h1>{error.code} {error.message}</h1>
    : <main>
        <Form getTasks={() => setIsLoading(!isLoading)} getError={(error: errorType) => setError(error)} />
        <ul>{tasks.map((task, index) => <ListItem key={index} index={index} task={task} del={taskDelete} />)}</ul>
      </main>
    
}