import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const PostInfo = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData, error } = await supabase
          .from('Crewmates')
          .select()
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setPost(postData);
        setLoading(false);
        fetchComments(); // Fetch comments after post data is loaded
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, [id]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('Comments')
        .select()
        .eq('postID', id)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (!newComment.trim()) return;

      const { data, error } = await supabase
        .from('Comments')
        .insert([
          {
            postID: id,
            comment: newComment.trim(),
          },
        ]);

      if (error) {
        throw error;
      }

      setNewComment('');
      fetchComments(); // Fetch updated comments after adding new comment
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleUpvoteClick = async () => {
    try {
      // Increment upvotes locally
      const updatedUpvotes = post.upvotes + 1;
      setPost({ ...post, upvotes: updatedUpvotes });
  
      // Update upvotes in the database
      const { error } = await supabase
        .from('Crewmates')
        .update({ upvotes: updatedUpvotes })
        .eq('id', id);
  
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating upvotes:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{post.title}</h2>
      <p onClick={handleUpvoteClick} style={{ cursor: "pointer" }}>{post.upvotes} upvotes</p>
      <p>{post.content}</p>

      {/* Comment section */}
      <div style={{background: 'gray', marginBottom: "15px"}}>
        {comments.map((comment, index) => (
          <div key={index}>{comment.comment}</div>
        ))}
      </div>
      <div>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Add your comment..."
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PostInfo;



