"use client";
//import Link from "next/link";
import React, { useEffect, useState } from "react";
//import {useRouter} from "next/navigation";
import axios from "axios";

import { apiUrl, Post } from "../page";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Button,  Typography } from "@mui/material";
import { token, id } from "../login/page";


export default function Dashboard() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [viewArticle,setViewArticle] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Post>()
  const handlePostClick = () => {
    setNewPost(true);
  };

 

  const getArticles = () => {
    axios
      .get(`${apiUrl}/posts`)
      .then((response) => {
        console.log("Fetched posts:", response);
        const result = response.data;
        setPosts(result.articles);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

   const postToBackend = () => {
    const article = {
      title: title,
      content: content,
      authorId: id,
      createdAt: Date.now(),
    };

    axios.post(`${apiUrl}/post`, article,{
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
  }).then(() => {
      console.log("article updated ");
      getArticles()
    }).catch((error:any)=>{
     alert('Couldnt post', error)
    })
  };


  return (
    <>
      <Button className="pt-8 border-b-blue-400" onClick={handlePostClick}>
        Post Article
      </Button>

      {newPost && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-500 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">New Post</h2>
            <textarea
              placeholder="Enter title"
              className="w-full h-10 p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></textarea>
            <textarea
              placeholder="Enter post content"
              className="w-full h-32 p-2 border border-gray-300 rounded mb-4 overflow-auto"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <button
              onClick={() => {
                setNewPost(false);
                postToBackend();
              }}
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-green-600"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {viewArticle && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-500 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{currentArticle?.title}</h2>
            
            <p>{currentArticle?.content}</p>
            <button
              onClick={() => {
                setViewArticle(false)
              }}
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div>
        {posts.map((post) => (
          <Grid key={post._id} className="cursor-pointer w-100 pt-8">
            <Card className="card">
              <CardContent className="card-content">
                <Typography variant="h5" className="post-title">
                  <div onClick={async ()=>{
                      await setCurrentArticle(post)
                    setViewArticle(true)
                  
                    }}>{post.title}</div>
                </Typography>
                <Typography variant="body2" className="post-content">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </div>
    </>
  );
}
