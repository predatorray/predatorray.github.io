import {ReactNode} from "react";
import {Container} from "@mui/material";
import {Breakpoint} from "@mui/system";

export type Animation = 'FadeIn' | 'FadeInFromBottom';

const ClassNamesPerAnimation: {[animation in Animation]: string} = {
  'FadeIn': 'fade-in',
  'FadeInFromBottom': 'fade-in-bottom',
};

export default function MainContainer({ children, maxWidth, animation }: { children: ReactNode, maxWidth?: Breakpoint, animation?: Animation }) {
  return (
    <Container className={animation ? ClassNamesPerAnimation[animation] : "fade-in-bottom"} component="main" maxWidth={maxWidth ?? 'lg'} sx={{
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
