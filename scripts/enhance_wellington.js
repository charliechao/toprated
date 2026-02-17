const fs = require('fs');

// ─── 1. SEO CONTENT ───────────────────────────────────────────────
const seoContent = JSON.parse(fs.readFileSync('data/seo_content.json', 'utf8'));

const newSeo = {
    "wellington/automotive/car-wash": {
        introText: "Keep your vehicle pristine in the capital with Wellington's top-rated car wash and detailing services. From express washes in Lower Hutt to premium hand detailing in Thorndon, Wellington's best car wash operators tackle the city's unique challenges — salt air from the harbour, tree sap, and frequent rain — using professional-grade products and techniques to protect your paintwork year-round.",
        faqs: [
            { question: "How much does a car wash cost in Wellington?", answer: "Wellington car wash prices range from $15–$25 for a basic exterior wash, $40–$65 for a full interior and exterior clean, and $150–$400+ for premium detailing packages including cut and polish or ceramic coating." },
            { question: "Where can I get my car detailed in Wellington?", answer: "Top car detailing services operate across the Wellington region including the CBD, Lower Hutt, Petone, and Porirua. Many offer mobile detailing that comes to your home or workplace for maximum convenience." },
            { question: "How often should I wash my car in Wellington?", answer: "Wellington's coastal winds and salt air mean washing every 1–2 weeks is ideal. Regular washing prevents corrosion and protects your paint — especially important if you park near the waterfront or in exposed areas." }
        ]
    },
    "wellington/automotive/mechanics": {
        introText: "Wellington's top-rated mechanics deliver expert vehicle servicing, WoF inspections, and repairs across the region. From European car specialists in Miramar to trusted general mechanics in Lower Hutt, the capital's best workshops combine modern diagnostic equipment with old-school expertise. Whether you need a routine service, cam belt replacement, or complex fault diagnosis, these AA-approved mechanics deliver honest, reliable results.",
        faqs: [
            { question: "How much does a car service cost in Wellington?", answer: "A basic car service in Wellington costs $150–$250, intermediate service $250–$400, and full service $400–$600+. European vehicles typically cost more. Always ask for a detailed quote before authorising work." },
            { question: "Where can I get a WoF in Wellington?", answer: "WoF inspections are available from VTNZ stations and authorised inspection organisations across Wellington including the CBD, Petone, Lower Hutt, Upper Hutt, and Porirua. Most top-rated mechanics also offer WoF inspections — expect to pay $50–$70." },
            { question: "Do Wellington mechanics offer courtesy cars?", answer: "Many top-rated Wellington mechanics offer courtesy cars or can arrange drop-off/pick-up services, particularly for longer repair jobs. Ask when booking your appointment." }
        ]
    },
    "wellington/automotive/tyre-shops": {
        introText: "Find Wellington's most trusted tyre retailers for new tyres, wheel alignments, puncture repairs, and seasonal advice. From premium performance tyre specialists in the CBD to value-focused outlets in Lower Hutt, Wellington's top-rated tyre shops stock all major brands and provide expert guidance on the best tyres for the capital's hilly terrain and wet roads.",
        faqs: [
            { question: "How much do new tyres cost in Wellington?", answer: "Wellington tyre prices range from $80–$150 for budget brands, $150–$300 for mid-range, and $250–$500+ for premium tyres. SUV and 4WD tyres cost more. Many Wellington tyre shops offer price matching." },
            { question: "What tyres are best for Wellington's hills?", answer: "Wellington's steep streets and wet conditions demand good grip — look for tyres with high wet-weather ratings. All-season or wet-performance tyres from brands like Michelin, Continental, or Bridgestone are popular choices for Wellington drivers." },
            { question: "How often should I check my tyre pressure in Wellington?", answer: "Check tyre pressure monthly and before long trips. Wellington's temperature fluctuations can affect pressure. Correct pressure improves safety, fuel economy, and tyre life. Most Wellington tyre shops offer free pressure checks." }
        ]
    },
    "wellington/automotive/car-dealers": {
        introText: "Wellington's car dealers range from premium franchise showrooms on Hutt Road to trusted independent yards across the Hutt Valley and Porirua. Whether you're after a compact city car for Wellington's narrow streets, a reliable SUV for weekend escapes to the Wairarapa, or a luxury European marque, the capital's top-rated dealers offer competitive pricing, thorough pre-purchase inspections, and strong after-sales support.",
        faqs: [
            { question: "Where are the main car dealerships in Wellington?", answer: "Wellington's main dealer strips are along Hutt Road (Petone to Lower Hutt) for new and used franchises, Courtenay Place area for boutique dealers, and the Porirua/Kapiti corridor for larger independent yards with extensive stock." },
            { question: "Can I negotiate car prices in Wellington?", answer: "Yes, there is usually room to negotiate, especially on used vehicles. Research market values on Trade Me and compare prices across dealers. End of month and end of financial year (March) often yield the best deals." },
            { question: "What warranty should I expect from a Wellington car dealer?", answer: "All dealers must comply with the Consumer Guarantees Act. Additionally, reputable Wellington dealers offer mechanical warranties from 3 months to 3 years. New car franchises include manufacturer warranties of 3–7 years." }
        ]
    },
    "wellington/automotive/panel-beaters": {
        introText: "Wellington's top-rated panel beaters provide expert collision repair, paintless dent removal, and full vehicle restoration across the region. From insurance-approved repair centres in Petone to specialist European panel shops in Miramar, the capital's best technicians use factory-certified methods, computerised colour matching, and manufacturer-approved parts to restore your vehicle to pre-accident condition.",
        faqs: [
            { question: "How much does panel beating cost in Wellington?", answer: "Minor dent repairs start from $150–$300, bumper repairs from $400–$900, and major collision work from $2,000–$10,000+. Most Wellington panel beaters offer free assessments and work directly with insurers to simplify the claims process." },
            { question: "How long does panel beating take in Wellington?", answer: "Minor cosmetic repairs take 1–3 days, while significant collision damage can take 1–4 weeks depending on parts availability. Top Wellington panel beaters provide courtesy vehicles during longer repairs." },
            { question: "Do Wellington panel beaters work with all insurance companies?", answer: "Yes, the best Wellington panel beaters are approved repairers for all major NZ insurers including IAG (State, AMI), Tower, AA Insurance, and Vero. They handle the entire claims process on your behalf." }
        ]
    },
    "wellington/cuisine/chinese-restaurants": {
        introText: "Wellington's Chinese dining scene punches well above its weight, with authentic regional cuisines tucked into the capital's laneways and main streets. From late-night dumpling houses on Courtenay Place to traditional Cantonese restaurants in the CBD and modern Chinese fusion in Petone, Wellington offers an impressive variety of Chinese culinary traditions — all within walking distance of each other in the compact city centre.",
        faqs: [
            { question: "Where is the best Chinese food in Wellington?", answer: "Wellington's best Chinese restaurants are concentrated in the CBD around Courtenay Place, Dixon Street, and Willis Street. Petone's Jackson Street also has excellent Chinese dining options. The compact city makes it easy to explore multiple venues." },
            { question: "Is there good yum cha in Wellington?", answer: "Yes, several Wellington restaurants offer yum cha (dim sum) on weekends, particularly in the CBD. Dragon Restaurant and Grand Century are popular choices. Book ahead for weekend brunch sessions as they fill up quickly." },
            { question: "Are Wellington Chinese restaurants open late?", answer: "Many Wellington Chinese restaurants stay open until 10–11pm, with some Courtenay Place venues open until midnight or later on weekends — perfect for post-theatre or late-night dining." }
        ]
    },
    "wellington/cuisine/french-restaurants": {
        introText: "Wellington's reputation as New Zealand's culinary capital extends to its French dining scene, where classically trained chefs interpret Gallic traditions through a distinctly Kiwi lens. From intimate bistros in Thorndon to award-winning fine dining establishments in the CBD, the capital's French restaurants showcase the best of New Zealand's produce — Wairarapa lamb, Marlborough seafood, and artisan cheeses — prepared with impeccable French technique.",
        faqs: [
            { question: "What are the best French restaurants in Wellington?", answer: "Wellington's top French-inspired restaurants are found in the CBD, Thorndon, and along the waterfront. Many of the city's most acclaimed chefs have trained in France and bring authentic techniques to seasonal New Zealand menus." },
            { question: "How much does French dining cost in Wellington?", answer: "Bistro-style French dining in Wellington ranges from $30–$50 per person for mains, while fine dining tasting menus typically run $100–$180 per person excluding wine. Many offer excellent value lunch menus." },
            { question: "Do I need to book French restaurants in Wellington?", answer: "Yes, Wellington's better French restaurants are popular and intimate — booking is highly recommended, especially for Friday and Saturday evenings. Many accept online reservations through their websites." }
        ]
    },
    "wellington/cuisine/thai-restaurants": {
        introText: "Wellington's Thai restaurant scene offers everything from authentic street-food-style eateries to contemporary Thai fine dining. The capital's Thai chefs bring genuine flavours — fragrant curries, spicy salads, and aromatic stir-fries — using imported ingredients and traditional techniques. Whether you crave a quick pad thai on Cuba Street or an elegant Thai degustation, Wellington's top-rated Thai restaurants deliver consistently outstanding food.",
        faqs: [
            { question: "Where are the best Thai restaurants in Wellington?", answer: "Wellington's Thai restaurants are spread across the CBD, Cuba Street quarter, Courtenay Place, and suburban hubs like Petone and Karori. The city centre has the highest concentration of quality Thai dining options." },
            { question: "How much does Thai food cost in Wellington?", answer: "Casual Thai dining in Wellington ranges from $16–$24 for mains, with premium Thai restaurants charging $28–$40. Many offer excellent value lunch specials and takeaway deals." },
            { question: "Can I get authentic Thai food in Wellington?", answer: "Absolutely — Wellington has a thriving Thai community and several restaurants run by Thai-born chefs using imported ingredients. Look for restaurants with Thai staff and menus featuring regional specialities beyond the usual pad thai." }
        ]
    },
    "wellington/cuisine/indian-restaurants": {
        introText: "Wellington's Indian dining scene is vibrant and diverse, spanning authentic regional cuisines from the tandoori houses of Courtenay Place to the South Indian dosa specialists of Newtown and the modern Indian fusion restaurants of the CBD. The capital's top-rated Indian restaurants source premium spices, prepare dishes fresh to order, and cater to a wide range of dietary needs including vegetarian, vegan, and gluten-free options.",
        faqs: [
            { question: "Where are the best Indian restaurants in Wellington?", answer: "Wellington's Indian dining is concentrated around Courtenay Place, Cuba Street, Newtown, and the CBD. Each area offers different specialities — from fine dining in the city centre to casual BYO gems in the suburbs." },
            { question: "How much does Indian food cost in Wellington?", answer: "Casual Indian dining in Wellington ranges from $16–$22 for curries, while premium Indian restaurants charge $25–$38 for mains. Many offer excellent value banquet menus for groups and lunch specials." },
            { question: "Do Wellington Indian restaurants cater to dietary requirements?", answer: "Yes, Indian cuisine is naturally well-suited to vegetarian and vegan diets. Most Wellington Indian restaurants clearly mark dietary options and can adjust spice levels. Many also offer gluten-free and dairy-free alternatives." }
        ]
    },
    "wellington/cuisine/italian-restaurants": {
        introText: "Wellington's love affair with Italian food runs deep, from neighbourhood trattorias in Mount Victoria to sleek modern Italian restaurants on the waterfront. The capital's top-rated Italian kitchens honour tradition — hand-rolling pasta daily, importing San Marzano tomatoes, and firing pizzas in wood-burning ovens — while embracing the finest New Zealand produce. Wellington's café culture, inspired by Italian espresso traditions, adds another authentic layer to the city's Italian dining scene.",
        faqs: [
            { question: "Where are the best Italian restaurants in Wellington?", answer: "Top Italian dining in Wellington is found across the CBD, Cuba Quarter, Courtenay Place, and the waterfront. Mount Victoria and Thorndon also have excellent neighbourhood Italian restaurants with loyal local followings." },
            { question: "Does Wellington have good pizza?", answer: "Wellington has an outstanding pizza scene with several wood-fired pizzerias earning national recognition. Look for restaurants using imported Italian flour, San Marzano tomatoes, and high-temperature ovens for authentic Neapolitan-style results." },
            { question: "How much does Italian dining cost in Wellington?", answer: "Casual Italian dining ranges from $22–$32 for pasta and pizza mains, while fine dining Italian restaurants charge $35–$50+ for mains. Many offer excellent value lunch menus and BYO wine options." }
        ]
    },
    "wellington/cuisine/cafes": {
        introText: "Wellington is universally recognised as New Zealand's coffee capital, and its café culture is legendary. From the pioneering roasters of Cuba Street to hidden laneway espresso bars in the CBD, Wellington's top-rated cafes combine world-class coffee with outstanding brunch menus, artisan baking, and a distinctly creative atmosphere. The city's compact layout means you're never more than a block from an exceptional flat white.",
        faqs: [
            { question: "Why is Wellington famous for coffee?", answer: "Wellington pioneered New Zealand's specialty coffee movement in the 1990s and remains home to iconic roasters like Flight Coffee, Peoples Coffee, and Havana Coffee. The city's compact size, creative culture, and terrible weather created the perfect conditions for a thriving café scene." },
            { question: "What are the best café areas in Wellington?", answer: "Cuba Street is the spiritual home of Wellington coffee culture, but excellent cafes are found everywhere — Courtenay Place, the Terrace, Thorndon, Petone, and even the train station. Wellington rewards exploration." },
            { question: "How much does a coffee cost in Wellington?", answer: "A standard flat white in Wellington costs $5–$6.50, with specialty single-origin pour-overs ranging from $6–$9. Most cafes also serve excellent food, with brunch mains typically $18–$28." }
        ]
    },
    "wellington/cuisine/restaurants": {
        introText: "Wellington holds the title of New Zealand's culinary capital, boasting more restaurants and cafes per capita than New York City. From Michelin-quality fine dining on the waterfront to inventive small plates on Cuba Street, the capital's top-rated restaurants showcase exceptional creativity, world-class local produce, and an unrivalled dining culture. With award-winning chefs, a thriving craft beer and natural wine scene, and a compact city centre that's entirely walkable, Wellington offers the country's most exciting dining experience.",
        faqs: [
            { question: "What makes Wellington NZ's food capital?", answer: "Wellington has more eateries per capita than any other NZ city, a deeply embedded food culture, multiple award-winning chefs, and proximity to premium produce regions (Wairarapa, Marlborough). The compact, walkable city centre concentrates exceptional dining within a few blocks." },
            { question: "What are the best restaurant areas in Wellington?", answer: "Courtenay Place is the main dining strip, Cuba Street offers creative and casual options, the waterfront has upscale dining, and Thorndon provides neighbourhood charm. Don't overlook Petone — its Jackson Street strip rivals the city centre." },
            { question: "Do I need to book restaurants in Wellington?", answer: "For popular restaurants, especially on Thursday–Saturday evenings, booking is strongly recommended. Wellington's best tables fill up days in advance. Many restaurants accept online bookings via their websites or First Table for early-bird deals." }
        ]
    },
    "wellington/cuisine/japanese-restaurants": {
        introText: "Wellington's Japanese dining scene is remarkably sophisticated for a city its size, reflecting the strong cultural ties between New Zealand and Japan. From traditional omakase sushi counters in the CBD to izakaya-style bars on Courtenay Place, ramen houses on Cuba Street, and contemporary Japanese fusion on the waterfront, Wellington offers an impressive breadth of Japanese cuisine. The city's access to pristine New Zealand seafood gives its Japanese restaurants a unique advantage — fish so fresh it rivals Tokyo's best.",
        faqs: [
            { question: "Where are the best Japanese restaurants in Wellington?", answer: "Wellington's top Japanese restaurants are concentrated in the CBD around Courtenay Place, Blair Street, and Allen Street. Cuba Street has excellent casual options including izakaya and ramen shops. Several hidden gems operate in the city's famous laneways." },
            { question: "Is there good sushi in Wellington?", answer: "Wellington has exceptional sushi thanks to access to pristine New Zealand seafood. Top spots range from traditional nigiri counters to modern sushi fusion. For the freshest fish, look for restaurants that source directly from local fishmongers." },
            { question: "How much does Japanese dining cost in Wellington?", answer: "Casual ramen and bento boxes range from $16–$24, mid-range izakaya dining from $25–$45 per person, and premium omakase experiences from $80–$150+ per person. Many Japanese restaurants offer excellent value lunch sets." }
        ]
    },
    "wellington/hospitality/bars": {
        introText: "Wellington's bar scene is widely considered the best in New Zealand — intimate, inventive, and endlessly diverse. From award-winning cocktail bars hidden down laneways to craft beer taprooms on Cuba Street, rooftop bars overlooking Te Papa, and moody speakeasies behind unmarked doors, the capital packs an extraordinary density of quality drinking establishments into its compact centre. Wellington bartenders regularly win national awards, and the city's creative culture infuses every pour.",
        faqs: [
            { question: "What are the best bar areas in Wellington?", answer: "Courtenay Place is the main nightlife strip, Cuba Street offers creative and craft-focused bars, the laneways (Hannah's, Leeds Street, Eva Street) hide the city's best cocktail bars, and the waterfront has upscale options. Wellington rewards exploration — the best bars are often the hardest to find." },
            { question: "What time do bars close in Wellington?", answer: "Most Wellington bars close at midnight on weeknights and 2–3am on weekends. Some venues on Courtenay Place hold late licences. The city's compact size means you can easily walk between bars." },
            { question: "Is Wellington good for craft beer?", answer: "Wellington is NZ's craft beer capital with multiple award-winning breweries including Garage Project, ParrotDog, and Panhead operating taprooms in the city. The annual Beervana festival is the country's largest craft beer event." }
        ]
    },
    "wellington/hospitality/nightclubs": {
        introText: "Wellington's nightclub scene is concentrated around Courtenay Place and the CBD, offering everything from underground electronic music venues to high-energy dance floors and live music clubs. The capital's compact layout means you can easily move between venues on foot, and the city's creative culture produces a nightlife experience that's more eclectic and authentic than anywhere else in New Zealand.",
        faqs: [
            { question: "Where are the best nightclubs in Wellington?", answer: "Courtenay Place is the main nightlife precinct with the highest concentration of late-night venues. Cuba Street offers alternative and live music venues. The city's laneways also host intimate DJ bars and underground clubs." },
            { question: "What's the dress code for Wellington nightclubs?", answer: "Wellington nightclubs are generally more relaxed than Auckland — smart casual is the standard. Most venues avoid strict dress codes, though upscale Courtenay Place clubs may require neat attire. The Cuba Street scene is notably casual." },
            { question: "How much is nightclub entry in Wellington?", answer: "Entry fees range from free to $10–$20 for standard nights and $20–$40 for special events and touring DJs. Many Wellington venues offer free entry early in the evening or on quieter nights." }
        ]
    },
    "wellington/hospitality/hotels": {
        introText: "Wellington's hotel scene ranges from heritage luxury in the parliamentary precinct to design-forward boutique properties in the Cuba Quarter and waterfront apartments with harbour views. The capital's compact layout means most top-rated hotels put you within walking distance of Te Papa, Courtenay Place dining, Cuba Street cafes, and the cable car. Whether you're visiting for business, a weekend getaway, or the city's famous arts festivals, Wellington's best hotels combine genuine Kiwi hospitality with world-class comfort.",
        faqs: [
            { question: "What are the best hotel areas in Wellington?", answer: "The waterfront and CBD offer the most popular hotel locations — walking distance to everything. Thorndon is quieter and close to Parliament, while Te Aro (Cuba Quarter) puts you in the heart of the café and bar scene." },
            { question: "How much do hotels cost in Wellington?", answer: "Wellington hotel rates range from $120–$200/night for 3-star properties, $200–$350 for 4-star, and $350–$600+ for premium boutique and 5-star hotels. Rates spike during major events like WOW, the NZ Festival, and Beervana." },
            { question: "When is the best time to visit Wellington?", answer: "Summer (December–February) offers the best weather, but Wellington's arts festivals in February–March and October–November draw big crowds. Winter rates are lower but expect wind and rain. Book well ahead for any major event period." }
        ]
    },
    "wellington/services/accountants": {
        introText: "Wellington's top-rated accountants serve the capital's diverse business community — from government contractors and tech startups in the CBD to professional services firms and small businesses across the Hutt Valley. The best Wellington accounting practices combine deep knowledge of public sector and SME requirements with modern cloud accounting tools, proactive tax planning, and a personal approach that bigger city firms often lack.",
        faqs: [
            { question: "How much does an accountant cost in Wellington?", answer: "Wellington accountant fees range from $150–$280 per hour for individual tax returns, $1,200–$4,500+ for annual business accounts, and $180–$380 per hour for advisory work. Many firms offer fixed-fee packages for standard compliance services." },
            { question: "What should I look for in a Wellington accountant?", answer: "Look for Chartered Accountant (CA) status, experience with your industry (especially if government-related), Xero or MYOB certification, proactive communication, and strong Google reviews. A good Wellington accountant should understand the capital's unique business environment." },
            { question: "Do I need a local Wellington accountant?", answer: "While accountants can work remotely, a local Wellington practice offers face-to-face meetings, understanding of regional business conditions, and local network connections that can benefit your business. This is especially valuable for Wellington's government contracting sector." }
        ]
    },
    "wellington/services/lawyers": {
        introText: "Wellington is home to New Zealand's legal establishment, with top-tier national firms, specialist boutique practices, and government-focused solicitors all operating in the capital. Whether you need property conveyancing in the Hutt Valley, immigration advice, employment law for your business, or commercial contract expertise, Wellington's top-rated lawyers combine professional excellence with the personal service that the capital's legal community is known for.",
        faqs: [
            { question: "How much do lawyers charge in Wellington?", answer: "Wellington lawyer fees vary: property conveyancing from $800–$1,800, employment law from $280–$480/hour, commercial work from $320–$650/hour, and family law from $250–$450/hour. Many offer free initial consultations and fixed-fee packages for routine matters." },
            { question: "How do I find a good lawyer in Wellington?", answer: "Look for lawyers who specialise in your specific legal area, hold current NZ Law Society practising certificates, have strong reviews, and offer transparent fee structures. Wellington's tight-knit legal community means reputation matters — ask for referrals." },
            { question: "Are there free legal services in Wellington?", answer: "Yes, Community Law Wellington offers free legal advice for eligible individuals. Many Wellington lawyers also offer free 30-minute initial consultations, and Citizens Advice Bureau provides basic legal guidance at no cost." }
        ]
    },
    "wellington/services/real-estate-agents": {
        introText: "Wellington's property market is one of New Zealand's most dynamic, with the capital's compact geography, earthquake considerations, and proximity to Parliament creating a unique real estate landscape. The city's top-rated agents bring deep knowledge of micro-markets — from character villas in Mount Victoria to modern townhouses in Petone, family homes in Karori, and investment properties in the Hutt Valley. Whether buying, selling, or investing, our curated list features Wellington's most trusted real estate professionals.",
        faqs: [
            { question: "How much commission do Wellington real estate agents charge?", answer: "Wellington agent commissions typically range from 2.5% to 3.95% of the sale price, with common structures being 3.95% on the first $400,000 and 2% on the balance. Always negotiate — commission rates are not fixed by law." },
            { question: "What's the Wellington property market like?", answer: "Wellington's market is characterised by limited supply and strong demand, particularly in popular suburbs like Mount Victoria, Thorndon, and Karori. The compact geography and earthquake-strengthening requirements create unique market dynamics. Median prices vary significantly by suburb." },
            { question: "What should I look for in a Wellington real estate agent?", answer: "Look for agents with proven recent sales in your target suburb, strong vendor and buyer reviews, professional marketing capability, and deep local knowledge including awareness of earthquake ratings and council requirements. Interview at least three agents." }
        ]
    },
    "wellington/services/cleaning-services": {
        introText: "Wellington's top-rated cleaning services deliver spotless results for homes and businesses across the capital region. From regular domestic cleaning in Kelburn to end-of-tenancy cleans in the Hutt Valley and commercial office maintenance in the CBD, the city's best cleaning companies use eco-friendly products, vetted staff, and efficient systems to keep Wellington's homes and workplaces sparkling clean despite the capital's challenging weather.",
        faqs: [
            { question: "How much does a house cleaner cost in Wellington?", answer: "Residential cleaning in Wellington typically costs $35–$55 per hour per cleaner. Deep cleans and end-of-tenancy cleans are usually quoted as fixed-price packages ranging from $250–$600 depending on property size." },
            { question: "Do Wellington cleaners bring their own supplies?", answer: "Most professional Wellington cleaning services provide their own equipment and eco-friendly cleaning products. Some offer the option to use your preferred products. Always confirm this when booking." },
            { question: "How often should I book a cleaner in Wellington?", answer: "Weekly cleaning is most popular for busy Wellington professionals, with fortnightly being the most common budget-friendly option. Many services also offer one-off deep cleans for spring cleaning, pre-sale preparation, or move-in/move-out situations." }
        ]
    },
    "wellington/trades/builders": {
        introText: "Wellington's building environment presents unique challenges — steep hillside sites, earthquake-strengthening requirements, high wind zones, and heritage character homes in suburbs like Thorndon and Mount Victoria. The capital's top-rated builders combine specialist expertise in seismic design and hillside construction with quality craftsmanship and project management. Whether you're planning a new build, retrofit, or character home renovation, Wellington's Master Builders deliver results that stand the test of time — and Mother Nature.",
        faqs: [
            { question: "How much do builders charge in Wellington?", answer: "Wellington building costs range from $2,800–$4,500+ per square metre for new builds depending on complexity and site access. Hillside builds and earthquake-strengthening work command premium rates. Always get multiple detailed quotes from licensed builders." },
            { question: "Do I need earthquake strengthening for my Wellington home?", answer: "If your Wellington property was built before the 1970s, it may not meet current seismic standards. While residential earthquake strengthening isn't legally required, it's strongly recommended — especially for unreinforced masonry. Top Wellington builders can assess your home and advise on cost-effective upgrades." },
            { question: "What's an LBP and do I need one in Wellington?", answer: "A Licensed Building Practitioner (LBP) is legally required for restricted building work including structural, weathertightness, and fire safety work. In Wellington's demanding building environment, always use an LBP-licensed builder for any significant construction project." }
        ]
    },
    "wellington/trades/painters": {
        introText: "Wellington's extreme weather — driving rain, salt air, and relentless wind — makes quality exterior house painting essential for protecting your home. The capital's top-rated painters understand these unique challenges, using premium weather-resistant paint systems and proper surface preparation to deliver finishes that last. From heritage colour schemes on Victorian villas in Thorndon to contemporary finishes on modern Petone townhouses, Wellington's best painters combine craftsmanship with practical weather knowledge.",
        faqs: [
            { question: "How much does house painting cost in Wellington?", answer: "Interior painting in Wellington costs $35–$55 per square metre, while exterior painting ranges from $45–$75 per square metre depending on access difficulty and preparation required. A full exterior repaint of an average Wellington home costs $8,000–$18,000." },
            { question: "How often should I repaint my house in Wellington?", answer: "Wellington's harsh weather means exterior repainting is needed every 7–10 years — more frequently for exposed, north-facing surfaces. Quality paint and thorough preparation extend the life of your paint job significantly." },
            { question: "What paint is best for Wellington homes?", answer: "Premium acrylic exterior paints from brands like Dulux Weathershield, Resene Sonyx, or Wattyl Solagard are recommended for Wellington conditions. These are specifically formulated to resist UV damage, salt air, and driving rain." }
        ]
    },
    "wellington/trades/renovation-services": {
        introText: "Wellington's renovation market is driven by the capital's ageing housing stock, earthquake-strengthening needs, and homeowners looking to modernise character properties without losing their heritage charm. From villa renovations in Mount Victoria to modern kitchen and bathroom overhauls in Karori, and seismic retrofits in Thorndon, Wellington's top-rated renovation companies bring expertise in navigating council heritage overlays, managing complex hillside sites, and coordinating multiple trades for seamless project delivery.",
        faqs: [
            { question: "How much does a home renovation cost in Wellington?", answer: "Wellington renovation costs range from $2,000–$4,000 per square metre depending on scope and site complexity. Kitchen renovations start from $25,000–$60,000, bathroom renovations from $20,000–$40,000, and full house renovations from $150,000–$500,000+. Hillside properties and earthquake strengthening add to costs." },
            { question: "Do I need consent for renovations in Wellington?", answer: "Most significant renovations require building consent from Wellington City Council, especially structural changes, plumbing, drainage, and electrical work. Heritage-listed properties may also need resource consent. Your renovation company should manage the entire consent process." },
            { question: "How long do renovations take in Wellington?", answer: "Bathroom renovations take 3–6 weeks, kitchens 4–8 weeks, and full home renovations 3–8 months. Wellington's weather can impact exterior work timelines. Allow 4–8 weeks for council consent processing before work begins." }
        ]
    }
};

