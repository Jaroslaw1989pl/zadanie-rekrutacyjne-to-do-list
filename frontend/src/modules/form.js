// built-in modules
import { useRef, useState } from 'react';


function Form(props) {

    const [content, setContent] = useState('');

    const taskContentElement = useRef();

    const submit = (event) => {

        event.preventDefault();
    
        try {
            // if (taskContentElement.current.value === '') throw 'Please enter task content.';
        
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                // console.log(xhr.responseText);
                if (xhr.status === 200) {
                    setContent('');
                    props.getTasks();
                }
            }
            xhr.open('POST', 'http://localhost:8000/task');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send('content=' + taskContentElement.current.value);

        } catch (error) {
            // errorElement.textContent = error;
            // errorElement.style.display = 'block';
            // isFormValid = false;
        }
    };

    return (
        <form method="POST">
            <header>Add new task:</header>
            <input type="text" ref={taskContentElement} placeholder="Task content" value={content} onChange={e => setContent(e.target.value)} />
            <input type="submit" value="Add" onClick={e => {submit(e)}} />
        </form>
    )
}
  
export default Form;