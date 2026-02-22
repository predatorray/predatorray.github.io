import React, {useEffect, useState} from "react";
import {Box, Link, Stack, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import GetAppIcon from '@mui/icons-material/GetApp';
import FooterLinks from "./FooterLinks";
import {ResponsiveTimeline, ResponsiveTimelineItem} from "./ResponsiveTimeline";
import SkillChip from "./SkillChip";
import SkillWordCloud from "./SkillWordCloud";
import MainContainer from "./MainContainer";
import {Projects} from "./constants";

export default function ProjectsPage() {
  const [stars, setStars] = useState<{ [key: string]: number }>({});
  const [downloads, setDownloads] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchStats = async () => {
      const projectsToFetch = Projects.filter(p =>
        p.href && p.href.includes("github.com") &&
        p.type === 'Author'
      );

      for (const p of projectsToFetch) {
        if (!p.href) continue;
        const match = p.href.match(/github\.com\/([^/]+\/[^/]+)/);
        if (match) {
          const repo = match[1];
          try {
            const repoResponse = await fetch(`https://api.github.com/repos/${repo}`);
            if (repoResponse.ok) {
              const data = await repoResponse.json();
              setStars(prev => ({ ...prev, [p.name]: data.stargazers_count }));
            }

            const releasesResponse = await fetch(`https://api.github.com/repos/${repo}/releases`);
            if (releasesResponse.ok) {
              const releases = await releasesResponse.json();
              let totalDownloads = 0;
              for (const release of releases) {
                if (release.assets) {
                  for (const asset of release.assets) {
                    totalDownloads += asset.download_count;
                  }
                }
              }
              if (totalDownloads > 0) {
                setDownloads(prev => ({ ...prev, [p.name]: totalDownloads }));
              }
            }
          } catch (error) {
            console.error(`Failed to fetch stats for ${p.name}:`, error);
          }
        }
      }
    };

    fetchStats();
  }, []);

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
                <Typography variant="overline" color="textSecondary" sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em'
                }}>
                  {p.when}
                </Typography>
              }
            >
                <Box sx={{
                  mb: 6,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }
                }}>
                  {(stars[p.name] !== undefined || downloads[p.name] !== undefined) && (
                    <Box sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'text.secondary',
                    }}>
                      {downloads[p.name] > 1000 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <GetAppIcon sx={{ fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                            {downloads[p.name] >= 1000 ? `${(downloads[p.name] / 1000).toFixed(1)}k` : downloads[p.name]}
                          </Typography>
                        </Box>
                      )}
                      {stars[p.name] > 20 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                            {stars[p.name]}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, pr: (stars[p.name] !== undefined || downloads[p.name] !== undefined) ? 12 : 0 }}>
                    {p.href ? <Link href={p.href} target="_blank" rel="noopener" color="primary" underline="hover">{p.name}</Link> : p.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500, mb: 2, pr: (stars[p.name] !== undefined || downloads[p.name] !== undefined) ? 12 : 0 }}>{p.type}</Typography>
                  <Typography variant="body2" color="textSecondary" component="div" sx={{
                    mb: 3,
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    '& ul': {
                      pl: 2,
                      mt: 1,
                      mb: 0,
                      listStyleType: 'disc',
                    },
                    '& li': {
                      mb: 1,
                      lineHeight: 1.5,
                    }
                  }}>{p.description}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 'auto', flexWrap: 'wrap', gap: 1 }}>
                    {
                      p.skills.map((skill, i) => (
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
                </Box>
            </ResponsiveTimelineItem>
          ))
        }
      </ResponsiveTimeline>
      <SkillWordCloud items={Projects} title="Technologies & Tools" />
      <FooterLinks/>
    </MainContainer>
  );
}
