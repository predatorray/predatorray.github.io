import {Divider, IconButton, Stack, Tooltip} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import UnsplashIcon from "./UnsplashIcon";
import React from "react";

function IconButtonLink({ href, tooltip, children }: {
  href: string;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton color="secondary" href={href} target="_blank" rel="noopener">
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
      <IconButtonLink href="https://github.com/predatorray" tooltip="GitHub">
        <GitHubIcon/>
      </IconButtonLink>
      <IconButtonLink href="https://www.linkedin.com/in/wenhaoji/" tooltip="LinkedIn">
        <LinkedInIcon/>
      </IconButtonLink>
      <IconButtonLink href="https://unsplash.com/@zetaplusae" tooltip="Unsplash">
        <UnsplashIcon/>
      </IconButtonLink>
    </Stack>
  )
}