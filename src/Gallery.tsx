import MainContainer from "./MainContainer";
import {ImageList, ImageListItem, ImageListItemBar, useMediaQuery, useTheme} from "@mui/material";
import {Photos} from "./constants";

export default function Gallery() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('lg'));
  const isUpSm = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <MainContainer maxWidth='xl'>
      <ImageList variant="masonry" cols={isUpSm ? (isUpMd ? 3 : 2) : 1} gap={isUpSm ? 10 : 20}>
        {
          Photos.map((photo, i) => (
            <ImageListItem sx={{
              backgroundColor: '#000',
              '&:hover': {
                cursor: 'pointer',
              },
              '&:hover img': {
                filter: 'opacity(90%)',
              },
              '&:hover .MuiImageListItemBar-root': {
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ' +
                  'rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)',
                display: 'initial',
              },
            }} key={i} onClick={() => {
              window.open(photo.link,'_blank');
            }}>
              <img
                src={photo.src}
                alt={photo.description}
                loading="lazy"
              />
              <ImageListItemBar
                title={photo.description}
                position="top"
                sx={{
                  background: 'rgba(0,0,0,0) 100%',
                  display: 'none',
                }}
              />
            </ImageListItem>
          ))
        }
      </ImageList>
    </MainContainer>
  )
}
