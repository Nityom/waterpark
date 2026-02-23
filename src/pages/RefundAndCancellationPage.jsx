import LegalPageLayout from '../components/LegalPageLayout';
import { siteInfo } from '../constants/siteInfo';

function RefundAndCancellationPage() {
  return (
    <LegalPageLayout title="Cancellation and Refund Policy" updatedOn="2026-02-23">
      <p>
        This policy applies to all online and counter ticket bookings made for services provided by {siteInfo.legalName}.
      </p>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">No refund and cancellation</h2>
        <p>
          As published on thewaves.co.in, bookings are non-cancellable and non-refundable. All decisions are final and binding.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Payment reversal issues</h2>
        <p>
          If money is debited and booking confirmation is not received due to technical issues, contact support with transaction details.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Support contact</h2>
        <p>
          Email: {siteInfo.supportEmail}
          <br />
          Phone: {siteInfo.supportPhoneDisplay}
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default RefundAndCancellationPage;
