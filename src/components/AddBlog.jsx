import { Box, Button, FormControl, FormLabel, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const editor = useRef(null);
    const [title,setTitle]=useState("")
	const [content, setContent] = useState('');
    const [dataUrl,setDataUrl]=useState("")
    const [image,setImage]=useState({})
    const navigate=useNavigate()
    const toast=useToast()
    const config = useMemo(
        () => ({
            readonly: false, 
            height:"400px"
        }),
        []
    );
    const formData=new FormData()
    const [isLoading,setIsLoading]=useState(false)
    // let url="https://api.srwater.in"


    const handleAddBlog=async(imageUrl)=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/blog/add`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({title,"image":imageUrl,content})
            })
            data=await data.json()
            toast({ 
                title: 'Blog Added',
                description: data.msg,
                status: 'success',
                position:"top",
                duration: 9000,
                isClosable: true,
              })
            setIsLoading(false)
            navigate("/admin/blog")
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error In Uploading Blog',
                description: error.message,
                status: 'error',
                position:"top",
                duration: 9000,
                isClosable: true,
              })
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
      const submitFile = async () => {
        formData.append("blog", image);
        setIsLoading(true)
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
          return data.data.data;
        } catch (error) {
          console.log(error);
          toast({
            title: 'Error In Uploading Image',
            description: error.message,
            status: 'error',
            position:"top",
            duration: 9000,
            isClosable: true,
          })
        }
      };
  return (
    <div>
        <Box>
            <FormControl>
                <FormLabel>Blog Tittle</FormLabel>
                <Input value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </FormControl>
            <br/>
            <FormControl>
                <FormLabel>Blog Contain</FormLabel>
            <JoditEditor
			ref={editor}
			value={content}
            config={config}
			 // tabIndex of textarea
			// preferred to use only this option to update the content for performance reasons
			onChange={newContent => setContent(newContent)}
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
          <FormLabel>Image</FormLabel>
          {dataUrl && (
            <Image src={dataUrl} />
          ) }
          <br />
          <form encType="multipart/form-data">
            <input
              required
              type="file"
              name="blog"
              onChange={(e) => handleFileChanger(e)}
            />
          </form>
          <Text><span style={{fontWeight:"bold"}}>Note</span>:File Size Should Be Less than 500KB and 650x350px size will allow Only</Text>
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
        leftIcon={isLoading&&<Spinner color='blue.500' />}
        onClick={()=>submitFile().then(res=>handleAddBlog(res))}
      >
        Add New
      </Button>
      </Box>
        </Box>
    </div>
  )
}

export default AddBlog