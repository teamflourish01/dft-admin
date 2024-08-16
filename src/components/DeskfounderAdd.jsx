import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel, Spinner, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import JoditEditor from 'jodit-react';

const DeskfounderAdd = () => {
    const navigate = useNavigate();
    const [deskfounder, setDeskfounder] = useState({
        Deskfounder_name: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();
    const editor = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
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
            const editorContent = editor.current.value;
            formData.append("Deskfounder_name", editorContent);
            if (image) {
                formData.append("Deskfounder_image", image);
            }

            const response = await axios.post(`${url}/deskfounder/posts`, formData);

            if (response.status === 200) {
                toast({
                    title: "Deskfounder Added",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate('/admin/page/deskfounder');
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Adding Deskfounder",
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
                    Add New Deskfounder
                </Text>
                <FormControl>
                    <FormLabel>Deskfounder Image</FormLabel>
                    <Input type="file" onChange={handleFileChange} />
                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt="Deskfounder Image"
                            boxSize="300px"
                            objectFit="cover"
                            fallbackSrc="/path/to/placeholder-image.jpg"
                            borderRadius="md"
                            mb={4}
                        />
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Deskfounder Description</FormLabel>
                    <JoditEditor
                        ref={editor}
                        config={{ readonly: false, height: "200px" }}
                    />
                </FormControl>
                <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    {isLoading ? <Spinner size="sm" /> : "Save Deskfounder"}
                </Button>
            </VStack>
        </Box>
    );
};

export default DeskfounderAdd;
