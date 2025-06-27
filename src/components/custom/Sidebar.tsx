"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSidebarStore } from "@/store/sidebarStore";
import Image from "next/image";

const links = [
  { href: "/home", label: "Home", icon: "home" },
  { href: "/products", label: "Products", icon: "mail" },
  { href: "/uploads", label: "Upload", icon: "mail" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed, toggleCollapse } = useSidebarStore();

  return (
    <aside
    className={clsx(
      "h-screen border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700 text-black dark:text-white p-4 flex flex-col justify-between transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-auto"
    )}
  >
      {/* Nav Links */}
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "flex items-center px-3 py-2 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700",
              pathname === link.href && "bg-gray-200 dark:bg-gray-800 font-semibold"
            )}
          >
            <Image
              src={`/${link.icon}.svg`}
              alt={`${link.label} icon`}
              width={24}
              height={24}
              className="w-5 h-5"
            />
            {!collapsed && <span className="pl-3">{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="mt-auto mb-12 ">
        <button
          onClick={toggleCollapse}
          className="flex items-center w-full px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Image
            src="/chevron-left.svg"
            alt="Toggle Sidebar"
            width={20}
            height={20}
            className={clsx(
              "w-5 h-5 transform transition-transform",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="pl-3">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
