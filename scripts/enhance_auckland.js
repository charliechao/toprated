const fs = require('fs');

// ─── 1. SEO CONTENT ───────────────────────────────────────────────
const seoContent = JSON.parse(fs.readFileSync('data/seo_content.json', 'utf8'));

const newSeo = {
    "auckland/automotive/car-wash": {
        introText: "Keep your vehicle spotless with Auckland's top-rated car wash and detailing services. From express tunnel washes in Newmarket to premium hand detailing in Ponsonby, Auckland's best car wash operators use eco-friendly products, water-recycling systems, and professional techniques to protect your paintwork while delivering a showroom finish. Whether you need a quick exterior wash or a full interior valet, these trusted operators deliver consistent results across the Auckland region.",
        faqs: [
            { question: "How much does a car wash cost in Auckland?", answer: "Auckland car wash prices range from $15–$25 for a basic exterior wash, $35–$60 for a full interior and exterior clean, and $150–$400+ for premium detailing packages including paint correction and ceramic coating." },
            { question: "Are Auckland car washes eco-friendly?", answer: "Many top-rated Auckland car washes use biodegradable cleaning products and water recycling systems to minimise environmental impact. Look for operators displaying eco-certification or green business credentials." },
            { question: "How often should I wash my car in Auckland?", answer: "In Auckland's coastal climate, it's recommended to wash your car every 1–2 weeks to prevent salt and pollution buildup. Regular washing protects your paintwork and maintains resale value." }
        ]
    },
    "auckland/automotive/panel-beaters": {
        introText: "Auckland's top-rated panel beaters deliver expert collision repair, dent removal, and paint restoration services across the region. Whether you've had a minor carpark ding in Takapuna or need major structural repair after an accident on the motorway, these certified technicians use state-of-the-art equipment, factory-matched paint systems, and manufacturer-approved repair methods. All top-rated Auckland panel beaters work directly with major insurance companies for hassle-free claims processing.",
        faqs: [
            { question: "How much does panel beating cost in Auckland?", answer: "Auckland panel beating costs vary widely: minor dent repairs start from $150–$300, bumper repairs from $400–$800, and major collision repairs can range from $2,000 to $10,000+. Most reputable shops offer free assessments and work directly with your insurer." },
            { question: "How long does panel beating take in Auckland?", answer: "Minor repairs typically take 1–3 days, while major collision work can take 1–3 weeks depending on parts availability and the extent of damage. Top Auckland panel beaters provide courtesy cars during repairs." },
            { question: "Will my car look the same after panel beating?", answer: "Yes — Auckland's best panel beaters use computerised colour-matching systems and factory-grade paints to ensure an invisible repair. Look for operators with manufacturer certifications for the best results." }
        ]
    },
    "auckland/automotive/tyre-shops": {
        introText: "Find Auckland's most trusted tyre shops for new tyres, wheel alignments, balancing, and puncture repairs. From budget-friendly options in South Auckland to premium performance tyre specialists on the North Shore, Auckland's top-rated tyre retailers stock all major brands including Bridgestone, Michelin, Continental, and Pirelli. With mobile fitting services and same-day availability, keeping your vehicle safe on Auckland's roads has never been easier.",
        faqs: [
            { question: "How much do new tyres cost in Auckland?", answer: "Auckland tyre prices range from $80–$150 per tyre for budget brands, $150–$300 for mid-range, and $250–$500+ for premium performance tyres. Prices vary by size — SUV and 4WD tyres typically cost more than standard passenger tyres." },
            { question: "How often should I replace my tyres in Auckland?", answer: "Most tyres last 40,000–80,000 km depending on driving style and road conditions. In Auckland's wet climate, it's critical to replace tyres before tread depth drops below 1.5mm. The legal minimum in New Zealand is 1.5mm." },
            { question: "Do Auckland tyre shops offer wheel alignments?", answer: "Yes, most top-rated Auckland tyre shops offer computerised wheel alignment services from $69–$120. Regular alignments extend tyre life and improve fuel efficiency — recommended every 10,000 km or after hitting a pothole." }
        ]
    },
    "auckland/automotive/car-dealers": {
        introText: "Auckland is New Zealand's largest automotive market, home to hundreds of new and used car dealerships across the region. From premium European franchises in Newmarket and Greenlane to trusted independent dealers on Great South Road, Auckland's top-rated car dealers offer competitive pricing, comprehensive vehicle inspections, finance options, and after-sales warranties. Whether you're looking for a family SUV, a fuel-efficient commuter, or a luxury marque, our curated list features only dealers with consistently outstanding customer reviews.",
        faqs: [
            { question: "What should I look for in an Auckland car dealer?", answer: "Key indicators of a reputable Auckland car dealer include Motor Trade Association (MTA) membership, transparent pricing, comprehensive pre-purchase inspections, written warranties, and strong Google review ratings. Always check the dealer's history on the Motor Vehicle Disputes Tribunal website." },
            { question: "Can I get finance through Auckland car dealers?", answer: "Yes, most top-rated Auckland car dealers offer competitive finance packages through major lenders. Interest rates typically range from 7.9% to 12.9% depending on the vehicle age and your credit profile. Always compare dealer finance with bank rates." },
            { question: "Do Auckland car dealers offer warranties?", answer: "Reputable Auckland dealers offer Consumer Guarantees Act protection plus additional mechanical warranties ranging from 3 months to 3 years depending on the vehicle. New car franchises typically include manufacturer warranties of 3–7 years." }
        ]
    },
    "auckland/automotive/mechanics": {
        introText: "Auckland's top-rated mechanics keep your vehicle running safely and efficiently with expert servicing, WoF inspections, and repairs. From European car specialists in Ponsonby to trusted general mechanics in East Auckland, the city's best workshops combine diagnostic expertise with honest, transparent pricing. Whether you need a routine service, brake replacement, or complex engine diagnostics, these AA-approved and MTA-affiliated mechanics deliver reliable results backed by workmanship guarantees.",
        faqs: [
            { question: "How much does a car service cost in Auckland?", answer: "A basic car service in Auckland costs $150–$250, an intermediate service $250–$400, and a full service $400–$600+. Prices vary by vehicle make — European cars typically cost more to service than Japanese models." },
            { question: "How often should I service my car in Auckland?", answer: "Most manufacturers recommend servicing every 10,000–15,000 km or every 12 months, whichever comes first. Regular servicing is essential for maintaining your warranty and catching potential issues early." },
            { question: "What's the difference between a WoF and a service?", answer: "A Warrant of Fitness (WoF) is a government safety inspection checking brakes, tyres, lights, and structural integrity — it's legally required. A service is preventative maintenance including oil changes, filter replacements, and fluid top-ups to keep your car running optimally." }
        ]
    },
    "auckland/hospitality/bars": {
        introText: "Auckland's bar scene is one of the most vibrant in the Southern Hemisphere, ranging from craft cocktail lounges in Ponsonby to rooftop bars overlooking the Viaduct Harbour. Whether you're after award-winning mixology on Karangahape Road, natural wines in Grey Lynn, or a classic Kiwi pub in Parnell, Auckland's top-rated bars combine exceptional drinks with distinctive atmospheres and welcoming hospitality. Our curated list features the city's most consistently praised establishments.",
        faqs: [
            { question: "What are the best bar areas in Auckland?", answer: "Auckland's top bar precincts include Ponsonby Road for cocktails and wine bars, Britomart and the Viaduct for waterfront drinks, Karangahape Road (K Road) for alternative and craft scenes, and Commercial Bay for upscale rooftop lounges." },
            { question: "What time do bars close in Auckland?", answer: "Most Auckland bars close at midnight on weeknights and 3am on Friday and Saturday nights. Some late-night venues on K Road and in the CBD hold special licences for later closing times." },
            { question: "Do Auckland bars serve food?", answer: "Yes, many of Auckland's top-rated bars offer substantial food menus ranging from bar snacks and sharing plates to full dining menus. Some operate as bar-restaurants with separate dining areas." }
        ]
    },
    "auckland/hospitality/nightclubs": {
        introText: "Auckland's nightlife scene centres around the Viaduct, Britomart, and Karangahape Road precincts, offering everything from sophisticated dance clubs to high-energy late-night venues. The city's top-rated nightclubs feature international and local DJs, premium sound systems, and distinctive design. Whether you prefer electronic music, hip-hop, live bands, or Latin nights, Auckland has a thriving after-dark scene that rivals much larger cities.",
        faqs: [
            { question: "What are the best nightclub areas in Auckland?", answer: "The main nightlife precincts are the Viaduct Harbour and Britomart for upscale clubs, Karangahape Road for alternative and underground venues, and Ponsonby for late-night cocktail lounges. Fort Street and Federal Street also host popular venues." },
            { question: "What's the dress code for Auckland nightclubs?", answer: "Most Auckland nightclubs enforce a smart-casual dress code — collared shirts for men, no jandals or sportswear. Upscale venues may require smart attire. Check individual venue policies before heading out." },
            { question: "How much is a nightclub entry fee in Auckland?", answer: "Entry fees range from free (early entry or guest list) to $10–$30 for standard nights and $30–$60+ for special events and international DJ nights. Many clubs offer free entry before 10–11pm." }
        ]
    },
    "auckland/services/accountants": {
        introText: "Auckland's top-rated accountants provide expert financial guidance for individuals, small businesses, and corporations across New Zealand's largest commercial centre. From tax return specialists in the CBD to boutique advisory firms in Newmarket, Auckland's best accounting practices combine deep technical knowledge with proactive, personalised service. Whether you need GST compliance, annual accounts, business structuring, or strategic growth advice, these chartered accountants deliver measurable results.",
        faqs: [
            { question: "How much does an accountant cost in Auckland?", answer: "Auckland accountant fees range from $150–$300 per hour for individual tax returns, $1,500–$5,000+ for annual business accounts, and $200–$400 per hour for specialist advisory work. Many firms offer fixed-fee packages for standard services." },
            { question: "What should I look for in an Auckland accountant?", answer: "Look for Chartered Accountant (CA) designation from CA ANZ, experience in your industry, proactive tax planning (not just compliance), cloud accounting expertise (Xero, MYOB), and strong client reviews. A good accountant should save you more than they cost." },
            { question: "When is tax return season in New Zealand?", answer: "The New Zealand tax year runs 1 April to 31 March. Individual tax returns are due by 7 July, though extensions are available through tax agents. Top Auckland accountants file returns year-round and help with provisional tax planning." }
        ]
    },
    "auckland/services/lawyers": {
        introText: "Auckland is home to New Zealand's largest legal market, from top-tier commercial firms in the CBD to specialist boutique practices across the region. Whether you need property conveyancing in the Eastern Suburbs, employment law advice for your business, family law support, or commercial litigation, Auckland's top-rated lawyers combine deep expertise with client-focused service. Our curated list features practices consistently praised for communication, results, and value.",
        faqs: [
            { question: "How much do lawyers charge in Auckland?", answer: "Auckland lawyer fees vary by specialisation: property conveyancing from $800–$2,000, simple wills from $300–$600, employment matters from $300–$500/hour, and commercial litigation from $350–$700/hour. Many firms offer free initial consultations and fixed-fee packages for standard work." },
            { question: "How do I choose the right Auckland lawyer?", answer: "Look for a lawyer who specialises in your specific area of law, has strong Google reviews, offers a free initial consultation, provides clear fee estimates upfront, and communicates proactively. Check they hold a current practising certificate with the NZ Law Society." },
            { question: "Do I need a lawyer to buy a house in Auckland?", answer: "Yes, you legally need a lawyer or conveyancer to complete a property purchase in New Zealand. Auckland property lawyers handle title searches, agreement review, settlement, and ensure your interests are protected throughout the transaction." }
        ]
    },
    "auckland/services/real-estate-agents": {
        introText: "Navigating Auckland's dynamic property market requires an experienced, well-connected real estate agent who knows your local area intimately. From luxury waterfront properties on the North Shore to first-home opportunities in South Auckland, the city's top-rated agents combine deep market knowledge with exceptional negotiation skills and marketing reach. Whether you're buying, selling, or investing, our curated list features Auckland's most consistently praised real estate professionals.",
        faqs: [
            { question: "How much commission do Auckland real estate agents charge?", answer: "Auckland agent commissions typically range from 2.5% to 4% of the sale price, often structured as a higher percentage on the first $400,000–$500,000 and a lower rate on the balance. Always negotiate and compare commission structures before signing." },
            { question: "How do I choose a real estate agent in Auckland?", answer: "Look for agents with strong recent sales history in your specific suburb, high vendor and buyer reviews, professional marketing plans, and transparent communication. Interview at least three agents and ask for comparable recent sales data." },
            { question: "What's the Auckland property market like?", answer: "Auckland remains New Zealand's largest and most diverse property market. Median house prices vary significantly by suburb — from $600,000 in outer areas to $2M+ in premium suburbs. Work with a local specialist who understands micro-market trends in your target area." }
        ]
    },
    "auckland/cuisine/chinese-restaurants": {
        introText: "Auckland is home to the largest Chinese community in New Zealand, and its Chinese dining scene is exceptionally diverse and authentic. From traditional Cantonese yum cha in Newmarket to fiery Sichuan hotpot in Dominion Road's famous food strip, hand-pulled noodles in Mt Eden, and refined modern Chinese in the CBD, Auckland offers a depth of Chinese cuisine unmatched anywhere else in the country. Our top-rated Chinese restaurants have been selected for their authenticity, quality ingredients, and consistently outstanding reviews.",
        faqs: [
            { question: "Where is the best area for Chinese food in Auckland?", answer: "Dominion Road is Auckland's most famous Chinese food precinct, stretching from Balmoral to Mt Eden with dozens of authentic restaurants. Other hotspots include Newmarket for yum cha, East Auckland (Botany/Howick) for diverse regional Chinese cuisines, and the CBD for modern Chinese dining." },
            { question: "What styles of Chinese cuisine are available in Auckland?", answer: "Auckland offers virtually every regional Chinese cuisine including Cantonese (yum cha, roast meats), Sichuan (hotpot, mapo tofu), Shanghai (soup dumplings, braised dishes), Northern Chinese (hand-pulled noodles, dumplings), and modern fusion Chinese dining." },
            { question: "Is yum cha popular in Auckland?", answer: "Yes, yum cha (dim sum) is hugely popular in Auckland with many restaurants offering weekend trolley service. Top spots fill up quickly on weekends — arrive before 11am or book ahead for the best experience." }
        ]
    }
};

