import Search from "@/components/search";
import { Stack } from "@mui/material";
import Image from "next/image";
export default function Home() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        padding: 2,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F9F6F0",
      }}
    >
      <Image
        src="/logo.svg"
        alt="logo"
        width={150}
        height={150}
        style={{
          cursor: "pointer",
        }}
      />
      <Search />
    </Stack>
  );
}
