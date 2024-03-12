import { Outlet, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Header from "./components/Header"
import Home from './pages/HomePage/Home'
import About from "./pages/AboutPage/About"
import Contact from "./pages/ContactPage/Contact"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
      </Route>
    )
  )
  return (
   <div> 
    <RouterProvider router={router} />
   </div>
  )
}

const Root = () => {
  return (
    <>
      <div>
        {" "}
        <Header />
      </div>
      <div className="flex px-20 justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default App