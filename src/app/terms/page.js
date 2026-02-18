export const metadata = {
  title: "Terms of Use | Neuraletter",
  description: "Terms of Use for Neuraletter.",
};

import { Nav } from "@/components/ui/nav";
import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using Neuraletter, you agree to these Terms of Use and any updates we publish. If you do not agree, do not use the service.",
    ],
  },
  {
    title: "2. User Responsibility and Accountability",
    body: [
      "You are solely responsible for every action you take on Neuraletter, including any content you submit, prompts you provide, newsletters you generate, and the decisions you make based on outputs.",
      "Neuraletter does not verify the accuracy, legality, or appropriateness of user inputs or outputs. You are responsible for validating, reviewing, and using information safely and lawfully.",
      "You are responsible for ensuring your use complies with all applicable laws, regulations, and third-party rights, including data protection and intellectual property requirements.",
    ],
  },
  {
    title: "3. Content You Provide",
    body: [
      "You retain ownership of the content you submit. You represent that you have the necessary rights and permissions to use and share that content.",
      "You may not submit content that is unlawful, infringing, deceptive, abusive, discriminatory, or otherwise harmful.",
      "You are responsible for securing consent where required, including for personal data, email recipients, and proprietary materials.",
    ],
  },
  {
    title: "4. AI-Generated Outputs",
    body: [
      "Outputs are generated from your inputs and may be incomplete, incorrect, or biased. They are provided for informational purposes only.",
      "You are solely responsible for reviewing, editing, and validating outputs before publishing, distributing, or acting on them.",
      "Neuraletter is not responsible for decisions, actions, or outcomes that result from your use of generated content.",
    ],
  },
  {
    title: "5. Prohibited Uses",
    body: [
      "You may not use Neuraletter to create, publish, or distribute content that is illegal, harmful, or violates third-party rights.",
      "You may not attempt to bypass security, scrape data, overload the service, or reverse engineer our systems.",
      "You may not use the service to send unsolicited emails, spam, or deceptive communications.",
    ],
  },
  {
    title: "6. Third-Party Services and Links",
    body: [
      "Neuraletter may link to or integrate with third-party services. Those services are governed by their own terms and privacy policies.",
      "We are not responsible for third-party content, availability, or actions. Your use of third-party services is at your own risk.",
    ],
  },
  {
    title: "7. Security and Account Access",
    body: [
      "You are responsible for maintaining the confidentiality of your account credentials and any activity that occurs under your account.",
      "You must notify us immediately of any unauthorized access or suspected security breach.",
    ],
  },
  {
    title: "8. Disclaimer of Warranties",
    body: [
      "Neuraletter is provided on an \"as is\" and \"as available\" basis. We make no warranties, express or implied, regarding the service, outputs, or availability.",
      "We do not guarantee accuracy, reliability, or fitness for a particular purpose.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Neuraletter and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      "Our total liability for any claim is limited to the amount you paid to use the service in the 12 months before the claim, or zero if you used a free plan.",
    ],
  },
  {
    title: "10. Indemnification",
    body: [
      "You agree to defend, indemnify, and hold harmless Neuraletter and its affiliates from any claims, damages, liabilities, and expenses arising from your use of the service or your content.",
    ],
  },
  {
    title: "11. Changes and Termination",
    body: [
      "We may update these Terms from time to time. Continued use of the service after changes means you accept the updated Terms.",
      "We may suspend or terminate access if you violate these Terms or pose risk to the service or others.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      "If you have questions about these Terms, please contact us at mdraihanhossen.cse@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <Nav
        navItems={[]}
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "/login" },
          { id: "try", navButtonName: "Try Now", redirectLink: "/register" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-[#0f0f0f] pt-18">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(146,173,255,0.18),transparent_55%)]" />
        <div className="container mx-auto px-4 py-14">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-focused sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            These Terms explain your responsibilities when using Neuraletter. Please
            read them carefully before creating or sending any content.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-[0_0_0_1px_rgba(146,173,255,0.08)]"
            >
              <h2 className="text-lg font-semibold text-focused">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm text-white/75">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 text-sm text-white/70">
          <p>
            Summary: You are responsible for how you use Neuraletter and for any
            content you publish or act on. Always verify outputs and ensure you
            comply with applicable laws and third-party rights.
          </p>
        </div>
      </section>

      <FooterColumns01 />
    </main>
  );
}
