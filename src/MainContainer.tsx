import {ReactNode} from "react";
import {Container} from "@mui/material";

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <Container className="fade-in-bottom" component="main" maxWidth="lg" sx={{
      display: "flex",
      my: {
        sx: 6,
        sm: 8,
        md: 10,
      },
      flexDirection: "column",
    }}>
      {children}
    </Container>
  )
}
