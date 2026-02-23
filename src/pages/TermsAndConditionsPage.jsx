import LegalPageLayout from '../components/LegalPageLayout';
import { siteInfo } from '../constants/siteInfo';

function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions" updatedOn="2026-02-23">
      <p>
        These terms govern your use of {siteInfo.website} and services offered by {siteInfo.legalName}. By booking a ticket,
        you agree to these terms.
      </p>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Booking and entry</h2>
        <p>Tickets are valid only for the booked date and are subject to park capacity, safety, and operational conditions.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Guest conduct</h2>
        <p>
          Guests must comply with all ride, pool, and safety instructions. Dangerous behavior can result in denied entry
          without refund.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Pricing and taxes</h2>
        <p>Displayed prices are in INR and may include or exclude taxes as shown at checkout.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Cancellations and refunds</h2>
        <p>All cancellations and refunds are handled as per our published Cancellation and Refund Policy.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Support</h2>
        <p>
          For booking support, contact {siteInfo.supportEmail} or {siteInfo.supportPhoneDisplay}.
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default TermsAndConditionsPage;
