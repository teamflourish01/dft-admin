import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { usePDF } from "react-to-pdf";
import { BsArrowLeft, BsArrowRight, BsFilterRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSolidDownload, BiSolidUser } from "react-icons/bi";
import { ViewIcon } from "@chakra-ui/icons";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx"
import { saveAs } from 'file-saver';

const Habibi = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [client, setClient] = useState([]);
  const [count, setCount] = useState(0);
  // const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [manager, setManager] = useState([]);
  const [userid, setUserid] = useState("");
  const { isOpen:isFirstModalOpen , onOpen:onFirstModalOpen, onClose:onFirstModalClose } = useDisclosure();
  const {isOpen:isSecondModalOpen,onOpen:onSecondModalOpen,onClose:onSecondModalClose}=useDisclosure()
  // const { isOpen1, onOpen1, onClose1 } = useDisclosure();
  const initialRef = useRef(null);
  const [text, setText] = useState("");
  const toast = useToast();
  const [selected,setSelected]=useState([])

  const getData = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/annual`);
      data = await data.json();
      setClient(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const geetDataByDate = async () => {
    try {
      let data = await fetch(
        `${process.env.REACT_APP_DEV_URL}/annual?from=${new Date(
          start
        )}&to=${new Date(end)}`
      );
      data = await data.json();
      setClient(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCheckBox=async(e)=>{
    if(e.target.checked){
        let arr=client.flatMap((x)=>x._id)
        setSelected(arr)
    }
    else{
      setSelected([])
    }
  }

  const handleDeleteAll=async()=>{

    console.log(process.env.REACT_APP_DEV_URL);
    try {
      console.log(selected);
      let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/bulk/delete`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({arr:selected})
      })
      data=await data.json()
      console.log(data);
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  const getCount = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/annual`);
      data = await data.json();
      setCount(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getManager = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/annual/manager`);
      data = await data.json();
      setManager(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleEdit = async () => {
  //   try {
  //     console.log(text);
  //     let data = await fetch(`${process.env.REACT_APP_URL}/annual/${text}`);
  //     data = await data.json();
  //     console.log(data);
  //     if (data.data) {
  //       console.log(data.data);
  //       navigate(`edit/${data.data._id}`);
  //     } else {
  //       toast({
  //         title: "Invalid Token Number",
  //         description: "",
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     }
  //     onSecondModalClose();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleView = async () => {
  //   try {
  //     console.log(text);
  //     let data = await fetch(`${process.env.REACT_APP_URL}/annual/${text}`);
  //     data = await data.json();
  //     console.log(data);
  //     if (data.data) {
  //       console.log(data.data);
  //       navigate(`view/${data.data._id}`);
  //     } else {
  //       toast({
  //         title: "Invalid Token Number",
  //         description: "",
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     }
  //     onFirstModalClose();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSearch = async () => {
    console.log(start, end);
    try {
      if (userid && start && end) {
        let data = await fetch(
          `${process.env.REACT_APP_DEV_URL}/annual?from=${new Date(
            start
          )}&to=${new Date(end)}&userid=${userid}`
        );
        data = await data.json();
        setClient(data.data);
        console.log(data.data);
      } else if (start && end) {
        let data = await fetch(
          `${process.env.REACT_APP_DEV_URL}/annual?from=${new Date(
            start
          )}&to=${new Date(end)}`
        );

        data = await data.json();
        setClient(data.data);
        console.log(data.data);
      } else if (userid) {
        let data = await fetch(
          `${process.env.REACT_APP_DEV_URL}/annual?userid=${userid}`
        );
        data = await data.json();
        setClient(data.data);
        // console.log(data.data);
      } else {
        let data = await fetch(`${process.env.REACT_APP_DEV_URL}/annual`);
        data = await data.json();
        setClient(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const s2ab=(s)=>{
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  const downloadCSV = (filename) => {
    // const csvContent = handleExcel(client);
    const div = document.getElementById("maindiv");
    const table = div.querySelector("table");
    const rows = Array.from(table.querySelectorAll("tr"));
    const data = rows.map((row) =>
      Array.from(row.querySelectorAll("td, th")).map((cell) => cell.textContent)
    );

      // Convert the data to XLSX format
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Generate a blob object representing the data in the workbook
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    let blob= new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
    saveAs(
     blob,
      `${filename}.xlsx`
    );
    // const csvContent = data.map((row) => row.join(",")).join("\n");
    // const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    // const link = document.createElement("a");
    // link.href = window.URL.createObjectURL(blob);
    // link.setAttribute("download", `${filename}.xlsx`);

    // document.body.appendChild(link);
    // link.click();

    // document.body.removeChild(link);
  };

  useEffect(() => {
    getData();
    // getCount();
    getManager();
  }, []);

  return (
    <div>
      <Flex gap={5} justifyContent={"space-between"}>
        <Box>
          <Button
            leftIcon={<BiSolidUser />}
            border={"1px solid #cfcccc"}
            onClick={() => navigate("/admin/annual/manager")}
          >
            User
          </Button>
          <br />
        </Box>
        <Flex direction={"column"}>
          <Flex direction={["column", "column", "row", "row"]}>
            <FormControl>
              <FormLabel>From</FormLabel>
              <Input
                type="date"
                w="200px"
                placeholder="From..."
                onChange={(e) => setStart(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>To</FormLabel>
              <Input
                type="date"
                w="200px"
                onChange={(e) => setEnd(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select User</FormLabel>
              <Select w="200px" onChange={(e) => setUserid(e.target.value)}>
                <option value="">All</option>
                {manager.map((e) => {
                  return <option key={e._id} value={e._id}>{e.name}</option>;
                })}
              </Select>
            </FormControl>
          </Flex>
          <Button onClick={handleSearch}>Apply Filter</Button>
        </Flex>
        <Flex  direction={"column"}>
          {/* Search:<Input w="150px" onBlur={()=>setFlag(true)} onChange={(e)=>{setFlag(false);setSearch(e.target.value)}}  value={search} onKeyUp={handleSearch} /> */}
          <Button
            rightIcon={<BiSolidDownload />} 
            border={"1px solid #cfcccc"}
            // onClick={() => toPDF()}
            onClick={() => downloadCSV("scheme-report")}
          >
            Download
          </Button>
          <Button
            rightIcon={<MdDelete />}
            border={"1px solid #cfcccc"}
            // onClick={() => toPDF()}
            onClick={() => handleDeleteAll().then(()=>getData())}
            isDisabled={!selected.length}
          >
            Bulk Delete
          </Button>
          {/* <ButtonGroup>
            <Button
              leftIcon={<ViewIcon />}
              bgColor={"#161616"}
              variant="solid"
              color="white"
              onClick={onFirstModalOpen}
            >
              View
            </Button>
            <Modal
              initialFocusRef={initialRef}
              isOpen={isFirstModalOpen}
              onClose={onFirstModalClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>View</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Token Number</FormLabel>
                    <Input
                      ref={initialRef}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Search By Token"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onFirstModalClose}>
                    Close
                  </Button>
                  <Button variant="ghost" onClick={handleView}>
                    View
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              leftIcon={<BiEditAlt />}
              border="1px solid #b3abab"
              onClick={onSecondModalOpen}
            >
              Edit
            </Button>
            <Modal
              initialFocusRef={initialRef}
              isOpen={isSecondModalOpen}
              onClose={onSecondModalClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Token Number</FormLabel>
                    <Input
                      ref={initialRef}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Search By Token"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onSecondModalClose}>
                    Close
                  </Button>
                  <Button variant="ghost" onClick={handleEdit}>
                    Edit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ButtonGroup> */}
        </Flex>
      </Flex>
      <br />
      <TableContainer
        border={"1px solid #161616"}
        borderRadius={"20px"}
        id="maindiv"
      >
        <Table variant="simple">
          <TableCaption borderTop={"1px solid #161616"}>
            There Are {client?.length} Tokens Generated
          </TableCaption>
          <Thead>
            <Tr>
              <Th><input type="checkbox" onChange={(e)=>handleCheckBox(e)}  /> #</Th>
              <Th>UserID</Th>
              <Th>Client Name</Th>
              <Th>Challan number</Th>
              <Th>token</Th>
              <Th>Amount</Th>
              <Th>Created At</Th>
              <Th>mobile</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {client?.map((e, i) => {
              return (
                <Tr>
                  <Td> {i + 1} </Td>
                  <Td>{e.userid?.name}</Td>
                  <Td>{e.name}</Td>
                  <Td>{e.challan_no}</Td>
                  <Td>{e.token}</Td>
                  <Td>{e.amount}</Td>
                  <Td>{e.createdAt.substring(0, 10)}</Td>
                  <Td>{e.mobile}</Td>
                  <Td>
                  <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/annual/view/${e._id}`)}>View</Button>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/annual/edit/${e._id}`)}>Edit</Button>
                </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      {/* <Flex justifyContent={"center"}>
{flag&&<div>
          <Button variant={"outline"} border="1px solid #161616" isDisabled={page==1} onClick={()=>setPage(page-1)}><BsArrowLeft/></Button>
          <Button>{page}</Button>
          <Button variant={"outline"} border="1px solid #161616" isDisabled={page>=(count/2)} onClick={()=>setPage(page+1)}><BsArrowRight/></Button>
        </div>
        }
</Flex> */}
    </div>
  );
};

export default Habibi;
