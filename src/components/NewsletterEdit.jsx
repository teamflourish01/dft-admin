import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Input, Text, VStack, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

const NewsletterEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState(null);
    const [error, setError] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();

    useEffect(() => {
        const fetchNewsletter = async () => {
            try {
                let response = await fetch(`${url}/newsletter/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                setNewsletter(data);
            } catch (error) {
                console.error("Error fetching newsletter:", error);
                setError("Failed to load newsletter");
            }
        };

        fetchNewsletter();
    }, [id, url]);

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

            const response = await fetch(`${url}/newsletter/update/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                toast({
                    title: "Newsletter Updated",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate('/admin/page/newsletter');
            } else {
                const data = await response.json();
                throw new Error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Updating Newsletter",
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
            {error && <Text color="red.500">{error}</Text>}
            {newsletter ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Edit Newsletter
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
                        Save Changes
                    </Button>
                </VStack>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
};

export default NewsletterEdit;
