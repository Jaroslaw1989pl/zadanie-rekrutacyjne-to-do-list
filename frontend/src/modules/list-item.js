// built-in modules
import { useRef, useState } from 'react';
// styles
import './list-item.css';


function ListItem(props) {

    const [done, setDone] = useState(props.task.done);

    const listItemElement = useRef();

    const xhr = new XMLHttpRequest();

    const taskUpdate = (done) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                setDone(done);
                listItemElement.current.style.textDecoration = done === true ? 'line-through' : '';
            }
        }
        xhr.open('PATCH', 'http://localhost:8000/task/' + props.task.task_id);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    };

    return (
        <li className={"task-item" + (done ? ' done' : '')} ref={listItemElement}>
            <span className="task-item-no">{props.index}</span>
            <span className="task-item-content">{props.task.content}</span>
            <input type="checkbox" id={"task-input-" + props.index} checked={done} onChange={() => taskUpdate(!done)}/>
            <span className="task-item-added-at">{props.task.added_at}</span>
            <input type="button" id={"task-btn-" + props.index} className="task-item-btn" value="delete" onClick={() => props.del(props.task.task_id)} />
        </li>
    )
}
  
export default ListItem;