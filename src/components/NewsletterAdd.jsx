import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input, Text, VStack, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const NewsletterAdd = () => {
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState({
        Newsletter_name: '',
    });
    const [pdf, setPdf] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        setPdf(file);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("Newsletter_name", newsletter.Newsletter_name);
            if (pdf) {
                formData.append("Newsletter_pdfs", pdf);
            }

            const response = await axios.post(`${url}/newsletter/posts`, formData);

            if (response.status === 200) {
                toast({
                    title: "Newsletter Added",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate('/admin/page/newsletter');
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Adding Newsletter",
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
                    Add New Newsletter
                </Text>
                <FormControl>
                    <FormLabel>Newsletter PDF</FormLabel>
                    <Input type="file" onChange={handleFileChange} />
                </FormControl>
                <FormControl>
                    <FormLabel>Newsletter Name</FormLabel>
                    <Input
                        value={newsletter.Newsletter_name}
                        onChange={(e) =>
                            setNewsletter({ ...newsletter, Newsletter_name: e.target.value })
                        }
                        placeholder="Newsletter Name"
                    />
                </FormControl>
                <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    Save Newsletter
                </Button>
            </VStack>
        </Box>
    );
};

export default NewsletterAdd;
