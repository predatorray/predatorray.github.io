import {ReactNode} from "react";
import {Container} from "@mui/material";
import {Breakpoint} from "@mui/system";

export default function MainContainer({ children, maxWidth }: { children: ReactNode, maxWidth?: Breakpoint }) {
  return (
    <Container className="fade-in-bottom" component="main" maxWidth={maxWidth ?? 'lg'} sx={{
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
