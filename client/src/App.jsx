import './styles/App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Result from './components/Result';
import TakeTest from './components/TakeTest';
import AllQuestions from './components/AllQuestions';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path = "/" element={<TakeTest/>}/>
        <Route exact path = "/home" element={<Home/>}/>
        <Route exact path = "/quiz" element={<AllQuestions/>}/>
        <Route exact path = "/result" element={<Result/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
