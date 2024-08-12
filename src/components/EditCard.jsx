import { Box, Button, Flex, FormControl, FormLabel, Image, Input, SimpleGrid, Spinner, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from "react-icons/md";


const EditCard = () => {
    const [cardDetail,setCardDetail]=useState({})
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [dataUrl,setDataUrl]=useState("")
    const [image,setImage]=useState({})
    const [imageUrl,setImageUrl]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const formData=new FormData()
    const [productExist,setProductExist]=useState([])
    // let url = "https://api.srwater.in";
    const {name}=useParams()
    const toast=useToast()
  const [generated,setGenerated]=useState("")
  const [qrUrl,setQrUrl]=useState([])
  const [qrImage,setQrImage]=useState([])




  const handleGeneratedName = (x) => {
   
    return x
    .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .trim();

  };

    const getCurrentProduct=async()=>{
      try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/card/${name}`)
        data=await data.json()
        console.log("getCurrentProduct",data.data[0].products);
        setProductExist(data.data[0].products)
      } catch (error) {
        console.log(error);
      }
    }

    const getCheck=(id)=>{
        // let data=await fetch(`${process.env.REACT_APP_DEV_URL}/product`)
        // data=await data.json()
        // let allProduct=data.data;
        let exist=product.findIndex((e)=>e===id)
        if(exist>-1){
          // setProduct([...product,id])
          return true
        }else{
          return false
        }
    }

    const getCategory = async () => {
        try {
          let data = await fetch(`${process.env.REACT_APP_DEV_URL}/category`);
          data = await data.json();
          setCategory(data.data);
        } catch (error) {
          console.log(error);
        }
      };

  const getData=async()=>{
    try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/card/${name}`)
        data=await data.json()
        console.log(data.data);
        setCardDetail(data.data[0])
        setProduct(data.data[0].products)
    } catch (error) {
        console.log(error);
    }
  }

  const handleCheck = (e) => {
    let updatedProduct=[...product]
    let index = updatedProduct.findIndex((i) => i == e._id);
    console.log(index);
    if (index > -1) {
      updatedProduct.splice(index, 1);
      
      console.log(product);
    } else {
      // setProduct([...product, e._id]);
      updatedProduct.push(e._id)
    }
    setProduct(updatedProduct)
  };

  const handleEditCard=async(res,qr)=>{
    debugger
    let dup={...cardDetail}
    if(product.length>0){
        dup.products=product
    }
    if(res){
        dup.image=res
    }
    if (!dup.qr_code) {
      dup.qr_code = [];
    }
    if(qr){
      dup.qr_code=[...dup.qr_code,...qr]
    }
    if(generated){

      dup.generated_name=generated
    }
        try {
          let data = await fetch(`${process.env.REACT_APP_DEV_URL}/card/edit/${name}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dup),
          });
          setIsLoading(false)
          data = await data.json();
          console.log(data.data);
          toast({
            title: "Created Succesfully",
            description: data.msg,
            status: "success",
            duration: 7000,
            isClosable: true,
            position:"top"
          });
          navigate("/admin/card")
        } catch (error) {
          console.log(error);
          toast({
            title: error.message,
            description: error,
            status: "error",
            duration: 7000,
            isClosable: true,
            position:"top"
          });
        }
  }

  const submitFile = async () => {
    
    if(dataUrl==""){
        return 
    }
    formData.append("avatar", image);
    setIsLoading(true)
    try {
      let data = await axios.post(
        `https://api.srwater.in/user/profile/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      setImageUrl(data.data.data)
      return data.data.data;
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 7000,
        position: "top",
        isClosable: true,
      });
    }
    setIsLoading(false)
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    setCardDetail({ ...cardDetail, [name]: value });
  };

  const handleQrImage = (index) => {
    let dup = [...cardDetail.qr_code];
    dup.splice(index, 1);
    setCardDetail({ ...cardDetail, qr_code: dup });
  };

  const handleqrLocal = (index) => {
    let dup = [...qrUrl];
    dup.splice(index, 1);
    setQrUrl(dup);
  };

  const handleQrChanger=(e)=>{
    let file = e.target.files[0];
    setQrImage([...qrImage,file])
    console.log(file);
    if(file){
      let reader=new FileReader()
      reader.onloadend = () => {
        setQrUrl([...qrUrl,reader.result]);
      };
      reader.readAsDataURL(file);
    }

  }

  const submitQr=async()=>{
 debugger
    if(!qrUrl?.length>0){
      return 
  }
  for (let x of qrImage){

    formData.append("qr", x);
  }
  setIsLoading(true)
  try {
    let data = await axios.post(
      `${process.env.REACT_APP_DEV_URL}/payment/qr`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data.data.data);
    return data.data.data
  } catch (error) {
    console.log(error);
    toast({
      title: "An error occurred",
      description: "Something went wrong. Please try again later.",
      status: "error",
      duration: 7000,
      position: "top",
      isClosable: true,
    });
  }
  setIsLoading(false)
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
  useEffect(()=>{
    getData()
    getCategory()
    getCurrentProduct()
  },[])
  return (
    <Flex justifyContent={"center"}>
      <Box w="700px" bgColor="white" padding="20px" borderRadius={"20px"}>
        <Text fontWeight={"bold"}>Personal Details</Text>
        <br />
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={(e) => {handleChange(e)
              setGenerated(handleGeneratedName(e.target.value))
            }}
            value={cardDetail.name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Designation</FormLabel>
          <Input
            type="text"
            name="designation"
            onChange={(e) => handleChange(e)}
            value={cardDetail.designation}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            name="company_name"
            onChange={(e) => handleChange(e)}
            value={cardDetail?.company_name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Company Website</FormLabel>
          <Input
            type="text"
            name="company_link"
            onChange={(e) => handleChange(e)}
            value={cardDetail?.company_link}
          />
        </FormControl>
        <br />
        <Text fontWeight={"semibold"}>Prefix</Text>
        <br />
        <select onChange={(e)=>{
          setCardDetail({...cardDetail,prefix:e.target.value})
        }}>
            <option >Select</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss.">Miss.</option>
        </select>
        <br />
        <br />
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Textarea
            name="address"
            onChange={(e) => handleChange(e)}
            value={cardDetail.address}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Address GMap Link</FormLabel>
          <Input
            name="address_link"
            onChange={(e) => handleChange(e)}
            value={cardDetail.address_link}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Facebook Link</FormLabel>
          <Input
            name="facebook_link"
            onChange={(e) => handleChange(e)}
            value={cardDetail.facebook_link}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Instagram Link</FormLabel>
          <Input
            name="insta_link"
            onChange={(e) => handleChange(e)}
            value={cardDetail.insta_link}
          />
        </FormControl>
        
        <br />
        <FormControl isRequired>
          <FormLabel>Mobile No.</FormLabel>
          <Input
            required
            type="text"
            maxLength={10}
            name="mobile"
            onChange={(e) => {
              handleChange(e)
            }}
            onBlur={(e)=>{
              let rez=/^[0-9]{10}$/
              if(!rez.test(e.target.value)){
                toast({
                  title: "Invalid Number",
                  description: "Enter Your 10 Digit Number Only",
                  status: "error",
                  duration: 7000,
                  position:"top",
                  isClosable: true,
                });
              }
            }}
            value={cardDetail.mobile}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>WhatsApp No.</FormLabel>
          <Input
            type="text"
            name="whatsapp"
            maxLength={10}
            onChange={(e) => {
                handleChange(e);
            }}
            onBlur={(e)=>{
              let rez=/^[0-9]{10}$/
              if(!rez.test(e.target.value)){
                toast({
                  title: "Invalid Number",
                  description: "Enter Your 10 Digit Number Only",
                  status: "error",
                  duration: 7000,
                  position:"top",
                  isClosable: true,
                });
              }
            }}
            value={cardDetail.whatsapp}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={cardDetail.email}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Image</FormLabel>
          <Box >
            {dataUrl ? <Image  src={dataUrl} />:<Image src={`${process.env.REACT_APP_DEV_URL}/profile/${cardDetail.image}`} />}
          </Box>
          <br />
          <form encType="multipart/form-data">
            <input
              type="file"
              name="avatar"
              onChange={(e) => handleFileChanger(e)}
            />
          </form>
          <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
              Be Less than 500KB and 200pxx200px size will allow Only
            </Text>
        </FormControl>
        <br />
        <Text fontWeight={"bold"}>Bank Details</Text>
        <br />
        <FormControl>
          <FormLabel>QR Code</FormLabel>
          <input type='file'
            name='qr'
            onChange={(e)=>handleQrChanger(e)}  />
        </FormControl>
            {qrUrl?.map((e,i)=>{
              return <Flex>
               <Image width={"300px"} src={e} />
               <MdDelete
                        color="red"
                        size={"30px"}
                        onClick={() => handleqrLocal(i)}
                      />
              </Flex>
            })}
            {cardDetail?.qr_code?.map((e,i)=>{
              return <Flex>
                <Image width={"300px"} src={`${process.env.REACT_APP_URL}/payment/${e}`} />
                <MdDelete
                        color="red"
                        size={"30px"}
                        onClick={() => handleQrImage(i)}
                      />
              </Flex>
            })}
        <FormControl isRequired>
          <FormLabel>Bank Name</FormLabel>
          <Input
            type="text"
            name="bank_name"
            onChange={(e) => handleChange(e)}
            value={cardDetail.bank_name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Account Holder Name</FormLabel>
          <Input
            type="text"
            name="account_holder"
            onChange={(e) => handleChange(e)}
            value={cardDetail.account_holder}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Account Type</FormLabel>
          <Input
            type="text"
            name="account_type"
            onChange={(e) => handleChange(e)}
            value={cardDetail.account_type}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Account Number</FormLabel>
          <Input
            type="text"
            maxLength={"12"}
            name="account_number"
            onChange={(e) => handleChange(e)}
            value={cardDetail.account_number}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>IFSC Code</FormLabel>
          <Input
            type="text"
            pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            name="ifsc"
            onChange={(e) => handleChange(e)}
            value={cardDetail.ifsc}
            onBlur={(e)=>{
              let rez=/^[A-Z]{4}0[A-Z0-9]{6}$/
              if(!rez.test(e.target.value)){
                toast({
                  title: "Invalid Code",
                  description:"Enter Valid IFSC code",
                  status:"error",
                  duration: 7000,
                  position:"top",
                  isClosable: true,
                });
              }
            }}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>GST Company Name</FormLabel>
          <Input
            type="text"
            name="gst_name"
            onChange={(e) => handleChange(e)}
            value={cardDetail.gst_name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>GST Billing Address</FormLabel>
          <Textarea
            name="gst_address"
            onChange={(e) => handleChange(e)}
            value={cardDetail.gst_address}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>GST Number</FormLabel>
          <Input
            type="text"
            name="gst_number"
            maxLength={15}
            onChange={(e) => handleChange(e)}
            value={cardDetail.gst_number}
            onBlur={(e)=>{
              let rez=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
              if(!rez.test(e.target.value)){
                toast({
                  title: "Invalid GSTIN",
                  description:"Enter Valid GST Number",
                  status:"error",
                  duration: 7000,
                  position:"top",
                  isClosable: true,
                });
              }
            }}
          />
        </FormControl>
        <br />
        <Text fontWeight={"bold"}>Select Products</Text>
        <br />
        <SimpleGrid columns="2" spacing={"40px"}>
          {category &&
            category.map((e) => {
              return (
                <>
                  <Text fontWeight={"semibold"}>{e.name}</Text>
                  <SimpleGrid>
                    {e.products.map((x, i) => (
                      <Flex gap="20px">
                        <input
                          onChange={() => handleCheck(x)}
                          type="checkbox"
                          checked={getCheck(x._id)}
                        />
                        <Text>{x.name}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </>
              );
            })}
        </SimpleGrid>
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
          // onClick={() => submitFile().then((res) => handleEditCard(res))}
          onClick={()=>{Promise.all([submitFile(),submitQr()])
          .then((result)=>handleEditCard(result[0],result[1]))
          .catch((error) => console.log(error))}
        }
        >
          Save Card
        </Button>
      </Box>
    </Flex>
  )
}

export default EditCard