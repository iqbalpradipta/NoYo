import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/loginPage";
import Layout from "./layout";
import RegisterPage from "./pages/registerPage";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import ProfilePage from "./pages/profilePage";
import PlacesPages from "./pages/placesPages";
import PlacesFormPage from "./pages/placesFormPage";
import PlacePage from "./pages/placePage";

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<ProfilePage />} />
            <Route path='/account/places' element={<PlacesPages />} />
            <Route path='/account/places/new' element={<PlacesFormPage />} />
            <Route path='/account/places/:id' element={<PlacesFormPage />} />
            <Route path='/places/:id' element={<PlacePage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
