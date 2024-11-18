import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import HomePage from "./components/Home"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import ManufacturerDashboard from "./components/ManufacturerDashboard"
import CreateProductPage from "./components/CreateProduct"
import ReadProductPage from "./components/ReadProduct"
import DistributerDashboard from "./components/DistributerDashboard"
import CreateOrder from "./components/CreateOrder"
import ReadOrder from "./components/ReadOrder"
import QueryAllProducts from "./components/QueryAllproducts"
import QueryAllOrders from "./components/QueryAllOrders"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<HomePage/>}/>
    <Route path='/login'element={<LoginPage/>}/>
    <Route path="/signup"element={<SignupPage/>}/>
    <Route path="/manufacturer"element={<ManufacturerDashboard/>}/>
    <Route path="/create-product"element={<CreateProductPage/>}/>
    <Route path="/read-product"element={<ReadProductPage/>}/>
    <Route path="/distributer"element={<DistributerDashboard/>}/>
    <Route path="/create-order"element={<CreateOrder/>}/>
    <Route path="/read-order"element={<ReadOrder/>}/>
    <Route path="/view-product"element={<QueryAllProducts/>}/>
    <Route path="/view-order"element={<QueryAllOrders/>}/>



      
      


    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App