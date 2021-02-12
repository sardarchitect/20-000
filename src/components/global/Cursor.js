// MODULE IMPORTS
import React, { useEffect, useState } from "react";
import classNames from "classnames";
// STYLE IMPORTS
import "./_cursor.scss";
import { useHistory } from "react-router-dom";

const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
  };


export const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = React.useState(false);
    const [hidden, setHidden] = useState(false);
  
    const history = useHistory()

    useEffect(() => {
      addEventListeners();
      handleLinkHoverEvents();
      console.log('Cursor Mounted');
      return () => removeEventListeners();
    }, [history.location.pathname]);
  
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };
  
    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
  
    const onMouseDown = () => {
      setClicked(true);
    };
  
    const onMouseUp = () => {
      setClicked(false);
    };
  
    const onMouseLeave = () => {
      setHidden(true);
    };
  
    const onMouseEnter = () => {
      setHidden(false);
    };
  
    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a , #nav-icon4").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true));
        el.addEventListener("mouseout", () => setLinkHovered(false));
      });
    };
  
    const cursorClasses = classNames("cursor", {
      "cursor--clicked": clicked,
      "cursor--hidden": hidden,
      "cursor--link-hovered": linkHovered
    });

    if (typeof navigator !== "undefined" && isMobile()) return null;

  return (
    <div
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};