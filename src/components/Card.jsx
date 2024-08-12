import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Card = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [dataUrl, setDataUrl] = useState("");
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  // let url = "https://api.srwater.in";
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [qrUrl,setQrUrl]=useState([])
  const [qrImage,setQrImage]=useState([])
  const [cardData, setCardData] = useState({
    name: "",
    designation: "",
    address: "",
    mobile: "",
    whatsapp: "",
    email: "",
    bank_name: "",
    account_holder: "",
    account_number: "",
    account_type: "",
    ifsc: "",
    gst_name: "",
    gst_address: "",
    gst_number: "",
    products: [],
    prefix: "",
    address_link: "",
    facebook_link: "",
    insta_link: "",
    generated_name: "",
    company_name:"",
    company_link:"",
    qr_code:""
  });
  const [generated,setGenerated]=useState("")
  const formData = new FormData();
  const getCategory = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/category`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadCard = async (imageUrl,qr) => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/card/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cardData,
          image: imageUrl || "",
          products: product,
         generated_name:generated,
         qr_code:qr 
        }),
      });
      setIsLoading(false);
      data = await data.json();
      toast({
        title: "Created Succesfully",
        description: data.msg,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      navigate("/admin/card");
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        description: error,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleGeneratedName = (x) => {
   
    return x
    .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .trim();

  };

  const handleCheck = (e) => {
    let index = product.findIndex((i) => i == e._id);
    console.log(index);
    if (index > -1) {
      product.splice(index, 1);
      console.log(product);
    } else {
      setProduct([...product, e._id]);
    }
  };

  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
        console.log("image", image);
      };
      reader.readAsDataURL(file);
    }
  };
  const submitFile = async () => {
    if (dataUrl == "") {
      return;
    }
    formData.append("avatar", image);
    setIsLoading(true);
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
      `${process.env.REACT_APP_URL}/payment/qr`,
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


  useEffect(() => {
    getCategory();
    console.log(product);
    
  }, [product]);
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
            onChange={(e) => {
              handleChange(e);
               setGenerated(handleGeneratedName(e.target.value))
            }}
            value={cardData.name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Designation</FormLabel>
          <Input
            type="text"
            name="designation"
            onChange={(e) => handleChange(e)}
            value={cardData.designation}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            name="company_name"
            onChange={(e) => handleChange(e)}
            value={cardData?.company_name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Company Website</FormLabel>
          <Input
            type="text"
            name="company_link"
            onChange={(e) => handleChange(e)}
            value={cardData?.company_link}
          />
        </FormControl>
        <br />
        <Text fontWeight={"semibold"}>Prefix</Text>
        <br />
        <select
          onChange={(e) => {
            setCardData({ ...cardData, prefix: e.target.value });
          }}
        >
          <option>Select</option>
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
            value={cardData.address}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Address GMap Link</FormLabel>
          <Input
            name="address_link"
            onChange={(e) => handleChange(e)}
            value={cardData.address_link}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Facebook Link</FormLabel>
          <Input
            name="facebook_link"
            onChange={(e) => handleChange(e)}
            value={cardData.facebook_link}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Instagram Link</FormLabel>
          <Input
            name="insta_link"
            onChange={(e) => handleChange(e)}
            value={cardData.insta_link}
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
              handleChange(e);
            }}
            onBlur={(e) => {
              let rez = /^[0-9]{10}$/;
              if (!rez.test(e.target.value)) {
                toast({
                  title: "Invalid Number",
                  description: "Enter Your 10 Digit Number Only",
                  status: "error",
                  duration: 7000,
                  position: "top",
                  isClosable: true,
                });
              }
            }}
            value={cardData?.mobile}
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
            onBlur={(e) => {
              let rez = /^[0-9]{10}$/;
              if (!rez.test(e.target.value)) {
                toast({
                  title: "Invalid Number",
                  description: "Enter Your 10 Digit Number Only",
                  status: "error",
                  duration: 7000,
                  position: "top",
                  isClosable: true,
                });
              }
            }}
            value={cardData?.whatsapp}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={cardData?.email}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Image</FormLabel>
          <Box w="150px">
            {dataUrl && <Image w="150px" height={"150px"} src={dataUrl} />}
          </Box>
          <br />
          <form encType="multipart/form-data">
            <input
              type="file"
              name="avatar"
              onChange={(e) => handleFileChanger(e)}
            />
          </form>
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
        <FormControl isRequired>
          <FormLabel>Bank Name</FormLabel>
          <Input
            type="text"
            name="bank_name"
            onChange={(e) => handleChange(e)}
            value={cardData?.bank_name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Account Holder Name</FormLabel>
          <Input
            type="text"
            name="account_holder"
            onChange={(e) => handleChange(e)}
            value={cardData?.account_holder}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Account Type</FormLabel>
          <Input
            type="text"
            name="account_type"
            onChange={(e) => handleChange(e)}
            value={cardData?.account_type}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>Account Number</FormLabel>
          <Input
            type="text"
            name="account_number"
            onChange={(e) => handleChange(e)}
            value={cardData?.account_number}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>IFSC Code</FormLabel>
          <Input
            type="text"
            // pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            name="ifsc"
            onChange={(e) => handleChange(e)}
            value={cardData?.ifsc}
            // onBlur={(e) => {
            //   let rez = /^[A-Z]{4}0[A-Z0-9]{6}$/;
            //   if (!rez.test(e.target.value)) {
            //     toast({
            //       title: "Invalid Code",
            //       description: "Enter Valid IFSC code",
            //       status: "error",
            //       duration: 7000,
            //       position: "top",
            //       isClosable: true,
            //     });
            //   }
            // }}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>GST Company Name</FormLabel>
          <Input
            type="text"
            name="gst_name"
            onChange={(e) => handleChange(e)}
            value={cardData.gst_name}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>GST Billing Address</FormLabel>
          <Textarea
            name="gst_address"
            onChange={(e) => handleChange(e)}
            value={cardData.gst_address}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>GST Number</FormLabel>
          <Input
            type="text"
            name="gst_number"
            // maxLength={15}
            onChange={(e) => handleChange(e)}
            value={cardData?.gst_number}
            // onBlur={(e) => {
            //   let rez =
            //     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            //   if (!rez.test(e.target.value)) {
            //     toast({
            //       title: "Invalid GSTIN",
            //       description: "Enter Valid GST Number",
            //       status: "error",
            //       duration: 7000,
            //       position: "top",
            //       isClosable: true,
            //     });
            //   }
            // }}
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
          // onClick={() => submitFile().then((res) => uploadCard(res))}
          onClick={()=>{
            Promise.all([submitFile(),submitQr()])
            .then((res)=>uploadCard(res[0],res[1]))
            .catch(err=>console.error(err))
          }}
          isDisabled={!cardData.name}
        >
          Add Card
        </Button>
      </Box>
    </Flex>
  );
};

export default Card;
