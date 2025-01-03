import {AppBar, Container, Divider, Link, Stack, Toolbar, Typography} from "@mui/material";
import React from "react";

export type HeaderName =
  | 'Home'
  | 'Resume'
  | 'Projects'
  | 'Contact'
  ;

const headerLinks: {
  name: HeaderName;
  href: string;
}[] = [
  {
    name: 'Home',
    href: '#/',
  },
  {
    name: 'Projects',
    href: '#/projects',
  },
  {
    name: 'Resume',
    href: '#/resume',
  },
  {
    name: 'Contact',
    href: '#/contact',
  }
];

export default function HeaderBar({ displaysTitle, current }: {
  displaysTitle?: boolean;
  current?: HeaderName;
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
            {
              headerLinks.map((h, i) => (
                h.name === current ? (
                  <Link key={i} variant="button" underline="none" href={h.href} sx={{ cursor: 'initial' }} color="textSecondary">{h.name}</Link>
                ) : (
                  <Link key={i} variant="button" underline="hover" href={h.href}>{h.name}</Link>
                )
              ))
            }
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}