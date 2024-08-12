import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/gallery`);
        console.log("Fetched gallery data:", response.data);
        setGallery(response.data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/gallery/delete/${id}`);
      setGallery(gallery.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting gallery item:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/gallery/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Gallery Item
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {gallery.length} Gallery Items</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gallery.map((item, i) => (
              <Tr key={item._id}>
                <Td>{i + 1}</Td>
                <Td>
                  {item.Gallery_images && item.Gallery_images.length > 0 ? (
                    <Image
                      src={`${url}/gallery/${item.Gallery_images[0]}`}
                      alt="Gallery Image"
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
                      onClick={() => navigate(`/admin/page/gallery/view/${item._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<BiEditAlt />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/gallery/edit/${item._id}`)}
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

export default Gallery;
