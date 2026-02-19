"use client";

import Image from "next/image";
import { ShimmerButton } from "@/components/ui/imported/shimmer-button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function NavItem({ navItemName, targetRef, offset, onClick }) {
  return (
    <button
      className="text-white font-normal text-[16px] cursor-pointer hover:text-focused transition-colors"
      onClick={() => {
        if (targetRef?.current) {
          const elementTop = targetRef.current.getBoundingClientRect().top;
          const scrollY = window.scrollY + elementTop - offset;
          window.scrollTo({ top: scrollY, behavior: "smooth" });
        }
        onClick?.();
      }}
    >
      {navItemName}
    </button>
  );
}

function NavButton({ id, navButtonName, redirectLink, mobile }) {
  if (id === "try") {
    return (
      <ShimmerButton
        className={`flex gap-1 h-[46px] rounded-full cursor-pointer ${mobile ? "w-full max-w-[280px] justify-center px-[30px]" : "ps-[30px] w-[120px] me-[7px]"
          }`}
        onClick={() => (window.location.href = redirectLink)}
      >
        Try Now{" "}
        <Image
          src="/images/icons/arrow_forward.svg"
          alt=""
          width={18}
          height={18}
        />
      </ShimmerButton>
    );
  } else {
    return (
      <button
        className={`text-white font-normal cursor-pointer hover:text-focused transition-colors ${mobile ? "text-[18px]" : "text-[16px]"
          }`}
        onClick={() => (window.location.href = redirectLink)}
      >
        {navButtonName}
      </button>
    );
  }
}

export function Nav({ navItems, navButtons }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Desktop Nav Bar ─── */}
      <div className="hidden lg:flex w-full max-w-5xl h-18 rounded-full border border-[#92adff30] backdrop-blur-3xl bg-linear-to-tr from-[#0000005] to-[#ffffff5] justify-between items-center mx-auto fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-2 ms-5 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image
            src="/images/neuraletter_logo.png"
            alt="logo"
            width={20}
            height={20}
          />
          <p className="text-white font-bold text-[21px]">NeuraLetter</p>
        </div>

        <div className="flex justify-around px-4 gap-10 ms-1 items-center">
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.id}
              navItemName={navItem.navItemName}
              targetRef={navItem.targetRef}
              offset={navItem.offset}
            />
          ))}
        </div>
        <div className="flex justify-between px-2 gap-5 items-center">
          {navButtons.map((navButton) => (
            <NavButton
              id={navButton.id}
              key={navButton.id}
              navButtonName={navButton.navButtonName}
              redirectLink={navButton.redirectLink}
            />
          ))}
        </div>
      </div>

      {/* ─── Mobile / Tablet Nav Bar ─── */}
      <div className="flex lg:hidden w-[calc(100%-2rem)] max-w-xl h-16 rounded-full border border-[#92adff30] backdrop-blur-3xl bg-[#0a0a0a]/80 justify-between items-center mx-auto fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image
            src="/images/neuraletter_logo.png"
            alt="logo"
            width={18}
            height={18}
          />
          <p className="text-white font-bold text-[18px]">NeuraLetter</p>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-white p-2 cursor-pointer"
          aria-label="Open menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ─── Mobile / Tablet Full-screen Menu Overlay ─── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col lg:hidden"
        >
          {/* Close button */}
          <div className="flex justify-end p-6 relative z-[110]">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white p-2 cursor-pointer pointer-events-auto"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Menu content */}
          <div className="flex flex-col items-center justify-center flex-1 gap-10 -mt-16">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/neuraletter_logo.png"
                alt="logo"
                width={28}
                height={28}
              />
              <p className="text-white font-bold text-2xl">NeuraLetter</p>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((navItem) => (
                <button
                  key={navItem.id}
                  className="text-white/80 font-medium text-xl cursor-pointer hover:text-focused transition-colors"
                  onClick={() => {
                    if (navItem.targetRef?.current) {
                      const elementTop =
                        navItem.targetRef.current.getBoundingClientRect().top;
                      const scrollY =
                        window.scrollY + elementTop - navItem.offset;
                      window.scrollTo({ top: scrollY, behavior: "smooth" });
                    }
                    setMenuOpen(false);
                  }}
                >
                  {navItem.navItemName}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-16 h-px bg-[#92adff40]" />

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-5">
              {navButtons.map((navButton) => (
                <NavButton
                  id={navButton.id}
                  key={navButton.id}
                  navButtonName={navButton.navButtonName}
                  redirectLink={navButton.redirectLink}
                  mobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
