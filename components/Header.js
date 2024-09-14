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

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDestinasiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDestinasiClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button>
          <Link
            href="/"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemText primary="Home" />
          </Link>
        </ListItem>

        <ListItem button>
          <ListItemText primary="Destinasi" />
        </ListItem>
        <List sx={{ pl: 4 }}>
          <ListItem button>
            <Link
              href="/destinasi/warisan"
              style={{ textDecoration: "none", color: "black", width: "100%" }}
            >
              <ListItemText primary="Warisan" />
            </Link>
          </ListItem>
          <ListItem button>
            <Link
              href="/destinasi/kuliner"
              style={{ textDecoration: "none", color: "black", width: "100%" }}
            >
              <ListItemText primary="Kuliner" />
            </Link>
          </ListItem>
          <ListItem button>
            <Link
              href="/destinasi/religi"
              style={{ textDecoration: "none", color: "black", width: "100%" }}
            >
              <ListItemText primary="Religi" />
            </Link>
          </ListItem>
        </List>

        <ListItem button>
          <Link
            href="/virtualtour"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemText primary="Virtual Tour" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link
            href="/transportasi"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemText primary="Transportasi" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link
            href="/berita"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemText primary="Berita" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link
            href="/review"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemText primary="Review" />
          </Link>
        </ListItem>
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
            {/* <Button color="inherit">
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Button> */}

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
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
              <MenuItem onClick={handleDestinasiClose} sx={{ width: 120 }}>
                <Link
                  href="/destinasi/warisan"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    Warisan
                  </a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleDestinasiClose}>
                <Link
                  href="/destinasi/kuliner"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    Kuliner
                  </a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleDestinasiClose}>
                <Link
                  href="/destinasi/religi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    Religi
                  </a>
                </Link>
              </MenuItem>
            </Menu>

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
            >
              <Link href="/virtualtour" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  {" "}
                  Virtual Tour
                </a>
              </Link>
            </Button>

            <Button
              color="inherit"
              aria-controls="destinasi-menu"
              aria-haspopup="true"
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
