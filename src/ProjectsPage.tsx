import React from "react";
import {Container} from "@mui/material";
import FooterLinks from "./FooterLinks";

export default function ProjectsPage() {
  return (
    <Container className="fade-in-bottom" component="main" maxWidth="lg" sx={{
      display: "flex",
      my: 10,
      flexDirection: "column",
    }}>
      This is the projects page.
      <FooterLinks/>
    </Container>
  );
}
