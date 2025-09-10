import Layout from "@/components/layout";
import ImportExport from "@mui/icons-material/ImportExport";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useState } from "react";

/**
 * Represents a furniture item from the search results
 */
type Item = {
  name: string;
  price: string;
  imageUrl: string;
  productLink: string;
  storeName: string;
  scrapedAt: string;
  id: number;
};

/**
 * Props for the search results page
 */
type SearchPageProps = {
  items: Item[];
  error?: string;
};
/**
 * Search results page component
 */
export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { items, error } = props;

  // Initialize state hooks first (React Hooks rules)
  const stores = items ? Array.from(
    new Set(items.map((item) => item.storeName))
  ).sort() : [];
  
  const [checkedStores, setCheckedStores] = useState(stores);
  const [openStores, setOpenStores] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Handle error state
  if (error) {
    return (
      <Layout>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ padding: 4 }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Stack>
      </Layout>
    );
  }

  // Handle empty results
  if (!items || items.length === 0) {
    return (
      <Layout>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ padding: 4 }}
        >
          <Typography variant="h6">
            No furniture items found. Try a different search term.
          </Typography>
        </Stack>
      </Layout>
    );
  }
  const handleCheckBoxChange = (store: string) => {
    if (checkedStores.includes(store)) {
      setCheckedStores(checkedStores.filter((s) => s !== store));
    } else {
      setCheckedStores([...checkedStores, store]);
    }
  };
  const handleClickStores = () => {
    setOpenStores(true);
  };

  return (
    <Layout>
      <Stack spacing={4}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            // backgroundColor: "#F1DEC9",
            padding: 2,
            borderRadius: 2,
            position: "sticky",
            top: 88,
            backgroundColor: "#FDF4E3",
            zIndex: 1,
          }}
          justifyContent="space-between"
          useFlexGap
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={handleClickStores}>
              Stores
            </Button>
            <Button variant="outlined">Filter</Button>
            <Button variant="outlined">Price</Button>
          </Stack>
          <Stack direction="row">
            <Button
              variant="contained"
              endIcon={<ImportExport />}
              onClick={(e) => {
                setOpenSort(true);
                setAnchorEl(e.currentTarget);
              }}
            >
              Sort
            </Button>
            <Popover
              open={openSort}
              anchorEl={anchorEl}
              onClose={() => {
                setOpenSort(false);
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <List>
                <ListItem
                  sx={{
                    padding: 0,
                  }}
                >
                  <ListItemButton
                    selected={sort === "asc"}
                    onClick={() => {
                      setSort("asc");
                    }}
                  >
                    <ListItemText primary="price low to high" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  sx={{
                    padding: 0,
                  }}
                >
                  <ListItemButton
                    selected={sort === "desc"}
                    onClick={() => {
                      setSort("desc");
                    }}
                  >
                    <ListItemText primary="price high to low" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
          </Stack>

          <Dialog
            open={openStores}
            onClose={() => {
              setOpenStores(false);
            }}
          >
            <DialogContent>
              <FormGroup>
                {stores.map((store) => (
                  <FormControlLabel
                    key={store}
                    control={
                      <Checkbox
                        checked={checkedStores.includes(store)}
                        onChange={() => handleCheckBoxChange(store)}
                      />
                    }
                    label={store.toUpperCase()}
                  />
                ))}
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenStores(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Stack>
        <Stack spacing={4}>
          {stores
            .filter((store) => checkedStores.includes(store))
            .map((store) => (
              <Stack
                key={store}
                spacing={1}
                sx={{
                  // backgroundColor: "#F1DEC9",
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Stack>
                  <Typography variant="h6" sx={{ color: "#3C3431" }}>
                    {store.toUpperCase()}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    overflow: "scroll",
                    width: "100%",
                  }}
                >
                  {items
                    .filter((item) => item.storeName === store)
                    .sort((itemA, itemB) => {
                      const priceA = parseFloat(
                        itemA.price.replace(/[$,]/g, "")
                      );
                      const priceB = parseFloat(
                        itemB.price.replace(/[$,]/g, "")
                      );
                      return sort === "asc" ? priceA - priceB : priceB - priceA;
                    })
                    .map((item) => (
                      <Stack key={item.id} direction="row" spacing={2}>
                        <Card
                          sx={{
                            border: "1px solid #ccc",
                            minWidth: 210,
                            minHeight: 500,
                            borderRadius: 2,
                            padding: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <CardMedia
                              sx={{
                                height: 150,
                                borderRadius: 2,
                              }}
                              image={item.imageUrl}
                              title={item.name}
                              onClick={() => {
                                window.open(item.productLink);
                              }}
                            />

                            <CardContent
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  height: 100,
                                  overflow: "auto",
                                }}
                              >
                                <Typography variant="body1">
                                  {item.name}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="h6">
                                  {item.price}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography variant="caption">
                                  {item.storeName.toUpperCase()}
                                </Typography>
                              </Box>

                              <Button
                                variant="contained"
                                onClick={() => {
                                  window.open(item.productLink);
                                }}
                              >
                                Go To
                              </Button>
                            </CardContent>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="caption">
                              {new Date(item.scrapedAt).toLocaleString()}
                            </Typography>
                          </Box>
                        </Card>
                      </Stack>
                    ))}
                </Stack>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  const { keyword } = context.params!;

  try {
    const response = await fetch(
      `${process.env.SCANNER_API}/scan?search=${encodeURIComponent(keyword as string)}`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const items = await response.json();
    return { props: { items: items || [] } };
  } catch (error) {
    console.error('Error fetching furniture data:', error);
    return {
      props: {
        items: [],
        error: 'Failed to load furniture data. Please try again later.'
      }
    };
  }
};
