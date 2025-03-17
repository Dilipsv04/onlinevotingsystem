import{useState} from 'react'
import IndexPage from './pages/IndexPage'
import RegisterPage from'./pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
function App(){
  return(
   <BrowserRouter>
   <Routes>
    <Route path='/register' element={<RegisterPage/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}
export default App