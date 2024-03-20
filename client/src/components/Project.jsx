import { useState, useEffect } from "react";
import axios from 'axios';
import GridLoader from "react-spinners/GridLoader";
import { Card, Text, CardBody, CardHeader, Heading, Button, Stack, StackDivider, Box } from '@chakra-ui/react'
import { Outlet, Link } from "react-router-dom";

export default function Project() {
    const [blog, setBlog] = useState([]);
    const [loading, isLoading] = useState(true)
    useEffect(() => {
        function getData() {
            axios.get(`http://localhost:3200/getblog`)
                .then(response => {
                    console.log(response.data);
                    setBlog(response.data);
                    isLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        getData();
    }, []);

    return (
        <div className="listp">
            { loading ? (<></>) : (
                <div className="container w-50">
                <Card>
                    <CardHeader>
                        <Heading size='md'>Recent Project:</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            {blog[0].title}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                            {blog[0].description}
                            </Text>
                            <Link to={`/pages/${blog[0]._id}`}>
                                        <Button>View</Button>
                            </Link>
                        </Box>
                        
                        </Stack>
                    </CardBody>
                </Card>
            </div>)}
            
        </div>
    );
}
