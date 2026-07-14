function BrandStory() {
  const milestones = [
    { year: "2015", event: "Bean & Brew opens as a single 200 sq ft cart in Lahore." },
    { year: "2017", event: "First permanent café location, roasting our own beans in-house." },
    { year: "2020", event: "Launched direct-trade partnerships with farms in three regions." },
    { year: "2023", event: "Opened our fifth location and introduced the loyalty program." },
    { year: "2026", event: "Bean & Brew goes online — bringing the café experience to your door." },
  ];

  return (
    <div>
      <section className="text-center py-16 px-8 bg-coffee-light">
        <h1 className="text-4xl font-bold text-coffee-dark">Our Story</h1>
        <p className="mt-3 text-gray-700 max-w-xl mx-auto">
          From a single cart to a community of coffee lovers — here's how it all began.
        </p>
      </section>

      <section className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">The Journey So Far</h2>
        <div className="relative border-l-2 border-coffee-dark pl-6 space-y-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <span className="absolute -left-[31px] top-1 w-3 h-3 bg-coffee-dark rounded-full" />
              <p className="font-bold text-coffee-dark">{m.year}</p>
              <p className="text-gray-600">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 max-w-2xl mx-auto text-center mb-12">
        <p className="text-gray-600 italic">
          "We started with one goal: make coffee that brings people together. That hasn't changed."
        </p>
        <p className="mt-2 font-semibold text-coffee-dark">— The Founders</p>
      </section>
    </div>
  );
}

export default BrandStory;