"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// built-in modules
const react_1 = require("react");
// custom modules
const form_1 = require("./modules/form");
const list_item_1 = __importDefault(require("./modules/list-item"));
const request_1 = require("./request");
// styles
require("./App.css");
const App = () => {
    const [tasks, setTasks] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        (0, request_1.getRequest)('http://localhost:8000/task')
            .then((res) => setTasks(res.data))
            .catch((err) => setError({ code: err.status, message: err.message }))
            .finally(() => setIsLoading(false));
    }, [isLoading]);
    const taskDelete = (id) => {
        (0, request_1.deleteRequest)('http://localhost:8000/task/' + id)
            .then((res) => setTasks(tasks.filter((item) => item.task_id !== id)))
            .catch((err) => setError({ code: err.status, message: err.message }));
    };
    return error
        ? <h1>{error.code} {error.message}</h1>
        : <main>
        <form_1.Form getTasks={() => setIsLoading(!isLoading)} getError={(error) => setError(error)}/>
        <ul>{tasks.map((task, index) => <list_item_1.default key={index} index={index} task={task} del={taskDelete}/>)}</ul>
      </main>;
};
exports.App = App;