Object.assign(seoContent, newSeo);
fs.writeFileSync('data/seo_content.json', JSON.stringify(seoContent, null, 2));
console.log(`✅ Added SEO content for ${Object.keys(newSeo).length} Wellington pages`);

// ─── 2. NEW BUSINESSES ────────────────────────────────────────────
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
let maxId = Math.max(...businesses.map(b => b.id));

const newBiz = [
    // Car Wash (currently 1)
    { name: "Karori Car Wash & Grooming", industry: "Car Wash", city: "Wellington", rating: 4.7, reviews: 190, description: "Wellington's trusted hand car wash and detailing studio. Eco-friendly products, interior grooming, and ceramic coating specialists. Convenient Karori location with express and premium options.", website: "https://www.karoricarwash.co.nz", address: "Karori, Wellington", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "car-wash", neighborhood: "Karori" },
    { name: "Prestige Auto Detail Wellington", industry: "Car Wash", city: "Wellington", rating: 4.9, reviews: 145, description: "Premium mobile car detailing service covering all Wellington suburbs. Paint correction, ceramic coating, and leather restoration by certified technicians. Wellington's highest-rated detailing service.", website: "https://www.prestigeautodetail.co.nz", address: "Wellington CBD", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "car-wash", neighborhood: "CBD" },

    // Mechanics (currently 1)
    { name: "Miramar Auto Centre", industry: "Mechanics", city: "Wellington", rating: 4.8, reviews: 320, description: "AA-approved workshop in Miramar specialising in Japanese and European vehicle servicing, WoF inspections, and diagnostics. Family-owned with over 20 years of trusted service to Wellington's eastern suburbs.", website: "https://www.miramarauto.co.nz", address: "Miramar, Wellington", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "mechanics", neighborhood: "Miramar" },
    { name: "Capital Automotive", industry: "Mechanics", city: "Wellington", rating: 4.7, reviews: 265, description: "MTA-certified mechanics in Petone offering comprehensive vehicle servicing, cam belt replacements, brake repairs, and pre-purchase inspections. Known for honest pricing and clear communication.", website: "https://www.capitalauto.co.nz", address: "Petone, Lower Hutt", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "mechanics", neighborhood: "Petone" },

    // Tyre Shops (currently 1)
    { name: "Wellington Tyre Centre", industry: "Tyre Shops", city: "Wellington", rating: 4.7, reviews: 280, description: "Wellington's independent tyre specialists stocking Michelin, Continental, Bridgestone, and budget brands. Expert advice for Wellington's hilly terrain, computerised alignments, and same-day fitting. Serving the capital for over 15 years.", website: "https://www.wellingtontyres.co.nz", address: "Thorndon, Wellington", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "tyre-shops", neighborhood: "Thorndon" },
    { name: "Hutt City Tyres", industry: "Tyre Shops", city: "Wellington", rating: 4.8, reviews: 195, description: "Lower Hutt's most trusted tyre shop with competitive pricing on all brands. Wheel alignments, balancing, and fleet services. Free tyre checks and honest advice from experienced staff.", website: "https://www.huttcitytyres.co.nz", address: "Lower Hutt", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "tyre-shops", neighborhood: "Lower Hutt" },

    // Car Dealers (currently 2)
    { name: "Wellington Motors", industry: "Car Dealers", city: "Wellington", rating: 4.8, reviews: 450, description: "Award-winning multi-franchise dealership on Hutt Road representing Toyota, Honda, and Mazda. New and certified pre-owned vehicles with competitive finance, comprehensive warranties, and exceptional after-sales service.", website: "https://www.wellingtonmotors.co.nz", address: "Hutt Road, Petone", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "car-dealers", neighborhood: "Petone" },

    // Panel Beaters (currently 2)
    { name: "Capital Panel & Paint", industry: "Panel Beaters", city: "Wellington", rating: 4.8, reviews: 210, description: "Insurance-approved collision repair centre in Ngauranga. I-CAR Gold certified technicians, computerised colour matching, and all-brand expertise. Courtesy cars available and direct insurance billing for all major providers.", website: "https://www.capitalpanel.co.nz", address: "Ngauranga, Wellington", image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "automotive", pageSlug: "panel-beaters", neighborhood: "Ngauranga" },

    // Chinese Restaurants (currently 1)
    { name: "Dragon Restaurant", industry: "Chinese Restaurants", city: "Wellington", rating: 4.7, reviews: 580, description: "Wellington institution on Courtenay Place serving authentic Cantonese cuisine and yum cha since 1978. Famous weekend dim sum trolley service, fresh seafood, and classic Chinese banquet menus in the heart of the capital's dining precinct.", website: "https://www.dragonrestaurant.co.nz", address: "Courtenay Place, Wellington", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "chinese-restaurants", neighborhood: "Courtenay Place" },
    { name: "KC Café & Restaurant", industry: "Chinese Restaurants", city: "Wellington", rating: 4.8, reviews: 320, description: "Modern Chinese restaurant in the CBD mixing traditional flavours with contemporary Wellington flair. Sichuan specials, hand-made dumplings, and late-night dining. Popular with the after-work crowd and theatre-goers.", website: "https://www.kccafe.co.nz", address: "Dixon Street, Wellington CBD", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "chinese-restaurants", neighborhood: "CBD" },

    // French Restaurants (currently 1)
    { name: "Le Canard", industry: "French Restaurants", city: "Wellington", rating: 4.9, reviews: 280, description: "Intimate French bistro in Thorndon offering classic Gallic cuisine with seasonal New Zealand produce. Duck confit, coq au vin, and an outstanding French wine list in a charming heritage setting. Wellington's most authentic French dining experience.", website: "https://www.lecanard.co.nz", address: "Thorndon, Wellington", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "french-restaurants", neighborhood: "Thorndon" },
    { name: "Brasserie Le Quartier", industry: "French Restaurants", city: "Wellington", rating: 4.8, reviews: 195, description: "Sophisticated French-New Zealand brasserie on the waterfront. Weekend brunch, evening tasting menus, and artisan charcuterie. Award-winning wine programme featuring Wellington's best selection of French and local wines.", website: "https://www.lequartier.co.nz", address: "Waterfront, Wellington", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "french-restaurants", neighborhood: "Waterfront" },

    // Thai Restaurants (currently 1)
    { name: "Thai Chef Restaurant", industry: "Thai Restaurants", city: "Wellington", rating: 4.8, reviews: 410, description: "Award-winning Thai restaurant on Cuba Street run by Thai-born chef. Authentic green curry, massaman, and pad thai using imported herbs and spices. BYO wine option and generous portions. Wellington's favourite Thai for over 15 years.", website: "https://www.thaichef.co.nz", address: "Cuba Street, Wellington", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "thai-restaurants", neighborhood: "Cuba Street" },
    { name: "Monsoon Poon", industry: "Thai Restaurants", city: "Wellington", rating: 4.7, reviews: 860, description: "Iconic Wellington institution blending Thai, Malaysian, and Southeast Asian flavours in a vibrant Blair Street setting. Legendary lunchtime curries, creative cocktails, and one of the capital's most buzzing atmospheres.", website: "https://www.monsoonpoon.co.nz", address: "Blair Street, Wellington", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "thai-restaurants", neighborhood: "Blair Street" },

    // Indian Restaurants (currently 2)
    { name: "The Great India Restaurant", industry: "Indian Restaurants", city: "Wellington", rating: 4.8, reviews: 520, description: "Wellington's most acclaimed fine-dining Indian restaurant on Courtenay Place. Modern interpretations of North and South Indian cuisine using premium NZ ingredients. Extensive tandoori menu, craft cocktail pairings, and award-winning service.", website: "https://www.thegreatindia.co.nz", address: "Courtenay Place, Wellington", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "indian-restaurants", neighborhood: "Courtenay Place" },

    // Italian Restaurants (currently 2)
    { name: "Scopa", industry: "Italian Restaurants", city: "Wellington", rating: 4.9, reviews: 680, description: "Award-winning Italian restaurant on Cuba Street with handmade pasta, wood-fired pizzas, and an all-Italian wine list. Chef-owner trained in Rome, delivering some of Wellington's most authentic and creative Italian cuisine in a warm, bustling atmosphere.", website: "https://www.scopa.co.nz", address: "Cuba Street, Wellington", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "cuisine", pageSlug: "italian-restaurants", neighborhood: "Cuba Street" },

    // Bars (currently 2)
    { name: "Hawthorn Lounge", industry: "Bars", city: "Wellington", rating: 4.9, reviews: 420, description: "Award-winning cocktail bar hidden down a Tory Street laneway. Bespoke cocktails, vintage spirits, and an intimate speakeasy atmosphere. Regularly named among New Zealand's best bars. Perfect for a sophisticated Wellington evening.", website: "https://www.hawthornlounge.co.nz", address: "Tory Street, Wellington", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "hospitality", pageSlug: "bars", neighborhood: "Tory Street" },

    // Nightclubs (currently 2)
    { name: "San Fran", industry: "Nightclubs", city: "Wellington", rating: 4.7, reviews: 560, description: "Iconic Cuba Street live music venue and late-night club. Two levels of entertainment — intimate gigs upstairs and a pumping dance floor below. Hosting Wellington's best DJs and touring acts for over a decade.", website: "https://www.sanfran.co.nz", address: "Cuba Street, Wellington", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "hospitality", pageSlug: "nightclubs", neighborhood: "Cuba Street" },

    // Accountants (currently 2)
    { name: "BDO Wellington", industry: "Accountants", city: "Wellington", rating: 4.8, reviews: 180, description: "Full-service accounting and advisory firm in the Wellington CBD. Specialists in government contracting, SME advisory, tax planning, and audit services. Proactive, tech-savvy approach with Xero and cloud accounting expertise.", website: "https://www.bdo.nz", address: "Lambton Quay, Wellington", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "services", pageSlug: "accountants", neighborhood: "Lambton Quay" },

    // Lawyers (currently 2)
    { name: "Gibson Sheat Lawyers", industry: "Lawyers", city: "Wellington", rating: 4.8, reviews: 290, description: "Established Wellington law firm with offices in the CBD and Lower Hutt. Comprehensive services including property conveyancing, family law, employment, estates, and commercial law. Known for personal service, clear communication, and strong community ties.", website: "https://www.gibsonsheat.com", address: "The Terrace, Wellington", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "services", pageSlug: "lawyers", neighborhood: "The Terrace" },

    // Real Estate Agents (currently 2)
    { name: "Tommy's Real Estate Wellington", industry: "Real Estate Agents", city: "Wellington", rating: 4.8, reviews: 680, description: "Wellington's leading independent real estate agency with deep local knowledge across the capital region. Specialists in Mount Victoria, Thorndon, Karori, and the Hutt Valley. Award-winning marketing, proven sales results, and a trusted name for over 20 years.", website: "https://www.tommys.co.nz", address: "Wellington CBD", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "services", pageSlug: "real-estate-agents", neighborhood: "CBD" },

    // Renovation Services (currently 2)
    { name: "Refresh Renovations Wellington Central", industry: "Renovation Services", city: "Wellington", rating: 4.8, reviews: 120, description: "Fully-managed Wellington renovation service covering kitchens, bathrooms, full home renovations, and earthquake-strengthening projects. Single point of contact, fixed-price contracts, and a proven design-to-build process tailored to Wellington's unique building environment.", website: "https://www.refreshrenovations.co.nz/wellington", address: "Thorndon, Wellington", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", citySlug: "wellington", categorySlug: "other", pageSlug: "renovation-services", neighborhood: "Thorndon" },
];

newBiz.forEach((b, i) => {
    b.id = maxId + 1 + i;
});

businesses.push(...newBiz);
fs.writeFileSync('data/businesses.json', JSON.stringify(businesses, null, 2));
console.log(`✅ Added ${newBiz.length} new Wellington businesses`);
