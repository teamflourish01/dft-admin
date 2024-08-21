import {
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MdContactPage } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { FaBell, FaImage, FaUser } from "react-icons/fa";
import {
  BsFileEarmarkPdfFill,
  BsPersonVcard,
  BsBriefcaseFill,
  BsShopWindow,
  BsPerson,
} from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { LuPartyPopper } from "react-icons/lu";
import { BiSolidUser, BiLogoBlogger, BiLogoGmail } from "react-icons/bi";
import userContext from "../context/userDetails";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiPower } from "react-icons/fi";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllRoutes from "./AllRoutes";

// njjbkhnibhibjhnjbj
import Home from "./Home";
import About from "./About";
import Testimonial from "./Testimonial";
import TestimonialView from "./TestimonialvVew";
import TestimonialEdit from "./TestimonialEdit";
import TestimonialAdd from "./TestimonialAdd";
import Notablealumni from "./Notablealumni";
import NotablealumniView from "./NotablealumniView";
import NotablealumniEdit from "./NotablealumniEdit";
import NotablealumniAdd from "./NotablealumniAdd";
import Alumnicommitiee from "./Alumnicommitiee";
import AlumnicommitieeView from "./AlumnicommitieeView";
import AlumnicommitieeEdit from "./AlumnicommitieeEdit";
import AlumnicommitieeAdd from "./AlumnicommitieeAdd";
import Newsletter from "./Newsletter";
import NewsletterEdit from "./NewsletterEdit";
import NewsletterAdd from "./NewsletterAdd";
import Notablealumnipage from "./Notablealumnipage";
import NotablealumnipageView from "./NotablealumnipageView";
import NotablealumnipageEdit from "./NotablealumnipageEdit";
import NotablealumnipageAdd from "./NotablealumnipageAdd";
import Gallery from "./Gallery";
import GalleryView from "./GalleryView";
import GalleryEdit from "./GalleryEdit";
import GalleryAdd from "./GalleryAdd";
import Deskfounder from "./Deskfounder";
import DeskfounderView from "./DeskfounderView";
import DeskfounderEdit from "./DeskfounderEdit";
import DeskfounderAdd from "./DeskfounderAdd";

// vbhijhbjvbjihbbjbhn
import Profile from "./Profile";
import SingleUser from "./SingleUser";
import ViewUser from "./ViewUser";
import User from "./User";
import AddUser from "./AddUser";
import Dashboard from "./Dashboard";
import Category from "./Category";
import ViewCategory from "./ViewCategory";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import Product from "./Product";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import CardList from "./CardList";
import Pages from "./Pages";
import Blog from "./Blog";
import AddBlog from "./AddBlog";
import ViewBlog from "./ViewBlog";
import EditBlog from "./EditBlog";
import News from "./News";
import AddNews from "./AddNews";
import ViewNews from "./ViewNews";
import EditNews from "./EditNews";
import Broucher from "./Broucher";
import AddBroucher from "./AddBroucher";
import EditBroucher from "./EditBroucher";
import Inquiry from "./Inquiry";
import ViewInquiry from "./ViewInquiry";
import EditCard from "./EditCard";
import Card from "./Card";
import logo from "../images/image.png";
import Habibi from "./Habibi";
import Manager from "./Manager";
import AddManager from "./AddManager";
import OurOutlets from "./OurOutlets";
import AddOutlet from "./AddOutlet";
import EditOutlet from "./EditOutlet";
import ViewOutlet from "./ViewOutlet";
import { FaStore } from "react-icons/fa6";
import Navbar from "./Navbar";
import ViewToken from "./ViewToken";
import EditToken from "./EditToken";

