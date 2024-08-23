import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input, Text, VStack, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const NotableAlumniPageAdd = () => {
    const navigate = useNavigate();
    const [notableAlumniPage, setNotableAlumniPage] = useState({
        notableAlumniPages_name: '',
        notableAlumniPages_designation: '',
        notableAlumniPages_text: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${url}/notablealumnipage/posts`, notableAlumniPage);

            if (response.status === 200) {
                toast({
                    title: "Notable Alumni Page Added",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate('/admin/page/notablealumnipage');
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast({
                title: "Error Adding Notable Alumni Page",
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
                    Add New Notable Alumni Page
                </Text>
                <FormControl>
                    <FormLabel>Notable Alumni Name</FormLabel>
                    <Input
                        value={notableAlumniPage.notableAlumniPages_name}
                        onChange={(e) =>
                            setNotableAlumniPage({ ...notableAlumniPage, notableAlumniPages_name: e.target.value })
                        }
                        placeholder="Notable Alumni Name"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Notable Alumni Designation</FormLabel>
                    <Input
                        value={notableAlumniPage.notableAlumniPages_designation}
                        onChange={(e) =>
                            setNotableAlumniPage({ ...notableAlumniPage, notableAlumniPages_designation: e.target.value })
                        }
                        placeholder="Notable Alumni Designation"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Notable Alumni Text</FormLabel>
                    <Textarea
                        value={notableAlumniPage.notableAlumniPages_text}
                        maxLength={750}
                        onChange={(e) =>
                            setNotableAlumniPage({ ...notableAlumniPage, notableAlumniPages_text: e.target.value })
                        }
                        placeholder="Notable Alumni Description"
                        rows={4}
                    />
                </FormControl>
                <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    Save Notable Alumni Page
                </Button>
            </VStack>
        </Box>
    );
};

export default NotableAlumniPageAdd;
