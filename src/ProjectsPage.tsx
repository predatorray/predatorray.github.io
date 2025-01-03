import React from "react";
import {Box, Link, Stack, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import FooterLinks from "./FooterLinks";
import {ResponsiveTimeline, ResponsiveTimelineItem} from "./ResponsiveTimeline";
import SkillChip from "./SkillChip";
import MainContainer from "./MainContainer";

const projects = [
  {
    name: 'mental-texas-holdem',
    type: 'Author',
    when: 'May 2024',
    href: 'https://github.com/predatorray/mental-texas-holdem',
    skills: [
      'Typescript',
      'React',
      'Cryptography',
      'RSA',
      'WebRTC',
      'Playwright',
    ],
    description: <>a mental poker implementation of Texas Hold'em</>,
  },
  {
    name: 'Apache Flink',
    type: 'Contributor',
    when: 'Sep 2022',
    href: null,
    skills: [
      'Apache Flink',
      'Apache Kafka',
      'Java',
    ],
    description: <>
      purposed
      <ul>
        <li>
          a new method in <code>FlinkKafkaProducer</code> to customize Kafka's <code>transactional.id</code> (see: <Link href="https://cwiki.apache.org/confluence/display/FLINK/FLIP-172:+Support+custom+transactional.id+prefix+in+FlinkKafkaProducer" target="_blank" rel="noopener">FLIP-172</Link>)
        </li>
        <li>
          changing log level at runtime (see: <Link href="https://cwiki.apache.org/confluence/display/FLINK/FLIP-210%3A+Change+logging+level+dynamically+at+runtime" target="_blank" rel="noopener">FLIP-210</Link>)
        </li>
      </ul>
      and also did some documentation and translations.
    </>,
  },
  {
    name: 'kubectl-alias',
    type: 'Author',
    when: 'Jul 2022',
    href: 'https://github.com/predatorray/kubectl-alias',
    skills: [
      'Bash',
      'Kubernetes',
    ],
    description: <>the missing alias command for <code>kubectl</code></>,
  },
  {
    name: 'Apache Kafka',
    type: 'Contributor',
    when: 'Feb 2022',
    skills: [
      'Apache Kafka',
      'Java',
    ],
    description: <>bug fix & documentation</>,
  },
  {
    name: 'kubectl-tmux-exec',
    type: 'Author',
    when: 'Mar 2020',
    href: 'https://github.com/predatorray/kubectl-tmux-exec',
    skills: [
      'Bash',
      'Kubernetes',
      'tmux',
    ],
    description: <>
      <p>a kubectl plugin to control multiple pods simultaneously using <code>tmux</code></p>
      <p>6.9K+ downloads, 130+ stars</p>
    </>,
  },
];

export default function ProjectsPage() {
  return (
    <MainContainer>
      <ResponsiveTimeline>
        {
          projects.map((p, i) => (
            <ResponsiveTimelineItem
              key={i}
              timelineIcon={<GitHubIcon/>}
              lastItem={i === projects.length - 1}
              oppositeContent={
                <Typography variant="overline" color="textPrimary" sx={{ fontWeight: 800 }}>{p.when}</Typography>
              }
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  {p.href ? <Link href={p.href} target="_blank" rel="noopener">{p.name}</Link> : p.name}
                </Typography>
                <Typography variant="body2" color="textPrimary">{p.type}</Typography>
                <Typography variant="body1" color="textPrimary" sx={{
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
      <FooterLinks/>
    </MainContainer>
  );
}
