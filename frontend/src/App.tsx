import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Blog } from './pages/Blog'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Appbar } from './components/Appbar'
const Publish = lazy(() => import("./pages/Publish"));
import { ProtectedRoute } from './components/ProtectedRoute'
import Footer from './components/Footer'
const Drafts = lazy(() => import("./pages/Drafts"));
import { FavBlogs } from './pages/FavBlogs'
import { Landing } from './pages/Landing'
import { Dash } from './pages/Dash'
import { Published } from './pages/Published'
import { lazy } from 'react'

function App() {

  return (
    <>
    <Appbar/>
        <Routes>
          <Route path='/' element={ <Landing />}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/post/:id' element={ <Blog/> } />
          <Route path='/post' element={<Blogs/>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dash/></ProtectedRoute>} />
          <Route path='/drafts' element={<ProtectedRoute><Drafts/></ProtectedRoute>} />
          <Route path='/fav' element={<ProtectedRoute><FavBlogs/></ProtectedRoute>} />
          <Route path='/published' element={<ProtectedRoute><Published/></ProtectedRoute>} />          
          <Route path='/publish' element={ <ProtectedRoute> <Publish/> </ProtectedRoute>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
