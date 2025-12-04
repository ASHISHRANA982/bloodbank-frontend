import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import Lenis from "@studio-freight/lenis";
import { Provider } from "react-redux";
import { store } from "./api-redux/store.js";

function Main() {
  useEffect(() => {
    // ---------- helper: stop propagation for internal scrollable cards ----------
    const stopWheelIfInCard = (e) => {
      try {
        // If event originated inside either card, stop propagation so Lenis won't hijack
        if (e.target.closest(".rb-card") || e.target.closest(".donor-card")) {
          e.stopPropagation();
        }
      } catch (err) {
        // ignore
      }
    };

    const stopTouchMoveIfInCard = (e) => {
      try {
        if (e.target.closest(".rb-card") || e.target.closest(".donor-card")) {
          e.stopPropagation();
        }
      } catch (err) { /* ignore */ }
    };

    // Use non-passive so we can stop propagation before Lenis handles it
    document.addEventListener("wheel", stopWheelIfInCard, { passive: false });
    document.addEventListener("touchmove", stopTouchMoveIfInCard, { passive: false });

    // ---------- init Lenis (safe config) ----------
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ---------- navbar shrink ----------
    const onScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;
      if (window.scrollY > 30) navbar.classList.add("shrink");
      else navbar.classList.remove("shrink");
    };
    window.addEventListener("scroll", onScroll);

    // ---------- cleanup ----------
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("wheel", stopWheelIfInCard);
      document.removeEventListener("touchmove", stopTouchMoveIfInCard);
    };
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
