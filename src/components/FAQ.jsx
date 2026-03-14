"use client";
import { useState } from "react";

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState("tickets");
  const [showAllFAQs, setShowAllFAQs] = useState(false);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const faqCategories = [
    {
      title: "Before visiting us",
      icon: "🌊",
      questions: [
        {
          id: "tickets",
          question: "Can I buy tickets from other websites?",
          answer:
            "No, please don’t! 🚫 Purchase tickets only via thewaves.co.in or at our counter. Third-party tickets are not valid.",
        },
        {
          id: "hours",
          question: "What are the opening hours?",
          answer:
            "Water Park: Monday - Sunday, 10:00 AM - 2:00 PM. Adventure Park: Monday - Sunday, 2:00 PM - 5:00 PM.",
        },
        {
          id: "cost",
          question: "How much does a The Waves ticket cost?",
          answer:
            "For testing, ticket prices are currently ₹1. Check our pricing section for the latest rates.",
        },
      ],
    },
    {
      title: "Getting to The Waves",
      icon: "🚗",
      questions: [
        {
          id: "location",
          question: "Where is The Waves located?",
          answer:
            "We're located at 📍Nagpur-Wardha Highway, Maharashtra.",
        },
        {
          id: "parking",
          question: "Is parking available?",
          answer:
            "Yes! Ample parking is available at the waterpark premises.",
        },
      ],
    },
    {
      title: "Group events",
      icon: "🎉",
      questions: [
        {
          id: "birthday",
          question: "Do you have birthday packages?",
          answer:
            "Yes! 🎂 We offer special birthday packages. Contact us for bookings and custom experiences.",
        },
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#DDFBFF] py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12">

      {/* 🫧 FULL SECTION FLOATING BUBBLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>
        <span className="bubble bubble4"></span>
        <span className="bubble bubble5"></span>
        <span className="bubble bubble6"></span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ⭐ HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            FAQ for all your <br /> possible questions
          </h2>

          <button 
            onClick={() => setShowAllFAQs(!showAllFAQs)}
            className="bg-[#461AA2] text-white px-5 md:px-7 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg hover:scale-105 transition-all duration-300"
          >
            {showAllFAQs ? "Show Less FAQ ↑" : "Read More FAQ →"}
          </button>
        </div>

        {/* FAQ CATEGORIES */}
        <div className="space-y-8 md:space-y-14 mb-12 md:mb-20">
          {/* Always show first category */}
          <div className="bg-white/60 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-xl">
            <h3 className="text-xl md:text-2xl font-extrabold text-black mb-5 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-2xl md:text-3xl">{faqCategories[0].icon}</span>
              {faqCategories[0].title}
            </h3>
            <div className="space-y-3 md:space-y-4">
              {faqCategories[0].questions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl md:rounded-2xl border border-[#00D4D4]/50 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className={`w-full flex justify-between items-center px-4 md:px-6 py-3 md:py-5 font-bold text-sm md:text-lg transition-all duration-300 ${
                      openQuestion === item.id
                        ? "bg-[#00D4D4] text-black"
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-left">{item.question}</span>
                    <span
                      className={`text-lg md:text-xl transition-transform duration-300 ml-2 ${
                        openQuestion === item.id ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openQuestion === item.id
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-4 md:px-6 pb-4 md:pb-5 pt-2 text-sm md:text-base text-gray-800 leading-relaxed bg-[#00D4D4]/40">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional categories shown when expanded */}
          {showAllFAQs && faqCategories.slice(1).map((category, idx) => (
            <div key={idx} className="bg-white/60 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-xl">

              {/* Category Title */}
              <h3 className="text-xl md:text-2xl font-extrabold text-black mb-5 md:mb-8 flex items-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl">{category.icon}</span>
                {category.title}
              </h3>

              {/* Questions */}
              <div className="space-y-3 md:space-y-4">
                {category.questions.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl md:rounded-2xl border border-[#00D4D4]/50 overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className={`w-full flex justify-between items-center px-4 md:px-6 py-3 md:py-5 font-bold text-sm md:text-lg transition-all duration-300 ${
                        openQuestion === item.id
                          ? "bg-[#00D4D4] text-black"
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-left">{item.question}</span>

                      <span
                        className={`text-lg md:text-xl transition-transform duration-300 ml-2 ${
                          openQuestion === item.id ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        openQuestion === item.id
                          ? "max-h-60 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-4 md:px-6 pb-4 md:pb-5 pt-2 text-sm md:text-base text-gray-800 leading-relaxed bg-[#00D4D4]/40">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA CARDS */}
       {/* CTA CARDS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

  {/* Card 1 */}
  <div className="relative bg-[#461AA2] rounded-[25px] md:rounded-[35px] p-6 md:p-10 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300">

    {/* Text */}
    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-3 leading-tight relative z-10">
      <span className="text-white">Book your</span> <br />
      <span className="text-[#C5FA19]">adventure</span>
    </h3>

    <a href="/book-tickets" className="mt-4 md:mt-6 bg-white text-[#461AA2] px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold hover:scale-105 transition relative z-10 inline-block">
      Get Tickets →
    </a>

    {/* 🖼 webp-2 Image */}
    <img
      src="/icon-4.webp"
      alt="Adventure Decoration"
      className="absolute bottom-0 right-0 w-40 sm:w-48 md:w-56 lg:w-72 opacity-95 object-contain"
    />
  </div>


  {/* Card 2 */}
  <div className="relative bg-[#461AA2] rounded-[25px] md:rounded-[35px] p-6 md:p-10 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300">

    {/* Text */}
    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-3 leading-tight relative z-10">
      <span className="text-white">Plan your</span> <br />
      <span className="text-[#C5FA19]">group event</span>
    </h3>

    <a href="/book-tickets" className="mt-4 md:mt-6 bg-white text-[#461AA2] px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold hover:scale-105 transition relative z-10 inline-block">
      Explore Groups →
    </a>

    {/* 🖼 webp-3 Image */}
    <img
      src="/icon-5.webp"
      alt="Group Event Decoration"
      className="absolute bottom-0 right-0 w-40 sm:w-48 md:w-56 lg:w-72 opacity-95 object-contain"
    />
  </div>
</div>

      </div>

      {/* 🫧 BUBBLE ANIMATION */}
      <style>
        {`
          .bubble {
            position: absolute;
            bottom: -200px;
            background: rgba(0, 212, 212, 0.25);
            border-radius: 50%;
            animation: floatUp 12s infinite ease-in;
          }

          .bubble1 { width: 50px; height: 50px; left: 8%; }
          .bubble2 { width: 90px; height: 90px; left: 25%; animation-duration: 15s; }
          .bubble3 { width: 40px; height: 40px; left: 50%; animation-duration: 10s; }
          .bubble4 { width: 110px; height: 110px; left: 70%; animation-duration: 18s; }
          .bubble5 { width: 60px; height: 60px; left: 85%; animation-duration: 14s; }
          .bubble6 { width: 35px; height: 35px; left: 95%; animation-duration: 9s; }

          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0.3; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-1400px); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
}

export default FAQ;

