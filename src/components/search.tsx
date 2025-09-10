"use client";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState, ChangeEvent, KeyboardEvent } from "react";

/**
 * Search component that allows users to search for furniture items
 */
export default function Search() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      const sanitizedSearch = search.trim().toLowerCase();
      router.push(`/search/${encodeURIComponent(sanitizedSearch)}`);
    }
  };
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
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
    />
  );
}
