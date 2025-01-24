// src/App.tsx

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import User from "./components/User"; // User.tsx
import Admin from "./components/Admin"; // Admin.tsx

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to My App 3
        <h5>
          This app does not use webpack but just react scripts to run the app.
        </h5>
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 200 }}>
            <CardActionArea onClick={() => navigate("/user")}>
              <CardContent>
                <Typography variant="h5" component="div">
                  User Section
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to view user data.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 200 }}>
            <CardActionArea onClick={() => navigate("/admin")}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Admin Section
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to view admin data.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
