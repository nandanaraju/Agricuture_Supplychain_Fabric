import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import HomePage from "./components/Home"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import ManufacturerDashboard from "./components/ManufacturerDashboard"
import CreateProductPage from "./components/CreateProduct"
import ReadProductPage from "./components/ReadProduct"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<HomePage/>}/>
    <Route path='/login'element={<LoginPage/>}/>
    <Route path="/signup"element={<SignupPage/>}/>
    <Route path="/manufacturer"element={<ManufacturerDashboard/>}/>
    <Route path="/create-product"element={<CreateProductPage/>}/>
    <Route path="/read-product"element={<ReadProductPage/>}/>


      
      


    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App