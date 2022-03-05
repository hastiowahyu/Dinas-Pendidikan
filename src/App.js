import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FooterKita from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Artikel from "./components/Artikel/Artikel";
import DetailArtikel from "./components/Artikel/DetailArtikel/DetailArtikel";
import Foto from "./components/Foto/Foto";
import DetailNews from "./components/Main/News/DetailNews/DetailNews";
import Berita from "./components/Berita/Berita";
import Dokumen from "./components/Dokumen/Dokumen";
import { PDFViewer } from "./components/Dokumen/PDFViewer";
import HalamanStatis from "./components/HalamanStatis/HalamanStatis";
import GalleryVidio
 from "./components/GalleryVidio/GalleryVidio";

function App() {
  return (
    <div className='body'>
      <Header />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/beranda' element={<Main />} />
        <Route path='/artikel' element={<Artikel />} />
        <Route path='/artikel/DetailArtikel/:id' element={<DetailArtikel />} />
        <Route path='/foto' element={<Foto />} />
        <Route path='/news/DetailNews/:id' element={<DetailNews />} />
        <Route path='/News/Artikel' element={<Artikel />} />
        <Route path='/Beranda/GalleryFoto' element={<Foto />} />
        <Route path='/Berita' element={<Berita />} />
        <Route path='/berita/DetailNews/:id' element={<DetailNews />} />
        <Route path='/Dokumen' element={<Dokumen />} />
        <Route path='/pdf/:slug/:filename' element={<PDFViewer />} />
        <Route path='/static/:id' element={<HalamanStatis />} />
        <Route path='/Beranda/Dokumen' element={<Dokumen />} />
        <Route path='/Beranda/Berita' element={<Berita />} />
        <Route path='/Beranda/DetailArtikel/:id' element={<DetailArtikel />} />
        <Route path='/vidio' element={<GalleryVidio />} />
      </Routes>
      <FooterKita />
    </div>
  );
}
export default App;