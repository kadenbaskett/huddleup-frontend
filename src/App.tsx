import logo from "./logo.svg";
import "./App.css";
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage'
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
