import ProductDashboard from "./products/ProductDashboard"
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Toaster position="buttom-right" />
      <Router>
   
        <Routes>
          <Route path="/product" element={ <ProductDashboard/> } />
        
        </Routes>
    
    </Router>
     
    </>
  )
}

export default App
