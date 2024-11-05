import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import HomePage from "./components/Home"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<HomePage/>}>
      
      </Route>


    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App