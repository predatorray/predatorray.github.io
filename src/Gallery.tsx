import MainContainer from "./MainContainer";
import {
  Dialog,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {Photos} from "./constants";
import {useState} from "react";

function PhotoDialog({photoId, onClose}: {photoId?: number, onClose: () => void}) {
  return (
    <Dialog
      open={photoId !== undefined}
      onClick={onClose}
      onClose={onClose}
      maxWidth="xl"
      sx={{
        backdropFilter: 'blur(2px)',
        cursor: 'zoom-out',
      }}
    >
      {
        photoId !== undefined && (
          <>
            <img
              src={Photos[photoId].fullSrc}
              alt={Photos[photoId].description}
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

  const [indexOfPhotoZoomedIn, setIndexOfPhotoZoomedIn] = useState<number>();

  return (
    <MainContainer maxWidth="xl" animation="FadeIn">
      <PhotoDialog photoId={indexOfPhotoZoomedIn} onClose={() => setIndexOfPhotoZoomedIn(undefined)}/>
      <ImageList variant="masonry" cols={isUpSm ? (isUpMd ? 3 : 2) : 1} gap={isUpSm ? 10 : 20}>
        {
          Photos.map((photo, i) => (
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
            }} key={i} onClick={() => {
              setIndexOfPhotoZoomedIn(i);
            }}>
              <img
                src={photo.regularSrc}
                alt={photo.description}
                loading="lazy"
              />
              <ImageListItemBar
                title={photo.description}
                position="top"
                sx={{
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
