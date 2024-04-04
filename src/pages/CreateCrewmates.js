import React, { useState } from 'react';
import './CreateCrewmates.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [crewmate, setPost] = useState({ name: '', speed: '', color: '' });

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
            await supabase.from('Crewmates').insert([crewmate]);
            // Assuming that supabase.insert() returns the inserted record(s) 
            // and you can handle any crewmate-insertion tasks here
            console.log('crewmate created successfully');
            window.location = '/';
        } catch (error) {
            console.error('Error creating crewmate:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" onChange={handleChange} /><br />
                <br />

                <label htmlFor="speed">Speed</label><br />
                <input type="number" id="speed" name="speed" onChange={handleChange} /><br />
                <br />

                <label htmlFor="color">Color</label><br />
                <input type='text' id="color" name="color" onChange={handleChange} />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost;
