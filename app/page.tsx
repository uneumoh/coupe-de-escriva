import React from "react";
import HomeScreenPlayerNumber from "@/components/Homepage/homescreenplayernumber";
import Image from "next/image";
import Navbar from "@/components/Navigation/navbar";
import Header from "@/components/header";
import BottomNavBar from "@/components/Navigation/BottomNavBar";
import LiveGameBar from "@/components/Homepage/LiveGameBar";
import MVP from "@/components/Homepage/MVP";
import Container from "@/components/Container";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <Container>
        <LiveGameBar />
        <MVP />
      </Container>
      <BottomNavBar />
    </div>
  );
}
