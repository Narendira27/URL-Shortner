import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../frontend/src/pages/home";
import Verify from "./pages/verify";
import NotFound from "./pages/notfound";
import GetUrl from "./pages/get";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/get" element={<GetUrl />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
