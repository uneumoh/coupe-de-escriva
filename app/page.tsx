import React from "react";
import Header from "@/components/Headers/header";
import BottomNavBar from "@/components/Navigation/BottomNavBar";
import LiveGameBar from "@/components/Homepage/LiveGameBar";
import MVP from "@/components/Homepage/MVP";
import Container from "@/components/Container";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <Container style={{ padding: "10%" }}>
        <LiveGameBar />
        <MVP />
      </Container>
      <BottomNavBar />
    </div>
  );
}
