import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
    const [blogDetail,setBlogDetail]=useState({})
  const [dataUrl, setDataUrl] = useState("");
  const navigate=useNavigate()
  const editor = useRef(null);
  const [imageUrl,setImageUrl]=useState("")
    const {blogid}=useParams()
  const [image, setImage] = useState({});
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  // let url = "https://api.srwater.in";
  const config = useMemo(
    () => ({
      readonly: false,
      height: "400px",
    }),
    []
  );

  const getBlogDetail=async()=>{
    try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/blog/${blogid}`);
        data=await data.json()
        setBlogDetail(data.data)
        console.log(data.data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleFileChanger = (e) => {
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
  const handleEditBlog = async (res) => {
    let dup={...blogDetail}
    if(res){
      dup.image=res
    }
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/blog/edit/${blogid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      console.log("edited",data.data);
      toast({
        title: "Blog Edited ",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      navigate("/admin/blog")
    } catch (error) {
      console.log(error);
      toast({
        title: "Error In Uploading Blog",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const submitFile = async () => {
    if(dataUrl==""){
      return
    }

    formData.append("blog", image);
    setIsLoading(true);
    try {
      let data = await axios.post(
        `https://api.srwater.in/blog/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      toast({
        title: "Image Uploaded Succesfully",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
       setImageUrl(data.data.data)
       return data.data.data
    } catch (error) {
      console.log(error);
      toast({
        title: "Error In Uploading Image",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(()=>{
    getBlogDetail()
  },[])
  return ( 
    <div>
      <Box>
        <FormControl>
          <FormLabel>Blog Tittle</FormLabel>
          <Input value={blogDetail.title} onChange={(e) => setBlogDetail({...blogDetail,title:e.target.value}) } />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Blog Contain</FormLabel>
          <JoditEditor
            ref={editor}
            value={blogDetail.content}
            config={config}
            // tabIndex of textarea
            // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setBlogDetail({...blogDetail, content: newContent})}
          />
        </FormControl>
        <br />
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel> Image</FormLabel>
            {dataUrl ? (
              <Image   src={dataUrl} />
            ):<Image src={`${process.env.REACT_APP_DEV_URL}/blog/${blogDetail.image}`}/>}
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="blog"
                onChange={(e) => handleFileChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
              Be Less than 500KB and 350x220px size will allow Only
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
            onClick={ ()=>submitFile().then((res)=>handleEditBlog(res))}
          >
            Edit Blog
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default EditBlog;
