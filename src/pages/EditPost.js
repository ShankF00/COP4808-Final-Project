import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({ data }) => {

    const { id } = useParams();
    const [Post, setPost] = useState({ id: null, title: "", content: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Crewmates')
            .update({ title: Post.title, upvotes: Post.upvotes, content: Post.content })
            .eq('id', id);

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Crewmates')
            .delete()
            .eq('id', id);

        window.location = "http://localhost:3000/";
    }

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={Post.title} onChange={handleChange} /><br />
                <br />

                <label for="content">Content</label><br />
                <input type="text" id="content" name="content" onChange={handleChange} />
                <br />
                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost