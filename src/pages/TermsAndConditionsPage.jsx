import LegalPageLayout from '../components/LegalPageLayout';
import { siteInfo } from '../constants/siteInfo';

function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions" updatedOn="2026-02-23">
      <p>
        These terms govern your use of {siteInfo.website} and services offered by {siteInfo.legalName}. By booking a ticket,
        you agree to these terms.
      </p>

      {/* Detailed Ticket Terms and Conditions */}
      <ul className="list-disc pl-6 mb-6 text-sm text-gray-800">
        <li>Ticket is valid for single entry only.</li>
        <li>Ticket once booked can not be exchanged or cancelled for refund.</li>
        <li>Prices are standard for adult and senior citizen.</li>
        <li>Children below 4 feet will be given Rs. 100/- Discount.</li>
        <li>Entry for children below 3 ft will be free.</li>
        <li>All personal items will be inspected at the time of entry.</li>
        <li>Outside food & beverages, water bottle, alcohol, Cigarettes are not allowed inside the park.</li>
        <li>Locker facility is available at nominal rates.</li>
        <li>Cotton clothes are not allowed inside the pools. Swimming costumes are available at reasonable rates.</li>
        <li>Management is not responsible for any theft, mishap or any physical / mental or any other personal damages.</li>
        <li>Management is not liable for technical snag of any ride etc.</li>
        <li>Rights of admission are reserved.</li>
        <li>Ticket price is inclusive of all taxes.</li>
        <li>Management reserves the right to change the ticket rates without any intimation.</li>
        <li>Food will be available on order as per your choice & availability.</li>
        <li>The Management is not responsible for any kind of physical injury or loss of life due to major organ injury.</li>
        <li>Any Nuisance / Antisocial Behavior will not be tolerated and such nuisance creating customers will not be allowed to enjoy park further.</li>
        <li>I have read all the rules and regulation.</li>
        <li>It is customer's own responsibility to follow all rules & regulations. Management will not be responsible for any mishap, untoward consequences.</li>
        <li>I (Customer) will follow all the rules and regulation.</li>
      </ul>

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
