import React, { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, redirect } from 'react-router-dom';


export const Blog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [fieldRequired, setFieldRequired] = useState('');
    const [redirect, setRedirect] = useState(false);

    const writeNewBlog = async (ev: React.FormEvent) => {
        ev.preventDefault();

        // Ensures content of blog is not empty
        if (!content) {
             setFieldRequired("Field is required");
             return;
        }


        const data = new FormData();
        data.set('title', title);
        data.set('author', author);
        data.set('date', date);
        data.set('content', content);

        // Check if file is not null before appending
        if (file) {
            data.append('file', file)
        }
        try{
            const response = await fetch('http://localhost:4000/write', {
                method: 'POST',
                body: data,
                credentials: 'include'
            });
            console.log("blog res: ", response.json())
            if (response.ok) {
                alert("Successfully posted!");
                setRedirect(true)
            }
            else {
                alert("Failed to post :(")
            }
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
                <div className="form-group col-md-6"> {/* col-md adjusts the horizontal size */}
                    <input type="file" className="form-control"
                    onChange={ev => setFile(ev.target.files ? ev.target.files[0] : null)}/>
                </div>
                <div className="form-group">
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