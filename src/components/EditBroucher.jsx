import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBroucher = () => {
    const [detail,setDetail]=useState({
        name:"",
        file:""
    })
  const {id}=useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [dataUrl,setDataUrl]=useState("")
  const [image,setImage]=useState({})
  const navigate=useNavigate()
  const formData=new FormData()
  const toast=useToast()
  // const url = "https://api.srwater.in";

  const getData=async()=>{
    console.log(id);
    try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/broucher/${id}`)
        data=await data.json()
        console.log(data);
        setDetail(data.data)
    } catch (error) {
        console.log(error);
    }
  }

  const updateBroucher=async(fileUrl)=>{
    let dup={...detail}
    if(fileUrl){
        dup.file=fileUrl
    }
    setIsLoading(true)
    try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/broucher/edit/${id}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(dup)
        })
        data=await data.json()
        toast({
            title: "Broucher Updated Successfully",
            description: data.msg,
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          navigate("/admin/broucher")
    } catch (error) {
        console.log(error);
        toast({
            title: "Error In Updating Broucher",
            description: error.message,
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
    }
    setIsLoading(false)
  }

  const handleFileChanger = async(e) => {
    let file = e.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitFile = async () => {
    debugger
    console.log(dataUrl);
    if (dataUrl === "") {
      return;
    }
    console.log(image);
    formData.append("broucher", image);
    setIsLoading(true);
    try {
      let data = await axios.post(`${process.env.REACT_APP_DEV_URL}/broucher/pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data.data);
      toast({
        title: "File Uploaded Successfully",
        description: data.data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return data.data.data;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error In Uploading File",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(()=>{
        getData()
  },[])
  return (
    <div>
      <Box
        backgroundColor={"white"}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
      >
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={detail.name}
            name="title"
            onChange={(e) => setDetail({...detail,name:e.target.value})}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>File</FormLabel>
          {/* {dataUrl && <PDFViewer document={{
            url:dataUrl
          }} 
          />} */}
          <br />
          <form encType="multipart/form-data">
            <input
              required
              type="file"
              name="broucher"
              onChange={(e) => handleFileChanger(e)}
            />
          </form>
          <Text>
            <span style={{ fontWeight: "bold" }}>Note</span>:PDF File will allow
            Only
          </Text>
        </FormControl>
        <br />
        <Button
          variant={"solid"}
          bgColor={"#161616"}
          color="white"
          _hover={{
            color: "black",
            bgColor: "white",
            border: "1px solid #161616",
          }}
          leftIcon={isLoading && <Spinner color="blue.500" />}
          // onClick={() => submitFile().then((res) => updateBroucher(res))}
          onClick={()=>submitFile().then((res)=>setTimeout(()=>updateBroucher(res),5000))}

        >
          Edit 
        </Button>
      </Box>
    </div>
  );
};

export default EditBroucher;
