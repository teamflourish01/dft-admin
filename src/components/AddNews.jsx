import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [video,setVideo]=useState("")
  const [dataUrl, setDataUrl] = useState("");
  const toast = useToast();
  const formData = new FormData();
  const [image, setImage] = useState({});
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [album,setAlbum]=useState([])
  const [albumUrl,setAlbumUrl]=useState([])
  // const url = "https://api.srwater.in";


  const submitFile = async () => {
    console.log(dataUrl);
    if(dataUrl==""){
      return 
    }
    console.log(image);
    
    formData.append("events", image);
    setIsLoading(true);
    try {
      let data = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/news/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      toast({
        title: "Image Uploaded Successfully",
        description: data.data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
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

  const handleImage=(index)=>{
    let newArr=[...albumUrl]
   newArr.splice(index,1)
      setAlbumUrl(newArr)
  }

  const handleAlbumChanger=(e)=>{
    let file = e.target.files[0];
    console.log(file);
    // setImage(file);
    setAlbum([...album, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // setDataUrl(reader.result);
        setAlbumUrl([...albumUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value=""
  }

  const submitAlbum=async()=>{
    let formData=new FormData()
    console.log(album);
    if (albumUrl.length === 0) {
      return;
    }
    for (let x of album) {
      formData.append("album", x);
    }
    // formData.append("product", image);
    setIsLoading(true);
    console.log(formData);
    try {
      let data = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/news/album`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      return data.data.data;
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
  }

  const uploadNews = async (imgUrl,albumLink) => {
    // console.log(imgUrl);
    let dup={
      title,date,place,video
    }
    if(imgUrl){
      dup.image=imgUrl
    }
    if(albumLink?.length){
      dup.album=albumLink
    }
    console.log(imgUrl);
    try {
      setIsLoading(true);
      
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/news/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      console.log(data.data);
      toast({
        title: "Data Uploaded Successfully",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/page/news")
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
    setIsLoading(false);
  };

 
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
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            value={date}
            name="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Place</FormLabel>
          <Input
            value={place}
            name="place"
            onChange={(e) => setPlace(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Video</FormLabel>
          <Input
            value={video}
            name="video"
            onChange={(e) => setVideo(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Image</FormLabel>
          {dataUrl && <Image src={dataUrl} />}
          <br />
          <form encType="multipart/form-data">
            <input
              required
              type="file"
              name="events"
              onChange={(e) => handleFileChanger(e)}
            />
          </form>
          <Text>
            <span style={{ fontWeight: "bold" }}>Note</span>:PNG File Size
            Should Be Less than 2MB and 300x180px size will allow Only
          </Text>
        </FormControl>
        <br />
        <FormControl isRequired>
            <FormLabel>Event Album</FormLabel>
            {albumUrl && (
              albumUrl.map((e,i) =>{ 
                return <>
                  <Flex gap="20px">
                    <Image src={e} width="200px"/>
                    <MdDelete color="red" size={"30px"} onClick={()=>handleImage(i)}/>
                  </Flex>
                </>
              })
            ) }
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="album"
                onChange={(e) => handleAlbumChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File  Should
              Be in PNG Format 
            </Text>
          </FormControl>
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
          // onClick={() => submitFile().then((res)=>uploadNews(res))}
          onClick={async()=>{
           await Promise.all([submitFile(),submitAlbum()])
            .then((result)=>setTimeout(()=>uploadNews(result[0],result[1]),4000))
            .catch((error)=>console.log(error))
          }}
        >
          Add New
        </Button>
      </Box>
    </div>
  );
};

export default AddNews;
