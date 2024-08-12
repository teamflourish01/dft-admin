import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notablealumni = () => {
  const [notablealumni, setNotablealumni] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotablealumni = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/notablealumni`);
        console.log("Fetched data:", response.data);
        setNotablealumni(response.data);
      } catch (error) {
        console.error("Error fetching notablealumni:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotablealumni();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/notablealumni/delete/${id}`);
      setNotablealumni(notablealumni.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting notablealumni:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/Notablealumni/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Notablealumni
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {notablealumni.length} Notablealumni</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notablealumni.map((item, i) => (
              <Tr key={item._id}>
                <Td>{i + 1}</Td>
                <Td>{item.Notable_name}</Td>
                <Td>
                  {item.Notable_images ? (
                    <Image
                      src={`${url}/notablealumni/${item.Notable_images}`}
                      alt="Notable Alumni Image"
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
                      onClick={() => navigate(`/admin/page/notablealumni/view/${item._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<BiEditAlt />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/notablealumni/edit/${item._id}`)}
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

export default Notablealumni;
