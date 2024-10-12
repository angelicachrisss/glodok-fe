import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useCallback, useEffect, useState } from "react";
import { cond, debounce } from "lodash";
import { getStorage } from "../../utils/storage";
import useToast from "../../utils/toast";
import api from "../../services/api";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PasswordIcon from "@mui/icons-material/Password";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const Profile = () => {
  const [displayToast] = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState({
    user_id: "",
    user_name: "",
  });

  const [token, setToken] = useState(null);

  const debounceGetUser = useCallback(debounce(getUser, 400), []);

  const debounceUpdateUser = useCallback(debounce(updateUser, 400), []);

  async function getUser(userid) {
    setIsLoading(true);
    try {
      const response = await api.getUser(userid);
      const { data } = response.data;
      setData(data);
      setName(data.user_name);
    } catch (error) {
      console.log("error", error);
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUser(name, password, id) {
    const capitalizedNama = name.charAt(0).toUpperCase() + name.slice(1);
    const payload = {
      user_name: capitalizedNama,
      user_pass: password,
    };
    console.log("payload", payload);

    try {
      const response = await api.updateUser(id, payload);
      const { data } = response.data;
      if (data === "Berhasil") {
        displayToast("success", "Berhasil Mengubah Profil!");
        setIsEdit(false);
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    }
  }

  useEffect(() => {
    const userid = getStorage("userid");
    debounceGetUser(userid);
  }, []);

  useEffect(() => {
    const storedToken = getStorage("ket_masuk");
    setToken(storedToken);
  }, []);

  return (
    <Layout>
      {token ? (
        <Box
          sx={{ pl: { xs: 2, sm: 4 }, pr: { xs: 2, sm: 4 }, height: "auto" }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mb: 2, mt: 3, fontWeight: 600 }}
              >
                {isEdit === false ? "PROFILE" : "EDIT PROFILE"}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                label="Username"
                variant="standard"
                value={data.user_id}
                disabled
                sx={{
                  width: {
                    xs: "100%", // Lebar 100% untuk perangkat mobile
                    sm: 400, // Lebar 400px untuk perangkat kecil (tablet)
                    md: 500, // Lebar 500px untuk perangkat sedang (laptop)
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                label="Nama"
                variant="standard"
                value={data.user_name}
                onChange={(e) =>
                  setData({ ...data, user_name: e.target.value })
                }
                disabled={isEdit === false}
                sx={{
                  width: {
                    xs: "100%", // Lebar 100% untuk perangkat mobile
                    sm: 400, // Lebar 400px untuk perangkat kecil (tablet)
                    md: 500, // Lebar 500px untuk perangkat sedang (laptop)
                  },
                }}
              />
            </Box>
          </Grid>

          {isEdit === true && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  label="Password"
                  variant="standard"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    width: {
                      xs: "100%", // Lebar 100% untuk perangkat mobile
                      sm: 400, // Lebar 400px untuk perangkat kecil (tablet)
                      md: 500, // Lebar 500px untuk perangkat sedang (laptop)
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{
                          padding: 0,
                          minWidth: "auto",
                          mr: {
                            xs: -4, // Margin -4 untuk layar kecil (HP)
                            sm: 0, // Tidak ada margin untuk layar besar (tablet ke atas)
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Grid>
          )}

          {isEdit === true && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  label="Confirm Password"
                  variant="standard"
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    width: {
                      xs: "100%", // Lebar 100% untuk perangkat mobile
                      sm: 400, // Lebar 400px untuk perangkat kecil (tablet)
                      md: 500, // Lebar 500px untuk perangkat sedang (laptop)
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        sx={{
                          padding: 0,
                          minWidth: "auto",
                          mr: {
                            xs: -4, // Margin -4 untuk layar kecil (HP)
                            sm: 0, // Tidak ada margin untuk layar besar (tablet ke atas)
                          },
                        }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Grid>
          )}

          {confirmPassword === "" ? (
            ""
          ) : confirmPassword !== password ? (
            <Typography
              variant="body1"
              sx={{ color: "red", mb: 2 }}
              fontWeight={600}
              align="center"
            >
              *Password tidak sama!
            </Typography>
          ) : (
            ""
          )}

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            {isEdit === false ? (
              <Button
                variant="outlined"
                endIcon={<EditIcon />}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                EDIT ACCOUNT
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsEdit(false);
                    setPassword("");
                    setConfirmPassword("");
                    setData({ ...data, user_name: name });
                  }}
                  sx={{ mr: 2 }}
                >
                  CANCEL
                </Button>

                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  onClick={() => {
                    debounceUpdateUser(data.user_name, password, data.user_id);
                  }}
                  disabled={
                    !data.user_name ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                  sx={{ mr: 2 }}
                >
                  SAVE
                </Button>
              </>
            )}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ pl: 1, pr: 1 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, mt: 3, fontWeight: 600 }}
          >
            MAAF, ANDA TIDAK DAPAT MENGAKSES HALAMAN PROFILE!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 2, fontWeight: 400 }}
          >
            Silahkan masuk terlebih dahulu ke halaman <a href="/login">LOGIN</a>{" "}
            untuk melihat profile.
          </Typography>
        </Box>
      )}

      <Modal open={isLoading}>
        <Box sx={style} style={{ textAlign: "center" }}>
          <Typography>Mohon Tunggu Permintaan Anda Sedang Di Proses</Typography>
          <CircularProgress />
        </Box>
      </Modal>
    </Layout>
  );
};

export default Profile;
