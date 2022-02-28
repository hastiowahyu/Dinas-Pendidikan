import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FooterKita from "./components/Footer/Footer";
import { Routes, Route} from "react-router-dom";
import Artikel from "./components/Artikel/Artikel";
import DetailArtikel from "./components/Artikel/DetailArtikel/DetailArtikel";
import Foto from "./components/Foto/Foto";

function App() {
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/beranda' element={<Main />} />
        <Route path='/artikel' element={<Artikel />} />
        <Route path='/artikel/DetailArtikel/:id' element={<DetailArtikel />} />
        <Route path='/gallery' element={<Foto />} />
      </Routes>
      {/* <Header /> */}
      <FooterKita />
    </div>

  );
}

export default App;
