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
    <div className="bg-linear-to-b from-[#ffffff20] to-transparent backdrop-blur-2xl w-[700px] h-[450px] px-8 py-10 ps-10 rounded-[40px]  text-white  z-40 shadow-2xl inset-3">
      <ShineBorder shineColor={"#92adff"} />
      <div className="flex items-center">
        <div className="bg-white w-[45px] h-[45px] flex items-center justify-center rounded-full ">
          <img
            src="/images/neuraletter_logo.png"
            alt="Logo"
            width={24}
            height={24}
            className=""
          />
        </div>

        <div className="ms-4">
          <p className="flex items-center gap-2 ">
            <span className=" text-[15px] text-focused font-semibold ">
              NeuraLetter
            </span>{" "}
            <span className="opacity-25 text-[15px]">
              {" ("}30 minutes ago{")"}
            </span>
          </p>
          <div className="flex items-center opacity-35 text-[14px]">
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
      <div className="mt-10">
        <h4 className="text-xl">
          Your updates on{" "}
          <span className="font-bold text-focused">{title}</span>
        </h4>

        <div className="text-balance text-justify  mt-4 wrap-normal overflow-y-auto h-[370px] ">
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
                  <p>{update.body}</p>

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
