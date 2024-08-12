import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Input, Text, VStack, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

const NotablealumnipageEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notableAlumnipage, setNotableAlumnipage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();

    useEffect(() => {
        const fetchNotableAlumnipage = async () => {
            try {
                let response = await fetch(`${url}/notablealumnipage/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                setNotableAlumnipage(data);
            } catch (error) {
                console.error("Error fetching notable alumni page:", error);
                setError("Failed to load notable alumni page");
            }
        };

        fetchNotableAlumnipage();
    }, [id, url]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}/notablealumnipage/update/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notableAlumnipage),
            });

            if (response.ok) {
                toast({
                    title: "Notable Alumni Page Updated",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate(-1);
            } else {
                const data = await response.json();
                throw new Error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Updating Notable Alumni Page",
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
            {notableAlumnipage ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Edit Notable Alumni Page
                    </Text>
                    <FormControl>
                        <FormLabel>Notable Alumni Name</FormLabel>
                        <Input
                            value={notableAlumnipage.notableAlumniPages_name}
                            onChange={(e) =>
                                setNotableAlumnipage({ ...notableAlumnipage, notableAlumniPages_name: e.target.value })
                            }
                            placeholder="Notable Alumni Name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Notable Alumni Designation</FormLabel>
                        <Textarea
                            value={notableAlumnipage.notableAlumniPages_designation}
                            onChange={(e) =>
                                setNotableAlumnipage({ ...notableAlumnipage, notableAlumniPages_designation: e.target.value })
                            }
                            placeholder="Notable Alumni Designation"
                            rows={4}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Notable Alumni Text</FormLabel>
                        <Textarea
                            value={notableAlumnipage.notableAlumniPages_text}
                            onChange={(e) =>
                                setNotableAlumnipage({ ...notableAlumnipage, notableAlumniPages_text: e.target.value })
                            }
                            placeholder="Notable Alumni Text"
                            rows={4}
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

export default NotablealumnipageEdit;
