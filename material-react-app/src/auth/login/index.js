import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// MUI components
import Card from "@mui/material/Card";
import { Switch, Grid } from "@mui/material";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Custom components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Layout
import VisionAuthLayout from "layouts/authentication/components/VisionAuthLayout";
import { AuthContext } from "context";

// i18n
import { useTranslation } from "react-i18next";

import { io } from "socket.io-client";

function Login() {
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        { email_user: email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { role, _id } = response.data;
        localStorage.setItem("role", role);
        localStorage.setItem("userId", _id);

        const socket = io("http://localhost:8080", {
          withCredentials: true,
          query: { userId: _id },
        });

        socket.on("connect", () => {
          console.log("✅ Socket connecté avec ID :", socket.id);
        });

        socket.emit("addUser", _id);
        socket.emit("setup", _id);

        switch (role) {
          case "super_admin":
            navigate("/dashboard/superadmin");
            break;
          case "manager":
            navigate("/dashboard/manager");
            break;
          case "driver":
            navigate("/dashboard/driver");
            break;
          default:
            setError(t("unknownRole"));
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || t("loginError"));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/admin/auth/google";
  };

  return (
    <VisionAuthLayout>
      <MDBox component="form" role="form" onSubmit={handleLogin}>
        {/* Social Login Section */}
        <MDBox mb={4} textAlign="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4}>
              <MDButton
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#A0AEC0',
                  '&:hover': {
                    border: '1px solid rgba(66, 153, 225, 0.5)',
                    backgroundColor: 'rgba(66, 153, 225, 0.1)',
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 20 }} />
              </MDButton>
            </Grid>
            <Grid item xs={4}>
              <MDButton
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#A0AEC0',
                  '&:hover': {
                    border: '1px solid rgba(113, 128, 150, 0.5)',
                    backgroundColor: 'rgba(113, 128, 150, 0.1)',
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 20 }} />
              </MDButton>
            </Grid>
            <Grid item xs={4}>
              <MDButton
                variant="outlined"
                fullWidth
                onClick={handleGoogleLogin}
                sx={{
                  py: 1.5,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#A0AEC0',
                  '&:hover': {
                    border: '1px solid rgba(219, 68, 55, 0.5)',
                    backgroundColor: 'rgba(219, 68, 55, 0.1)',
                  },
                }}
              >
                <GoogleIcon sx={{ fontSize: 20 }} />
              </MDButton>
            </Grid>
          </Grid>

          <MDBox display="flex" alignItems="center" my={3}>
            <MDBox flex={1} height="1px" bgcolor="rgba(255, 255, 255, 0.2)" />
            <MDTypography variant="body2" color="#718096" mx={2} fontWeight="500">
              or sign in with email
            </MDTypography>
            <MDBox flex={1} height="1px" bgcolor="rgba(255, 255, 255, 0.2)" />
          </MDBox>
        </MDBox>

        {/* Email Input */}
        <MDBox mb={3}>
          <MDInput
            type="email"
            label={t("form3.email")}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(15, 20, 25, 0.5)',
                '& input': {
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  py: 1.5,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#A0AEC0',
                fontSize: '0.95rem',
              },
            }}
          />
        </MDBox>

        {/* Password Input */}
        <MDBox mb={3}>
          <MDInput
            type="password"
            label={t("form3.password")}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(15, 20, 25, 0.5)',
                '& input': {
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  py: 1.5,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#A0AEC0',
                fontSize: '0.95rem',
              },
            }}
          />
        </MDBox>

        {/* Remember Me & Forgot Password */}
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <MDBox display="flex" alignItems="center">
            <Switch
              checked={rememberMe}
              onChange={handleSetRememberMe}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#00D4FF',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#00D4FF',
                },
              }}
            />
            <MDTypography
              variant="body2"
              color="#A0AEC0"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none", fontWeight: 500 }}
            >
              {t("rememberMe")}
            </MDTypography>
          </MDBox>

          <MDTypography
            component={Link}
            to="/auth/forgot-password"
            variant="body2"
            color="#00D4FF"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textShadow: '0 0 8px rgba(0, 212, 255, 0.3)',
              },
            }}
          >
            {t("forgotPassword")}
          </MDTypography>
        </MDBox>

        {/* Error Message */}
        {error && (
          <MDBox mb={3}>
            <MDTypography
              variant="body2"
              color="#E31A1A"
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(227, 26, 26, 0.1)',
                border: '1px solid rgba(227, 26, 26, 0.3)',
                textAlign: 'center',
              }}
            >
              {error}
            </MDTypography>
          </MDBox>
        )}

        {/* Sign In Button */}
        <MDBox mb={4}>
          <MDButton
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1E2A78 0%, #5C2DD5 50%, #7B42F6 100%)',
              boxShadow: '0 0 20px rgba(92, 45, 213, 0.4)',
              border: 'none',
              borderRadius: '12px',
              '&:hover': {
                background: 'linear-gradient(135deg, #1A237E 0%, #44337A 50%, #673AB7 100%)',
                boxShadow: '0 0 30px rgba(92, 45, 213, 0.6)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {t("form3.signIn")}
          </MDButton>
        </MDBox>

        {/* Sign Up Link */}
        <MDBox textAlign="center">
          <MDTypography variant="body2" color="#A0AEC0" fontWeight="500">
            {t("dontHaveAccount")}{" "}
            <MDTypography
              component={Link}
              to="/auth/register"
              variant="body2"
              color="#00D4FF"
              fontWeight="600"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textShadow: '0 0 8px rgba(0, 212, 255, 0.3)',
                },
              }}
            >
              {t("signUp")}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </VisionAuthLayout>
  );
}

export default Login;
