"use client";

import { Github, Linkedin, Heart } from "lucide-react";


const LINKS = [
  
  {
    title: "Pages",
    items: [
      { title: "Login", href: "/login" },
      { title: "Register", href: "/register" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Terms", href: "/terms" },
    ],
  },
];

const YEAR = new Date().getFullYear();

export const title = "Multi-Column Footer";

export function FooterColumns01() {
  return (
    <footer className="w-full border-t border-focused bg-[#0f0f0f] py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h6 className="text-xl font-semibold text-focused cursor-pointer" href="/">Neuraletter</h6>
            <p className="my-3 max-w-sm text-sm text-white/80">
              The next generation of newsletters.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:flex sm:gap-14">
            {LINKS.map(({ title, items }) => (
              <ul key={title} className="space-y-2 ">
                <p className="mb-2 font-semibold text-focused">{title}</p>
                {items.map(({ title, href }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-sm text-white/80 transition-colors hover:text-primary"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 text-[16px] font-semibold text-focused">
              <span>Made with</span>
              <Heart className="h-5 w-5 text-focused" fill="currentColor" />
            </div>
            <p className="mt-2 text-sm text-white/80">
              by <span className="font-medium text-white">Md. Raihan Hossen</span>
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href="https://www.linkedin.com/in/mdraihanhossen"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-focused"
                aria-label="LinkedIn: mdraihanhossen"
              >
                <Linkedin className="h-4 w-4" />
                <span>mdraihanhossen</span>
              </a>
              <a
                href="https://github.com/mdraihan27"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-focused"
                aria-label="GitHub: mdraihan27"
              >
                <Github className="h-4 w-4" />
                <span>mdraihan27</span>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          &copy; {YEAR} Neuraletter. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
