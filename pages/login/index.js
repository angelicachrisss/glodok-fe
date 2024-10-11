import {
  Box,
  Button,
  Card,
  CardContent,
  debounce,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import GlodokLogo from "../../public/static/logo/pesonaglodok.png";
import Image from "next/image";
import api from "../../services/api";
import useToast from "../../utils/toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { setStorage } from "../../utils/storage";

const Login = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [value, setValue] = useState({
    user_id: "",
    user_pass: "",
  });

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      debounceLogin(value);
    }
  };

  const debounceLogin = useCallback(debounce(mountSubmitLogin, 400), []);

  async function mountSubmitLogin(value) {
    try {
      const responseSubmit = await api.loginUser(
        value.user_id,
        value.user_pass
      );
      const { data } = responseSubmit.data;
      if (data === "Berhasil Login") {
        displayToast("success", "Berhasil Login");
        setStorage("ket_masuk", "YES");
        setStorage("userid", value.user_id);
        router.push(`/`);
      } else {
        displayToast("error", "Username atau Password Salah!");
      }
    } catch (error) {
      console.log("error", error);
      console.log("errorresp", error.response);
      if (error.response.data.data === "Gagal Login") {
        displayToast("error", "Username atau Password Salah!");
      }
    }
  }

  return (
    <Layout>
      <Box style={{ height: "100vh" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Card elevation={10} style={{ width: 300, borderRadius: " 12px" }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <Image
                  src={GlodokLogo}
                  width={100}
                  height={100}
                  alt="Pesona Glodok Logo"
                />
              </Box>
              <Typography
                variant="h6"
                component="div"
                align="center"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.user_id}
                onChange={(e) =>
                  setValue({ ...value, user_id: e.target.value })
                }
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.user_pass}
                onChange={(e) =>
                  setValue({ ...value, user_pass: e.target.value })
                }
                onKeyDown={handleKeyDownPassword}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, mb: 3 }}
                disabled={!value.user_id || !value.user_pass}
                onClick={() => debounceLogin(value)}
              >
                Login
              </Button>

              <Divider />

              <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                Pengguna Baru?{" "}
                <Link href="/login/daftar" variant="body2" underline="hover">
                  Daftar di sini
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Layout>
  );
};
export default Login;
