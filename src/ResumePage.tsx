import {Box, Button, List, ListItem, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FooterLinks from "./FooterLinks";
import {ResponsiveTimeline, ResponsiveTimelineItem} from "./ResponsiveTimeline";
import SkillChip from "./SkillChip";
import MainContainer from "./MainContainer";
import {Education, Experience} from "./constants";

function ExpandOrCollapse({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return expanded ? (
    <>
      {children}
      <Button variant="text" size="small" sx={{ fontSize: '0.75rem', textDecoration: "underline", minWidth: 'initial', textTransform: 'none' }} onClick={() => setExpanded(false)}>less</Button>
    </>
  ) : (
    <Button variant="text" size="small" sx={{ fontSize: '0.75rem', textDecoration: "underline", minWidth: 'initial', textTransform: 'none' }} onClick={() => setExpanded(true)}>more</Button>
  )
}

export default function ResumePage() {
  return (
    <MainContainer>
      <List sx={{ width: '100%' }}>
        {
          Experience.map((e, i) => (
            <ListItem key={i}>
              <ResponsiveTimeline>
                <ResponsiveTimelineItem
                  oppositeContentProps={{ color: 'textPrimary' }}
                  oppositeContent={
                    <>
                      <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{e.positions[0].to}</Typography>
                    </>
                  }
                  timelineIcon={<WorkIcon/>}
                >
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>{e.company}</Typography>
                  <Typography variant="body2" color="textPrimary">{e.type} &middot; {e.tenure}</Typography>
                  <Typography variant="body2" color="textPrimary">{e.location}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                    {
                      e.skills.map((skill, i) => (<SkillChip key={i} skill={skill} size="small" sx={{ fontSize: '0.625rem', mb: '8px !important' }} />))
                    }
                  </Stack>
                  <Box>
                  </Box>
                  {
                    e.description.length > 0 && (
                      <ExpandOrCollapse>
                        <Typography variant="body1" component="div" color="textPrimary" sx={{
                          my: 3,
                          '>ul': {
                            paddingInlineStart: 0,
                          },
                          fontSize: '0.875rem',
                        }}>
                            <ul>
                              {e.description.map((d, i) => (<li key={i}>{d}</li>))}
                            </ul>
                        </Typography>
                      </ExpandOrCollapse>
                    )
                  }
                </ResponsiveTimelineItem>
                {
                  e.positions.map((p, i) => (
                    <ResponsiveTimelineItem
                      key={i}
                      oppositeContentProps={{ color: 'textSecondary' }}
                      oppositeContent={
                        <>
                          <Typography variant="overline" sx={{ display: 'inline-block' }}>{p.from}</Typography>
                        </>
                      }
                      timelineIcon={<NavigateNextIcon/>}
                    >
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>{p.name}</Typography>
                    </ResponsiveTimelineItem>
                  ))
                }
              </ResponsiveTimeline>
            </ListItem>
          ))
        }
        {
          Education.map((e, i) => (
            <ListItem key={i}>
              <ResponsiveTimeline>
                <ResponsiveTimelineItem
                  key={i}
                  oppositeContentProps={{ color: 'textSecondary' }}
                  oppositeContent={
                    <>
                      <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{e.from} - {e.to}</Typography>
                    </>
                  }
                  timelineIcon={<SchoolIcon/>}
                  lastItem={true}
                >
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>{e.institution}</Typography>
                  <Typography variant="body2" color="textSecondary">{e.degree}</Typography>
                  <Typography variant="body2" color="textSecondary">{e.location}</Typography>
                </ResponsiveTimelineItem>
              </ResponsiveTimeline>
            </ListItem>
          ))
        }
      </List>
      <Box sx={{ my: 5 }}>
        {
          Array.from(new Set(Experience.flatMap(e => e.skills))).map((skill, i) => (
            <SkillChip key={i} skill={skill} sx={{ m: 0.5, fontWeight: 600 }} />
          ))
        }
      </Box>
      <FooterLinks/>
    </MainContainer>
  );
}
