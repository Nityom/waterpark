import LegalPageLayout from '../../components/LegalPageLayout';
import { siteInfo } from '../../constants/siteInfo';

export const metadata = {
  title: 'Shipping and Delivery Policy | The Waves Waterpark Wardha'
}

export default function ShippingAndDeliveryPage() {
  return (
    <LegalPageLayout title="Shipping and Delivery Policy" updatedOn="2026-02-23">
      <p>
        {siteInfo.legalName} provides digital services. No physical goods are shipped for online water park ticket bookings.
      </p>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Delivery mode</h2>
        <p>Booking confirmation is delivered digitally via on-screen confirmation and/or registered contact details.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">Delivery timeline</h2>
        <p>Digital confirmation is typically generated immediately after successful payment.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#461AA2] mb-1">If confirmation is delayed</h2>
        <p>
          Contact support with your transaction reference at {siteInfo.supportEmail} or {siteInfo.supportPhoneDisplay}.
        </p>
      </div>
    </LegalPageLayout>
  );
}
