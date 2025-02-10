import React from "react";

const PostList = ({ posts, onEdit, onDelete, loadingIds }) => {
    return (
        <div className="grid_four_column container">
            {posts.map((post) => (
                <div key={post.id} className="card">
                    <div className="back">
                        <div className="blob"></div>
                        <div className="blob"></div>
                        <div className="blob"></div>
                        <div className="blob"></div>
                        <div className="blob"></div>
                    </div>
                    <div className="text">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button
                            onClick={() => onEdit(post)}
                            style={{ marginRight: "10px" }}
                            disabled={loadingIds.includes(post.id)}
                        >
                            {loadingIds.includes(post.id) ? "Editing..." : "Edit"}
                        </button>
                        <button
                            onClick={() => onDelete(post.id)}
                            disabled={loadingIds.includes(post.id)}
                        >
                            {loadingIds.includes(post.id) ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
