import {Divider, IconButton, Stack, Theme, Tooltip} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import UnsplashIcon from "./UnsplashIcon";
import React from "react";
import {SxProps} from "@mui/system";

function IconButtonLink({ href, tooltip, children, sx }: {
  href: string;
  tooltip: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton color="secondary" href={href} target="_blank" rel="noopener" sx={sx}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

export default function FooterLinks() {
  return (
    <Stack direction="row"
           spacing={2}
           divider={<Divider orientation="vertical" variant="middle" flexItem />}
           sx={{
             mt: 10,
             justifyContent: "center",
           }}
    >
      <IconButtonLink href="https://github.com/predatorray" tooltip="GitHub" sx={{
        '&:hover svg': {
          color: '#1f2328',
        }
      }}>
        <GitHubIcon/>
      </IconButtonLink>
      <IconButtonLink href="https://www.linkedin.com/in/wenhaoji/" tooltip="LinkedIn" sx={{
        '&:hover svg': {
          color: '#0a66c2',
        }
      }}>
        <LinkedInIcon/>
      </IconButtonLink>
      <IconButtonLink href="https://unsplash.com/@zetaplusae" tooltip="Unsplash" sx={{
        '&:hover svg': {
          color: '#111111',
        }
      }}>
        <UnsplashIcon/>
      </IconButtonLink>
    </Stack>
  )
}