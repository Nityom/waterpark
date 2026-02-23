function LegalPageLayout({ title, updatedOn, children }) {
  return (
    <section className="bg-white py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#461AA2] mb-2">{title}</h1>
        <p className="text-sm text-gray-600 mb-6">Last updated: {updatedOn}</p>
        <div className="space-y-5 text-gray-800 leading-relaxed text-sm md:text-base">{children}</div>
      </div>
    </section>
  );
}

export default LegalPageLayout;
