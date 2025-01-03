import {Container} from "@mui/material";
import FooterLinks from "./FooterLinks";
import React from "react";

export default function ContactPage() {
  return (
    <Container className="fade-in-bottom" component="main" maxWidth="lg" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: 'calc(100vh - 72px)',
      '&': {
        '.MuiStack-root': {
          mt: 0,
        },
        '.MuiStack-root > *': {
          xs: {
            marginLeft: 8,
            marginRight: 8,
          },
          sm: {
            marginLeft: 12,
            marginRight: 12,
          },
        },
        'svg': {
          sm: {
            width: 40,
            height: 40,
          },
          md: {
            width: 50,
            height: 50,
          },
        },
      },
    }}>
      <FooterLinks/>
    </Container>
  )
}
