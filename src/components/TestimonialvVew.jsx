import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Update this line
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const TestimonialView = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Update this line
    const [testimonial, setTestimonial] = useState(null);
    const [error, setError] = useState(null);
    const url = process.env.REACT_APP_DEV_URL;

    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                let response = await fetch(`${url}/testimonial/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                console.log("Fetched Testimonial Data:", data); // Log the fetched data
                setTestimonial(data);
            } catch (error) {
                console.error("Error fetching testimonial:", error);
                setError("Failed to load testimonial");
            }
        };

        fetchTestimonial();
    }, [id, url]);

    return (
        <Box p={5}>
            <Button 
                leftIcon={<ArrowBackIcon />} 
                colorScheme="teal" 
                variant="solid" 
                mb={5} 
                onClick={() => navigate(-1)} // Update this line
            >
                Back to List
            </Button>
            {error && <Text color="red.500">{error}</Text>}
            {testimonial ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Testimonial Details
                    </Text>
                    <FormControl>
                        <FormLabel>Testimonial Image</FormLabel>
                        <Image 
                            src={testimonial.Testimonial_image ? `${url}/testimonialimage/${testimonial.Testimonial_image}` : '/path/to/placeholder-image.jpg'} 
                            alt="Testimonial Image" 
                            boxSize="300px" 
                            objectFit="cover"
                            fallbackSrc="/path/to/placeholder-image.jpg"
                            borderRadius="md"
                            mb={4}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Testimonial Name</FormLabel>
                        <Input
                            isReadOnly
                            value={testimonial.Testimonial_name || ''}
                            placeholder="Testimonial Name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Testimonial Description</FormLabel>
                        <Input
                            isReadOnly
                            value={testimonial.Testimonial_description || ''}
                            placeholder="Testimonial Description"
                            as="textarea"
                            rows={4}
                        />
                    </FormControl>
                </VStack>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
}

export default TestimonialView;
