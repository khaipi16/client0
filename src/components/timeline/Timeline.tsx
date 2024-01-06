// import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DOMPurify from 'dompurify';
import { Blog } from "../blog/Blog";
import { Month } from "./Months";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Blog {
    title: string;
    author: string;
    date: string;
    content: string;
    _id: string;
}


export const BlogContent = ({ content }: { content: Blog['content'] }) => {
    const sanitizedHTML = DOMPurify.sanitize(content);
  
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  }


export const Timeline = () => {
    const [expandYear, setExpandYear] = useState<string | null>(null);
    const [expandMonth, setExpandMonth] = useState<{ year: string; month: string } | null>(null);
    const[blogs, setBlogs] = useState<{ [year: string]: { [month: string]: Blog[] } }>({});

    const handleExpandYear = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpandYear(isExpanded ? panel : null);
    }

    const handleExpandMonth = (year: string, month: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpandMonth(isExpanded ? { year, month } : null);
    }

    const formatBlogDisplay = (blogData: Blog[]) => {
        const blogDates: { [year: string]: { [month: string]: Blog[]} } = {};
        // console.log("blogData 1: ", blogData);

        blogData.forEach((blog) => {
            console.log("blog.date: ", blog.date)
            // const date = new Date(blog.date);

            const date = new Date(blog.date.replace(/-/g, '\/').replace(/T.+/, ''));

            console.log("date: ", date)
            // date.setMonth(date.getMonth() - 1);

            const year = date.getFullYear().toString();

            const month = date.toLocaleString('default', { month: 'long' });
            // console.log("blogData 2: ", blogData);


            // Ensures year and month are initialized
            if (!blogDates[year]) {
                blogDates[year] = {};
            }

            if (!blogDates[year][month]) {
            blogDates[year][month] = [];
            }

            blogDates[year][month].push(blog);

        });
        return blogDates;
    }

    useEffect(() => {
        // Fetch data from server
        fetch('https://khai-blog-api.vercel.app/get-blogs')
        .then(blogData => { blogData.json()
            .then((jsonBlog: Blog[]) => { // Converts it into json format
                console.log("blogData 1: ", blogData);

                const formatBlog = formatBlogDisplay(jsonBlog);

                // Set formatBlog data to the state
                setBlogs(formatBlog);
                console.log("format blog1 :", formatBlog)
            });
        });
    }, []); // [] --> empty dependency array -> run it only once when mounted


    return (
        <div className="wrapper">
            <div>
                <div>
                    <h1>Recent Blogs</h1>
                </div>
                    {Object.keys(blogs)
                    .sort((a, b) => parseInt(b) - parseInt(a)) // Sorts the years from newest to oldest
                    .map((year) => (
                        <Accordion className="blog-content"
                            key={year}
                            expanded={expandYear === year}
                            onChange={handleExpandYear(year)}
                        >
                            <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                                <Typography>{year}</Typography>
                            </AccordionSummary>

                            <AccordionDetails >
                                {Object.keys(blogs[year]).map((month) => (
                                    <Accordion
                                        key={month}
                                        expanded={expandMonth?.year === year && expandMonth?.month === month}
                                        onChange={handleExpandMonth(year, month)}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            <Typography >{month}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {blogs[year][month].map((postData, postIndex) => (
                                                <div key={postIndex}>
                                                    <div>
                                                        <NavLink to={`/recent-blogs/${postData._id}`} className="nav-link">
                                                            <strong>{postData.title}</strong>
                                                        </NavLink>
                                                    </div>
                                                    <div>
                                                        <strong>Author:</strong> {postData.author}
                                                    </div>
                                                    <div>
                                                        <strong>Date:</strong> {postData.date}
                                                    </div>
                                                    <div>
                                                        <strong></strong>
                                                        <BlogContent content={postData.content} />
                                                    </div>
                                              </div>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))};
            </div>
        </div>
    )
}