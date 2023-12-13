// built-in modules
import { useState, useEffect } from 'react';
// custom modules
import Form from './modules/form';
import ListItem from './modules/list-item';
// styles
import './App.css';


function App() {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const xhr = new XMLHttpRequest();
    
    useEffect(() => {
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.data) {
                setTasks(response.data);
                setIsLoading(false);
            }
        };
        xhr.open('GET', 'http://localhost:8000/task');
        xhr.send();
    }, [isLoading]);

    const taskDelete = (id) => {
        xhr.onload = () => {
            console.log(xhr.responseText);
            if (xhr.status === 200) {
                const newList = tasks.filter((item) => item.task_id !== id);
                setTasks(newList);
            }
        }
        xhr.open('DELETE', 'http://localhost:8000/task/' + id);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    };
  
    return (
        <main>
            <Form getTasks={() => setIsLoading(!isLoading)} />
            <ul>{tasks.map((task, index) => <ListItem key={index} index={index} task={task} del={taskDelete} />)}</ul>
        </main>
    )
}

export default App;
