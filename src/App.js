import { BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/Header/index";
import SearchPage from "./pages/Search/index";
import CollectionPage from "./pages/Collection/index";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <BrowserRouter path="/" exact>
          <SearchPage  data-hook="home-link" />
        </BrowserRouter>

        <BrowserRouter path="/collection" exact>
          <CollectionPage data-hook="collections-link" />
        </BrowserRouter>
      </Switch>
    </div>
  );
}

export default App;
