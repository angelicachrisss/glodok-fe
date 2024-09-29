import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/router";
import {
  Collapse,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import ExploreIcon from "@mui/icons-material/Explore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDestinasiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDestinasiClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Hanya tutup drawer saat diperlukan
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <ListItemButton
        component="div" // Use 'div' instead of 'a' to prevent navigation
        sx={{
          pointerEvents: "none", // Disable pointer events
        }}
      >
        <ListItemIcon sx={{ fontSize: 20 }}>
          <img
            src="/static/logo/pesonaglodok.png"
            alt="Pesona Glodok"
            style={{ width: 30, height: 30 }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ my: 0 }}
          primary="Pesona Glodok"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
      </ListItemButton>

      <Divider />

      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={() => {
            handleCloseDrawer(); // Tutup drawer saat klik Sent mail
            router.push("/");
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Destinasi" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                handleCloseDrawer(); // Tutup drawer saat klik item
                router.push("/destinasi/warisan");
              }}
            >
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText primary="Warisan" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                handleCloseDrawer(); // Tutup drawer saat klik item
                router.push("/destinasi/kuliner");
              }}
            >
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary="Kuliner" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                handleCloseDrawer(); // Tutup drawer saat klik item
                router.push("/destinasi/religi");
              }}
            >
              <ListItemIcon>
                <TempleBuddhistIcon />
              </ListItemIcon>
              <ListItemText primary="Religi" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={() => {
            handleCloseDrawer(); // Tutup drawer saat klik
            router.push("/virtualtour");
          }}
        >
          <ListItemIcon>
            <ThreeSixtyIcon />
          </ListItemIcon>
          <ListItemText primary="Virtual Tour" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            handleCloseDrawer(); // Tutup drawer saat klik
            router.push("/transportasi");
          }}
        >
          <ListItemIcon>
            <DirectionsBusIcon />
          </ListItemIcon>
          <ListItemText primary="Transportasi" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            handleCloseDrawer(); // Tutup drawer saat klik
            router.push("/berita");
          }}
        >
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="Berita" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            handleCloseDrawer(); // Tutup drawer saat klik
            router.push("/review");
          }}
        >
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText primary="Review" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#7A3E2C" }}>
        <Toolbar>
          <Image
            src="/static/logo/pesonaglodok.png"
            alt="Logo"
            width={50}
            height={50}
            priority
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Pesona Glodok
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/");
              }}
            >
              <Link href="/" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>Home</a>
              </Link>
            </Button>
            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
              onClick={handleDestinasiClick}
            >
              Destinasi <ArrowDropDownIcon />
            </Button>
            <Menu
              id="destinasi-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDestinasiClose}
            >
              <MenuItem
                onClick={() => {
                  router.push("/destinasi/warisan");
                  handleDestinasiClose();
                }}
                sx={{ width: 120 }}
              >
                Warisan
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/destinasi/kuliner");
                  handleDestinasiClose();
                }}
              >
                Kuliner
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/destinasi/religi");
                  handleDestinasiClose();
                }}
              >
                Religi
              </MenuItem>
            </Menu>

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/virtualtour");
              }}
            >
              <Link href="/virtualtour" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  Virtual Tour
                </a>
              </Link>
            </Button>

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/transportasi");
              }}
            >
              <Link href="/transportasi" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  Transportasi
                </a>
              </Link>
            </Button>

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/berita");
              }}
            >
              <Link href="/berita" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  Berita
                </a>
              </Link>
            </Button>

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/review");
              }}
            >
              <Link href="/review" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  Review
                </a>
              </Link>
            </Button>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
