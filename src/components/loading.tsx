import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Loading component with animated progress indicator
 * Used during page transitions and data fetching
 */
export default function CircularStatic() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1300);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack alignItems="center" spacing={4}>
        <Typography variant="h6">Fetching data from many sources...</Typography>
        <CircularProgress
          color="inherit"
          variant="determinate"
          value={progress}
        />
        <Typography>{`${progress}%`}</Typography>
      </Stack>
    </Box>
  );
}
