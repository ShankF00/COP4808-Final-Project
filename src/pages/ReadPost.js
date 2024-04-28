import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPost = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('created_at'); // Default sort by created_at
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [sortBy, searchQuery]); // Refetch posts whenever sortBy or searchQuery changes

    const fetchPosts = async () => {
        try {
            let { data, error } = await supabase
                .from('Crewmates')
                .select()
                .order(sortBy, { ascending: sortBy === "title" })
                .ilike('title', `%${searchQuery}%`);

            if (error) {
                throw error;
            }

            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    };

    const handleSortByChange = (value) => {
        setSortBy(value);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="ReadPost">
            <div>
                <label>Sort By:</label>
                <select value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
                    <option value="created_at">Newest</option>
                    <option value="title">Title A-Z</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => 
                   <Card key={index} id={post.id} title={post.title} upvotes={post.upvotes} content={post.content} created_at={post.created_at}/>
                ) : <h2>No Posts Yet</h2>
            }
        </div>  
    );
};

export default ReadPost;
