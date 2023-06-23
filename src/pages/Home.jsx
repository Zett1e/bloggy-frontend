import React, { useEffect, useState } from 'react'
import { blogApi } from '../api/api';
import Blogs from '../components/Blogs'
import Feature from '../components/Feature'

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = () => {
    blogApi
      .get("/")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
    <Feature blogs={blogs}/>
    <Blogs blogs={blogs} />
    </div>
  )
}

export default Home