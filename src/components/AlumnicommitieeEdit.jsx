import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Input,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

const AlumnicommitieeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumnicommitiee, setAlumnicommitiee] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();

  useEffect(() => {
    const fetchAlumnicommitiee = async () => {
      try {
        let response = await fetch(`${url}/alumnicommitiee/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setAlumnicommitiee(data);
        setImagePreview(`${url}/alumnicommitiee/${data.Commitiee_images}`);
      } catch (error) {
        console.error("Error fetching committee member:", error);
        setError("Failed to load committee member");
      }
    };

    fetchAlumnicommitiee();
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
      formData.append("Commitiee_name", alumnicommitiee.Commitiee_name);
      formData.append(
        "Commitiee_designation",
        alumnicommitiee.Commitiee_designation
      );
      if (image) {
        formData.append("Commitiee_images", image);
      }

      const response = await fetch(`${url}/alumnicommitiee/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Committee Member Updated",
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
        title: "Error Updating Committee Member",
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
      {alumnicommitiee ? (
        <VStack
          spacing={4}
          align="stretch"
          p={5}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Edit Committee Member
          </Text>
          <FormControl>
            <FormLabel>Committee Member Image</FormLabel>
            <Input type="file" onChange={handleFileChange} />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Committee Member Image"
                boxSize="300px"
                objectFit="cover"
                fallbackSrc="/path/to/placeholder-image.jpg"
                borderRadius="md"
                mb={4}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Committee Member Name</FormLabel>
            <Input
              value={alumnicommitiee.Commitiee_name}
              onChange={(e) =>
                setAlumnicommitiee({
                  ...alumnicommitiee,
                  Commitiee_name: e.target.value,
                })
              }
              placeholder="Committee Member Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Committee Member Designation</FormLabel>
            <Textarea
              value={alumnicommitiee.Commitiee_designation}
              onChange={(e) =>
                setAlumnicommitiee({
                  ...alumnicommitiee,
                  Commitiee_designation: e.target.value,
                })
              }
              placeholder="Committee Member Designation"
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

export default AlumnicommitieeEdit;
