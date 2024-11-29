import React from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";
import { NAVIGATION_MENU } from "@/data/navigation";
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

async function Navigation() {
  const  settings = await reader.singletons.settings.read();
  return (
    <ul className="nc-Navigation flex items-center">
      {settings?.header?.navigationMenu.map((item, index) => (
        <NavigationItem key={index+1} menuItem={item  as unknown as NavItemType} />
      ))}
    </ul>
  );
}

export default Navigation;
