function About() {
  const values = [
    { title: "Quality First", desc: "We source only specialty-grade beans, roasted in small batches for peak freshness." },
    { title: "Sustainability", desc: "Direct trade partnerships with farmers who share our commitment to ethical sourcing." },
    { title: "Community", desc: "Every cup supports local growers and our neighborhood — one order at a time." },
  ];

  return (
    <div>
      <section className="text-center py-16 px-8 bg-coffee-light">
        <h1 className="text-4xl font-bold text-coffee-dark">About Bean & Brew</h1>
        <p className="mt-3 text-gray-700 max-w-xl mx-auto">
          We're more than a coffee shop — we're a gathering place built on craft, care, and community.
        </p>
      </section>

      <section className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">What We Stand For</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {values.map((v) => (
            <div key={v.title} className="border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-coffee-dark mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 max-w-4xl mx-auto text-center bg-gray-50 rounded-xl mb-12">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-600">
          To serve exceptional coffee while creating a warm space where people connect,
          work, and unwind — one carefully crafted cup at a time.
        </p>
      </section>
    </div>
  );
}

export default About;