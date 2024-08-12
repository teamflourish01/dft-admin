import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Alumnicommitiee = () => {
  const [alumnicommitiee, setAlumnicommitiee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumnicommitiee = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/alumnicommitiee`);
        console.log("Fetched data:", response.data);
        setAlumnicommitiee(response.data);
      } catch (error) {
        console.error("Error fetching alumnicommitiee:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumnicommitiee();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/alumnicommitiee/delete/${id}`);
      setAlumnicommitiee(alumnicommitiee.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting alumnicommitiee:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/alumnicommitiee/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Alumnicommitiee
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {alumnicommitiee.length} Alumnicommitiee Members</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alumnicommitiee.map((item, i) => (
              <Tr key={item._id}>
                <Td>{i + 1}</Td>
                <Td>{item.Commitiee_name}</Td>
                <Td>
                  {item.Commitiee_images ? (
                    <Image
                      src={`${url}/alumnicommitiee/${item.Commitiee_images}`}
                      alt="Commitiee Image"
                      boxSize="100px"
                      objectFit="cover"
                      fallbackSrc="/path/to/placeholder-image.jpg"
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
                      onClick={() => navigate(`/admin/page/alumnicommitiee/view/${item._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<BiEditAlt />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/alumnicommitiee/edit/${item._id}`)}
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

export default Alumnicommitiee;
