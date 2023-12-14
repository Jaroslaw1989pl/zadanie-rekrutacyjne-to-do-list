"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
// built-in modules
const react_1 = __importStar(require("react"));
// custom components
const request_1 = require("../request");
// styles
require("./form.css");
const Form = (props) => {
    const [content, setContent] = (0, react_1.useState)('');
    const taskContentElement = (0, react_1.useRef)(null);
    const submit = (event) => {
        var _a, _b, _c;
        event.preventDefault();
        try {
            // if (taskContentElement.current?.value === '') throw 'This field can not be empty';
            (0, request_1.postRequest)('http://localhost:8000/task', 'content=' + ((_a = taskContentElement.current) === null || _a === void 0 ? void 0 : _a.value))
                .then((res) => setContent(''))
                .catch((err) => props.getError({ code: err.status, message: err.message }))
                .finally(() => props.getTasks());
        }
        catch (error) {
            (_b = taskContentElement.current) === null || _b === void 0 ? void 0 : _b.classList.add('red');
            (_c = taskContentElement.current) === null || _c === void 0 ? void 0 : _c.setAttribute('placeholder', error);
        }
    };
    const updateInputElement = (event) => {
        event.target.classList.remove('red');
        event.target.setAttribute('placeholder', 'Task content');
    };
    return (<form method="POST">
            <header>Add new task:</header>
            <input type="text" className="task-content-input" ref={taskContentElement} placeholder="Task content" value={content} onChange={event => setContent(event.target.value)} onFocus={event => updateInputElement(event)}/>
            <input type="submit" value="Add" onClick={e => submit(e)}/>
        </form>);
};
exports.Form = Form;
