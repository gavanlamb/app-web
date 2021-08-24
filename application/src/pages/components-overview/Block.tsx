import { ReactNode } from 'react';
// material
import { Theme } from '@material-ui/core/styles';
import { Card, CardHeader, Box, Typography } from '@material-ui/core';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

type LabelProps = {
  title: string;
};

export function Label({ title }: LabelProps) {
  return (
    <Typography variant="overline" component="p" gutterBottom sx={{ color: 'text.secondary' }}>
      {title}
    </Typography>
  );
}

type BlockProps = {
  title?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Block({ title, sx, children }: BlockProps) {
  return (
    <Card sx={{ overflow: 'unset', position: 'unset', width: '100%' }}>
      {title && <CardHeader title={title} />}
      <Box
        sx={{
          p: 3,
          minHeight: 180,
          ...sx
        }}
      >
        {children}
      </Box>
    </Card>
  );
}
