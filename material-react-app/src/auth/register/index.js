import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import VisionAuthLayout from "layouts/authentication/components/VisionAuthLayout";

import { AuthContext } from "context";
import { useTranslation } from "react-i18next";

const tunisianCities = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Beja", "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
  "Kairouan", "Kasserine", "Sidi Bouzid", "Sfax", "Gafsa", "Tozeur", "Kebili",
  "Gabes", "Medenine", "Tataouine"
];

function Register() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    email_user: "",
    password: "",
    num_user: "",
    country: "",
    agree: false,
    company_name: "",
    campany_email: "",
    code_tva: "",
    Campany_adress: "",
    num_campany: "",
    representant_legal: "",
  });

  const [errors, setErrors] = useState({});

  const isOnlyLetters = (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value);
  const isOnlyNumbers = (value) => /^[0-9]+$/.test(value);

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({ ...inputs, [name]: type === "checkbox" ? checked : value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!inputs.FirstName.trim()) {
      newErrors.FirstName = t("validation.firstNameRequired");
    } else if (!isOnlyLetters(inputs.FirstName)) {
      newErrors.FirstName = t("validation.onlyLetters");
    }

    if (!inputs.LastName.trim()) {
      newErrors.LastName = t("validation.lastNameRequired");
    } else if (!isOnlyLetters(inputs.LastName)) {
      newErrors.LastName = t("validation.onlyLetters");
    }

    if (!inputs.email_user.trim()) {
      newErrors.email_user = t("validation.emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(inputs.email_user)) {
      newErrors.email_user = t("validation.invalidEmail");
    }

    if (!inputs.password) {
      newErrors.password = t("validation.passwordRequired");
    } else if (inputs.password.length < 8) {
      newErrors.password = t("validation.passwordLength");
    }

    if (!inputs.num_user.trim()) {
      newErrors.num_user = t("validation.phoneRequired");
    } else if (!isOnlyNumbers(inputs.num_user)) {
      newErrors.num_user = t("validation.onlyNumbers");
    }

    if (!inputs.country) {
      newErrors.country = t("validation.cityRequired");
    }

    if (!inputs.agree) {
      newErrors.agree = t("validation.agreeRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!inputs.company_name.trim()) {
      newErrors.company_name = t("validation.companyNameRequired");
    }

    if (!inputs.campany_email.trim()) {
      newErrors.campany_email = t("validation.companyEmailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(inputs.campany_email)) {
      newErrors.campany_email = t("validation.invalidEmail");
    }

    if (!inputs.code_tva.trim()) {
      newErrors.code_tva = t("validation.tvaCodeRequired");
    } else if (!isOnlyNumbers(inputs.code_tva)) {
      newErrors.code_tva = t("validation.onlyNumbers");
    }

    if (!inputs.Campany_adress.trim()) {
      newErrors.Campany_adress = t("validation.companyAddressRequired");
    }

    if (!inputs.num_campany.trim()) {
      newErrors.num_campany = t("validation.companyPhoneRequired");
    } else if (!isOnlyNumbers(inputs.num_campany)) {
      newErrors.num_campany = t("validation.onlyNumbers");
    }

    if (!inputs.representant_legal.trim()) {
      newErrors.representant_legal = t("validation.legalRepresentativeRequired");
    } else if (!isOnlyLetters(inputs.representant_legal)) {
      newErrors.representant_legal = t("validation.onlyLetters");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const newUser = {
      ...inputs,
      role: "super_admin",
    };

    try {
      const response = await axios.post("http://localhost:8080/user/register-super-admin", newUser, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        navigate("/auth/login");
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        error: true,
        errorText: err.response?.data?.message || err.message,
      }));
    }
  };

  return (
    <VisionAuthLayout>
      {/* Step Indicator */}
      <MDBox mb={4} textAlign="center">
        <MDBox display="flex" justifyContent="center" alignItems="center" mb={3}>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="32px"
            height="32px"
            borderRadius="50%"
            bgcolor={step >= 1 ? "#5C2DD5" : "rgba(255, 255, 255, 0.2)"}
            color="white"
            fontWeight="600"
            fontSize="0.875rem"
            mr={2}
          >
            1
          </MDBox>
          <MDBox
            width="60px"
            height="2px"
            bgcolor={step > 1 ? "#5C2DD5" : "rgba(255, 255, 255, 0.2)"}
            mr={2}
          />
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="32px"
            height="32px"
            borderRadius="50%"
            bgcolor={step >= 2 ? "#5C2DD5" : "rgba(255, 255, 255, 0.2)"}
            color="white"
            fontWeight="600"
            fontSize="0.875rem"
          >
            2
          </MDBox>
        </MDBox>
        <MDTypography variant="body1" color="#A0AEC0" fontWeight="500">
          {step === 1 ? t("register.step1") || "Personal Information" : t("register.step2") || "Company Information"}
        </MDTypography>
      </MDBox>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            {/* Step 1: Personal Information */}
            <MDBox mb={3}>
              <MDInput
                label={t("form1.firstName")}
                name="FirstName"
                fullWidth
                onChange={changeHandler}
                value={inputs.FirstName}
                error={!!errors.FirstName}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(15, 20, 25, 0.5)',
                    '& input': { color: '#FFFFFF', py: 1.5 },
                  },
                  '& .MuiInputLabel-root': { color: '#A0AEC0' },
                }}
              />
              {errors.FirstName && (
                <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.FirstName}
                </MDTypography>
              )}
            </MDBox>

            <MDBox mb={3}>
              <MDInput
                label={t("form1.lastName")}
                name="LastName"
                fullWidth
                onChange={changeHandler}
                value={inputs.LastName}
                error={!!errors.LastName}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(15, 20, 25, 0.5)',
                    '& input': { color: '#FFFFFF', py: 1.5 },
                  },
                  '& .MuiInputLabel-root': { color: '#A0AEC0' },
                }}
              />
              {errors.LastName && (
                <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.LastName}
                </MDTypography>
              )}
            </MDBox>

            <MDBox mb={3}>
              <MDInput
                label={t("form1.email")}
                name="email_user"
                type="email"
                fullWidth
                onChange={changeHandler}
                value={inputs.email_user}
                error={!!errors.email_user}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(15, 20, 25, 0.5)',
                    '& input': { color: '#FFFFFF', py: 1.5 },
                  },
                  '& .MuiInputLabel-root': { color: '#A0AEC0' },
                }}
              />
              {errors.email_user && (
                <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.email_user}
                </MDTypography>
              )}
            </MDBox>

            <MDBox mb={3}>
              <MDInput
                type="password"
                label={t("form1.password")}
                name="password"
                fullWidth
                onChange={changeHandler}
                value={inputs.password}
                error={!!errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(15, 20, 25, 0.5)',
                    '& input': { color: '#FFFFFF', py: 1.5 },
                  },
                  '& .MuiInputLabel-root': { color: '#A0AEC0' },
                }}
              />
              {errors.password && (
                <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.password}
                </MDTypography>
              )}
            </MDBox>

            <MDBox mb={3}>
              <MDInput
                label={t("form1.phoneNumber")}
                name="num_user"
                fullWidth
                onChange={changeHandler}
                value={inputs.num_user}
                error={!!errors.num_user}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(15, 20, 25, 0.5)',
                    '& input': { color: '#FFFFFF', py: 1.5 },
                  },
                  '& .MuiInputLabel-root': { color: '#A0AEC0' },
                }}
              />
              {errors.num_user && (
                <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.num_user}
                </MDTypography>
              )}
            </MDBox>

            <MDBox mb={3}>
              <FormControl fullWidth error={!!errors.country}>
                <Select
                  name="country"
                  value={inputs.country}
                  onChange={changeHandler}
                  displayEmpty
                  sx={{
                    background: 'rgba(15, 20, 25, 0.5)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid rgba(0, 212, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #00D4FF',
                    },
                  }}
                >
                  <MenuItem value=""><em>{t("form1.selectCity")}</em></MenuItem>
                  {tunisianCities.map((city) => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.country && (
                <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.country}
                </MDTypography>
              )}
            </MDBox>

            <MDBox display="flex" alignItems="center" mb={3}>
              <Checkbox
                name="agree"
                checked={inputs.agree}
                onChange={changeHandler}
                sx={{
                  color: 'rgba(255, 255, 255, 0.3)',
                  '&.Mui-checked': { color: '#00D4FF' },
                }}
              />
              <MDTypography variant="body2" color="#A0AEC0" sx={{ ml: 1 }}>
                {t("form1.agreePrefix")}{" "}
                <MDTypography component={Link} to="#" variant="body2" color="#00D4FF" fontWeight="600">
                  {t("form1.terms")}
                </MDTypography>
              </MDTypography>
            </MDBox>
            {errors.agree && (
              <MDTypography variant="caption" color="#E31A1A" sx={{ mb: 2, display: 'block' }}>
                {errors.agree}
              </MDTypography>
            )}

            <MDBox mb={3}>
              <MDButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleNext}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #1E2A78 0%, #5C2DD5 50%, #7B42F6 100%)',
                  boxShadow: '0 0 20px rgba(92, 45, 213, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1A237E 0%, #44337A 50%, #673AB7 100%)',
                    boxShadow: '0 0 30px rgba(92, 45, 213, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t("buttons1.next")}
              </MDButton>
            </MDBox>

            <MDBox textAlign="center">
              <MDTypography variant="body2" color="#A0AEC0" fontWeight="500">
                {t("form1.alreadyAccount")}{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="body2"
                  color="#00D4FF"
                  fontWeight="600"
                  sx={{ textDecoration: 'none' }}
                >
                  {t("form1.signIn")}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </>
        )}

        {step === 2 && (
          <>
            {/* Step 2: Company Information */}
            {["company_name", "campany_email", "code_tva", "Campany_adress", "num_campany", "representant_legal"].map((field) => (
              <MDBox key={field} mb={3}>
                <MDInput
                  label={t(`form1.${field}`)}
                  name={field}
                  fullWidth
                  onChange={changeHandler}
                  value={inputs[field]}
                  error={!!errors[field]}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(15, 20, 25, 0.5)',
                      '& input': { color: '#FFFFFF', py: 1.5 },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                  }}
                />
                {errors[field] && (
                  <MDTypography variant="caption" color="#E31A1A" sx={{ mt: 0.5, display: 'block' }}>
                    {errors[field]}
                  </MDTypography>
                )}
              </MDBox>
            ))}

            {errors.error && (
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
                  {errors.errorText}
                </MDTypography>
              </MDBox>
            )}

            <MDBox display="flex" gap={2} mb={3}>
              <MDButton
                variant="outlined"
                fullWidth
                onClick={() => setStep(1)}
                sx={{
                  py: 1.5,
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: '#A0AEC0',
                  '&:hover': {
                    border: '2px solid rgba(0, 212, 255, 0.5)',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                  },
                }}
              >
                Back
              </MDButton>
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
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1A237E 0%, #44337A 50%, #673AB7 100%)',
                    boxShadow: '0 0 30px rgba(92, 45, 213, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t("buttons1.signUp")}
              </MDButton>
            </MDBox>

            <MDBox textAlign="center">
              <MDTypography variant="body2" color="#A0AEC0" fontWeight="500">
                {t("form1.alreadyAccount")}{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="body2"
                  color="#00D4FF"
                  fontWeight="600"
                  sx={{ textDecoration: 'none' }}
                >
                  {t("form1.signIn")}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </>
        )}
      </form>
    </VisionAuthLayout>
  );
}

export default Register;
