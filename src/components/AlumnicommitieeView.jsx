import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Input, Text, VStack, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const AlumnicommitieeiView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alumnicommitiee, setAlumnicommitiee] = useState(null);
    const [error, setError] = useState(null);
    const url = process.env.REACT_APP_DEV_URL;

    useEffect(() => {
        const fetchAlumnicommitiee = async () => {
            try {
                let response = await fetch(`${url}/alumnicommitiee/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                console.log("Fetched alumnicommitiee Data:", data); // Log the fetched data
                setAlumnicommitiee(data);
            } catch (error) {
                console.error("Error fetching alumnicommitiee:", error);
                setError("Failed to load alumnicommitiee");
            }
        };

        fetchAlumnicommitiee();
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
            {alumnicommitiee ? (
                <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Alumni Committee Member Details
                    </Text>
                    <FormControl>
                        <FormLabel>Committee Member Image</FormLabel>
                        <Image 
                            src={alumnicommitiee.Commitiee_images ? `${url}/alumnicommitiee/${alumnicommitiee.Commitiee_images}` : '/path/to/placeholder-image.jpg'} 
                            alt="Committee Member Image" 
                            boxSize="300px" 
                            objectFit="cover"
                            fallbackSrc="/path/to/placeholder-image.jpg"
                            borderRadius="md"
                            mb={4}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Committee Member Name</FormLabel>
                        <Input
                            isReadOnly
                            value={alumnicommitiee.Commitiee_name || ''}
                            placeholder="Committee Member Name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Committee Member Designation</FormLabel>
                        <Input
                            isReadOnly
                            value={alumnicommitiee.Commitiee_designation || ''}
                            placeholder="Committee Member Designation"
                        />
                    </FormControl>
                </VStack>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
}

export default AlumnicommitieeiView;
