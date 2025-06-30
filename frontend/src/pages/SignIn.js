import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const SignIn = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const [activeTab, setActiveTab] = useState(0); // 0 = Login, 1 = Internal

  const [formData, setFormData] = useState({
    company: { username: "", password: "" },
    internal: { email: "" },
  });

  const [errors, setErrors] = useState({ company: {}, internal: {} });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const key = activeTab === 0 ? "company" : "internal";

    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    const currentData = activeTab === 0 ? formData.company : formData.internal;

    if (activeTab === 0) {
      if (!currentData.username) newErrors.username = "Username is required";
      if (!currentData.password) newErrors.password = "Password is required";
    }

    setErrors((prev) => ({
      ...prev,
      [activeTab === 0 ? "company" : "internal"]: newErrors,
    }));

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Microsoft login for internal user (with cancel handling)
  const handleEmailClick = () => {
    setErrorMessage(""); // Clear any previous errors

    instance
      .loginPopup(loginRequest)
      .then((response) => {
        const email = response.account.username;

        axios
          .post(
            "http://localhost:8082/api/auth/internal",
            { email },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.startsWith("redirect:")) {
              navigate(res.data.replace("redirect:", ""));
            } else {
              setErrorMessage("Access Denied");
            }
          })
          .catch(() => {
            setErrorMessage("Something went wrong");
          });
      })
      .catch((error) => {
        if (error.errorCode === "user_cancelled") {
          // User cancelled Microsoft popup
          setFormData((prev) => ({
            ...prev,
            internal: { email: "" },
          }));
        } else {
          setErrorMessage("Microsoft login failed. Please try again.");
          console.error("MSAL Error:", error);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      const currentData = activeTab === 0 ? formData.company : formData.internal;

      const response = await axios.post(
        "http://localhost:8082/api/auth/login",
        null,
        {
          params:
            activeTab === 0
              ? {
                  username: currentData.username,
                  password: currentData.password,
                }
              : {
                  email: currentData.email,
                },
          withCredentials: true,
        }
      );

      if (response.data.startsWith("redirect:")) {
        alert("Login Successful!");
        navigate(response.data.replace("redirect:", ""));
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const styles = {
    fullscreen: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backdropFilter: "blur(4px)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 999,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      textAlign: "center",
      maxWidth: "420px",
      width: "100%",
      color: "#333",
    },
    logo: {
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "100px",
      height: "auto",
      zIndex: 1000,
    },
    title: {
      fontSize: "30px",
      marginBottom: "12px",
      fontWeight: "700",
      color: "#222",
    },
    subtitle: {
      fontSize: "16px",
      marginBottom: "30px",
      color: "#555",
    },
    tabs: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
      gap: "40px",
    },
    tabBtn: (active) => ({
      cursor: "pointer",
      paddingBottom: "8px",
      fontWeight: active ? "700" : "500",
      fontSize: "18px",
      color: active ? "#0078d4" : "#999",
      borderBottom: active ? "3px solid #0078d4" : "3px solid transparent",
      background: "none",
      border: "none",
    }),
    label: {
      display: "block",
      marginBottom: "8px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "14px",
      color: "#444",
    },
    input: {
      width: "100%",
      padding: "14px",
      marginBottom: "20px",
      border: "1.8px solid #ccc",
      borderRadius: "12px",
      fontSize: "15px",
      outline: "none",
    },
    signInButton: {
      background: "linear-gradient(45deg, #0078d4, #00c6ff)",
      color: "#fff",
      border: "none",
      padding: "14px",
      width: "100%",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "700",
      cursor: "pointer",
    },
    error: {
      color: "red",
      fontSize: "13px",
      marginTop: "-14px",
      marginBottom: "18px",
      textAlign: "left",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.fullscreen}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome</h2>
        <p style={styles.subtitle}>Please sign in to continue</p>

        <div style={styles.tabs}>
          <button
            style={styles.tabBtn(activeTab === 0)}
            onClick={() => {
              setErrorMessage("");
              setActiveTab(0);
            }}
          >
            Login
          </button>
          <button
            style={styles.tabBtn(activeTab === 1)}
            onClick={() => {
              setErrorMessage("");
              setActiveTab(1);
            }}
          >
            Internal User
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {activeTab === 0 ? (
            <>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.company.username}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.company.username && (
                <p style={styles.error}>{errors.company.username}</p>
              )}

              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.company.password}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.company.password && (
                <p style={styles.error}>{errors.company.password}</p>
              )}

              {errorMessage && <p style={styles.error}>{errorMessage}</p>}

              <button type="submit" style={styles.signInButton}>
                Sign In
              </button>
            </>
          ) : (
            <>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Click to sign in with Microsoft"
                value={formData.internal.email}
                onClick={handleEmailClick}
                readOnly
                style={{
                  ...styles.input,
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                }}
              />
              {errors.internal.email && (
                <p style={styles.error}>{errors.internal.email}</p>
              )}
              {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
