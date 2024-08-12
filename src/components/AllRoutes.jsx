import React from 'react'
import { Route, Routes} from 'react-router-dom'
// import SignUp from './SignUp'
import Admin from './Admin'
import Other from './Other'
// import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
        {/* <Route path='/' element={<SignUp/>} /> */}
        <Route path='/admin/*' element={
          // <PrivateRoute>
        <Admin/>
        // </PrivateRoute>
        } />
        <Route path="*" element={<Other/>}/>
        {/* <Route path='/admin/profile' element={<Profile/>} />
        <Route path='/admin/profile/:userid' element={<SingleUser/>} />
        <Route path='/admin/view/:userid' element={<ViewUser/>} />
        <Route path='/admin/user' element={<User/>}/>
        <Route path="/user/add" element={<AddUser/>}/>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/admin/category" element={<Category/>} />
        <Route path="/admin/category/:categoryid" element={<ViewCategory/>}/>
        <Route path="/admin/category/edit/:categoryid" element={<EditCategory/>}/>
        <Route path="/admin/category/add" element={<AddCategory/>}/>
        <Route path="/admin/product" element={<Product/>}/>
        <Route path="/admin/product/:productid" element={<ViewProduct/>}/>
        <Route path="/admin/product/edit/:productid" element={<EditProduct/>}/>
        <Route path="/admin/product/add" element={<AddProduct/>}/>
        <Route path="/admin/card/add" element={<Card/>}/>
        <Route path="/admin/card" element={<CardList/>}/>
        <Route path="/admin/page" element={<Pages/>}/>
        <Route path="/admin/page/home" element={<Home/>}/>
        <Route path="/admin/blog" element={<Blog/>}/>
        <Route path="/admin/blog/add" element={<AddBlog/>} />
        <Route path="/admin/blog/:blogid" element={<ViewBlog/>}/>
        <Route path="/admin/blog/edit/:blogid" element={<EditBlog/>}/>
        <Route path="/admin/page/about" element={<About/>}/>
        <Route path='/admin/page/news' element={<News/>}/>
        <Route path="/admin/page/news/add" element={<AddNews/>} />
        <Route path="/admin/page/news/:newsid" element={<ViewNews/>}/>
        <Route path="/admin/page/news/edit/:newsid" element={<EditNews/>}/>
        <Route path="/admin/broucher" element={<Broucher/>}/>
        <Route path="/admin/broucher/add" element={<AddBroucher/>} />
        <Route path="/admin/broucher/edit/:id" element={<EditBroucher/>} /> */}
    </Routes>
  )
}

export default AllRoutes