// import logo from "./img";
import Card from './components/card/Card';
import Header from './components/header/Header';
import SideCard from './components/sideCard/SideCard';

function App() {
  return (
    
    <div className="wrapper">
      <SideCard/>
      <Header/>
      <div className="content">
        <div className="contentTop">
          <h1 className="contentTitle">
            Все кросовки
          </h1>
          <div className="contentSearch">
            <img src="/img/search.svg" alt="search" />
            <input type="text" placeholder="Поиск...."/>
          </div>
          
        </div>
        <div className="skeakersCard">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
