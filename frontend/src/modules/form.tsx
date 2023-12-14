// built-in modules
import React, { useRef, useState } from 'react';
// custom components
import { postRequest } from '../request';
// styles
import './form.css';


type FormProps = {
    getTasks: () => void
    getError: (error: {code: number, message: string}) => void
}

export const Form = (props: FormProps) => {

    const [content, setContent] = useState<string>('');

    const taskContentElement = useRef<HTMLInputElement>(null);

    const submit = (event: React.MouseEvent<HTMLInputElement>) => {

        event.preventDefault();
    
        try {

            // if (taskContentElement.current?.value === '') throw 'This field can not be empty';

            postRequest('http://localhost:8000/task', 'content=' + taskContentElement.current?.value)
            .then((res: any) => setContent(''))
            .catch((err: any) => props.getError({code: err.status, message: err.message}))
            .finally(() => props.getTasks());

        } catch (error: any) {
            taskContentElement.current?.classList.add('red');
            taskContentElement.current?.setAttribute('placeholder', error);
        }
    };

    const updateInputElement = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.classList.remove('red');
        event.target.setAttribute('placeholder', 'Task content');
    };

    return (
        <form method="POST">
            <header>Add new task:</header>
            <input type="text" className="task-content-input" ref={taskContentElement} placeholder="Task content" value={content} 
                   onChange={event => setContent(event.target.value)} onFocus={event => updateInputElement(event)} />
            <input type="submit" value="Add" onClick={e => submit(e)} />
        </form>
    )
}