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
              md: 160,
            },
            width: {
              xs: 80,
              sm: 100,
              md: 160,
            },
            margin: '0 auto',
            display: {
              display: 'none',
              '@media screen and (min-height: 500px)': {
                display: 'flex',
              },
            },
          }}
        />
        <Typography variant="h2" color="primary" sx={{
          fontWeight: 900,
          textAlign: "center",
          my: 4,
          fontSize: {
            xs: '2rem',
            sm: '3.75rem',
          },
        }}>
          Wenhao Ji
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{
          textAlign: "left",
          maxWidth: 460,
          margin: "0 auto",
        }}>
          I'm a professional <b>Software Engineer</b> skilled in Web, Middleware and Big Data,
          and also an amateur <b>Photographer</b> and <b>Snowboarder</b>.
        </Typography>
      </Box>
      <FooterLinks/>
    </Container>
  );
}
