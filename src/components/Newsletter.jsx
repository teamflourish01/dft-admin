import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsletters = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/newsletter`);
        console.log("Fetched data:", response.data);
        setNewsletters(response.data);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsletters();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/newsletter/delete/${id}`);
      setNewsletters(newsletters.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting newsletter:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/newsletter/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Newsletter
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {newsletters.length} Newsletters</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>PDF Name</Th>
              <Th>Created At</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsletters.map((item, i) => (
              <Tr key={item._id}>
                <Td>{i + 1}</Td>
                <Td>{item.Newsletter_name}</Td>
                <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                <Td>
                  <ButtonGroup>
                    <Button
                      leftIcon={<BiEditAlt />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/newsletter/edit/${item._id}`)}
                    >
                      Edit
                    </Button>
                    <DeleteBtn handleDelete={() => handleDelete(item._id)} />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Newsletter;
