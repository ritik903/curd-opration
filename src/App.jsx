import React, { useState, useEffect } from "react";
import { fetchPosts, addPost, updatePost, deletePost } from "./API/api";
import PostForm from "./Component/PostForm";
import PostList from "./Component/PostList";
import "./App.css"
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingIds, setLoadingIds] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const newPosts = await fetchPosts(page);
        setPosts((prev) => [...prev, ...newPosts]);
        if (newPosts.length === 0) setHasMore(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const handleAddOrEdit = async (data) => {
    setFormLoading(true);
    try {
      if (editingPost) {
        const updatedPost = await updatePost(editingPost.id, data);
        setPosts((prev) =>
          prev.map((post) => (post.id === editingPost.id ? updatedPost : post))
        );
        setEditingPost(null);
      } else {
        const newPost = await addPost(data);
        setPosts((prev) => [newPost, ...prev]);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleDelete = async (id) => {
    setLoadingIds((prev) => [...prev, id]);
    try {
      await deletePost(id);
      return setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  return (
    <div className="container center">
      <h1>CRUD oprations react js</h1>
      <PostForm
        onSubmit={handleAddOrEdit}
        loading={formLoading}
        initialData={editingPost}
      />
      <PostList
        posts={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadingIds={loadingIds}
      />
      {loading && <p className="loading"></p>}
      {!hasMore && <p className="not">No more posts to load.</p>}
    </div>
  );
};

export default App;
