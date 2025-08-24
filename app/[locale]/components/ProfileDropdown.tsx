"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { label: "Profile", href: "/profile" },
  { label: "Clients", href: "/clients" },
];

export default function ProfileDropdown({
  locale,
  session,
}: {
  locale: string;
  session: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    // Sign out logic here, for now link to logout
    window.location.href = `/${locale}/auth/signout`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // run only on mount

  if (!session?.userId) {
    return <Link href={`/${locale}/auth/signin`}>Sign in</Link>;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-gray-300 transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="menu-button"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Image
            src="/images/avatar.png"
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </button>
      </div>

      <div
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150 ease-out ${
          isOpen
            ? "scale-100 transform opacity-100"
            : "pointer-events-none scale-95 transform opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={`/${locale}${item.href}`}
              className="block px-4 py-2 text-sm text-white hover:bg-slate-700"
              role="menuitem"
              onClick={() => setIsOpen(false)} // Close dropdown on click
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-700"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
