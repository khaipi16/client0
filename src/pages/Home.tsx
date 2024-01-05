import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { customDateFormat } from "../components/formats/Formats";
import { BlogContent } from "../components/timeline/Timeline";
import ProfilePic from "../uploads/profile.jpg"


export const Home = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    date: '',
    content: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/latest-blog')
      .then(response => response.json())
      .then(jsonData => {
        setBlogData(jsonData);
        console.log(jsonData);
      });
  }, []);

  return (
    <Paper className="home">
        <div className="profile">
            <img src={ProfilePic} alt="Profile" className="profile-image" />
            <div className="profile-info">
                <Typography variant="h6">Cin Khai</Typography>
                <Typography variant="body2"><p>Hi! My name is Khai, and welcome to my blog.</p></Typography>
                <Button variant="outlined" color="primary">
                    Read More
                </Button>
            </div>
      </div>
      <div className="header-box">
        <Typography variant="h4" className="title">
          {blogData.title}
        </Typography>
        <div className="author-date">
          <Typography className="author">
            by: {blogData.author}
          </Typography>
          <span className="separator">|</span>
          <Typography className="date">
            {customDateFormat(blogData.date)}
          </Typography>
        </div>
        <Typography variant="body2" className="content">
        <div className="content-text">
          <BlogContent content={blogData.content}></BlogContent>
        </div>
      </Typography>
      </div>
    </Paper>
  );
};

export default Home;
