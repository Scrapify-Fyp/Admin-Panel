import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "./Redux/actions/authaction";
import Cookies from 'js-cookie';
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/Adminlogin`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data.success !== undefined && response.data.success === false) {
        dispatch(loginFailure(response.data.msg));
        setError(response.data.msg);
    } else {
        dispatch(loginSuccess(response.data.user));
        // console.log("hahahah...");
        Cookies.set('token', response.data.token, { expires: 7 }); 
        navigate('/admin/dashboard');
    }
    } catch (err:any) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 400) {
        setError(err.response.data.msg);        
      } else {
        setError("An error occurred. Please try again.");
      }
    }
    finally {
      setIsLoading(false);
    }
  }, 500);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#0073ff",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>
        {error && (
          <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
        )}
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
          Forgot your password?{" "}
          <a href="#" style={{ color: "#0073ff" }}>
            Click here
          </a>
        </p>
      </div>
    </div>
  );
}

export default connect(null, { loginSuccess, loginFailure })(LoginPage);
