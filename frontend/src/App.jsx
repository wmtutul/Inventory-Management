import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Root from './components/Root';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/admin/dashboard' element = {<h1>admin dashboard</h1>} />
        <Route path='/customer/dashboard' element={<h1>customer dashboard</h1>}/>
        <Route path='/login' element={<h1>Login</h1>} />
      </Routes>
    </Router>
  )
}

export default App



