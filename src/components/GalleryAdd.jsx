import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
  Image,
  IconButton,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const GalleryAdd = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleDelete = (imageUrl) => {
    setImagePreviews((prev) => prev.filter((preview) => preview !== imageUrl));
    setImages((prev) =>
      prev.filter((_, index) => imagePreviews[index] !== imageUrl)
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("Gallery_images", image));

      const response = await axios.post(`${url}/gallery/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast({
          title: "Gallery Added",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        navigate("/admin/page/gallery");
      } else {
        throw new Error(response.data.message || "Failed to add gallery");
      }
    } catch (error) {
      toast({
        title: "Error Adding Gallery",
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
      <VStack
        spacing={4}
        align="stretch"
        p={5}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Add New Gallery
        </Text>
        <FormControl>
          <FormLabel>Gallery Images</FormLabel>
          <Input type="file" multiple onChange={handleFileChange} />
          {imagePreviews.length > 0 && (
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {imagePreviews.map((image, index) => (
                <Box key={index} position="relative">
                  <Image
                    src={image}
                    alt={`Preview ${index}`}
                    boxSize="200px"
                    objectFit="cover"
                  />
                  <MdDelete
                    color="red"
                    cursor="pointer"
                    size={"40px"}
                    style={{
                        position: "absolute",
                        top: "4px",
                        right: "0",
                        marginTop: "-2px",
                        marginRight: "-2px",
                      }}
                    onClick={() => handleDelete(image)}
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
          {isLoading ? <Spinner size="sm" /> : "Add Gallery"}
        </Button>
      </VStack>
    </Box>
  );
};

export default GalleryAdd;
