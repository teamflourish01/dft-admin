import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteBtn from './DeleteBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/Testimonial`);
        console.log("Fetched data:", response.data); // Log fetched data
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/Testimonial/delete/${id}`);
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/admin/page/testimonial/add')}
        mb={5}
        leftIcon={<AddIcon />}
      >
        Add New Testimonial
      </Button>
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"} boxShadow="md">
        <Table variant='simple'>
          <TableCaption borderTop={"1px solid #161616"}>There Are {testimonials.length} Testimonials</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {testimonials.map((testimonial, i) => (
              <Tr key={testimonial._id}>
                <Td>{i + 1}</Td>
                <Td>{testimonial.Testimonial_name}</Td>
                <Td>
                  {testimonial.Testimonial_image ? (
                    <Image
                      src={`${url}/testimonialimage/${testimonial.Testimonial_image}`}
                      alt="Testimonial Image"
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
                      onClick={() => navigate(`/admin/page/testimonial/view/${testimonial._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<BiEditAlt />}
                      bgColor={"#161616"}
                      variant="solid"
                      color="white"
                      onClick={() => navigate(`/admin/page/testimonial/edit/${testimonial._id}`)}
                    >
                      Edit
                    </Button>
                    <DeleteBtn handleDelete={() => handleDelete(testimonial._id)} />
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

export default Testimonial;
