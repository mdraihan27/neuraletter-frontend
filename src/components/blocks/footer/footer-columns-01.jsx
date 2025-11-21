"use client";

import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "#" },
      { title: "Careers", href: "#" },
    ],
  },
  {
    title: "Pages",
    items: [
      { title: "Login", href: "#" },
      { title: "Register", href: "#" },
      { title: "Pricing", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Terms", href: "#" },
      { title: "Privacy", href: "#" },
      { title: "Teams", href: "#" },
      { title: "About Us", href: "#" },
    ],
  },
];

const YEAR = new Date().getFullYear();

export const title = "Multi-Column Footer";

export function FooterColumns01() {
  return (
    <footer className="w-full border-t border-focused pb-8 pt-16 text-white mt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between ">
          <div>
            <h6 className="text-xl font-semibold text-focused">Neuraletter</h6>
            <p className="  my-4 text-sm">
              The next generation of design systems.
            </p>
            <div className="flex gap-1">
              <Button asChild variant="ghost" size="icon">
                <a
                  href="#"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 text-focused" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href="#"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4 text-focused" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href="#"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4 text-focused" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href="#"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 text-focused" />
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-36">
            {LINKS.map(({ title, items }) => (
              <ul key={title} className="space-y-2 ">
                <p className="mb-2 font-semibold text-focused">{title}</p>
                {items.map(({ title, href }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className=" hover:text-primary text-sm transition-colors"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div>
            <p className="text-focused font-semibold text-[16px]">Send us a message</p>
            <p className="text-sm mt-6">You don't need to log in to share your opinion</p>
            <textarea className="bg-slate-900 text-white focus:outline-none p-2 resize-none border-gray-800 border rounded-lg mt-4 w-[300px] h-[100px]" placeholder="Your message"></textarea>
            <Button className="bg-focused hover:bg-hover-focused text-black items-center rounded-[12px] flex justify-center gap-2 w-[90px] h-[50px] text-[18px] font-medium mt-2">
              <p className="">Send</p>
            </Button>
          </div>
        </div>
        <p className=" mt-20 text-center text-sm">
          &copy; {YEAR} Neuraletter. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
