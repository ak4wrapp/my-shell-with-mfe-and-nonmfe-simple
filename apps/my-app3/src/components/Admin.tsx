// src/Admin.tsx

import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Section
      </Typography>
      <Box>
        <Typography variant="body1" paragraph>
          Here, you would display admin-related data.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ marginTop: 2 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default Admin;
