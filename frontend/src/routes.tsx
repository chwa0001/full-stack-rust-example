import { Routes as Router, Route, Navigate} from 'react-router-dom'
import Home from './components/home';

const Routes = () => {
  return (
    <Router>      
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Router>
  )
}

export default Routes
