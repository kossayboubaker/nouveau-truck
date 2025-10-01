import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";

import Card from "@mui/material/Card";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Layout
import VisionAuthLayout from "layouts/authentication/components/VisionAuthLayout";

function ForgotPassword() {
  const { t } = useTranslation();

  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [input, setEmail] = useState({ email_user: "" });
  const [error, setError] = useState({ err: false, textError: "" });

  useEffect(() => {
    setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  }, []);

  const changeHandler = (e) => {
    setEmail({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      input.email_user.trim().length === 0 ||
      !input.email_user.trim().match(mailFormat)
    ) {
      setError({ err: true, textError: t("forgot.validation.invalidEmail") });
      return;
    }

    try {
      if (!isDemo) {
        await axios.post(`http://localhost:8080/user/forgot-password`, {
          email_user: input.email_user,
        });

        setError({ err: false, textError: "" });
        setNotification(true);
      } else {
        setNotification(true);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || t("forgot.validation.serverError");
      setError({ err: true, textError: message });
    }
  };

  return (
    <VisionAuthLayout>
      <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit}>
        <MDBox mb={4} textAlign="center">
          <MDTypography variant="body1" color="#A0AEC0" fontWeight="500">
            {t("forgot.subtitle") || "Enter your email address and we'll send you a link to reset your password."}
          </MDTypography>
        </MDBox>

        <MDBox mb={4}>
          <MDInput
            type="email"
            label={t("form.email") || "Email Address"}
            fullWidth
            value={input.email_user}
            name="email_user"
            onChange={changeHandler}
            error={error.err}
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

        {error.err && (
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
              {error.textError}
            </MDTypography>
          </MDBox>
        )}

        {notification && (
          <MDBox mb={3}>
            <MDTypography
              variant="body2"
              color="#01B574"
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(1, 181, 116, 0.1)',
                border: '1px solid rgba(1, 181, 116, 0.3)',
                textAlign: 'center',
              }}
            >
              {isDemo
                ? t("forgot.demoMessage")
                : t("forgot.successMessage") || "Password reset link sent to your email!"}
            </MDTypography>
          </MDBox>
        )}

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
            {t("buttons.reset") || "Send Reset Link"}
          </MDButton>
        </MDBox>

        <MDBox textAlign="center">
          <MDTypography variant="body2" color="#A0AEC0" fontWeight="500">
            {t("form1.alreadyAccount") || "Remember your password?"}{" "}
            <MDTypography
              component={Link}
              to="/auth/login"
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
              {t("form1.signIn") || "Sign In"}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </VisionAuthLayout>
  );
}

export default ForgotPassword;
