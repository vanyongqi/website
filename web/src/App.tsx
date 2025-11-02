import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeProvider } from "./contexts/ThemeContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Gallery from "./pages/Gallery"
import Artists from "./pages/Artists"
import Trending from "./pages/Trending"
import SellerCenter from "./pages/SellerCenter"
import BuyerCenter from "./pages/BuyerCenter"
import CodeDetail from "./pages/CodeDetail"
import PublishCode from "./pages/PublishCode"

function App() {
  // 在生产环境且部署到 GitHub Pages 时使用 /website/ 作为 base path
  const basename = import.meta.env.PROD ? '/website' : ''
  
  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/seller" element={<SellerCenter />} />
            <Route path="/seller/publish" element={<PublishCode />} />
            <Route path="/buyer" element={<BuyerCenter />} />
            <Route path="/code/:id" element={<CodeDetail />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App