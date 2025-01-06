import {
  AppBar,
  Container,
  Dialog,
  Divider,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useState} from "react";

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
  const [showsDialog, setShowsDialog] = useState(false);
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{
      backgroundColor: 'background.default',
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
          }}>
            <Link underline="none" href="#/">{displaysTitle ? "Wenhao Ji" : ""}</Link>
          </Typography>

          <Stack direction="row"
                 spacing={2}
                 divider={<Divider orientation="vertical" variant="middle" flexItem />}
                 sx={{
                   justifyContent: "right",
                   display: {
                     xs: 'none',
                     sm: 'flex',
                   },
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
                  color="textSecondary"
                >
                  {h.name}
                </Link>
              ))
            }
          </Stack>
          <IconButton
            size="large"
            edge="end"
            color="secondary"
            aria-label="menu"
            sx={{
              display: {
                xs: 'flex',
                sm: 'none',
              },
            }}
            onClick={() => setShowsDialog(true)}
          >
            <MenuIcon />
          </IconButton>
          <Dialog
            open={showsDialog}
            onClose={() => setShowsDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
              },
            }}
            sx={{
              backdropFilter: 'blur(2px)',
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              spacing={2}
              divider={<Divider orientation="horizontal" variant="middle" flexItem />}
              sx={{
                py: 6,
                px: 10,
              }}
            >
              {
                headerLinks.map((h, i) => (
                  <Link
                    key={i}
                    variant="button"
                    underline="none"
                    href={h.href}
                    color="textSecondary"
                    onClick={() => setShowsDialog(false)}
                    sx={{
                      py: 1,
                      px: 3,
                      display: 'block',
                      fontSize: '1.25rem',
                      fontWeight: 500,
                    }}
                  >
                    {h.name}
                  </Link>
                ))
              }
            </Stack>
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
}