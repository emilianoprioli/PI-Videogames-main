import './App.css';
import { Route,Routes,useLocation } from 'react-router-dom';

import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Form from './Components/Forms/Form';

function App() {
  const {pathname} = useLocation()

  return (
    <div className="App">
      {pathname === "/" && <h1>Henry Videogames</h1>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;