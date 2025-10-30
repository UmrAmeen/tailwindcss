"use client";

import React, { useState } from "react";
import LoginForm from "./dashbord/loginForm/loginForm";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm />;
  }
}
