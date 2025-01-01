import {AppBar, Container, Divider, Link, Stack, Toolbar, Typography} from "@mui/material";
import React from "react";

export default function HeaderBar({displaysTitle}: {
  displaysTitle?: boolean;
}) {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{
      backgroundColor: 'white',
      height: 72,
    }}>
      <Container maxWidth="xl">
        <Toolbar variant="regular" sx={{
          mt: 4,
        }}>
          <Typography variant="h6" color="primary" component="div" sx={{
            flexGrow: 1,
            fontWeight: 600,
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}>
            <Link underline="none" href="#/">{displaysTitle ? "Wenhao Ji" : ""}</Link>
          </Typography>

          <Stack direction="row"
                 spacing={2}
                 divider={<Divider orientation="vertical" variant="middle" flexItem />}
                 sx={{
                   justifyContent: "right",
                 }}
          >
            <Link variant="button" underline="none" href="#/">Home</Link>
            <Link variant="button" underline="none" href="#/projects">Projects</Link>
            <Link variant="button" underline="none" href="#/resume">Resume</Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}