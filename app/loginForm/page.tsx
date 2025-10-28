"use client";
import LoginForm from "./loginForm";

export default function Login({ onLoginSuccess}: any) {
  return <LoginForm onLoginSuccess={onLoginSuccess} />;
}