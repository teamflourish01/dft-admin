import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

const NotablealumniEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notablealumni, setNotablealumni] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();

    useEffect(() => {
        const fetchNotablealumni = async () => {
            try {
                let response = await fetch(`${url}/notablealumni/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                setNotablealumni(data);
                setImagePreview(`${url}/notablealumni/${data.Notable_images}`);
            } catch (error) {
                console.error("Error fetching notable alumni:", error);
                setError("Failed to load notable alumni");
            }
        };

        fetchNotablealumni();
    }, [id, url]);

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

            const response = await fetch(`${url}/notablealumni/update/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                toast({
                    title: "Notable Alumni Updated",
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
                title: "Error Updating Notable Alumni",
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
            {notablealumni ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Edit Notable Alumni
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
                        Save Changes
                    </Button>
                </VStack>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
};

export default NotablealumniEdit;
