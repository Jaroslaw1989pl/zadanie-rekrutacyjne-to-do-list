// built-in modules
import { useRef, useState } from 'react';
// custom components
import { patchRequest } from '../request';
// styles
import './list-item.css';


type ListItemProps = {
    index: number,
    task: {
        task_id: number,
        content: string,
        added_at: string,
        done: number
    },
    del: (id: number) => void
}

function ListItem(props: ListItemProps) {
    
    const [done, setDone] = useState<boolean>(!!props.task.done);

    const listItemElement = useRef<HTMLLIElement>(null);

    const taskUpdate = (done: boolean) => {
        patchRequest('http://localhost:8000/task/' + props.task.task_id)
        .then((res: any) => {
            setDone(done);
            listItemElement.current && (listItemElement.current.style.textDecoration = done === true ? 'line-through' : '');
        })
        .catch((err: any) => console.error({code: err.status, message: err.message}));
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