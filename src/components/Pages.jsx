import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Pages = () => {
  const navigate = useNavigate();
  return (
    <div>

      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption borderTop={"1px solid #161616"}>
            There Are 3 Pages
          </TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Page</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Home</Td>
              <Td><Button  leftIcon={<BiEditAlt/>}  onClick={()=>navigate("/admin/page/home")} bgColor="#161616" color="white" _hover={{color:"#161616",bgColor:"#eef1f4",border:"1px solid #161616"}}>Edit</Button></Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>About</Td>
              <Td><Button  leftIcon={<BiEditAlt/>}  onClick={()=>navigate("/admin/page/about")} bgColor="#161616" color="white" _hover={{color:"#161616",bgColor:"#eef1f4",border:"1px solid #161616"}}>Edit</Button></Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>Testimonial</Td>
              <Td> <Button  leftIcon={<BiEditAlt/>}  onClick={()=>navigate("/admin/page/testimonial")} bgColor="#161616" color="white" _hover={{color:"#161616",bgColor:"#eef1f4",border:"1px solid #161616"}}>Edit</Button></Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td> Notablealumni
              </Td>
              <Td><Button  leftIcon={<BiEditAlt/>}  onClick={()=>navigate("/admin/page/Notablealumni")} bgColor="#161616" color="white" _hover={{color:"#161616",bgColor:"#eef1f4",border:"1px solid #161616"}}>Edit</Button></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pages;
