import Link from "next/link";
import TurfBookingForm from "../../components/TurfBookingForm";
import TurfArcadeGame from "../../components/TurfArcadeGame";
import { siteInfo } from "../../constants/siteInfo";

export const metadata = {
  title: "Book Cricket Turf | The Waves Water Park",
  description: "Book Box Cricket and Playground Turf online at ₹499/hr.",
};

export default function BookTurfPage() {
  const pricePerHour = siteInfo.turf?.pricePerHour || 499;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F0EDF9_0%,#FFFFFF_45%,#F3FBF7_100%)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Top Navigation / Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#461AA2]/20 bg-[#461AA2]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#461AA2]">
            🏏 Box Cricket & Playground Turf
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#D7CBF6] bg-white px-5 py-2 text-sm font-semibold text-[#5123B6] transition hover:border-[#5123B6] hover:bg-[#F3EEFF]"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Custom Coded Video Game Banner Header */}
        <div className="mb-8">
          <TurfArcadeGame />
        </div>

        {/* Page Title */}
        <div id="booking-form" className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#2B0F6B] md:text-5xl">
            Book Cricket Turf at ₹{pricePerHour}/hr
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
            Choose your match date, duration, and preferred time slot. Pay and get your instant digital QR ticket.
          </p>
        </div>

        {/* Grid Layout: Booking Form + Sidebar */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[30px] bg-white p-5 shadow-[0_20px_60px_rgba(81,35,182,0.12)] md:p-7 border border-[#EBE6F8]">
            <TurfBookingForm />
          </section>

          <aside className="space-y-5">
            <div className="rounded-[30px] bg-[#461AA2] p-6 text-white shadow-[0_20px_50px_rgba(70,26,162,0.2)]">
              <h2 className="text-2xl font-extrabold">Turf Highlights</h2>
              <div className="mt-5 space-y-3.5 text-sm">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold text-[#C5FA19]">Pricing & Slots</p>
                  <p className="mt-1 text-lg font-bold">₹{pricePerHour} / hour</p>
                  <p className="text-xs text-white/80">Available in 1, 2, 3, or 4-hour slots.</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold text-[#C5FA19]">Operating Hours</p>
                  <p className="mt-1 font-bold">9:00 AM – 11:00 PM</p>
                  <p className="text-xs text-white/80">Day & Night matches with high-power LED floodlights.</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold text-[#C5FA19]">Kit & Equipment Included</p>
                  <p className="mt-1">Bats, tennis balls, and stumps provided free of cost at the turf counter.</p>
                </div>

                <div className="rounded-2xl bg-[#C5FA19] p-4 text-[#2B0F6B]">
                  <p className="font-bold">Instant Entry Ticket</p>
                  <p className="mt-1 text-xs font-medium">
                    Show your generated digital ticket on your phone when arriving at the ground.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#E0D9F5] bg-white p-5 text-gray-700 shadow-sm text-sm">
              <h3 className="font-bold text-[#461AA2] mb-2">Need Help or Tournament Booking?</h3>
              <p className="text-xs text-gray-500 mb-3">
                Call our support team for bulk bookings, private tournaments, and special timings.
              </p>
              <a
                href={`tel:${siteInfo.supportPhone}`}
                className="inline-flex items-center justify-center w-full rounded-full bg-[#FAF7FF] border border-[#461AA2] py-2.5 text-xs font-bold text-[#461AA2] hover:bg-[#461AA2] hover:text-white transition"
              >
                Call {siteInfo.supportPhoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
