import { useCallback, useEffect, useState } from "react";
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
  Avatar,
  Collapse,
  debounce,
  Divider,
  Grid,
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
import api from "../services/api";
import useToast from "../utils/toast";
import CircleIcon from "@mui/icons-material/Circle";
import { getStorage, clearStorage } from "../utils/storage";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const getFirstLetter = (name) => {
  return name.charAt(0).toUpperCase(); // Mengambil huruf pertama dan mengubahnya menjadi huruf besar
};

const Header = () => {
  const [displayToast] = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [listJenisDestinasi, setListJenisDestinasi] = useState([]);
  const [token, setToken] = useState(null);
  const [avatarColor, setAvatarColor] = useState("");
  const [userName, setUserName] = useState("");
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const debounceJenisDestinasi = useCallback(
    debounce(getJenisDestinasi, 400),
    []
  );

  const debounceGetUser = useCallback(debounce(getUser, 400), []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    setOpen(false);
  };

  const handleDestinasiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDestinasiClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Hanya tutup drawer saat diperlukan
  };

  async function getJenisDestinasi() {
    try {
      const response = await api.getJenisDestinasiDropDown();
      const { data } = response.data;

      // const jenisDestinasi = data.map((item) => item.jenisdestinasi_kat);
      const jenisDestinasi = data.map((item) => ({
        name: item.jenisdestinasi_kat,
        // route: `/destinasi/${item.jenisdestinasi_kat.toLowerCase()}`,
        route: `/destinasi/${item.jenisdestinasi_id}`,
      }));
      setListJenisDestinasi(jenisDestinasi);
    } catch (error) {
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    }
  }

  async function getUser(token, userid) {
    try {
      const response = await api.getUser(userid);
      const { data } = response.data;
      setUserName(data.user_name);
      if (token && data.user_id === "") {
        displayToast("error", "Akun anda telah dihapus!");
        clearStorage();
        window.location.reload();
      }
    } catch (error) {
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    }
  }

  useEffect(() => {
    debounceJenisDestinasi();
  }, []);

  useEffect(() => {
    const storedToken = getStorage("ket_masuk");
    const userid = getStorage("userid");
    setToken(storedToken);
    debounceGetUser(storedToken, userid);
  }, []);

  useEffect(() => {
    if (token) {
      const storedColor = localStorage.getItem("avatarColor");
      if (!storedColor) {
        const newColor = getRandomColor();
        setAvatarColor(newColor);
        localStorage.setItem("avatarColor", newColor);
      } else {
        setAvatarColor(storedColor);
      }
    }
  }, [token]);

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
            {listJenisDestinasi.map((destinasi, index) => (
              <ListItemButton
                key={index}
                sx={{ pl: 4 }}
                onClick={() => {
                  handleCloseDrawer();
                  router.push(destinasi.route);
                }}
              >
                <ListItemIcon>
                  <CircleIcon fontSize="5" />
                </ListItemIcon>
                <ListItemText primary={destinasi.name} />
              </ListItemButton>
            ))}
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

        {token && (
          <ListItemButton
            onClick={() => {
              handleCloseDrawer(); // Tutup drawer saat klik
              router.push("/profile");
            }}
          >
            <ListItemIcon>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  sx={{ bgcolor: avatarColor, width: 30, height: 30 }}
                  variant="rounded"
                >
                  {getFirstLetter(userName)}
                </Avatar>
              </StyledBadge>
            </ListItemIcon>
            <ListItemText primary="View Profile" />
          </ListItemButton>
        )}

        {!token ? (
          <ListItemButton
            onClick={() => {
              handleCloseDrawer(); // Tutup drawer saat klik
              router.push("/login");
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        ) : (
          <ListItemButton
            onClick={() => {
              handleCloseDrawer(); // Tutup drawer saat klik
              displayToast("success", "Berhasil melakukan keluar akun!");
              clearStorage();
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#7A3E2C" }}>
        <Toolbar>
          {/* <Image
            src="/static/logo/pesonaglodok.png"
            alt="Logo"
            width={50}
            height={50}
            priority
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Pesona Glodok
          </Typography> */}
          <Link href="/" passHref>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Image
                src="/static/logo/pesonaglodok.png"
                alt="Logo"
                width={50}
                height={50}
                priority
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ ml: 2, color: "inherit" }}
              >
                Pesona Glodok
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, ml: "auto" }}>
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
              {listJenisDestinasi.map((destinasi, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    router.push(destinasi.route);
                    handleDestinasiClose();
                  }}
                >
                  {destinasi.name}
                </MenuItem>
              ))}
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

            {token && (
              <>
                <Button
                  color="inherit"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileClick} // Tambahkan fungsi klik untuk membuka menu
                  endIcon={<ArrowDropDownIcon />} // Tambahkan ikon di sini
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar sx={{ bgcolor: avatarColor }}>
                      {getFirstLetter(userName)}
                    </Avatar>
                  </StyledBadge>
                </Button>

                <Menu
                  id="profile-menu"
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleProfileClose();
                      router.push("/profile"); // Pindahkan ke halaman profil
                    }}
                  >
                    View Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleProfileClose();
                      displayToast(
                        "success",
                        "Berhasil melakukan keluar akun!"
                      );
                      clearStorage();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {!token && (
              <Button
                color="inherit"
                aria-controls="destinasi-menu"
                aria-haspopup="true"
                onClick={() => {
                  router.push("/login");
                }}
              >
                <Link href="/login" passHref>
                  <a style={{ color: "inherit" }}>Login</a>
                </Link>
              </Button>
            )}
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" }, ml: "auto" }}
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
