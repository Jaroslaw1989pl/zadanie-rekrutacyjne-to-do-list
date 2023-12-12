// built-in modules
import { useState } from 'react';


function Form() {
    const [content, setContent] = useState('');

    return (
        <form>
            <header>Add new task:</header>
            <input type="text" placeholder="Task content" value={content} onChange={e => setContent(e.target.value)} />
            <input type="submit" value="Add" />
        </form>
    )
}
  
export default Form;