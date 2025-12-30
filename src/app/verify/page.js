import { Suspense } from "react";
import { Nav } from "@/components/ui/nav";
import { Spinner } from "@/components/ui/spinner";
import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";
import { ForgetPasswordVerificationFormWrapper } from "./verify-wrapper";

export default function Login() {
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col items-center "
      style={{
        background:
          "radial-gradient(125% 125% at 50% 100%, #000000 40%, #0A1C57 100%)",
      }}
    >
      <Suspense fallback={<Spinner />}>
        <Nav
          navItems={[]}
          navButtons={[
            { id: "login", navButtonName: "Login", redirectLink: "/" },
            { id: "try", navButtonName: "Try Now", redirectLink: "/register" },
          ]}
          className="mx-auto"
        />

        <ForgetPasswordVerificationFormWrapper />
      </Suspense>

      <FooterColumns01 />
    </div>
  );
}
