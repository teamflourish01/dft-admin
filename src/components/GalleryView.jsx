import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Text, VStack, Button, FormControl, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const GalleryView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [galleryItem, setGalleryItem] = useState(null);
    const [error, setError] = useState(null);
    const url = process.env.REACT_APP_DEV_URL;

    useEffect(() => {
        const fetchGalleryItem = async () => {
            try {
                let response = await fetch(`${url}/gallery/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                console.log("Fetched gallery item data:", data); // Log the fetched data
                setGalleryItem(data);
            } catch (error) {
                console.error("Error fetching gallery item:", error);
                setError("Failed to load gallery item");
            }
        };

        fetchGalleryItem();
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
            {galleryItem ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Gallery Item Details
                    </Text>

                    <FormControl>
                        <FormLabel>Gallery Images</FormLabel>
                        {galleryItem.Gallery_images && galleryItem.Gallery_images.length > 0 ? (
                            <SimpleGrid columns={[1, 2, 3, 4 ]} spacing={5}>
                                {galleryItem.Gallery_images.map((image, index) => (
                                    <Image 
                                        key={index}
                                        src={`${url}/gallery/${image}`} 
                                        alt={`Gallery Image ${index + 1}`} 
                                        boxSize="200px" 
                                        objectFit="cover"
                                        fallbackSrc="/path/to/placeholder-image.jpg"
                                        borderRadius="md"
                                    />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Text>No Images Available</Text>
                        )}
                    </FormControl>
                </VStack>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
}

export default GalleryView;
