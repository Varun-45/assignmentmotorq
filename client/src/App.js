import { Route, Routes } from 'react-router-dom';
import Admin from "./components/admin";
import Home from './components/Home';
import User from './components/user';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
