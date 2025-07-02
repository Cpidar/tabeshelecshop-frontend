import React from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";


async function Navigation() {
  return (
    <ul className="nc-Navigation flex items-center">
      {[].map((item, index) => (
        <NavigationItem key={index+1} menuItem={item  as unknown as NavItemType} />
      ))}
    </ul>
  );
}

export default Navigation;
