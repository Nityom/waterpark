import LegalPageLayout from '../components/LegalPageLayout';
import { siteInfo } from '../constants/siteInfo';

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updatedOn="2026-02-23">
      <p>
        {siteInfo.legalName} respects your privacy. This policy explains how we collect and use personal information when you
        visit {siteInfo.website} or make a booking.
      </p>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Information we collect</h2>
        <p>Name, phone number, email address, booking details, and transaction references required to process your booking.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">How we use information</h2>
        <p>
          We use your data to confirm bookings, send ticket or order updates, provide customer support, and meet legal or
          regulatory requirements.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Payments</h2>
        <p>
          Online payments are processed through Razorpay. We do not store your full card or UPI credentials on our servers.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Data sharing</h2>
        <p>
          We only share necessary information with trusted service providers (for example, payment and communication tools) to
          complete your booking.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Contact</h2>
        <p>
          For privacy requests, contact us at {siteInfo.supportEmail} or {siteInfo.supportPhoneDisplay}.
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default PrivacyPolicyPage;
