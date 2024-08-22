import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Input,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
  IconButton,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import { MdDelete } from 'react-icons/md';

const GalleryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [galleryItem, setGalleryItem] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        let response = await fetch(`${url}/gallery/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setGalleryItem(data);
        setImagePreviews(data.Gallery_images.map(image => `${url}/gallery/${image}`));
      } catch (error) {
        console.error("Error fetching gallery item:", error);
        setError("Failed to load gallery item");
      }
    };

    fetchGalleryItem();
  }, [id, url]);

  const handleFileChange = (e) => {
    let files = Array.from(e.target.files);
    let newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...files]);
    setImagePreviews(prevPreviews => [...prevPreviews, ...newImages]);
  };

  const handleDelete = async (imageUrl) => {
    setIsLoading(true);
    try {
      const imageName = imageUrl.split('/').pop(); // Extract image filename from URL

      // Add image to delete list if not already present
      setImagesToDelete(prev => [...prev, imageName]);

      // Update gallery with the image to delete
      const response = await fetch(`${url}/gallery/update/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteImages: [...imagesToDelete, imageName] }), // Send the image names to be deleted
      });
      const data = await response.json();
      if (response.ok) {
        setImagePreviews(prevPreviews => prevPreviews.filter(preview => preview !== imageUrl));
        toast({
          title: "Image Deleted",
          
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      } else {        
        throw new Error(data.msg || "Failed to delete image");
      }
    } catch (error) {
      toast({
        title: "Error Deleting Image",
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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("Gallery_name", galleryItem.Gallery_name); // Example field

      // Append only the new images
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("Gallery_images", image);
        });
      }

      const response = await fetch(`${url}/gallery/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Gallery Update Successfuly",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        navigate(-1);
      } else {        
        throw new Error(data.msg || "Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Error Updating Gallery",
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
      {galleryItem ? (
        <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Edit Gallery
          </Text>
          <FormControl>
            <FormLabel>Gallery Images</FormLabel>
            <Input type="file" multiple onChange={handleFileChange} />
            {imagePreviews.length > 0 && (
              <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                {imagePreviews.map((image, index) => (
                  <Box key={index} position="relative">
                    <Image src={image} alt={`Preview ${index}`} boxSize="200px" objectFit="cover" />
                    <MdDelete
                      color="red"
                      cursor="pointer"
                      size={"40px"}
                      onClick={() => handleDelete(image)}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "0",
                        marginTop: "-2px",
                        marginRight: "-2px",
                      }}
                    />
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={handleSave}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Save Changes"}
          </Button>
        </VStack>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
};

export default GalleryEdit;
