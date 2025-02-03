"use client";

import { Suspense } from "react";
import Navbar from "@components/Front/Navbar";
import Main from "@components/Front/Main";
import Footer from "@components/Front/Footer";

export default function IndexPage() {
  return (
    <Suspense>
      <Navbar/>
      <Main/>
      <Footer/>
      
    </Suspense>
  );
}
