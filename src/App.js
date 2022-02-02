import './App.css';
import { Home } from './Compo/Home';
import { Navbar } from './Compo/Navbar';
import { Upload } from './Compo/Upload';
import { BrowserRouter as Router,  Route , Routes  } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/upload'  element={<Upload />}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
