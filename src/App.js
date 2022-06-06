/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
//import MainSearch from "./components/MainSearch"
import FullWeather from "./components/FullWeather"
import NotFound from "./components/NotFound"
import MainPage from "./components/MainPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/fullWeather/:' element={<FullWeather />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
