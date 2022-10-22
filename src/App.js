import appStyle from "./App.module.scss";
import cw from "./assets/cw.svg";
import design from "./assets/design.svg";
import Card from "./components/Card";

function App() {
  return (
    <div className={appStyle.app}>
      
      <div className={appStyle.container}>
        <nav className={appStyle.navbar}>
          <img className={appStyle.cwImage} src={cw} alt="ClaruswayImage" />
        </nav>
      </div>

     <Card/>


      <div className={appStyle.footer}>
        <p>&copy;meScriptamanent</p>
        <img className={appStyle.design} src={design} alt="designImage" />
        

      </div>
    </div>
  );
}

export default App;
