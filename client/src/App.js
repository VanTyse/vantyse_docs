import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TextEditor from './components/TextEditor/TextEditor';
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
          <Route path='/documents/:id' element={<TextEditor/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/auth/register' element={<Auth/>} />
          <Route path='*' element={<Redirect/>} />
        </Routes>
      </Router>
  );
}

export default App;
