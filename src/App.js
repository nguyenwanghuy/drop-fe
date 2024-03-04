import { Route,Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Header from './Layouts/Header/Header';


function App() {
  return (
   <>
   <Header/>
    <div className="App">
    <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
       
    </Routes>
    </div>
   </>
  );
}

export default App;
