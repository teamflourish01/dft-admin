import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Spinner,
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
import DeleteBtn from "./DeleteBtn";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const User = () => {
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/user/delete/${id}`, {
        method: "DELETE",
      });
      data = await data.json();
      // console.log(data);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const getUser = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${url}/user?page=${page}&limit&search=${search}`);
      const data = await res.json();
      setUser(data.data);
      setCount(data.count);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [page, search]);

  return (
    <Box p="4">
      <Flex gap={5} justifyContent={"space-between"}>
        <Button
          leftIcon={<AddIcon />}
          border={"1px solid #cfcccc"}
          onClick={() => navigate("/admin/user/add")}
        >
          Add New
        </Button>

        <Box>
          <span>Search:</span>
          <Input
            color={"black"}
            w="150px"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      </Flex>
      <br />

      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption borderTop={"1px solid #161616"} color={"black"}>
            There Are {count} User
          </TableCaption>
          <Thead>
            <Tr>
              <Th color={"black"}>#</Th>
              <Th color={"black"}>Name</Th>
              <Th color={"black"}>Email</Th>
              <Th color={"black"}>Action</Th>
            </Tr>
          </Thead>
          {loading ? (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Spinner color="blue.500" />
              </Td>
            </Tr>
          ) : (
            <Tbody>
              {user?.map((e, i) => {
                const sNumber = (page - 1) * 12 + i + 1;
                return (
                  <Tr key={e._id}>
                    <Td> {sNumber} </Td>
                    <Td>{e?.name}</Td>
                    <Td>{e?.email}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          leftIcon={<ViewIcon />}
                          bgColor={"black"}
                          _hover={{ bgColor: "#add8e6", color: "black" }}
                          variant="solid"
                          color="#add8e6"
                          onClick={() => navigate(`/admin/view/${e?._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          leftIcon={<BiEditAlt />}
                          border="1px solid #add8e6"
                          variant={"outline"}
                          _hover={{ bgColor: "#add8e6", color: "black" }}
                          onClick={() => navigate(`/admin/profile/${e?._id}`)}
                        >
                          Edit
                        </Button>
                        <DeleteBtn handleDelete={() => handleDelete(e._id)} />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </TableContainer>

      <br />
      {search === "" && (
        <Flex justifyContent={"center"}>
          <Button
            border="1px solid #add8e6"
            bgColor={"black"}
            isDisabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <BsArrowLeft color="#add8e6" />
          </Button>
          <Button>{page}</Button>
          <Button
            variant={"outline"}
            border="1px solid #add8e6"
            bgColor={"black"}
            isDisabled={page >= count / 12}
            onClick={() => setPage(page + 1)}
          >
            <BsArrowRight color="#add8e6" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default User;
