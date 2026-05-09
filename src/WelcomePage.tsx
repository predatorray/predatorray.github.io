import {Avatar, Box, Container, Typography} from "@mui/material";
import React, {useState} from "react";
import FooterLinks from "./FooterLinks";

const EASTER_EGGS = [
  {
    id: 'photographer' as const,
    label: 'Photographer',
    src: 'https://images.unsplash.com/profile-1545664874401-d1a2b3abeb31?w=150&dpr=2&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  },
  {
    id: 'snowboarder' as const,
    label: 'Snowboarder',
    src: '/jiwenhao-snowboarder.jpg',
  },
] as const;

type EggId = typeof EASTER_EGGS[number]['id'];

function EasterEggAvatar({src, alt, active, anyActive}: {
  src: string;
  alt: string;
  active: boolean;
  anyActive: boolean;
}) {
  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: active ? 1 : 0,
        transition: anyActive ? 'none' : 'opacity 1s ease 1.5s',
        zIndex: active ? 2 : 1,
      }}
    />
  );
}

export default function WelcomePage() {
  const [activeEgg, setActiveEgg] = useState<EggId | null>(null);

  return (
    <Container className="fade-in" component="main" maxWidth="lg" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: 'calc(100vh - 72px)',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        mx: 5,
      }}>
        <Box sx={{
          position: 'relative',
          height: {xs: 80, sm: 100, md: 140},
          width: {xs: 80, sm: 100, md: 140},
          margin: '0 auto',
          display: {
            xs: 'none',
            '@media screen and (min-height: 500px)': {display: 'flex'},
          },
        }}>
          <Avatar
            alt="Wenhao Ji"
            src="https://avatars.githubusercontent.com/u/1633376"
            sx={{position: 'absolute', height: '100%', width: '100%'}}
          />
          {EASTER_EGGS.map(egg => (
            <EasterEggAvatar
              key={egg.id}
              src={egg.src}
              alt={`Wenhao Ji (${egg.label})`}
              active={activeEgg === egg.id}
              anyActive={activeEgg !== null}
            />
          ))}
        </Box>
        <Typography variant="h2" color="primary" sx={{
          fontWeight: 700,
          textAlign: "center",
          mt: 4,
          mb: 1.5,
          fontSize: {
            xs: '2rem',
            sm: '3rem',
            md: '3.5rem',
          },
          letterSpacing: '-0.01em',
        }}>
          Wenhao Ji
        </Typography>
        <Typography variant="caption" color="textSecondary" sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: 200,
          fontSize: {
            xs: '0.85rem',
            sm: '1rem',
          },
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Software Engineer |{" "}
          {EASTER_EGGS.map((egg, i) => (
            <React.Fragment key={egg.id}>
              <span
                onMouseEnter={() => setActiveEgg(egg.id)}
                onMouseLeave={() => setActiveEgg(null)}
                style={{cursor: "default"}}
              >
                {egg.label}
              </span>
              {i < EASTER_EGGS.length - 1 && ' | '}
            </React.Fragment>
          ))}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{
          textAlign: "center",
          maxWidth: 540,
          margin: "0 auto",
          lineHeight: 1.8,
          fontSize: '1rem',
          opacity: 0.9,
        }}>
          Passionate about building scalable <b>Web</b> architectures, robust <b>Middleware</b>,
          and high-performance <b>Big Data</b> solutions. I strive for excellence in code
          and find inspiration through the lens of my camera and on the snowy slopes.
        </Typography>
      </Box>
      <FooterLinks/>
    </Container>
  );
}
