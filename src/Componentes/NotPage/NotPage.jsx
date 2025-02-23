import React from 'react';
import IconButton from "@mui/material/IconButton";
import CottageIcon from "@mui/icons-material/Cottage";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import "./notpage.css";
import error from "../../assets/004.jpg";
import Typography from "@mui/material/Typography";

const NotPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ background: "white", display: 'flex', justifyContent: "center", height: '100vh' }}>
      <img src={error} alt="Error" className='notfound' />
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ position: 'absolute', zIndex: 30, color: '#473af8' }}
        onClick={() => navigate(`/`)}
      >
        <CottageIcon />
        <Typography variant="h7" padding={"0 15px"} >
          Back to home
        </Typography>

      </IconButton>

    </Box>
  )

};

export default NotPage;