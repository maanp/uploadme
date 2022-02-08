import './App.css';
import { Home } from './Compo/Home';
import { Navbar } from './Compo/Navbar';
import { Upload } from './Compo/Upload';
import { BrowserRouter as Router,  Route , Routes  } from 'react-router-dom'
import { FileState } from './context/FileState';


function App() {
  return (
    <>
    <FileState>
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/upload'  element={<Upload />}/>
      </Routes>
    </div>
    </Router>
    </FileState>
    </>
  );
}

export default App;
