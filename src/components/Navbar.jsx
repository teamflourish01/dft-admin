import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [scheme,setScheme]=useState("")
    const [id,setId]=useState("")

    const navigate=useNavigate()

    const getData = async () => {
        try {
          let data = await fetch(`${process.env.REACT_APP_DEV_URL}/navbar`);
          data = await data.json();
          setId(data.data[0]._id);
          setScheme(data.data[0].name);
        } catch (error) {
          console.log(error);
        }
      };

      const handleEdit=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/navbar/edit/${id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name:scheme})
            })
            data=await data.json()
            navigate("/admin/page")
        } catch (error) {
            console.log(error);
        }
      }
      useEffect(() => {
        getData();
      }, []);

  return (
    <div>
        <FormControl isRequired mt={"10px"} >
                    <FormLabel m="0">Scheme Name</FormLabel>
                    <Input type="text" value={scheme} name="contact" onChange={(e)=>setScheme(e.target.value)} />
                </FormControl>
                <Button  leftIcon={<BiEditAlt/>}  onClick={handleEdit} bgColor="#161616" color="white" _hover={{color:"#161616",bgColor:"#eef1f4",border:"1px solid #161616"}}>Edit</Button>
    </div>
  )
}

export default Navbar