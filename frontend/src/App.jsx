import ProductDashboard from "./products/ProductDashboard"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
   
        <Routes>
          <Route path="/product" element={ <ProductDashboard/> } />
        
        </Routes>
    
    </Router>
     
    </>
  )
}

export default App
