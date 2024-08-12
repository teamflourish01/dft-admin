import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const TestimonialAdd = () => {
    const navigate = useNavigate();
    const [testimonial, setTestimonial] = useState({
        Testimonial_name: '',
        Testimonial_description: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        setImage(file);
        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("Testimonial_name", testimonial.Testimonial_name);
            formData.append("Testimonial_description", testimonial.Testimonial_description);
            if (image) {
                formData.append("Testimonial_image", image);
            }

            const response = await axios.post(`${url}/Testimonial/posts`, formData);

            if (response.status === 200) {
                toast({
                    title: "Testimonial Added",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate('/admin/page/testimonial');
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Adding Testimonial",
                description: error.message,
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

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
            <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Add New Testimonial
                </Text>
                <FormControl>
                    <FormLabel>Testimonial Image</FormLabel>
                    <Input type="file" onChange={handleFileChange} />
                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt="Testimonial Image"
                            boxSize="300px"
                            objectFit="cover"
                            fallbackSrc="/path/to/placeholder-image.jpg"
                            borderRadius="md"
                            mb={4}
                        />
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Testimonial Name</FormLabel>
                    <Input
                        value={testimonial.Testimonial_name}
                        onChange={(e) =>
                            setTestimonial({ ...testimonial, Testimonial_name: e.target.value })
                        }
                        placeholder="Testimonial Name"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Testimonial Description</FormLabel>
                    <Textarea
                        value={testimonial.Testimonial_description}
                        onChange={(e) =>
                            setTestimonial({ ...testimonial, Testimonial_description: e.target.value })
                        }
                        placeholder="Testimonial Description"
                        rows={4}
                    />
                </FormControl>
                <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    Save Testimonial
                </Button>
            </VStack>
        </Box>
    );
};

export default TestimonialAdd;
