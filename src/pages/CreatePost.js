import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [Post, setPost] = useState({ title: '', upvotes: 0, content: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();
        try {
            await supabase.from('Crewmates').insert([Post]);
            // Assuming that supabase.insert() returns the inserted record(s) 
            // and you can handle any Post-insertion tasks here
            console.log('Post created successfully');
            window.location = '/';
        } catch (error) {
            console.error('Error creating Post:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="content">Content</label><br />
                <input type='text' id="content" name="content" onChange={handleChange} />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost;
