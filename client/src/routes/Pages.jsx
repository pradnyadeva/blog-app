import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const apiKey = import.meta.env.VITE_REACT_APP_BACKEND;

export default function Pages() {
    const { handle } = useParams();
    const [blog, setBlog] = useState({});
    const [commentBlog, setComment] = useState({
        id: handle,
        username: "",
        body: ""
    });
    const [loading, setLoading] = useState(true);

    async function addData() {
        try {
            console.log("Adding Comment:", commentBlog);
            const response = await axios.post(`${apiKey}/postcomment`, commentBlog);
            console.log(response.data);
            console.log("Blog After Adding Comment:", blog);
        } catch (error) {
            console.error('Error Post data:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addData();
    }

    useEffect(() => {
        function getData() {
            axios.get(`${apiKey}/blogdetail/${handle}`)
                .then(response => {
                    console.log(response.data);
                    setBlog(response.data);
                    setLoading(false); // Data fetched, so set loading to false
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Error occurred, set loading to false
                });
        }
        getData();
    }, [handle]);

    return (
        <div>
            <Navbar />
            {loading ? ( // Display loading text while waiting for fetch
                <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>
            ) : (
                <div>
                    {Object.keys(blog).length === 0 ? (
                        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>Article not found</h2>
                        </div>
                    ) : (
                        <div className="container-lg mt-5 article-page text-white">
                            <h2 className='mb-5'>{blog.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
                            <div className="comment text-black">
                                <form action="">
                                    <h3 className='mb-3'>Comment :</h3>
                                    {blog.comments != null ? (
                                        <>
                                            {blog.comments.map((comment) => (
                                                <div key={comment.id}>
                                                    <p>{comment.username}</p>
                                                    <p>{comment.body}</p>
                                                </div>
                                            ))}
                                        </>
                                    ) : <><p>Empty</p></>}
                                    <div className='mt-5'>
                                        <div className="form-group mb-3 w-100">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                placeholder="username"
                                                onChange={(e) => setComment({
                                                    ...commentBlog,
                                                    username: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="form-group w-100">
                                            <label htmlFor="formGroupExampleInput2">Comment</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="comment"
                                                placeholder="comment"
                                                onChange={(e) => setComment({
                                                    ...commentBlog,
                                                    body: e.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <button className='btn btn-primary mt-5' onClick={handleSubmit}>Submit</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}
