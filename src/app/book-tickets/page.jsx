import Link from "next/link";
import TicketBookingForm from "../../components/TicketBookingForm";
import { siteInfo } from "../../constants/siteInfo";

export const metadata = {
  title: "Book Tickets | The Waves Water Park",
  description: "Choose adult and child tickets in a dedicated booking flow.",
};

export default function BookTicketsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F3EEFF_0%,#FFFFFF_48%,#F7F9FF_100%)] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
           
            <h1 className="mt-2 text-3xl font-extrabold text-[#2B0F6B] md:text-5xl">
              Book Adult and Child Tickets Together
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
              Use this page to choose adult and child quantities in one clean
              booking form.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#D7CBF6] bg-white px-5 py-2.5 text-sm font-semibold text-[#5123B6] transition hover:border-[#5123B6] hover:bg-[#F3EEFF]"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[30px] bg-white p-5 shadow-[0_20px_60px_rgba(81,35,182,0.12)] md:p-7">
            <TicketBookingForm />
          </section>

          <aside className="space-y-5">
            <div className="rounded-[30px] bg-[#5123B6] p-6 text-white shadow-[0_20px_50px_rgba(81,35,182,0.2)]">
              <h2 className="text-2xl font-extrabold">Ticket Pricing</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold">Regular Day</p>
                  <p className="mt-1">Adult: Rs. {siteInfo.pricing.regular.adult}</p>
                  <p>Child: Rs. {siteInfo.pricing.regular.child}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold">Sunday</p>
                  <p className="mt-1">Adult: Rs. {siteInfo.pricing.sunday.adult}</p>
                  <p>Child: Rs. {siteInfo.pricing.sunday.child}</p>
                </div>
                <div className="rounded-2xl bg-[#C5FA19] p-4 text-[#2B0F6B]">
                  <p className="font-bold">Free below 3 ft</p>
                  <p className="mt-1 text-sm font-medium">
                    Very small children enter free based on height.
                  </p>
                </div>
              </div>
            </div>

         
          </aside>
        </div>
      </div>
    </main>
  );
}
