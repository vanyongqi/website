import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Gallery from "./pages/Gallery"
import Artists from "./pages/Artists"
import Trending from "./pages/Trending"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  )
}

export default App