import React, { useEffect, useState, useRef, useMemo } from "react";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import JoditEditor from "jodit-react";

const DeskfounderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deskfounder, setDeskfounder] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      height: "400px",
    }),
    []
  );

  useEffect(() => {
    const fetchDeskfounder = async () => {
      try {
        let response = await fetch(`${url}/deskfounder/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log("edit editor res data", data);
        setDeskfounder(data);

        setImagePreview(`${url}/deskfounder/${data.Deskfounder_images}`);
      } catch (error) {
        console.error("Error fetching Deskfounder details:", error);
        setError("Failed to load Deskfounder details");
      }
    };

    fetchDeskfounder();
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
      formData.append("description", deskfounder.description);
      formData.append("author_name", deskfounder.author_name);

      if (image) {
        formData.append("Deskfounder_images", image);
      }

      const response = await fetch(`${url}/deskfounder/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Deskfounder Updated",
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
        title: "Error Updating Deskfounder",
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
      {deskfounder ? (
        <VStack
          spacing={4}
          align="stretch"
          p={5}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Edit Deskfounder
          </Text>
          <FormControl>
            <FormLabel>Deskfounder Name</FormLabel>
            <JoditEditor
              ref={editor}
              value={deskfounder.description}
              config={config}
              onChange={(newContent) =>
                setDeskfounder({ ...deskfounder, description: newContent })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Deskfounder Image</FormLabel>
            <Input type="file" onChange={handleFileChange} />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Deskfounder Image"
                boxSize="300px"
                objectFit="cover"
                fallbackSrc="/path/to/placeholder-image.jpg"
                borderRadius="md"
                mb={4}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Author Name</FormLabel>
            <Input
              width={"30%"}
              value={deskfounder.author_name}
              name="author_name"
              onChange={(e) => {
                const { name, value } = e.target;
                setDeskfounder({ ...deskfounder, [name]: value });
              }}
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

export default DeskfounderEdit;
