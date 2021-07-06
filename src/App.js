// import Todo from "./components/Todo";
import { BrowserRouter, Switch } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";

import MainNavigation from "./components/layout/MainNavigation";

function App() {
  return (
    <div>
    
      <MainNavigation />

      <Switch>
        <BrowserRouter path="/" exact>
          <AllMeetupsPage/>
        </BrowserRouter>

        <BrowserRouter path="/new-meetup">
          <NewMeetupPage />
        </BrowserRouter>

        <BrowserRouter path="/favorites">
          <FavoritesPage />
        </BrowserRouter>
      </Switch>
    </div>
  );
}

export default App;
