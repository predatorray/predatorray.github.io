import {Avatar, Box, Container, Typography} from "@mui/material";
import React from "react";
import FooterLinks from "./FooterLinks";

export default function WelcomePage() {
  return (
    <Container className="fade-in" component="main" maxWidth="lg" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: 'calc(100vh - 72px)',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        mx: 5,
      }}>
        <Avatar
          alt="Wenhao Ji"
          src="https://avatars.githubusercontent.com/u/1633376"
          sx={{
            height: {
              xs: 80,
              sm: 100,
              md: 140,
            },
            width: {
              xs: 80,
              sm: 100,
              md: 140,
            },
            margin: '0 auto',
            display: {
              xs: 'none',
              '@media screen and (min-height: 500px)': {
                display: 'flex',
              },
            },
          }}
        />
        <Typography variant="h2" color="primary" sx={{
          fontWeight: 700,
          textAlign: "center",
          mt: 4,
          mb: 1.5,
          fontSize: {
            xs: '2rem',
            sm: '3rem',
            md: '3.5rem',
          },
          letterSpacing: '-0.01em',
        }}>
          Wenhao Ji
        </Typography>
        <Typography variant="caption" color="textSecondary" sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: 200,
          fontSize: {
            xs: '0.85rem',
            sm: '1rem',
          },
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Software Engineer | Photographer | Snowboarder
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{
          textAlign: "center",
          maxWidth: 540,
          margin: "0 auto",
          lineHeight: 1.8,
          fontSize: '1rem',
          opacity: 0.9,
        }}>
          Passionate about building scalable <b>Web</b> architectures, robust <b>Middleware</b>, 
          and high-performance <b>Big Data</b> solutions. I strive for excellence in code 
          and find inspiration through the lens of my camera and on the snowy slopes.
        </Typography>
      </Box>
      <FooterLinks/>
    </Container>
  );
}
