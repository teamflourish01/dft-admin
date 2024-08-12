import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const NotablealumniView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notablealumni, setNotablealumni] = useState(null);
    const [error, setError] = useState(null);
    const url = process.env.REACT_APP_DEV_URL;

    useEffect(() => {
        const fetchNotablealumni = async () => {
            try {
                let response = await fetch(`${url}/notablealumni/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                console.log("Fetched notablealumni Data:", data); // Log the fetched data
                setNotablealumni(data);
            } catch (error) {
                console.error("Error fetching notablealumni:", error);
                setError("Failed to load notablealumni");
            }
        };

        fetchNotablealumni();
    }, [id, url]);

    return (
        <Box p={5}>
            <Button 
                leftIcon={<ArrowBackIcon />} 
                colorScheme="teal" 
                variant="solid" 
                mb={5} 
                onClick={() => navigate(-1)}
            >
                Back to List
            </Button>
            {error && <Text color="red.500">{error}</Text>}
            {notablealumni ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Notable Alumni Details
                    </Text>
                    <FormControl>
                        <FormLabel>Notable Alumni Image</FormLabel>
                        <Image 
                            src={notablealumni.Notable_images ? `${url}/notablealumni/${notablealumni.Notable_images}` : '/path/to/placeholder-image.jpg'} 
                            alt="Notable Alumni Image" 
                            boxSize="300px" 
                            objectFit="cover"
                            fallbackSrc="/path/to/placeholder-image.jpg"
                            borderRadius="md"
                            mb={4}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Notable Alumni Name</FormLabel>
                        <Input
                            isReadOnly
                            value={notablealumni.Notable_name || ''}
                            placeholder="Notable Alumni Name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Notable Alumni Designation</FormLabel>
                        <Input
                            isReadOnly
                            value={notablealumni.Notable_designation || ''}
                            placeholder="Notable Alumni Designation"
                        />
                    </FormControl>
                </VStack>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
}

export default NotablealumniView;
