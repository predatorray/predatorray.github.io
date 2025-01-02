import {Chip, ChipProps, Theme} from "@mui/material";
import {SxProps} from "@mui/system";
import React from "react";

export default function SkillChip({ skill, size, sx }: {
  skill: string;
  size?: ChipProps['size'];
  sx?: SxProps<Theme>;
}) {
  return (
    <Chip label={skill} variant="outlined" size={size} sx={{ fontFamily: 'monospace', ...sx }} />
  )
}
