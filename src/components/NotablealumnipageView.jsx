import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Input, Text, VStack, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Notablealumnipageview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notableAlumnipage, setNotableAlumnipage] = useState(null);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    const fetchNotableAlumnipage = async () => {
      try {
        const response = await axios.get(`${url}/notablealumnipage/${id}`);
        console.log("Fetched notable alumnipage data:", response.data); // Log the fetched data
        setNotableAlumnipage(response.data);
      } catch (error) {
        console.error("Error fetching notable alumnipage:", error);
        setError("Failed to load notable alumnipage");
      }
    };

    fetchNotableAlumnipage();
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
      {notableAlumnipage ? (
        <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Notable Alumni Page Details
          </Text>
          <FormControl>
            <FormLabel>Notable Alumni Name</FormLabel>
            <Input
              isReadOnly
              value={notableAlumnipage.notableAlumniPages_name || ''}
              placeholder="Notable Alumni Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notable Alumni Designation</FormLabel>
            <Input
              isReadOnly
              value={notableAlumnipage.notableAlumniPages_designation || ''}
              placeholder="Notable Alumni Designation"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notable Alumni Text</FormLabel>
            <Input
              isReadOnly
              value={notableAlumnipage.notableAlumniPages_text || ''}
              placeholder="Notable Alumni Text"
            />
          </FormControl>
          <FormControl>
            <FormLabel >
              Created at
            </FormLabel>
            {notableAlumnipage.createdAt && (
              <Box
                padding="10px 20px"
                width="30%"
                bgColor={"#eef1f4"}
                fontSize={"medium"}
              >
                {new Date(notableAlumnipage.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </Box>
            )}
            <FormLabel>
              Modified at
            </FormLabel>
            {notableAlumnipage.modifiedAt && (
              <Box
                padding="10px 20px"
                width="30%"
                bgColor={"#eef1f4"}
                fontSize={"medium"}
              >
                {new Date(notableAlumnipage.modifiedAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </Box>
            )}
          </FormControl>
        </VStack>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default Notablealumnipageview;
