import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Container,
  Tab,
  Tabs,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App3Tab from "./components/App3Tab";

// Dynamically import App from MFE (my_app1_mfe)
const App1 = React.lazy(() => import("my_app1_mfe/App"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Modern blue
    },
    background: {
      default: "#f5f5f5", // Light background for content
      paper: "#ffffff", // White background for paper surfaces
    },
    text: {
      primary: "#333", // Dark text for readability
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("app1");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // Handle Tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant="temporary"
          open={openDrawer}
          onClose={toggleDrawer}
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              bgcolor: "primary.main",
              color: "white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <List>
            <Button onClick={() => setActiveTab("app1")}>
              <ListItemText primary="App 1" />
            </Button>
            <Button onClick={() => setActiveTab("app2")}>
              <ListItemText primary="App 2" />
            </Button>
          </List>
        </Drawer>

        {/* Main content */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                My Shell App
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Tab Navigation */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ bgcolor: "background.paper" }}
          >
            <Tab label="App 1" value="app1" />
            <Tab label="App 2" value="app2" />
            <Tab label="App 3" value="app3" />
          </Tabs>

          {/* Main Tab Content */}
          <Container sx={{ flexGrow: 1, padding: 3 }}>
            {activeTab === "app1" && (
              <React.Suspense fallback={<div>Loading App 1...</div>}>
                <App1 />
              </React.Suspense>
            )}
            {activeTab === "app2" && (
              <iframe
                src="http://localhost:3003"
                style={{ width: "100%", height: "600px", border: "none" }}
                title="App 2"
              />
            )}
            {activeTab === "app3" && <App3Tab />}
          </Container>

          {/* Footer */}
          <Box sx={{ padding: "10px", bgcolor: "background.paper" }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Footer content
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
