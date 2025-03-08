import MainContainer from "./MainContainer";
import {
  Dialog,
  ImageList,
  ImageListItem,
  ImageListItemBar, Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {Photo, Photos} from "./constants";
import {Fragment, useState} from "react";

function PhotoDialog({photo, onClose}: {photo?: Photo, onClose: () => void}) {
  return (
    <Dialog
      open={photo !== undefined}
      onClick={onClose}
      onClose={onClose}
      maxWidth="xl"
      sx={{
        backdropFilter: 'blur(2px)',
        cursor: 'zoom-out',
      }}
    >
      {
        photo !== undefined && (
          <>
            <img
              src={photo.fullSrc}
              alt={photo.description}
              loading="lazy"
            />
          </>
        )
      }
    </Dialog>
  )
}

export default function Gallery() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('lg'));
  const isUpSm = useMediaQuery(theme.breakpoints.up('md'));

  const [photoZoomedIn, setPhotoZoomedIn] = useState<Photo>();

  return (
    <MainContainer maxWidth="xl" animation="FadeIn">
      <PhotoDialog photo={photoZoomedIn} onClose={() => setPhotoZoomedIn(undefined)}/>
      {
        Photos.map((section, sectionId) => (
          <Fragment key={sectionId}>
            <Typography variant="overline" color="secondary" component="div" sx={{ mt: 5 }}>{section.section}</Typography>
            <ImageList variant="masonry" cols={isUpSm ? (isUpMd ? 3 : 2) : 1} gap={isUpSm ? 10 : 20}>
              {
                section.photos.map((photo, photoId) => (
                  <ImageListItem sx={{
                    backgroundColor: '#000',
                    cursor: 'zoom-in',
                    '&:hover img': {
                      filter: 'opacity(90%)',
                    },
                    '&:hover .MuiImageListItemBar-root': {
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.3) 20%, ' +
                        'rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
                      display: 'initial',
                    },
                  }} key={photoId} onClick={() => {
                    setPhotoZoomedIn(photo);
                  }}>
                    <img
                      src={photo.regularSrc}
                      alt={photo.description}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={<Typography variant="subtitle2">{photo.description}</Typography>}
                      position="top"
                      sx={{
                        display: 'none',
                      }}
                    />
                  </ImageListItem>
                ))
              }
            </ImageList>
          </Fragment>
        ))
      }
    </MainContainer>
  )
}
