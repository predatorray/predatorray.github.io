import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import WelcomePage from "./WelcomePage";
import HeaderBar from "./HeaderBar";
import ResumePage from "./ResumePage";
import ProjectsPage from "./ProjectsPage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#888',
    }
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <HeaderBar />
                <WelcomePage/>
              </>
            }/>
            <Route path="/resume" element={
              <>
                <HeaderBar displaysTitle={true} />
                <ResumePage/>
              </>
            }/>
            <Route path="/projects" element={
              <>
                <HeaderBar displaysTitle={true} />
                <ProjectsPage/>
              </>
            }/>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
