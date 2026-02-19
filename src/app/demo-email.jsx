import Image from "next/image";
import { ShineBorder } from "@/components/ui/imported/shine-border";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/imported/accordion";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export function DemoEmail({ title, updates }) {
  return (
    <div className="bg-linear-to-b from-[#ffffff20] to-transparent backdrop-blur-2xl w-[80vw] max-w-[700px] md:w-[500px] lg:w-[700px] h-auto min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] px-5 sm:px-8 py-6 sm:py-10 ps-6 sm:ps-10 rounded-[24px] sm:rounded-[40px] text-white z-40 shadow-2xl inset-3 relative">
      <ShineBorder shineColor={"#92adff"} />
      <div className="flex items-center">
        <div className="bg-white w-[36px] h-[36px] sm:w-[45px] sm:h-[45px] flex items-center justify-center rounded-full shrink-0">
          <img
            src="/images/neuraletter_logo.png"
            alt="Logo"
            width={24}
            height={24}
            className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
          />
        </div>

        <div className="ms-3 sm:ms-4">
          <p className="flex items-center gap-1 sm:gap-2">
            <span className="text-[13px] sm:text-[15px] text-focused font-semibold">
              NeuraLetter
            </span>{" "}
            <span className="opacity-25 text-[12px] sm:text-[15px]">
              {" ("}30 minutes ago{")"}
            </span>
          </p>
          <div className="flex items-center opacity-35 text-[12px] sm:text-[14px]">
            <p>to me</p>
            <img
              src="/images/icons/arrow_drop_down.svg"
              alt="Logo"
              width={24}
              height={24}
              className=""
            />
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-10">
        <h4 className="text-base sm:text-xl">
          Your updates on{" "}
          <span className="font-bold text-focused">{title}</span>
        </h4>

        <div className="text-balance text-justify mt-3 sm:mt-4 wrap-normal overflow-y-auto h-[220px] sm:h-[280px] lg:h-[370px]">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {updates.map((update, i) => (
              <AccordionItem value={`item-${i + 2}`} key={i}>
                <AccordionTrigger>{update.heading}</AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4">
                  <p className="text-sm sm:text-base">{update.body}</p>

                  <a
                    href={update.link}
                    className="flex gap-1 border-b-1 border-focused text-focused w-[40px]"
                  >
                    Link
                    <img
                      src="/images/icons/arrow_outward.svg"
                      alt="Scroll down"
                      width={12}
                      height={12}
                      className="text-black"
                    />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
