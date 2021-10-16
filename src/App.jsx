import React from "react";
import PageRouter from "./Route";
import Header from "./Layout/Header";
import Drawer from "./Layout/Drawer";
import Footer from "./Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { onLoadUserAction } from "./store/actions/userActions";
import { UserOptions } from "./components";

function App() {
  const [position, setPosition] = React.useState("left");
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawer = (position, isOpen) => {
    setPosition(position);
    setIsOpen(isOpen);
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(onLoadUserAction());
  }, []);

  return (
    <>
      <Header handleDrawer={handleDrawer} />

      {isAuthenticated && <UserOptions user={user} />}
      <Drawer setIsOpen={setIsOpen} setPosition={setPosition} isOpen={isOpen} />
      <PageRouter />
      <Footer />
    </>
  );
}

export default App;
