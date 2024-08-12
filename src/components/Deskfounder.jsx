import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Deskfounder = () => {
  const [deskfounder, setDeskfounder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeskfounder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/deskfounder`);
        console.log("Fetched data:", response.data);
        setDeskfounder(response.data);
        // console.log("Updated state:", deskfounder);
      } catch (error) {
        console.error("Error fetching deskfounder:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeskfounder();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/deskfounder/delete/${id}`);
      setDeskfounder(deskfounder.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting deskfounder:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/deskfounder/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Deskfounder
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {deskfounder.length} Deskfounder Members</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              {/* <Th>Name</Th> */}
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {deskfounder.length > 0 ? (
              deskfounder.map((item, i) => (
                <Tr key={item._id}>
                  <Td>{i + 1}</Td>
                  {/* <Td>{item.Deskfounder_name || "No Name"}</Td> */}
                  <Td>
                    {item.Deskfounder_images ? (
                      <Image
                        src={`${url}/deskfounder/${item.Deskfounder_images}`}
                        alt="Founder Image"
                        boxSize="100px"
                        objectFit="cover"
                      />
                    ) : "No Image"}
                  </Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<ViewIcon />}
                        bgColor={"#161616"}
                        variant="solid"
                        color="white"
                        onClick={() => navigate(`/admin/page/deskfounder/view/${item._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        leftIcon={<BiEditAlt />}
                        bgColor={"#161616"}
                        variant="solid"
                        color="white"
                        onClick={() => navigate(`/admin/page/deskfounder/edit/${item._id}`)}
                      >
                        Edit
                      </Button>
                      <DeleteBtn handleDelete={() => handleDelete(item._id)} />
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4">No deskfounder members found.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Deskfounder;
