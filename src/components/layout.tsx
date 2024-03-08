import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Search from "./search";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Stack
      direction="column"
      sx={{
        padding: 2,
        backgroundColor: "#FDF4E3",
      }}
      spacing={4}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={2}
        sx={{
          zIndex: 1,
          position: "sticky",
          top: 0,
          backgroundColor: "#FDF4E3",
          borderBottom: "solid 1px #3C3431",
          width: "100%",
        }}
      >
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={80} height={80} />
        </Link>
        <Search />
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "#3C3431",
          }}
        >
          FURNITURE HUNT
        </Typography>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
}
