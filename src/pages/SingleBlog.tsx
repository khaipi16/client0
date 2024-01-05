import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import './Pages.css'
import { useEffect, useState } from "react"
import { BlogContent } from "../components/timeline/Timeline";
import { customDateFormat } from "../components/formats/Formats";
import { useParams } from "react-router-dom";


export const SingleBlog = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        author: '',
        date: '',
        content: ''
    });

    const {id} = useParams();
    console.log("id: ", id);
    
    useEffect(() => {
        fetch(`https://adayinthelife.onrender.com/get-blogs/${id}`)
        .then(blogData => {
            blogData.json()
            .then(jsonData => {
                setBlogData(jsonData);
                console.log("specific blog: ", jsonData);
            });
        });
    }, [])

    // if (!blogData) return '';

  return (
    <Paper className="single-blog">
        <Typography variant="h2" className="title">
            {blogData.title}
        </Typography>
            <div className="info">
                <div className="author-date">
                    <Typography  className="author">
                        by: {blogData.author}
                    </Typography>
                    <span className="separator">|</span>
                    <Typography  className="date">
                        {customDateFormat(blogData.date)}
                    </Typography>
                </div>
            </div>
            <Typography variant="body1" className="content">
                <div className="content-text">
                    <BlogContent content={blogData.content}></BlogContent>
                </div>
            </Typography>
  </Paper>
  );
};

