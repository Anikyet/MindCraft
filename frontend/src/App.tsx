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

function App() {

  return (
    <>
    <Appbar/>
        <Routes>
          <Route path='/' element={ <Hero />}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/blog/:id' element={ <ProtectedRoute><Blog/></ProtectedRoute> } />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/publish' element={ <ProtectedRoute> <Publish/> </ProtectedRoute>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
