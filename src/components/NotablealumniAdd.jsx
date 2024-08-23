import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const NotablealumniAdd = () => {
    const navigate = useNavigate();
    const [notablealumni, setNotablealumni] = useState({
        Notable_name: '',
        Notable_designation: '',
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
            formData.append("Notable_name", notablealumni.Notable_name);
            formData.append("Notable_designation", notablealumni.Notable_designation);
            if (image) {
                formData.append("Notable_images", image);
            }

            const response = await axios.post(`${url}/notablealumni/posts`, formData);

            if (response.status === 200) {
                toast({
                    title: "Notable Alumni Added",
                    description: response.data.msg,
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate('/admin/page/notablealumni');
            } else {
                throw new Error(response.data.msg || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Adding Notable Alumni",
                description: error.response?.data?.msg || "An error occurred.",
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
                    Add New Notable Alumni
                </Text>
                <FormControl>
                    <FormLabel>Notable Alumni Image</FormLabel>
                    <Input type="file" onChange={handleFileChange} />
                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt="Notable Alumni Image"
                            boxSize="300px"
                            objectFit="cover"
                            fallbackSrc="/path/to/placeholder-image.jpg"
                            borderRadius="md"
                            mb={4}
                        />
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Notable Alumni Name</FormLabel>
                    <Input
                        value={notablealumni.Notable_name}
                        onChange={(e) =>
                            setNotablealumni({ ...notablealumni, Notable_name: e.target.value })
                        }
                        placeholder="Notable Alumni Name"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Notable Alumni Designation</FormLabel>
                    <Textarea
                        value={notablealumni.Notable_designation}
                        onChange={(e) =>
                            setNotablealumni({ ...notablealumni, Notable_designation: e.target.value })
                        }
                        placeholder="Notable Alumni Designation"
                        rows={4}
                    />
                </FormControl>
                <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    Save Notable Alumni
                </Button>
            </VStack>
        </Box>
    );
};

export default NotablealumniAdd;
