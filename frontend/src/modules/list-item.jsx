"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// built-in modules
const react_1 = require("react");
// custom components
const request_1 = require("../request");
// styles
require("./list-item.css");
function ListItem(props) {
    const [done, setDone] = (0, react_1.useState)(!!props.task.done);
    const listItemElement = (0, react_1.useRef)(null);
    const taskUpdate = (done) => {
        (0, request_1.patchRequest)('http://localhost:8000/task/' + props.task.task_id)
            .then((res) => {
            setDone(done);
            listItemElement.current && (listItemElement.current.style.textDecoration = done === true ? 'line-through' : '');
        })
            .catch((err) => console.log({ code: err.status, message: err.message }));
    };
    return (<li className={"task-item" + (done ? ' done' : '')} ref={listItemElement}>
            <span className="task-item-no">{props.index}</span>
            <span className="task-item-content">{props.task.content}</span>
            <input type="checkbox" id={"task-input-" + props.index} checked={done} onChange={() => taskUpdate(!done)}/>
            <span className="task-item-added-at">{props.task.added_at}</span>
            <input type="button" id={"task-btn-" + props.index} className="task-item-btn" value="delete" onClick={() => props.del(props.task.task_id)}/>
        </li>);
}
exports.default = ListItem;
