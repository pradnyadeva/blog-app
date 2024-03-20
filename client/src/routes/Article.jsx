import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import truncate from '../components/truncate';
import { Card, Text, CardBody, CardHeader, Heading, Button, Stack, StackDivider, Box } from '@chakra-ui/react';
import { Outlet, Link } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
const apiKey = import.meta.env.VITE_REACT_APP_BACKEND;

export default function Article() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(apiKey);
        axios.get(`${apiKey}/getblog`)
            .then(response => {
                console.log(response.data);
                setBlogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <div className="spinner-container">
                    <GridLoader color={"#36D7B7"} loading={loading} size={15} />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className='container article mt-5'>
                        {blogs.map(blog => (
                            <Card key={blog._id} mb={4}>
                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                {blog.title}
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {blog.description}
                                            </Text>
                                            <Link to={`/pages/${blog._id}`}>
                                                <Button>View</Button>
                                            </Link>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}
