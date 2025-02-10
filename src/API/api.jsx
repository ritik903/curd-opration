import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page, limit = 10) => {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: { _page: page, _limit: limit },
    });
    return response.data;
};

export const addPost = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/posts`, data);
    return response.data;
};

export const updatePost = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/posts/${id}`, data);
    return response.data;
};

export const deletePost = async (id) => {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
};
