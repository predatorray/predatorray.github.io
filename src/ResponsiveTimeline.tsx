import {TimelineOppositeContent, timelineOppositeContentClasses, TimelineOppositeContentProps} from "@mui/lab";
import Timeline from "@mui/lab/Timeline";
import React, {ReactNode} from "react";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem";
import {useMediaQuery, useTheme} from "@mui/material";

export function ResponsiveTimelineItem(
  {
    children,
    oppositeContentProps,
    oppositeContent,
    timelineIcon,
    lastItem,
  }: {
    children: ReactNode;
    oppositeContentProps?: TimelineOppositeContentProps;
    oppositeContent?: ReactNode;
    timelineIcon?: ReactNode;
    lastItem?: boolean;
  }
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    sx: oppositeContentSx,
    ...otherOppositeContentProps
  } = oppositeContentProps ?? {};

  if (isMobile) {
    return (
      <TimelineItem sx={{ minHeight: 'auto', flexDirection: 'column' }}>
        <TimelineOppositeContent
          sx={{
            textAlign: 'left',
            pt: 2,
            pb: 0,
            pl: 0,
            mb: 0.5,
            ...oppositeContentSx,
          }}
          {...otherOppositeContentProps}
        >
          {oppositeContent}
        </TimelineOppositeContent>
        <div style={{ display: 'flex', width: '100%' }}>
          <TimelineSeparator sx={{ display: 'none' }}>
            <TimelineDot />
            { !lastItem && <TimelineConnector /> }
          </TimelineSeparator>
          <TimelineContent sx={{ pl: 0, pb: 0, width: '100%' }}>
            {children}
          </TimelineContent>
        </div>
      </TimelineItem>
    );
  }

  return (
    <TimelineItem sx={{ minHeight: 120 }}>
      <TimelineOppositeContent
        sx={{
          pt: 4.5,
          ...oppositeContentSx,
          minWidth: 70,
        }}
        {...otherOppositeContentProps}
      >
        {oppositeContent}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary" sx={{
          p: 1.5,
          my: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            color: 'text.primary',
          }
        }}>
          {timelineIcon}
        </TimelineDot>
        { !lastItem && <TimelineConnector sx={{ bgcolor: 'divider' }} /> }
      </TimelineSeparator>
      <TimelineContent sx={{ minWidth: 160, pb: 0 }}>
        {children}
      </TimelineContent>
    </TimelineItem>
  );
}

export function ResponsiveTimeline({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Timeline
      sx={{
        p: isMobile ? 0 : undefined,
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: {
            xs: isMobile ? 'none' : 0,
            sm: 0.2,
          },
        },
      }}
    >
      {children}
    </Timeline>
  );
}
