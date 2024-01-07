import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, redirect } from 'react-router-dom';
import { UserContext, UserContextType } from '../../UserContext';

export const Blog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [fieldRequired, setFieldRequired] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {userData, setUserData} = useContext(UserContext) as UserContextType;

    const writeNewBlog = async (ev: React.FormEvent) => {
        ev.preventDefault();

        // Ensures content of blog is not empty
        if (!content) {
             setFieldRequired("Field is required");
             return;
        }
        const data = {
            title,
            author,
            date,
            content,
        };
        try{
            const response = await fetch('https://khai-blog-api.vercel.app/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(response => {
                response.json().then(userInfo => {
                    setUserData(userInfo)
                    if (response.ok) {
                        alert("Successfully posted!");
                        setRedirect(true)
                    }
                    else {
                        alert("Failed to post :(")
                    }
                })});
            }
        catch (ex) {
            console.error('Error: ', ex);
        }
    }
    
    if (redirect) {
        return <Navigate to={'/'} />
    }

    
    return (
        <div className="mt-5">
            <h2>Write a New Blog</h2>
                <form onSubmit={writeNewBlog}>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <input type="text" className="form-control" id="title" 
                            placeholder='Title' required
                            value={title} 
                            onChange={ev => setTitle(ev.target.value)}/>
                        </div>
                        <div className="form-group col-md-6">
                        <input type="text" className="form-control" id="author" 
                            placeholder='Author' 
                            value={author}
                            onChange={ev => setAuthor(ev.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <input type="date" className="form-control" id="date" 
                    value={date}
                    required
                    onChange={ev => setDate(ev.target.value)}/>
                </div>
                <div className="form-group">
                    <ReactQuill 
                    value={content} 
                    onChange={newValue => setContent(newValue)}/> {/* npm install react-quill, an add-on for text box */}
                    {fieldRequired && (
                        <div className="text-danger">{fieldRequired}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
                </form>
        </div>
    )

}