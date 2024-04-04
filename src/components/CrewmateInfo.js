import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const CrewmateInfo = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data: crewmateData, error } = await supabase
          .from('Crewmates')
          .select()
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setCrewmate(crewmateData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crewmate:', error.message);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!crewmate) {
    return <div>Crewmate not found.</div>;
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h2>{crewmate.name}</h2>
      <p>{crewmate.speed} mph</p>
      <p>{crewmate.color}</p>
    </div>
  );
};

export default CrewmateInfo;