const Admin = () => {
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const { userData, setUserData } = useContext(userContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#161616"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Image src={logo} width={"120px"} />
      <Flex px="4" py="0" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color="white"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        >
          {userData.name || "Unknown"}
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="#b5b3b3"
        aria-label="Main Navigation"
      >
        <NavItem icon={BsBriefcaseFill} onClick={() => navigate("/admin")}>
          Dashboard
        </NavItem>
        
        <NavItem
          icon={FaUser}
          onClick={() => navigate("/admin/page/testimonial")}
        >
          Testimonials
        </NavItem>
        <NavItem
          icon={FaUser}
          onClick={() => navigate("/admin/page/notablealumni")}
        >
          Notable Alumni
        </NavItem>
        <NavItem
          icon={BsPerson}
          onClick={() => navigate("/admin/page/alumnicommitiee")}
        >
          Alumni Commitiee
        </NavItem>
        <NavItem
          icon={BsFileEarmarkPdfFill}
          onClick={() => navigate("/admin/page/newsletter")}
        >
          News Letter
        </NavItem>
        <NavItem
          icon={BsPerson}
          onClick={() => navigate("/admin/page/notablealumnipage")}
        >
          Notable Alumni Page
        </NavItem>
        <NavItem icon={FaImage} onClick={() => navigate("/admin/page/gallery")}>
          Gallery
        </NavItem>
        <NavItem
          icon={BsPerson}
          onClick={() => navigate("/admin/page/deskfounder")}
        >
          Deskfounder
        </NavItem>
        
        <NavItem icon={FaUser} onClick={() => navigate("/admin/user")}>
          Users
        </NavItem>
        <NavItem icon={MdContactPage} onClick={() => navigate("/admin/page")}>
          Pages
        </NavItem>        
        <NavItem icon={BiLogoGmail} onClick={() => navigate("/admin/inquiry")}>
          Inquiry
        </NavItem>
      </Flex>
    </Box>
  );
  useEffect(() => {
    // console.log(userData);
  }, [userData]);

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="flex-end"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Flex align="center">
            <Menu>
              <MenuButton rightIcon={<ChevronDownIcon />}>
                {userData.image ==
                "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" ? (
                  <Avatar
                    ml="4"
                    size="sm"
                    name="anubra266"
                    src={userData.image}
                    cursor="pointer"
                  />
                ) : (
                  <Avatar
                    ml="4"
                    size="sm"
                    name="anubra266"
                    src={"https://api.srwater.in/profile/" + userData.image}
                    cursor="pointer"
                  />
                )}
              </MenuButton>
              <MenuList>
                <MenuItem gap={"20px"}>
                  {userData.image ==
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" ? (
                    <Avatar
                      ml="4"
                      size="sm"
                      name="anubra266"
                      src={userData.image}
                      cursor="pointer"
                    />
                  ) : (
                    <Avatar
                      ml="4"
                      size="sm"
                      name="anubra266"
                      src={"https://api.srwater.in/profile/" + userData.image}
                      cursor="pointer"
                    />
                  )}
                  <Text>{userData.email}</Text>
                </MenuItem>
                <MenuItem gap="20px" onClick={() => navigate("/admin/profile")}>
                  <BiSolidUser />
                  Profile
                </MenuItem>
                <MenuItem gap="20px" onClick={handleLogOut}>
                  <FiPower />
                  LogOut
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          {/* <AllRoutes/> */}
          <Routes>
            <Route path="/page/home/edit/:id" element={<Home />} />
            <Route path="/page/about/edit/:id" element={<About />} />
            <Route path="/page/testimonial" element={<Testimonial />} />
            <Route
              path="/page/testimonial/view/:id"
              element={<TestimonialView />}
            />
            <Route
              path="/page/testimonial/edit/:id"
              element={<TestimonialEdit />}
            />
            <Route path="/page/testimonial/add" element={<TestimonialAdd />} />
            <Route path="/page/notablealumni" element={<Notablealumni />} />
            <Route
              path="/page/notablealumni/view/:id"
              element={<NotablealumniView />}
            />
            <Route
              path="/page/notablealumni/edit/:id"
              element={<NotablealumniEdit />}
            />
            <Route
              path="/page/notablealumni/add"
              element={<NotablealumniAdd />}
            />
            <Route path="/page/alumnicommitiee" element={<Alumnicommitiee />} />
            <Route
              path="/page/alumnicommitiee/view/:id"
              element={<AlumnicommitieeView />}
            />
            <Route
              path="/page/alumnicommitiee/edit/:id"
              element={<AlumnicommitieeEdit />}
            />
            <Route
              path="/page/alumnicommitiee/add"
              element={<AlumnicommitieeAdd />}
            />
            <Route path="/page/newsletter" element={<Newsletter />} />
            <Route
              path="/page/newsletter/edit/:id"
              element={<NewsletterEdit />}
            />
            <Route path="/page/newsletter/add" element={<NewsletterAdd />} />
            <Route
              path="/page/notablealumnipage"
              element={<Notablealumnipage />}
            />
            <Route
              path="/page/notablealumnipage/view/:id"
              element={<NotablealumnipageView />}
            />
            <Route
              path="/page/notablealumnipage/edit/:id"
              element={<NotablealumnipageEdit />}
            />
            <Route
              path="/page/notablealumnipage/add"
              element={<NotablealumnipageAdd />}
            />
            <Route path="/page/gallery" element={<Gallery />} />
            <Route path="/page/gallery/view/:id" element={<GalleryView />} />
            <Route path="/page/gallery/edit/:id" element={<GalleryEdit />} />
            <Route path="/page/gallery/add" element={<GalleryAdd />} />
            <Route path="/page/deskfounder" element={<Deskfounder />} />
            <Route
              path="/page/deskfounder/view/:id"
              element={<DeskfounderView />}
            />
            <Route
              path="/page/deskfounder/edit/:id"
              element={<DeskfounderEdit />}
            />
            <Route path="/page/deskfounder/add" element={<DeskfounderAdd />} />

            {/* <Route path='/admin/login' element={<SignUp/>} /> */}
            {/* <Route path='/admin' element={<Admin/>} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userid" element={<SingleUser />} />
            <Route path="/view/:userid" element={<ViewUser />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:categoryid" element={<ViewCategory />} />
            <Route
              path="/category/edit/:categoryid"
              element={<EditCategory />}
            />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:productid" element={<ViewProduct />} />
            <Route path="/product/edit/:productid" element={<EditProduct />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/card/add" element={<Card />} />
            <Route path="/card/edit/:name" element={<EditCard />} />
            <Route path="/card" element={<CardList />} />
            <Route path="/page" element={<Pages />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/page/news" element={<News />} />
            <Route path="/page/news/add" element={<AddNews />} />
            <Route path="/page/news/:newsid" element={<ViewNews />} />
            <Route path="/page/news/edit/:newsid" element={<EditNews />} />
            <Route path="/broucher" element={<Broucher />} />
            <Route path="/broucher/add" element={<AddBroucher />} />
            <Route path="/broucher/edit/:id" element={<EditBroucher />} />
            <Route path="/inquiry/:id" element={<ViewInquiry />} />
            <Route path="/annual" element={<Habibi />} />
            <Route path="/annual/manager" element={<Manager />} />
            <Route path="/annual/manager/add" element={<AddManager />} />
            <Route path="/store" element={<OurOutlets />} />
            <Route path="/store/add" element={<AddOutlet />} />
            <Route path="/store/edit/:id" element={<EditOutlet />} />
            <Route path="/store/:id" element={<ViewOutlet />} />
            <Route path="/page/navbar" element={<Navbar />} />
            <Route path="/annual/view/:id" element={<ViewToken />} />
            <Route path="/annual/edit/:id" element={<EditToken />} />
          </Routes>
          <Box rounded="md" h="96" />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
