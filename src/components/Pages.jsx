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
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Pages = () => {
  const [homeData, SethomeData] = useState([]);
  const [aboutData, SetaboutData] = useState([]);

  const navigate = useNavigate();
  let url = process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    const getHome = async () => {
      try {
        let res = await fetch(`${url}/home`);
        const data = await res.json();
        console.log("json Data", data);
        SethomeData(data);
        console.log("stateData", homeData);
      } catch (error) {
        console.log(error);
      }
    };
    const getAboutus = async () => {
      try {
        const response = await fetch(`${url}/about`);
        const data = await response.json();
        console.log("About-res Data", data);

        SetaboutData(data);
        console.log("about-page Data", aboutData);
      } catch (error) {
        console.log(error);
      }
    };
    getHome();
    getAboutus();
  }, []);
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
              <Td>
                <Button
                  leftIcon={<BiEditAlt />}
                  onClick={() =>
                    navigate(`/admin/page/home/edit/${homeData.length>0 && homeData[0]._id}`)
                  }
                  bgColor="#161616"
                  color="white"
                  _hover={{
                    color: "#161616",
                    bgColor: "#eef1f4",
                    border: "1px solid #161616",
                  }}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>About</Td>
              <Td>
                <Button
                  leftIcon={<BiEditAlt />}
                  onClick={() => navigate(`/admin/page/about/edit/${aboutData.length>0 && aboutData[0]._id}`)}
                  bgColor="#161616"
                  color="white"
                  _hover={{
                    color: "#161616",
                    bgColor: "#eef1f4",
                    border: "1px solid #161616",
                  }}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>Testimonial</Td>
              <Td>
                {" "}
                <Button
                  leftIcon={<BiEditAlt />}
                  onClick={() => navigate("/admin/page/testimonial")}
                  bgColor="#161616"
                  color="white"
                  _hover={{
                    color: "#161616",
                    bgColor: "#eef1f4",
                    border: "1px solid #161616",
                  }}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td> Notablealumni</Td>
              <Td>
                <Button
                  leftIcon={<BiEditAlt />}
                  onClick={() => navigate("/admin/page/Notablealumni")}
                  bgColor="#161616"
                  color="white"
                  _hover={{
                    color: "#161616",
                    bgColor: "#eef1f4",
                    border: "1px solid #161616",
                  }}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pages;
