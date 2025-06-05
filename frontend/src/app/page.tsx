"use client";
import Image from "next/image";
import Link from "next/link";
import React, {
    useState,
    useEffect
} from 'react';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Container,
//     Grid,
//     Card,
//     CardContent,
//     TextField,
//     Button
// } from '@material-ui/core';
// import {
//     Add as AddIcon
// } from '@material-ui/icons';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import axios from 'axios';

export const apiUrl = 'http://localhost:5000/author';
export interface Post{
    _id: string;
    title: string;
    content?: string;
    crearedAt: string;
    authorId: string;

}
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
    // const [newPost, setNewPost] = useState({
    //     title: '',
    //     content: 'Sample Content'
    // });

    useEffect(() => {
        axios.get(`${apiUrl}/posts`)
            .then(response => {
              console.log('Fetched posts:', response);
              const result= response.data
                setPosts(result.articles);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Welcome to Personal Blog 
           
          
          </li>
        
        </ol>
<div>
  {posts.map(post => (
                        <Grid key={post._id} >
                            <Card className="card">
                                <CardContent className="card-content">
                                    <Typography variant="h5"
                                        className="post-title">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2"
                                        className="post-content">
                                        {post.content}
                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        </Grid>
                    ))}
</div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/signup"
            
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Sign Up
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/login"
            rel="noopener noreferrer"
          >
            Login 
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
