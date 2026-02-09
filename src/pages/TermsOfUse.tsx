import Layout from "@/components/layout/Layout";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing and using the Hope Foundation website, you agree to be bound by these Terms of Use. If you do not agree, please do not use our website." },
  { title: "2. Donations", content: "All donations are voluntary and non-refundable unless required by law. Donation receipts are provided for tax purposes. We reserve the right to allocate donations to the areas of greatest need." },
  { title: "3. Intellectual Property", content: "All content on this website, including text, images, logos, and designs, is the property of Hope Foundation and is protected by copyright laws." },
  { title: "4. User Conduct", content: "You agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the website's functionality." },
  { title: "5. Limitation of Liability", content: "Hope Foundation shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website." },
  { title: "6. Changes to Terms", content: "We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms." },
];

const TermsOfUse = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Terms of Use</h1>
          <p className="text-primary-foreground/80 text-lg">Last updated: February 2026</p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-2xl font-bold mb-4">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfUse;
