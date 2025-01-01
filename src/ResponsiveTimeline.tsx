import {TimelineOppositeContent, timelineOppositeContentClasses, TimelineOppositeContentProps} from "@mui/lab";
import Timeline from "@mui/lab/Timeline";
import React, {ReactNode} from "react";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem";

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
  const {
    sx: oppositeContentSx,
    ...otherOppositeContentProps
  } = oppositeContentProps ?? {};
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ pt: 2, ...oppositeContentSx }} {...otherOppositeContentProps}>
        {oppositeContent}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot>
          {timelineIcon}
        </TimelineDot>
        { !lastItem && <TimelineConnector /> }
      </TimelineSeparator>
      <TimelineContent>
        {children}
      </TimelineContent>
    </TimelineItem>
  );
}

export function ResponsiveTimeline({ children }: { children: ReactNode }) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: {
            xs: 1,
            sm: 0.6,
            md: 0.5,
            lg: 0.2,
          },
        },
      }}
    >
      {children}
    </Timeline>
  );
}
