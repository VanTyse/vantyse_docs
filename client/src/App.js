import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Document from './routes/Documents/Document';
import Home from './routes/Home/Home.jsx'
import Header from './components/Header/Header';
import Auth from './routes/Auth/Auth';
import Redirect from './routes/Redirect/Redirect';


function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/documents/:id' element={<Document/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/auth/register' element={<Auth/>} />
          <Route path='*' element={<Redirect/>} />
        </Routes>
      </Router>
  );
}

export default App;
