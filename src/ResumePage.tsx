import {Box, Button, Container, List, ListItem, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FooterLinks from "./FooterLinks";
import {ResponsiveTimeline, ResponsiveTimelineItem} from "./ResponsiveTimeline";
import SkillChip from "./SkillChip";

const experience = [
  {
    company: 'Amazon',
    location: 'Vancouver, BC, Canada',
    type: 'Full-time',
    tenure: '2 yrs',
    skills: [
      'Java',
      'Typescript',
      'React',
      'AWS',
      'Amazon Redshift',
      'Amazon OpenSearch',
    ],
    description: [
    ],
    positions: [
      {
        name: 'Software Development Engineer II',
        from: 'Aug 2022',
        to: 'Present',
      },
    ]
  },
  {
    company: 'eBay',
    location: 'Shanghai, China',
    type: 'Full-time',
    tenure: '3 yrs and 3 mos',
    skills: [
      'Java',
      'Kubernetes',
      'Prometheus',
      'Apache Kafka',
      'Apache Flink',
    ],
    description: [
      'Maintained and developed a streaming data platform that serves Kafka & Flink',
      'Drove the efficiency of on-call support',
      'Owned the Monitoring & Alerting system of the streaming data platform',
    ],
    positions: [
      {
        name: 'Member of Technical Staff 1, Software Engineer',
        from: 'Feb 2021',
        to: 'Jul 2022',
      },
      {
        name: 'Software Engineer 3',
        from: 'May 2019',
        to: 'Feb 2021'
      },
    ]
  },
  {
    company: 'Baidu',
    location: 'Shanghai, China',
    type: 'Full-time',
    tenure: '6 yrs',
    skills: [
      'Java',
      'Docker',
      'ElasticSearch',
      'Apache Kafka',
      'Apache Hadoop',
      'Apache Hive',
    ],
    description: [
      'Led the containerization refactoring of a large multi-module legacy system',
      'Responsible for designing and implementing major parts of a log collecting, tracing and analyzing system',
      'Assisted the development of Baidu Mall, and responsible for the infrastructure components to improve the efficiency of the development',
      'Played a major role in developing a data warehousing system for online advertising',
    ],
    positions: [
      {
        name: 'Senior Software Engineer T5',
        from: 'Mar 2017',
        to: 'May 2019'
      },
      {
        name: 'Senior Software Engineer T4',
        from: 'Mar 2015',
        to: 'Mar 2017'
      },
      {
        name: 'Software Engineer T3',
        from: 'Jul 2014',
        to: 'Mar 2015'
      },
    ]
  },
];

const education = [
  {
    institution: 'Southeast University',
    location: 'Nanjing, China',
    from: '2010',
    to: '2014',
    degree: 'Bachelor of Software Engineering',
  }
];

function ExpandOrCollapse({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return expanded ? (
    <>
      {children}
      <Button variant="text" size="small" sx={{ fontSize: 12, textDecoration: "underline", minWidth: 'initial', textTransform: 'none' }} onClick={() => setExpanded(false)}>less</Button>
    </>
  ) : (
    <Button variant="text" size="small" sx={{ fontSize: 12, textDecoration: "underline", minWidth: 'initial', textTransform: 'none' }} onClick={() => setExpanded(true)}>more</Button>
  )
}

export default function ResumePage() {
  return (
    <Container className="fade-in-bottom" component="main" maxWidth="lg" sx={{
      display: "flex",
      my: 10,
      flexDirection: "column",
    }}>
      <Typography variant="h5" sx={{ my: 5, textDecoration: 'underline', }}>Experience & Education</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          experience.map((e, i) => (
            <ListItem key={i}>
              <ResponsiveTimeline>
                <ResponsiveTimelineItem
                  oppositeContentProps={{ color: 'textPrimary' }}
                  oppositeContent={
                    <>
                      <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{e.positions[e.positions.length - 1].from}</Typography>
                        &nbsp;-&nbsp;
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
                      e.skills.map((skill, i) => (<SkillChip key={i} skill={skill} size="small" sx={{ fontSize: 10, mb: '8px !important' }} />))
                    }
                  </Stack>
                  <Box>
                  </Box>
                  {
                    e.description.length > 0 && (
                      <ExpandOrCollapse>
                        <Typography variant="body1" color="textPrimary" sx={{
                          my: 3,
                          '>ul': {
                            paddingInlineStart: 0,
                          },
                          fontSize: {
                            xs: 12,
                            sm: 14,
                          },
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
                          <Typography variant="overline">{p.from}</Typography> - <Typography variant="overline">{p.to}</Typography>
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
          education.map((e, i) => (
            <ListItem key={i}>
              <ResponsiveTimeline>
                <ResponsiveTimelineItem
                  key={i}
                  oppositeContentProps={{ color: 'textSecondary' }}
                  oppositeContent={
                    <>
                      <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{e.from}</Typography>
                      &nbsp;-&nbsp;
                      <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{e.to}</Typography>
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
      <Typography variant="h5" sx={{ my: 5, textDecoration: 'underline', }}>Skills</Typography>
      <Box>
        {
          Array.from(new Set(experience.flatMap(e => e.skills))).map((skill, i) => (
            <SkillChip key={i} skill={skill} sx={{ m: 1, fontWeight: 600 }} />
          ))
        }
      </Box>
      <FooterLinks/>
    </Container>
  );
}
