import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadCrewmates = (props) => {

    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        const fetchCrewmates = async () => {
            const { data } = await supabase
                .from('Crewmates')
                .select()
                .order('created_at', { ascending: true });

            // set state of crewmates
            setCrewmates(data);
        };

        fetchCrewmates();
    }, []);

    return (
        <div className="ReadCrewmates">
            {
                crewmates && crewmates.length > 0 ?
                crewmates.map((crewmate, index) => 
                   <Card key={index} id={crewmate.id} name={crewmate.name} speed={crewmate.speed} color={crewmate.color}/>
                ) : <h2>{'No Crewmates Yet'}</h2>
            }
        </div>  
    );
};

export default ReadCrewmates;
