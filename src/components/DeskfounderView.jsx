import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Spinner,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import JoditEditor from "jodit-react";
import { useToast } from "@chakra-ui/react";

const DeskfounderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deskfounder, setDeskfounder] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();

  useEffect(() => {
    const fetchDeskfounder = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(`${url}/deskfounder/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setDeskfounder(data);
        console.log("editor data", deskfounder);
      } catch (error) {
        console.error("Error fetching Deskfounder details:", error);
        setError("Failed to load Deskfounder details");
        toast({
          title: "Error Loading Deskfounder",
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

    fetchDeskfounder();
  }, [id, url, toast]);

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
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : deskfounder ? (
        <VStack
          spacing={4}
          align="stretch"
          p={5}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Deskfounder Details
          </Text>
          <FormControl>
            <FormLabel>Deskfounder Name</FormLabel>
            <JoditEditor
              value={deskfounder.description}
              config={{ readonly: true, toolbar: false, height: "400px" }}
            />
          </FormControl>
          {deskfounder.Deskfounder_images && (
            <FormControl>
              <FormLabel>Deskfounder Image</FormLabel>
              <Image
                src={`${url}/deskfounder/${deskfounder.Deskfounder_images}`}
                alt="Deskfounder Image"
                boxSize="300px"
                objectFit="cover"
                fallbackSrc="/path/to/placeholder-image.jpg"
                borderRadius="md"
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Author Name</FormLabel>
            <Input
              isReadOnly
              width={"30%"}
              value={deskfounder.author_name || ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel >
              Created at
            </FormLabel>
            {deskfounder.createdAt && (
              <Box
                padding="10px 20px"
                width="30%"
                bgColor={"#eef1f4"}
                fontSize={"medium"}
              >
                {new Date(deskfounder.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </Box>
            )}
            <FormLabel>
              Modified at
            </FormLabel>
            {deskfounder.modifiedAt && (
              <Box
                padding="10px 20px"
                width="30%"
                bgColor={"#eef1f4"}
                fontSize={"medium"}
              >
                {new Date(deskfounder.modifiedAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </Box>
            )}
          </FormControl>
        </VStack>
      ) : (
        <Text>No Deskfounder found.</Text>
      )}
    </Box>
  );
};

export default DeskfounderView;
