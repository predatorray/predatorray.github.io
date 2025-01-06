import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import WelcomePage from "./WelcomePage";
import HeaderBar from "./HeaderBar";
import ResumePage from "./ResumePage";
import ProjectsPage from "./ProjectsPage";
import ContactPage from "./ContactPage";

const theme = createTheme({
  palette: {
    text: {
      primary: '#121212',
      secondary: '#565656',
    },
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#888',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
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
                <HeaderBar current="Home" />
                <WelcomePage/>
              </>
            }/>
            <Route path="/resume" element={
              <>
                <HeaderBar current="Resume" displaysTitle={true} />
                <ResumePage/>
              </>
            }/>
            <Route path="/projects" element={
              <>
                <HeaderBar current="Projects" displaysTitle={true} />
                <ProjectsPage/>
              </>
            }/>
            <Route path="/contact" element={
              <>
                <HeaderBar current="Contact" displaysTitle={true} />
                <ContactPage/>
              </>
            }/>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