Object.assign(seoContent, newSeo);
fs.writeFileSync('data/seo_content.json', JSON.stringify(seoContent, null, 2));
console.log(`✅ Added SEO content for ${Object.keys(newSeo).length} Auckland pages`);

// ─── 2. NEW BUSINESSES ────────────────────────────────────────────
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
let maxId = Math.max(...businesses.map(b => b.id));

const newBiz = [
    // Car Wash (currently 1)
    { name: "Kleen Car Wash & Detailing", industry: "Car Wash", city: "Auckland", rating: 4.8, reviews: 320, description: "Premium hand car wash and full detailing service in Newmarket. Eco-friendly products, ceramic coating specialists, and express wash options. Auckland's top-reviewed car care destination.", website: "https://www.kleencarwash.co.nz", address: "Newmarket, Auckland", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "car-wash", neighborhood: "Newmarket" },
    { name: "Diamond Hand Car Wash", industry: "Car Wash", city: "Auckland", rating: 4.7, reviews: 215, description: "Trusted express and premium car wash on the North Shore. Interior detailing, paint correction, and fleet wash services available. Consistently rated Auckland's friendliest car wash team.", website: "https://www.diamondcarwash.co.nz", address: "Takapuna, Auckland", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "car-wash", neighborhood: "Takapuna" },

    // Panel Beaters (currently 1)
    { name: "Smith & Smith Panel & Paint", industry: "Panel Beaters", city: "Auckland", rating: 4.8, reviews: 410, description: "Insurance-approved collision repair specialists with locations across Auckland. Factory-certified for major brands, computerised colour matching, and courtesy cars available. Over 25 years of trusted service.", website: "https://www.smithandsmith.co.nz", address: "Penrose, Auckland", image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "panel-beaters", neighborhood: "Penrose" },
    { name: "Collision Repair Associates", industry: "Panel Beaters", city: "Auckland", rating: 4.7, reviews: 185, description: "Precision panel and paint specialists on the North Shore. MTA-certified with expertise in European, Japanese, and luxury vehicle repairs. Free assessments and insurance liaison.", website: "https://www.collisionrepair.co.nz", address: "Albany, Auckland", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "panel-beaters", neighborhood: "Albany" },

    // Tyre Shops (currently 1)
    { name: "Beaurepaires Auckland Central", industry: "Tyre Shops", city: "Auckland", rating: 4.7, reviews: 520, description: "One of Auckland's most trusted tyre retailers with multiple locations. Stocking Bridgestone, Firestone, and budget brands. Wheel alignments, balancing, and fleet services available.", website: "https://www.beaurepaires.co.nz", address: "Greenlane, Auckland", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "tyre-shops", neighborhood: "Greenlane" },
    { name: "Tony's Tyres & Auto Care", industry: "Tyre Shops", city: "Auckland", rating: 4.8, reviews: 340, description: "Family-owned tyre specialists serving Auckland since 1985. Competitive pricing on all major brands, same-day fitting, and expert advice. Known for honest service and going the extra mile.", website: "https://www.tonystyres.co.nz", address: "Mt Wellington, Auckland", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "tyre-shops", neighborhood: "Mt Wellington" },

    // Car Dealers (currently 2)
    { name: "Giltrap Group", industry: "Car Dealers", city: "Auckland", rating: 4.8, reviews: 890, description: "New Zealand's premier luxury car dealer group representing Audi, Porsche, Lamborghini, Bentley, and McLaren. Multiple award-winning showrooms in Newmarket and Grey Lynn with exceptional after-sales service.", website: "https://www.giltrap.co.nz", address: "Newmarket, Auckland", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "car-dealers", neighborhood: "Newmarket" },

    // Mechanics (currently 2)
    { name: "S&S Auto Electrical & Mechanical", industry: "Mechanics", city: "Auckland", rating: 4.9, reviews: 280, description: "AA-approved workshop specialising in European and Japanese vehicle servicing, WoF inspections, and complex diagnostics. Transparent pricing, honest advice, and a loyal customer following across Central Auckland.", website: "https://www.ssauto.co.nz", address: "Grey Lynn, Auckland", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "automotive", pageSlug: "mechanics", neighborhood: "Grey Lynn" },

    // Chinese Restaurants (currently 1)
    { name: "Barilla Dumpling", industry: "Chinese Restaurants", city: "Auckland", rating: 4.8, reviews: 1450, description: "Auckland institution on Dominion Road famous for hand-pulled noodles and pan-fried dumplings. Authentic Northern Chinese cuisine in a bustling, no-frills atmosphere. Consistently ranked among Auckland's best Chinese restaurants.", website: "https://www.barilladumpling.co.nz", address: "Dominion Road, Balmoral", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "cuisine", pageSlug: "chinese-restaurants", neighborhood: "Balmoral" },
    { name: "Grand Harbour Restaurant", industry: "Chinese Restaurants", city: "Auckland", rating: 4.7, reviews: 980, description: "Premium Cantonese dining and Auckland's premier yum cha destination. Stunning Viaduct Harbour views, traditional trolley service, and fresh seafood tanks. A weekend institution for Auckland families.", website: "https://www.grandharbour.co.nz", address: "Viaduct Harbour, Auckland", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "cuisine", pageSlug: "chinese-restaurants", neighborhood: "Viaduct" },

    // Indian Restaurants (currently 2, has SEO)
    { name: "Paradise Indian Restaurant", industry: "Indian Restaurants", city: "Auckland", rating: 4.7, reviews: 560, description: "Multi-award-winning Indian restaurant in Sandringham with over 35 years of serving authentic North and South Indian cuisine. Famous for biryanis, tandoori specials, and generous vegetarian options.", website: "https://www.paradiseindian.co.nz", address: "Sandringham Road, Auckland", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "cuisine", pageSlug: "indian-restaurants", neighborhood: "Sandringham" },

    // Italian Restaurants (currently 2, has SEO)
    { name: "Prego", industry: "Italian Restaurants", city: "Auckland", rating: 4.8, reviews: 1680, description: "Iconic Ponsonby Road Italian restaurant and one of Auckland's longest-running dining institutions. Beloved for its buzzing atmosphere, wood-fired pizzas, handmade pasta, and exceptional wine list spanning 30+ years.", website: "https://www.prego.co.nz", address: "226 Ponsonby Road, Ponsonby", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "cuisine", pageSlug: "italian-restaurants", neighborhood: "Ponsonby" },

    // Thai Restaurants (currently 2, has SEO)
    { name: "Thai Street", industry: "Thai Restaurants", city: "Auckland", rating: 4.7, reviews: 380, description: "Vibrant Auckland CBD Thai eatery bringing authentic Bangkok street food flavours to New Zealand. Pad see ew, green curry, and mango sticky rice prepared by Thai-born chefs using imported ingredients.", website: "https://www.thaistreet.co.nz", address: "Auckland CBD", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "cuisine", pageSlug: "thai-restaurants", neighborhood: "CBD" },

    // French Restaurants (currently 2, has SEO)
    { name: "Clooney", industry: "French Restaurants", city: "Auckland", rating: 4.9, reviews: 720, description: "One of Auckland's most acclaimed fine dining restaurants blending French technique with New Zealand produce. Multi-award-winning chef-driven tasting menus, an exceptional wine programme, and sophisticated Freemans Bay setting.", website: "https://www.clooney.co.nz", address: "33 Sale Street, Freemans Bay", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "cuisine", pageSlug: "french-restaurants", neighborhood: "Freemans Bay" },

    // Renovation Services (currently 2, has SEO)
    { name: "My House Renovation", industry: "Renovation Services", city: "Auckland", rating: 4.8, reviews: 145, description: "End-to-end Auckland renovation specialists covering kitchen makeovers, bathroom renovations, and full home transformations. Known for transparent fixed-price contracts, detailed 3D design renders, and a Master Builder 10-year guarantee.", website: "https://www.myhouserenovation.co.nz", address: "Grey Lynn, Auckland", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", citySlug: "auckland", categorySlug: "other", pageSlug: "renovation-services", neighborhood: "Grey Lynn" },
];

newBiz.forEach((b, i) => {
    b.id = maxId + 1 + i;
});

businesses.push(...newBiz);
fs.writeFileSync('data/businesses.json', JSON.stringify(businesses, null, 2));
console.log(`✅ Added ${newBiz.length} new Auckland businesses`);
