import React from "react";
import PageRouter from "./Route";
import Header from "./Layout/Header";
import Drawer from "./Layout/Drawer";
import Footer from "./Layout/Footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLoadUserAction } from "./store/actions/userActions";
import { UserOptions } from "./components";
import { FetchAPI } from "./store/lib/callApi";

function App() {
  const [position, setPosition] = React.useState("left");
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawer = (position, isOpen) => {
    setPosition(position);
    setIsOpen(isOpen);
  };

  const [stripeKey, setStripeKey] = React.useState("");

  const getStripeApiKey = React.useCallback(async () => {
    const { responseData } = await FetchAPI("/stripekey");

    setStripeKey(responseData?.stripeApiKey);
  }, []);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(onLoadUserAction());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  const location = useLocation();

  const adminPathname = location.pathname.split("/")[1];

  return (
    <>
      {adminPathname !== "admin" && <Header handleDrawer={handleDrawer} />}

      {isAuthenticated && <UserOptions user={user} />}
      <Drawer setIsOpen={setIsOpen} setPosition={setPosition} isOpen={isOpen} />
      <PageRouter stripeKey={stripeKey} />
      {adminPathname !== "admin" && <Footer />}
    </>
  );
}

export default App;
