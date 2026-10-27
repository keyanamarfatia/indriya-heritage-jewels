import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/policy-page";
import { breadcrumbLd, jsonLd, pageHead, absoluteUrl, SITE_UPDATED, authorLd } from "@/lib/site";
import { CARE_PHONE } from "@/lib/knowledge";

const PATH = "/privacy-policy";
const TITLE = "Privacy Policy | Indriya Temple Jewellery";
const DESCRIPTION =
  "How this student project site handles your data: no accounts, no checkout, no tracking cookies, and anonymous Ask Indriya questions.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    ...pageHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Privacy policy", path: PATH },
      ]),
      jsonLd({
        "@type": "WebPage",
        name: TITLE,
        url: absoluteUrl(PATH),
        dateModified: SITE_UPDATED,
        author: authorLd(),
        publisher: authorLd(),
      }),
    ],
  }),
  component: () => (
    <PolicyPage
      title="Privacy policy"
      crumb="Privacy policy"
      intro="This website is a student project. It does not sell anything and asks for no personal information."
    >
      <section>
        <h2>What we collect</h2>
        <p>
          Nothing that identifies you. There are no accounts, no sign-up forms, no checkout and no
          tracking or advertising cookies.
        </p>
      </section>
      <section>
        <h2>Ask Indriya questions</h2>
        <p>
          If you type a question into the Ask Indriya assistant on the FAQ page, the text of the
          question is saved anonymously, with no name, email or phone number, so we can see which
          questions people ask and improve the answers. The question is sent to an AI service to
          write the answer. Please don&rsquo;t type personal details into it.
        </p>
      </section>
      <section>
        <h2>Gold rate</h2>
        <p>
          The gold rate pop-up loads public market prices from third-party price feeds. It sends no
          information about you.
        </p>
      </section>
      <section>
        <h2>Links to other sites</h2>
        <p>
          Links marked with ↗ open indriya.com or other sites, which have their own privacy
          policies. For anything about an Indriya purchase, contact Indriya customer care on{" "}
          {CARE_PHONE}.
        </p>
      </section>
    </PolicyPage>
  ),
});
