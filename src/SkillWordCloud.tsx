import {Box, Typography} from "@mui/material";
import React from "react";
import SkillChip from "./SkillChip";

interface SkillItem {
  skills: string[];
}

interface SkillWordCloudProps {
  items: SkillItem[];
  title?: string;
}

export default function SkillWordCloud({ items, title = "Skills & Expertise" }: SkillWordCloudProps) {
  const skillsCounts = new Map<string, number>();
  items.forEach(item => {
    item.skills.forEach(skill => {
      skillsCounts.set(skill, (skillsCounts.get(skill) || 0) + 1);
    });
  });

  const maxCount = Math.max(...Array.from(skillsCounts.values()));
  const sortedEntries = Array.from(skillsCounts.entries())
    .sort(([, a], [, b]) => b - a); // Sort by count descending

  const cloudEntries: [string, number][] = [];
  sortedEntries.forEach((entry, idx) => {
    if (idx % 2 === 0) {
      cloudEntries.push(entry);
    } else {
      cloudEntries.unshift(entry);
    }
  });

  const getHash = (s: string) => {
    let hash = 0;
    for (let j = 0; j < s.length; j++) {
      hash = (hash << 5) - hash + s.charCodeAt(j);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  return (
    <Box sx={{
      mt: 4,
      mb: 2,
      textAlign: 'center'
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem', color: 'text.secondary' }}>
        {title}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        gap: { xs: 0.5, sm: 1 }, // Reduced gap to allow margins to take over
        width: '100%',
        maxWidth: '700px', // Slightly reduced maxWidth to encourage more "bulge"
        mx: 'auto',
        p: { xs: 1, sm: 2 },
        position: 'relative'
      }}>
        {cloudEntries.map(([skill, count], i) => {
          const relativeSize = count / maxCount;
          const fontSize = 0.8 + (relativeSize * 0.4); // From 0.8rem to 1.2rem
          const fontWeight = 400 + Math.floor(relativeSize * 3) * 100; // From 400 to 700
          const opacity = 0.7 + (relativeSize * 0.3); // From 0.7 to 1.0

          // Deterministic "random" offset and scale to break the grid
          const hash = getHash(skill);
          const marginVariation = (hash % 10) / 10; // 0 to 0.9
          const rotateVariation = (hash % 6) - 3; // -3 to 3 degrees
          const scaleVariation = 0.95 + (hash % 11) / 100; // 0.95 to 1.05

          return (
            <SkillChip
              key={i}
              skill={skill}
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                m: `${marginVariation * 8}px !important`, // Varied margin to break rectangle
                fontSize: { xs: `${fontSize * 0.8}rem`, sm: `${fontSize}rem` },
                fontWeight: fontWeight,
                opacity: opacity,
                transform: `rotate(${rotateVariation}deg) scale(${scaleVariation})`,
                bgcolor: 'background.paper',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease-out',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  transform: 'scale(1.1) rotate(0deg)',
                  zIndex: 10,
                  opacity: 1
                }
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
