import react, { Fragment } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import FooterKita from "./components/Footer/Footer";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Main />
      </main>
      <FooterKita />
    </Fragment>
  );
}

export default App;
