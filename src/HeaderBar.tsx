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
          mt: {
            sm: 2,
            md: 4,
          }
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
                <Link
                  key={i}
                  variant="button"
                  underline="none"
                  href={h.href}
                  sx={h.name === current ? { cursor: 'initial' } : {}}
                  color="textSecondary">
                  {h.name}
                </Link>
              ))
            }
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}