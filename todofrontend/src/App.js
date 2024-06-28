import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Popraw import dla komponentu Switch
// Import missing components
import Appbar from './components/Appbar';
import ViewToDo from './components/todo/ViewToDo';
import AddToDo from './components/todo/AddToDo';
import UpdateToDo from './components/todo/UpdateToDo';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';


function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <div>
          <Routes>
            <Route exact path='/' element={<Home /> } />
            <Route exact path='/view' element={<ViewToDo />} />
            <Route exact path='/add' element={<AddToDo />} />
            <Route exact path='/update/:id' element={<UpdateToDo />} />
            <Route exact path='/about' element={<About />} />
            
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


