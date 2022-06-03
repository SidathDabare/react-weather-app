/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import CurrentLocation from "./components/CurrentLocation"
import MainSearch from "./components/MainSearch"

function App() {
  return (
    <BrowserRouter>
      <CurrentLocation />
      <Routes>
        <Route path='/' element={<MainSearch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
