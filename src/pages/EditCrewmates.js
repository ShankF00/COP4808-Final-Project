import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditCrewmates.css'
import { supabase } from '../client'

const EditCrewmates = ({ data }) => {

    const { id } = useParams();
    const [crewmate, setCrewmates] = useState({ id: null, name: "", speed: "", color: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmates((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const updateCrewmates = async (event) => {
        event.preventDefault();

        await supabase
            .from('Crewmates')
            .update({ name: crewmate.name, speed: crewmate.speed, color: crewmate.color })
            .eq('id', id);

        window.location = "/";
    }

    const deleteCrewmates = async (event) => {
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
                <label for="name">Name</label> <br />
                <input type="text" id="name" name="name" value={crewmate.name} onChange={handleChange} /><br />
                <br />

                <label for="speed">Speed</label><br />
                <input type="text" id="speed" name="speed" value={crewmate.speed} onChange={handleChange} /><br />
                <br />

                <label for="color">Color</label><br />
                <input type="text" id="color" name="color" onChange={handleChange} />
                <br />
                <input type="submit" value="Submit" onClick={updateCrewmates} />
                <button className="deleteButton" onClick={deleteCrewmates}>Delete</button>
            </form>
        </div>
    )
}

export default EditCrewmates