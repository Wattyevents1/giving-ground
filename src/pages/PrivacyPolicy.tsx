import Layout from "@/components/layout/Layout";

const sections = [
  { title: "1. Information We Collect", content: "We collect information you provide directly, including your name, email address, phone number, and payment information when you make donations. We also collect information about your interactions with our website." },
  { title: "2. How We Use Your Information", content: "We use your information to process donations, communicate about our projects, send receipts and tax documents, and improve our services. We never sell your personal information to third parties." },
  { title: "3. Data Security", content: "We implement appropriate security measures to protect your personal information. All payment processing is handled through secure, encrypted channels via our payment partners." },
  { title: "4. Cookies", content: "We use cookies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences." },
  { title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal data. Contact us at info@alimranmuslimaid.org to exercise these rights." },
  { title: "6. Contact", content: "For questions about this privacy policy, please contact us at info@alimranmuslimaid.org or write to us at Plot 9 Namakwekwe, Mbale, Uganda." },
];

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
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

export default PrivacyPolicy;
