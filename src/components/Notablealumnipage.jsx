import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notablealumnipage = () => {
  const [notableAlumniPages, setNotableAlumniPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotableAlumniPages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/notablealumnipage`);
        console.log("Fetched data:", response.data);
        setNotableAlumniPages(response.data);
      } catch (error) {
        console.error("Error fetching notable alumni pages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotableAlumniPages();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/notablealumnipage/delete/${id}`);
      setNotableAlumniPages(notableAlumniPages.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting notable alumni page:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/notablealumnipage/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Notable Alumni Page
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {notableAlumniPages.length} Notable Alumni Pages</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Designation</Th>
              {/* <Th>Text</Th> */}
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notableAlumniPages.map((item, i) => (
              <Tr key={item._id}>
                <Td>{i + 1}</Td>
                <Td>{item.notableAlumniPages_name}</Td>
                <Td>{item.notableAlumniPages_designation}</Td>
                {/* <Td>{item.notableAlumniPages_text}</Td> */}
                <Td>
                  <ButtonGroup>
                    <Button
                      leftIcon={<ViewIcon />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/notablealumnipage/view/${item._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<BiEditAlt />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/notablealumnipage/edit/${item._id}`)}
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

export default Notablealumnipage;
