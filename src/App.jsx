import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import LoginEmployee from './pages/LoginEmployee';
import LoginEmployer from './pages/LoginEmployer';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/login/employee" element={<LoginEmployee />} />
        <Route path="/login/employer" element={<LoginEmployer />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
