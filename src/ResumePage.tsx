import {Box, Button, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FooterLinks from "./FooterLinks";
import {ResponsiveTimeline, ResponsiveTimelineItem} from "./ResponsiveTimeline";
import SkillChip from "./SkillChip";
import SkillWordCloud from "./SkillWordCloud";
import MainContainer from "./MainContainer";
import {Education, Experience, Projects} from "./constants";

function ExpandOrCollapse({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const maxHeight = '8rem'; // Roughly 5 lines of text (5 * 1.6)

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{
        maxHeight: expanded ? 'none' : maxHeight,
        overflow: 'hidden',
        position: 'relative',
        transition: 'max-height 0.3s ease-in-out',
        ...( !expanded && {
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        })
      }}>
        {children}
      </Box>
      <Button
        variant="text"
        size="small"
        sx={{
          fontSize: '0.75rem',
          textDecoration: "underline",
          minWidth: 'initial',
          textTransform: 'none',
          mt: 0.5,
          p: 0,
          '&:hover': {
            background: 'transparent',
            textDecoration: "underline",
          }
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'less' : 'more'}
      </Button>
    </Box>
  );
}

export default function ResumePage() {
  return (
    <MainContainer>
      <ResponsiveTimeline>
        {
          Experience.map((e, i) => (
            <ResponsiveTimelineItem
              key={i}
              oppositeContentProps={{ color: 'textSecondary' }}
              oppositeContent={
                <Typography variant="overline" color="textSecondary" sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em'
                }}>
                  {e.positions[0].to}
                </Typography>
              }
              timelineIcon={<WorkIcon/>}
            >
              <Box sx={{
                position: 'relative',
                mb: 6,
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }
              }}>
                <Typography variant="caption" color="textSecondary" sx={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center'
                }}>
                  <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                  {e.location}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{e.company}</Typography>
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500, mb: 1 }}>
                  {e.type} &middot; {e.tenure}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
                  {e.location}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  {
                    e.skills.map((skill, i) => (
                      <SkillChip
                        key={i}
                        skill={skill}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          bgcolor: 'rgba(0,0,0,0.04)',
                          border: 'none',
                          fontWeight: 500,
                          m: '0 !important'
                        }}
                      />
                    ))
                  }
                </Stack>
                {
                  e.description.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <ExpandOrCollapse>
                        <Typography variant="body2" component="div" color="textSecondary" sx={{
                          my: 2,
                          lineHeight: 1.7,
                          fontSize: '0.95rem',
                          '& ul': {
                            pl: 2,
                            mt: 1,
                            mb: 0,
                            listStyleType: 'disc',
                          },
                          '& li': {
                            lineHeight: 1.5,
                          },
                        }}>
                          <ul>
                            {e.description.map((d, i) => (<li key={i}>{d}</li>))}
                          </ul>
                        </Typography>
                      </ExpandOrCollapse>
                    </Box>
                  )
                }
                <Box sx={{
                  mt: 2,
                  pt: 2,
                  borderTop: '1px dashed',
                  borderColor: 'divider'
                }}>
                  {
                    e.positions.map((p, i) => (
                      <Box key={i} sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        mb: i === e.positions.length - 1 ? 0 : 1
                      }}>
                        <WorkspacesIcon sx={{ fontSize: '0.9rem', color: 'secondary.main', mr: 1, verticalAlign: 'middle' }} />
                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 550, flexGrow: 1 }}>{p.name}</Typography>
                        <Typography variant="caption" color="secondary" sx={{ ml: 1, whiteSpace: 'nowrap' }}>{p.from} - {p.to}</Typography>
                      </Box>
                    ))
                  }
                </Box>
              </Box>
            </ResponsiveTimelineItem>
          ))
        }
        {
          Education.map((e, i) => (
            <ResponsiveTimelineItem
              key={i}
              oppositeContentProps={{ color: 'textSecondary' }}
              oppositeContent={
                <Typography variant="overline" color="textSecondary" sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em'
                }}>
                  {e.from} - {e.to}
                </Typography>
              }
              timelineIcon={<SchoolIcon/>}
              lastItem={i === Education.length - 1}
            >
              <Box sx={{
                position: 'relative',
                mb: 6,
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }
              }}>
                <Typography variant="caption" color="textSecondary" sx={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center'
                }}>
                  <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                  {e.location}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{e.institution}</Typography>
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500, mb: 1 }}>{e.degree}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
                  {e.location}
                </Typography>
              </Box>
            </ResponsiveTimelineItem>
          ))
        }
      </ResponsiveTimeline>
      <SkillWordCloud items={[...Experience, ...Projects]} />
      <FooterLinks/>
    </MainContainer>
  );
}
