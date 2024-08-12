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
import { useNavigate, useParams } from "react-router-dom";

const EditNews = () => {
  const [news, setNews] = useState({
    title: "",
    image: "",
    date:"",
    place:"",
    video:"",
    album:[]
  });
  const [dataUrl, setDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const navigate=useNavigate()
  const { newsid } = useParams();
  const [album,setAlbum]=useState([])
  const [albumUrl,setAlbumUrl]=useState([])

  const formData = new FormData();
  // const url = "https://api.srwater.in";
  // let url="http://192.168.1.19:8000"

  const toast = useToast();

  const getData = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/news/${newsid}`);
      data = await data.json();
      setNews(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage=(index)=>{
    let newArr=[...albumUrl]
   newArr.splice(index,1)
      setAlbumUrl(newArr)
  }

  const handleSingleImageLocal=()=>{
    setDataUrl("")
  }

  const handleSingleImage=()=>{
    setNews({...news,image:""})
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
const handleLocal=(index)=>{
  let newArr=[...news.album]
   newArr.splice(index,1)
      setNews({...news,album:newArr})

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

  const handleEdit = async (imageUrl,au) => {
    console.log(imageUrl);
    let dup={...news}
    if(imageUrl){
      dup.image=imageUrl
    }
    if(au?.length){
        dup.album=[...news.album,...au]
    }

    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/news/edit/${newsid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      console.log(data.data);
      toast({
        title: "Item Updated Successfully",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/page/news")
    } catch (error) {
      toast({
        title: error.message,
        description: error,
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
    console.log(image);
    formData.append("events", image);
    setIsLoading(true);
    try {
      let data = await axios.post(`${process.env.REACT_APP_DEV_URL}/news/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data.data);
      setIsLoading(false);
      toast({
        title: "Image Uploaded Successfully",
        description: data.data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
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
    setIsLoading(false);
  };

  const handleFileChanger = async (e) => {
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
    // taking time
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Box
        backgroundColor={"white"}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
      >
        <FormControl>
          <FormLabel>Tittle</FormLabel>
          <Input
            value={news.title}
            onChange={(e) => setNews({ ...news, title: e.target.value })}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={news.date}
            onChange={(e) => setNews({ ...news, date: e.target.value })}
          />
        </FormControl>
        <br/>
        <FormControl>
          <FormLabel>Place</FormLabel>
          <Input
            value={news.place}
            onChange={(e) => setNews({ ...news, place: e.target.value })}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Video</FormLabel>
          <Input
            type="text"
            value={news.video}
            onChange={(e) => setNews({ ...news, video: e.target.value })}
          />
        </FormControl>
        <br />
        <Box>
          <FormControl isRequired>
            <FormLabel> Image</FormLabel>
            {dataUrl && (
              <Flex>
              <Image src={dataUrl} />
              <MdDelete color="red" size={"30px"} onClick={()=>handleSingleImageLocal()}/>
              </Flex>
            ) }
            {news?.image && (

              <Flex>
              <Image src={`${process.env.REACT_APP_DEV_URL}/news/${news.image}`} />
              <MdDelete color="red" size={"30px"} onClick={()=>handleSingleImage()}/>

              </Flex>
            )}
            
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="event"
                onChange={(e) => handleFileChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
              Be Less than 2MB and 300pxx180px size will allow Only
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
             {news.album.length>0 && (
              news.album.map((e,i) =>{ 
                return <>
                  <Flex gap="20px">
                    <Image src={`${process.env.REACT_APP_DEV_URL}/news/${e}`} width="200px"/>
                    <MdDelete color="red" size={"30px"} onClick={()=>handleLocal(i)}/>
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
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
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
            // onClick={() =>submitFile().then((res) => handleEdit(res))}
            onClick={async()=>{
              await Promise.all([submitFile(),submitAlbum()])
               .then((result)=>setTimeout(()=>handleEdit(result[0],result[1]),4000))
               .catch((error)=>console.log(error))
             }}
            >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default EditNews;
