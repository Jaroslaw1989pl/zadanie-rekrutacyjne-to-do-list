// built-in modules
import { useState, useEffect } from 'react';


function List() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                setTasks(response.data);
            }
        };
        xhr.open('GET', 'http://localhost:8000/task');
        xhr.send();
    }, []);

    return (
        <>
            <h3>Tasks list:</h3>
            {/* <ul>
                {tasks.map((task) => <li>W</li>)}
            </ul> */}

            <table>
                <thead>
                    <tr>
                        <td>ID</td><td>Content</td><td>Status</td><td>Added</td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => {
                        <tr>
                            <td>{index}</td>
                            <td>{task.content}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}
  
export default List;