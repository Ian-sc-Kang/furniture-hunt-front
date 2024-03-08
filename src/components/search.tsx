"use client";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <TextField
      sx={{
        maxWidth: "500px",
      }}
      id="search"
      label="Search"
      variant="outlined"
      fullWidth
      autoFocus
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
        className: "rounded-full",
      }}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/search/${search.toLocaleLowerCase()}`);
        }
      }}
    />
  );
}
