import './App.css';
import { Route,Routes,useLocation } from 'react-router-dom';

import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Form from './Components/Forms/Form';
import Detail from './Components/Detail/Detail';
import SearchByName from './Components/SearchByName/SearchByName';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/name' element={<SearchByName/>}/>
      </Routes>
    </div>
  );
}

export default App;