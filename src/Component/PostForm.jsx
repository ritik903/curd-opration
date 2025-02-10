import React, { useState, useEffect } from "react";

const PostForm = ({ onSubmit, loading, initialData }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setBody(initialData.body || "");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;
        onSubmit({ title, body });
        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit} className="container formCss">
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <div>
                <button type="submit" disabled={loading}>
                    {loading ? "EDITING..." : "ADD"}
                </button>
            </div>
        </form>
    );
};

export default PostForm;
