import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-20 sm:py-24 md:py-32">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-12">Last updated: January 2024</p>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing and using Verity, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You must be at least 18 years old to use Verity. By using our service, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>You are at least 18 years of age</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You are not prohibited from using the service under applicable law</li>
              <li>You have not been previously banned from Verity</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Account Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and truthful information</li>
              <li>Updating your information to keep it current</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When using Verity, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>Treat all users with respect and courtesy</li>
              <li>Refrain from harassment, hate speech, or abusive behavior</li>
              <li>Not share explicit or inappropriate content</li>
              <li>Not misrepresent your identity or intentions</li>
              <li>Not use the service for commercial purposes without permission</li>
              <li>Not attempt to circumvent safety features or verification</li>
              <li>Report any violations of these guidelines</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Video Calls & Content</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Regarding video calls and content on Verity:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>Do not record, screenshot, or share video calls without consent</li>
              <li>Video content may be monitored for safety and moderation purposes</li>
              <li>Inappropriate behavior will result in immediate account suspension</li>
              <li>We reserve the right to review reported content</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Premium Features</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Verity Plus and other premium features are provided on a subscription basis. By purchasing a subscription:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>You authorize recurring charges until you cancel</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>Refunds are handled according to our refund policy</li>
              <li>Premium features are subject to change</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account at any time for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>Violation of these Terms of Service</li>
              <li>Violation of Community Guidelines</li>
              <li>Fraudulent or illegal activity</li>
              <li>Harassment or abusive behavior</li>
              <li>Any other reason we deem appropriate</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You may delete your account at any time through account settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Verity is provided "as is" without warranties of any kind. We do not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li>Guarantee specific matching results</li>
              <li>Verify all user information (beyond verification features)</li>
              <li>Take responsibility for user conduct or interactions</li>
              <li>Guarantee uninterrupted or error-free service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Verity shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes. Your continued use of Verity after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms, please contact us at:{" "}
              <a href="mailto:legal@verity.app" className="text-primary hover:underline">
                legal@verity.app
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Terms;
