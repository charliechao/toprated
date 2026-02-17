const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/seo_content.json', 'utf8'));

data['tauranga/trades/renovation-services'] = {
    introText: "Tauranga is one of New Zealand\u2019s fastest-growing cities, and its booming property market makes finding the right renovation company essential. Whether you\u2019re modernising a classic holiday bach in Mount Maunganui, adding an extension to a family home in Papamoa, or completing a full kitchen and bathroom overhaul in the Tauranga CBD, the region\u2019s top-rated renovation specialists bring decades of Bay of Plenty building experience. These certified builders understand local council requirements, coastal building regulations, and the unique challenges of renovating in a subtropical climate \u2014 from moisture management to maximising indoor-outdoor flow. With a strong reputation built on verified reviews, transparent fixed-price quotes, and Master Builder guarantees, Tauranga\u2019s best renovation services deliver stunning results on time and on budget.",
    faqs: [
        {
            question: "How much does a home renovation cost in Tauranga?",
            answer: "Home renovation costs in Tauranga typically range from $1,800 to $3,500 per square metre depending on the scope and specifications. A standard bathroom renovation starts from around $20,000\u2013$35,000, kitchen renovations from $25,000\u2013$65,000, and full house renovations can range from $150,000 to $500,000+ depending on size and complexity. Always get at least three detailed quotes from local Tauranga renovation specialists."
        },
        {
            question: "Do I need building consent for renovations in Tauranga?",
            answer: "Many renovations in the Tauranga and Western Bay of Plenty region require building consent from Tauranga City Council, particularly if you are altering the building structure, plumbing, drainage, or electrical systems. Cosmetic upgrades like painting, new flooring, and replacing kitchen cabinetry typically do not require consent. Your renovation company should handle the consent process as part of their service."
        },
        {
            question: "How long does a typical renovation take in Tauranga?",
            answer: "Timelines vary by project scope: bathroom renovations typically take 3\u20136 weeks, kitchen renovations 4\u20138 weeks, and full home renovations 3\u20136 months. Allow an additional 4\u20138 weeks for building consent processing through Tauranga City Council. The best Tauranga renovation companies provide detailed project timelines upfront so you can plan accordingly."
        },
        {
            question: "What should I look for in a Tauranga renovation company?",
            answer: "Key factors include: Licensed Building Practitioner (LBP) status, membership with Master Builders or NZ Certified Builders, a Halo 10-year residential guarantee, a strong portfolio of completed local projects, transparent fixed-price contracts, and verified Google reviews from Tauranga homeowners. Also check they carry comprehensive insurance and can manage the full consent process."
        },
        {
            question: "Are there special building considerations for coastal renovations in Tauranga?",
            answer: "Yes, coastal properties in Mount Maunganui, Papamoa, and the wider Bay of Plenty face unique challenges including salt air corrosion, higher wind zones, and strict council regulations in coastal erosion zones. Top Tauranga renovation specialists use marine-grade materials, enhanced weatherproofing systems, and designs that maximise the stunning coastal views while meeting all durability requirements."
        }
    ]
};

fs.writeFileSync('data/seo_content.json', JSON.stringify(data, null, 2));
console.log('✅ Tauranga renovation SEO content added');
