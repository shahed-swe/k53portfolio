import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ProjectsManager from './pages/ProjectsManager';
import ServicesManager from './pages/ServicesManager';
import TeamManager from './pages/TeamManager';
import TestimonialsManager from './pages/TestimonialsManager';
import MessagesManager from './pages/MessagesManager';
import ContactInfoManager from './pages/ContactInfoManager';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/projects" replace />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="messages" element={<MessagesManager />} />
              <Route path="contact-info" element={<ContactInfoManager />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
