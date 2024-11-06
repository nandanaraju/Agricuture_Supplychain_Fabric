import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import HomePage from "./components/Home"
import LoginPage from "./components/LoginPage"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<HomePage/>}/>
    <Route path='/login'element={<LoginPage/>}/>

      
      


    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App