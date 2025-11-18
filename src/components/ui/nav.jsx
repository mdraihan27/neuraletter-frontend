"use client";

import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function NavItem({ navItemName, redirectLink }) {
  return (
    <button
      className="text-white font-normal text-[16px]"
      onClick={() => (window.location.href = redirectLink)}
    >
      {navItemName}
    </button>
  );
}

function NavButton({ id, navButtonName, redirectLink }) {
  if (id === "try") {
    return (
      <ShimmerButton className="flex gap-1 ps-[30px] h-[46px] w-[120px] rounded-full me-[7px]">
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
        className="text-white font-normal text-[16px]"
        onClick={() => (window.location.href = redirectLink)}
      >
        {navButtonName}
      </button>
    );
  }
}

export function Nav({ navItems, navButtons }) {
  return (
    <div className="w-[1080px] h-[80px] rounded-full border-[1px] border-[#92adff30]  backdrop-blur-3xl bg-linear-to-tr from-[#0000005] to-[#ffffff5] mt-6 flex justify-between items-center ">
      <div className="flex items-center gap-2 ms-5">
        <Image
          src="/images/neuraletter_logo.png"
          alt="logo"
          width={20}
          height={20}
        />
        <p className="text-white font-bold text-[21px] ">NeuraLetter</p>
      </div>

      <div className="flex justify-around px-4 gap-10 ms-1 items-center">
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.id}
            navItemName={navItem.navItemName}
            redirectLink={navItem.redirectLink}
          ></NavItem>
        ))}
      </div>
      <div className="flex justify-between px-2 gap-5 items-center">
        {navButtons.map((navButton) => (
          <NavButton
            id={navButton.id}
            key={navButton.id}
            navButtonName={navButton.navButtonName}
            redirectLink={navButton.redirectLink}
          ></NavButton>
        ))}
      </div>
    </div>
  );
}
