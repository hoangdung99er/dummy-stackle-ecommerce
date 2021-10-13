import React from "react";
import PageRouter from "./Route";
import Header from "./Layout/Header";
import Drawer from "./Layout/Drawer";
import Footer from "./Layout/Footer";

function App() {
  const [position, setPosition] = React.useState("left");
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDrawer = (position, isOpen) => {
    setPosition(position);
    setIsOpen(isOpen);
  };
  return (
    <>
      <Header handleDrawer={handleDrawer} />
      <Drawer setIsOpen={setIsOpen} setPosition={setPosition} isOpen={isOpen} />
      <PageRouter />
      <Footer />
    </>
  );
}

export default App;
