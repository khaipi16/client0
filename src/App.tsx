import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Blog } from './components/blog/Blog';
import { Navbar } from './components/navbar/Navbar';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Timeline } from './components/timeline/Timeline';
import { Login } from './components/login/Login';
import { Register } from './components/login/Register';
import { UserContext, UserContextProvider } from './UserContext';
import { SingleBlog } from './pages/SingleBlog';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/write' element={<Blog/>} />
          <Route path='/recent-blogs' element={<Timeline/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/recent-blogs/:id" element={<SingleBlog/>} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
