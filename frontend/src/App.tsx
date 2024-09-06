import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import CreatePost from './pages/CreatePost'
import Edit from './pages/Edit'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'




function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/publish' element={<CreatePost/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      
    </Routes>
    </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
