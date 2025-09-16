import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Blog } from './pages/Blog'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Appbar } from './components/Appbar'
import { Publish } from './pages/Publish'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Hero } from './components/Hero'
import Footer from './components/Footer'
import { Dashboard } from './pages/Dashboard'
import { Drafts } from './pages/Drafts'
import { FavBlogs } from './pages/FavBlogs'

function App() {

  return (
    <>
    <Appbar/>
        <Routes>
          <Route path='/' element={ <Hero />}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/post/:id' element={ <Blog/> } />
          <Route path='/post' element={<Blogs/>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path='/drafts' element={<ProtectedRoute><Drafts/></ProtectedRoute>} />
          <Route path='/fav' element={<ProtectedRoute><FavBlogs/></ProtectedRoute>} /> 
          <Route path='/publish' element={ <ProtectedRoute> <Publish/> </ProtectedRoute>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
