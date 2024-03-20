import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const apiKey = import.meta.env.VITE_REACT_APP_BACKEND;

export default function CreatePost({ history }) {
    const { handle } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [editorValue, setEditorValue] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        checkToken();
    }, []);

    async function checkToken() {
        if (!token) {
            setIsAuthorized(false);
            return;
        }
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    
        try {
            const response = await axios.post(`${apiKey}/verify`, {}, { headers });
            
            if (response.data.success) {
                setIsAuthorized(true); 
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            setIsAuthorized(false);
        }
    }
    

    async function addData() {
        const payload = { title: title, description: description, body: editorValue, tags: tags };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.post(`${apiKey}/postblog`, payload, config);
            console.log(response.data);
        } catch (error) {
            console.error('Error Post data:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAuthorized) {
            addData();
        } else {
            alert('Unauthorized: You need to log in');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container post-div">
                {isAuthorized ? (
                    <div>
                        <h3 className='mb-4'>Create a new Blog</h3>
                        <form className=''>
                            <div className="form-group row">
                                <label htmlFor="title" className="col-form-label">
                                    Title
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-form-label">
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label htmlFor="tags" className="col-form-label">
                                    Tags
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tags"
                                        placeholder="Password"
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                </div>
                            </div>
                            <ReactQuill
                                value={editorValue}
                                onChange={(value) => setEditorValue(value)}
                            />
                            <button className='btn btn-primary mt-4' onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                ) : (
                    <h2>You are not authorized</h2>
                )}
            </div>
        </div>
    );
}
