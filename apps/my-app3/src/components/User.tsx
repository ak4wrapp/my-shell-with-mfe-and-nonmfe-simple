// src/User.tsx

import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Section
      </Typography>
      <Box>
        <Typography variant="body1" paragraph>
          Here, you would display user-related data.
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

export default User;
