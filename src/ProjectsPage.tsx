import React from "react";
import {Box, Link, Stack, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import FooterLinks from "./FooterLinks";
import {ResponsiveTimeline, ResponsiveTimelineItem} from "./ResponsiveTimeline";
import SkillChip from "./SkillChip";
import MainContainer from "./MainContainer";
import {Projects} from "./constants";

export default function ProjectsPage() {
  return (
    <MainContainer>
      <ResponsiveTimeline>
        {
          Projects.map((p, i) => (
            <ResponsiveTimelineItem
              key={i}
              timelineIcon={<GitHubIcon/>}
              lastItem={i === Projects.length - 1}
              oppositeContent={
                <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{p.when}</Typography>
              }
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  {p.href ? <Link href={p.href} target="_blank" rel="noopener">{p.name}</Link> : p.name}
                </Typography>
                <Typography variant="body2" color="textPrimary">{p.type}</Typography>
                <Typography variant="body1" color="textPrimary" component="div" sx={{
                  my: 2,
                  fontSize: {
                    xs: 12,
                    sm: 14,
                  },
                }}>{p.description}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                  {
                    p.skills.map((skill, i) => (<SkillChip key={i} skill={skill} size="small" sx={{ fontSize: 10, mb: '8px !important' }} />))
                  }
                </Stack>
              </Box>
            </ResponsiveTimelineItem>
          ))
        }
      </ResponsiveTimeline>
      <Box sx={{ my: 5 }}>
        {
          Array.from(new Set(Projects.flatMap(p => p.skills))).map((skill, i) => (
            <SkillChip key={i} skill={skill} sx={{ m: 0.5, fontWeight: 600 }} />
          ))
        }
      </Box>
      <FooterLinks/>
    </MainContainer>
  );
}
