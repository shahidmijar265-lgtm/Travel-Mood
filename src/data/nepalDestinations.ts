import { Destination } from '../types/travel';

export const NEPAL_DESTINATIONS: Destination[] = [
  {
    id: 'begnas-lake',
    name: 'Begnas Lake & Pachabhaiya Ridge',
    nepaliName: 'बेगनास ताल',
    region: 'Annapurna & Pokhara',
    coordinates: { lat: 28.1695, lng: 84.0955 },
    altitude: 650,
    vibes: ['calm', 'nature'],
    shortDesc: 'The serene, un-motorized sister lake of Pokhara. Pristine mirrored waters, quiet wooden rowboats, and organic coffee slopes.',
    bestMonths: [9, 10, 11, 2, 3, 4],
    shoulderMonths: [2, 11],
    sweetSpotReason: 'November brings crystal mountain reflections of Annapurna II without the Lakeside party soundscapes.',
    weatherSummary: 'Pleasant subtropical weather, morning mountain reflections, gentle afternoon breeze.',
    sensory: {
      sound: 'Gentle wooden oar dips, kingfisher calls, and distant water ripples',
      soundType: 'singing_bowl',
      smell: 'Wet red loam soil, wild roasted Arabica coffee blossoms, and blooming orchids',
      texture: 'Cool freshwater slipping through fingers, rough hand-carved cedar wooden hulls',
      surprises: [
        'Local fishery cooperative serves fresh grilled lake fish with wild timur pepper.',
        'Zero motorized speedboats allowed, creating natural acoustic silence.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Lakeside promenade is flat; ridge trails require assistance due to earthen stairs.',
      dietaryNotes: 'Abundant fresh vegetarian thali, organic lake fish, and dairy-free lentil curries.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Crowded lakeside bars and overpriced tourist motorboats in central Phewa Lake.',
    offBeatenSwap: 'Rent a traditional paddle boat from local fishermen in Begnas and hike up to Pachabhaiya agro-village.'
  },
  {
    id: 'kopan-monastery',
    name: 'Kopan Monastery & Pharping Caves',
    nepaliName: 'कोपान गुम्बा',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.7423, lng: 85.3639 },
    altitude: 1600,
    vibes: ['calm', 'cultural'],
    shortDesc: 'Spiritual sanctuary perched above Kathmandu valley. Meditative cypress tree alleys, fluttering prayer flags, and debate courtyards.',
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [12, 2],
    sweetSpotReason: 'February offers crisp sunny days, peaceful monk study retreats, and quiet hill courtyards.',
    weatherSummary: 'Crisp valley breezes, clear views of the high snowy Langtang range on cloudless mornings.',
    sensory: {
      sound: 'Deep harmonic Tibetan horns (dungchen), resonant brass gongs, and young monks chanting mantras',
      soundType: 'prayer_wheel',
      smell: 'Burning mountain juniper incense (Sang), freshly brewed yak butter tea, and ancient cedarwood resin',
      texture: 'Cold polished flagstones under barefoot circumambulations, smooth embossed brass prayer wheels',
      surprises: [
        'Evening debates where novice monks clap their hands to test Buddhist philosophical logic.',
        'Monastery cafe serves homemade wholewheat cinnamon rolls and lemon ginger tea overlooking the entire valley.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Paved ramps to the main gompa courtyard and meditation halls.',
      dietaryNotes: 'Strictly 100% vegetarian; extensive vegan and dairy-free options available.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Rushing through Swayambhunath monkeys in 30 minutes amidst aggressive souvenir peddlers.',
    offBeatenSwap: 'Spend a morning quietly meditating at Kopan, then take a shared micro to the Guru Rinpoche meditation cave in Pharping.'
  },
  {
    id: 'godavari-botanical',
    name: 'Godavari Royal Botanical Gardens & Phulchowki',
    nepaliName: 'गोदावरी वनस्पति उद्यान',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.5936, lng: 85.3815 },
    altitude: 1540,
    vibes: ['calm', 'nature'],
    shortDesc: 'Sprawling tranquil reserve of indigenous Himalayan flora, fern sanctuaries, crystal mossy brooks, and birdwatching trails.',
    bestMonths: [10, 11, 2, 3, 4, 5],
    shoulderMonths: [2, 3],
    sweetSpotReason: 'Early March brings bursting wild rhododendrons and orchids without weekend Kathmandu family crowds.',
    weatherSummary: 'Cool microclimate under dense forest canopy; 3-4°C cooler than downtown Kathmandu.',
    sensory: {
      sound: 'Babbling brook over limestone pebbles, rustling bamboo groves, and crested serpent eagle calls',
      soundType: 'singing_bowl',
      smell: 'Rich damp moss, wild Himalayan cherry blossom nectar, and pine needles',
      texture: 'Soft velvet moss cushions, cool morning mountain dew, and rough ancient oak bark',
      surprises: [
        'Over 300 species of Himalayan butterflies congregate near the shaded stream in spring.',
        'Quiet natural stone benches nestled deep inside the fern valley where silence is preserved.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Central botanical pathways are paved and flat; Phulchowki summit hike is steep singletrack.',
      dietaryNotes: 'Local Newari tea stalls outside gates serve freshly pressed corn bread (makai ko roti) and herbal tea.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Sitting in traffic jams near Thamel shopping lanes for an afternoon coffee.',
    offBeatenSwap: 'Take the morning southern bus to Godavari for a forest picnic and book-reading session in the fern glen.'
  },
  {
    id: 'the-cliff-kushma',
    name: 'The Cliff Kushma - World’s 2nd Highest Bungee & Swing',
    nepaliName: 'कुश्मा बन्जी',
    region: 'Annapurna & Pokhara',
    coordinates: { lat: 28.2163, lng: 83.6791 },
    altitude: 900,
    vibes: ['thrill'],
    shortDesc: 'A colossal 228-meter suspension bridge plunge over the roaring Kaligandaki canyon. Heart-stopping freefall and canyon swing.',
    bestMonths: [9, 10, 11, 12, 2, 3, 4, 5],
    shoulderMonths: [12, 2],
    sweetSpotReason: 'October-November has the clearest sky and roaring river gorge visibility.',
    weatherSummary: 'Warm canyon floor with sudden gusts; ideal jump windows between 8:30 AM and 1:00 PM.',
    sensory: {
      sound: 'Roar of the Kaligandaki river deep below, howling canyon updrafts, and screams echoing against basalt cliffs',
      soundType: 'river_rapids',
      smell: 'Crisp river spray, fresh Himalayan pine resin, and iron safety harnesses',
      texture: 'Stretched elastic cord tension, cool metal suspension cables, adrenaline pulse',
      surprises: [
        'The suspension bridge itself spans 520 meters, suspended directly over one of the world deepest gorges.',
        'Option for tandem swing with panoramic vistas of Mt. Dhaulagiri in the backdrop.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Bridge deck is wheelchair accessible for spectators; jumps require medical sign-off.',
      dietaryNotes: 'Resort cafe provides hearty organic dal bhat and pasta for refueling.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Standard Pokhara Sarangkot sunrise viewpoint alongside 2,000 selfie-sticks.',
    offBeatenSwap: 'Drive 1.5 hours past Pokhara to Kushma for an adrenaline day at The Cliff followed by village stay in Baglung.'
  },
  {
    id: 'bhote-koshi-rafting',
    name: 'Bhote Koshi & Sun Koshi River Canyoning & Rafting',
    nepaliName: 'भोटेकोशी र्‍याफ्टिङ',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.8398, lng: 85.8452 },
    altitude: 850,
    vibes: ['thrill', 'nature'],
    shortDesc: 'Steepest commercial whitewater rafting in Nepal with Class IV-V rapids, cascading waterfalls, and technical canyon rappels.',
    bestMonths: [9, 10, 11, 4, 5],
    shoulderMonths: [4, 11],
    sweetSpotReason: 'Late autumn provides crystalline blue water and optimal technical rapid flow without monsoon debris.',
    weatherSummary: 'Subtropical river valley, hot sunshine on river beaches and invigorating cold glacial water.',
    sensory: {
      sound: 'Thundering hydraulic water drops, paddle splashes, and river guide command whistles',
      soundType: 'river_rapids',
      smell: 'Glacial mineral spray, wild riverside mint, and driftwood campfire smoke',
      texture: 'Adrenaline spray striking the face, tight neoprene wetsuits, and grit of river sand',
      surprises: [
        'Hidden waterfalls accessible only by rappelling down vertical limestone chutes with ropes.',
        'Sandy riverside camping under a blanket of stars with night sky unobstructed by city lights.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'Active water sport requiring upper-body swimming confidence and physical maneuverability.',
      dietaryNotes: 'Riverside campsites cater well to vegetarian and high-carb trekking diets.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Over-crowded, murky Trishuli highway rafting with diesel truck noise parallel to the river.',
    offBeatenSwap: 'Head upstream toward the Tibet border for technical Bhote Koshi canyoning and pure wilderness camping.'
  },
  {
    id: 'sarangkot-paragliding',
    name: 'Sarangkot & Mandre Dhunga Paragliding',
    nepaliName: 'सराङकोट प्याराग्लाइडिङ',
    region: 'Annapurna & Pokhara',
    coordinates: { lat: 28.2439, lng: 83.9482 },
    altitude: 1590,
    vibes: ['thrill'],
    shortDesc: 'Thermal soaring alongside Himalayan griffons with Machapuchare (Fishtail) and Annapurna range towering above.',
    bestMonths: [9, 10, 11, 2, 3, 4],
    shoulderMonths: [2, 11],
    sweetSpotReason: 'Stable afternoon thermals and 100km horizontal visibility in late autumn and early spring.',
    weatherSummary: 'Sunny mornings, gentle valley thermals starting around 10:30 AM.',
    sensory: {
      sound: 'Wind rushing over wing nylon, silent soaring, and faint temple bells from the lake below',
      soundType: 'mountain_wind',
      smell: 'Thin cool mountain air, wild sage, and blooming mustard fields below',
      texture: 'Weightlessness floating in harness, wind pressure on cheeks and hands',
      surprises: [
        'Himalayan eagles and griffon vultures frequently fly wingtip-to-wingtip inside thermals.',
        'Touchdown landing on the shores of Lake Phewa followed by fresh cold sugarcane juice.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Tandem pilots can accommodate assisted takeoff with advance notice and calm wind windows.',
      dietaryNotes: 'Abundant fresh juice bars and lakeside organic bakeries at the landing zone.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Overpaying for unlicensed freelance pilots on the street without insurance.',
    offBeatenSwap: 'Fly from Mandre Dhunga for longer cross-country ridge runs toward Kande instead of short tourist circuits.'
  },
  {
    id: 'lumbini-sacred-garden',
    name: 'Lumbini Sacred Garden & Monastic Zone',
    nepaliName: 'लुम्बिनी पवित्र उद्यान',
    region: 'Terai & Wildlife',
    coordinates: { lat: 27.4842, lng: 83.2759 },
    altitude: 150,
    vibes: ['calm', 'cultural'],
    shortDesc: 'Birthplace of Lord Buddha. A tranquil 3-mile canal corridor hosting authentic monasteries from 25+ Buddhist nations.',
    bestMonths: [10, 11, 12, 1, 2, 3],
    shoulderMonths: [11, 2],
    sweetSpotReason: 'November avoids the scorching 40°C Terai summer heat with serene evening stupa candle lightings.',
    weatherSummary: 'Mild sunny winter days (22°C) and cool quiet evenings.',
    sensory: {
      sound: 'Gentle clinking of peace bells, Tibetan & Theravada soft sutras, and crane calls in wetland reeds',
      soundType: 'singing_bowl',
      smell: 'Sacred Bodhi tree leaves, lotus pond mud, and natural beeswax oil lamps',
      texture: 'Smooth marble pavers around Mayadevi temple, warm shade of sacred banyan roots',
      surprises: [
        'Renting a bicycle to explore the silent East & West monastic sectors at dusk is breathtaking.',
        'Sarus cranes—the tallest flying birds in the world—nest inside the wetlands behind the World Peace Pagoda.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Paved walkways, electric rickshaws available throughout the 3-mile central canal.',
      dietaryNotes: 'Lumbini village has authentic southern Maithili curries, lentils, and monastery vegetarian dining.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Taking a 10-hour packed bone-jarring public bus and trying to see Lumbini in 2 hurried hours.',
    offBeatenSwap: 'Stay 2 nights in the Korean or German monastery guest quarters and cycle through the lotus marshes at dawn.'
  },
  {
    id: 'upper-mustang-lo-manthang',
    name: 'Lo Manthang & Upper Mustang Kingdom',
    nepaliName: 'लो मान्थाङ',
    region: 'Mustang & Manang',
    coordinates: { lat: 29.1824, lng: 83.9567 },
    altitude: 3840,
    vibes: ['cultural', 'nature', 'calm'],
    shortDesc: 'The ancient walled kingdom of Mustang. Ochre wind-carved sandstone canyons, 800-year-old cliff sky-caves, and Tibetan culture.',
    bestMonths: [5, 6, 7, 8, 9, 10],
    shoulderMonths: [6, 9],
    sweetSpotReason: 'Rain shadow region! While the rest of Nepal has monsoon rains in July-August, Mustang stays completely dry and clear.',
    weatherSummary: 'High altitude desert, strong afternoon canyon winds, dazzling crystalline night skies.',
    sensory: {
      sound: 'Whispering canyon wind through erosion flutes, horse hoofs on gravel, and wooden prayer mills',
      soundType: 'prayer_wheel',
      smell: 'Dry clay dust, salty yak butter tea, wild Artemisia wormwood, and sheep wool rugs',
      texture: 'Chapped dry mountain air, textured mud-brick fortress walls, soft handwoven yak blankets',
      surprises: [
        'Thousands of man-made "sky caves" carved 150 feet high into sheer cliff walls dating to 1000 BCE.',
        'Tiji Festival masks and dances celebrate the triumph of Dharma in the historic royal square.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'High altitude rough cobbles and dirt alleys; 4WD jeep access possible directly to city gates.',
      dietaryNotes: 'Staples are tsampa (roasted barley flour), buckwheat pancakes, and hearty potato stews.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Paying $500 special permit fee and rushing through on a bumpy jeep tour without stopping in villages.',
    offBeatenSwap: 'Hike or ride horses via the eastern trail through Yara and Luri Gompa cave monastery for unearthly solitude.'
  },
  {
    id: 'bardia-national-park',
    name: 'Bardia National Park - Wild Tiger Sanctuary',
    nepaliName: 'बर्दिया राष्ट्रिय निकुञ्ज',
    region: 'Terai & Wildlife',
    coordinates: { lat: 28.5142, lng: 81.3328 },
    altitude: 160,
    vibes: ['nature', 'calm'],
    shortDesc: 'The untamed, non-commercial wilderness of Far-West Nepal. Home to wild Royal Bengal tigers, one-horned rhinos, and river dolphins.',
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [2, 3],
    sweetSpotReason: 'March brings drying riverbeds where tigers regularly come to drink at the Geruwa riverbank.',
    weatherSummary: 'Warm tropical sun, cool river breezes, misty dawn wildlife walks.',
    sensory: {
      sound: 'Spotted deer alarm calls, deep tiger roars in the distance, and rustling 12-foot elephant grass',
      soundType: 'singing_bowl',
      smell: 'Sun-baked river silt, blooming sal forest blossoms, and thatch straw homestay roofs',
      texture: 'Cool riverbank mud, rough sal tree bark, warm bamboo walking stick in hand',
      surprises: [
        'Trekking on foot with certified naturalist guides—no noisy diesel safari jeeps required.',
        'Gangetic river dolphins surfacing in the Karnali river gorge at sunset.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Community homestay lodges are ground-floor; river walking trails have sand and uneven roots.',
      dietaryNotes: 'Traditional Tharu cuisine: steamed snails (ghonghi), sticky anadi rice, and organic garden lentils.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Crowded commercial elephant safaris in Sauraha (Chitwan) with hundreds of loud tourists.',
    offBeatenSwap: 'Travel to Bardia for silent jungle walking safaris guided by local indigenous Tharu naturalists.'
  },
  {
    id: 'rara-lake',
    name: 'Rara Lake - The Queen of Himalayan Waters',
    nepaliName: 'रारा ताल',
    region: 'Karnali & Far-West',
    coordinates: { lat: 29.5372, lng: 82.0815 },
    altitude: 2990,
    vibes: ['nature', 'calm'],
    shortDesc: 'Nepal’s deepest, most pristine high-altitude lake surrounded by blue pine, black juniper, and rhododendron wilderness.',
    bestMonths: [9, 10, 11, 4, 5],
    shoulderMonths: [4, 11],
    sweetSpotReason: 'Late autumn provides glass-like deep sapphire waters reflecting snowy Chuchemara Danda without summer rains.',
    weatherSummary: 'Crisp alpine breeze, pure blue skies, cold high-altitude nights with starry Milky Way displays.',
    sensory: {
      sound: 'Gentle alpine lake lap, wind whistling through blue pine needles, and high-altitude wild duck calls',
      soundType: 'mountain_wind',
      smell: 'Crushed pine needles, fresh ozone, and cedarwood resin in the morning sun',
      texture: 'Crystal-clear 10°C glacial water, smooth limestone pebbles on the shoreline',
      surprises: [
        'Lake shifts shades throughout the day from turquoise to emerald to deep indigo.',
        'Zero motor vehicles are permitted inside the national park boundary; transport is purely on foot or horseback.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'Remote mountain trails; horse riding available from Talcha airstrip to the lakeside army post.',
      dietaryNotes: 'Traditional Karnali barley porridge, nettle soup (sisnu), and organic mountain buckwheat.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Taking a rushed 2-day jeep sprint over punishing rocky roads and leaving exhausted without circumnavigating.',
    offBeatenSwap: 'Camp at the tranquil northern bank and do the peaceful 13km shoreline walk through wild alpine woods.'
  },
  {
    id: 'bandipur-citadel',
    name: 'Bandipur - Living Medieval Newari Citadel',
    nepaliName: 'बन्दिपुर',
    region: 'Tanahun & Central Mid-Hills',
    coordinates: { lat: 27.9317, lng: 84.4172 },
    altitude: 1030,
    vibes: ['cultural', 'calm'],
    shortDesc: 'A preserved 18th-century Newari trading citadel on a high ridge. Vehicle-free cobblestone main bazaar with neo-classical facades.',
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [12, 2],
    sweetSpotReason: 'Crisp winter sun without mist, allowing dramatic sunrise views of Dhaulagiri, Annapurna, and Manaslu from Tundikhel.',
    weatherSummary: 'Warm sunny mid-hill days, cool breezes, vehicle-free quiet evenings under wrought-iron lanterns.',
    sensory: {
      sound: 'Children playing in stone courtyards, bird trills in ficus trees, and distant temple bells',
      soundType: 'prayer_wheel',
      smell: 'Flowering bougainvillea, freshly brewed organic mountain coffee, and woodfire bakery smoke',
      texture: 'Smooth red terracotta flagstones beneath shoes, hand-carved wooden window lattice frames',
      surprises: [
        'Cars and motorcycles are completely banned from the main bazaar street, preserving acoustic peace.',
        'Siddha Gufa, Nepal’s largest limestone cave, is reachable via a scenic descent trail.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Central bazaar is flat and paved with smooth slate stone; viewpoint trails require walking assistance.',
      dietaryNotes: 'Rich local Newari vegetarian food, organic citrus, and European-style bakery bread.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Viewing it as just a quick 2-hour lunch stopover between Kathmandu and Pokhara.',
    offBeatenSwap: 'Stay overnight in a restored heritage merchant mansion and hike up to Thani Mai shrine for a 360° dawn inversion cloud panorama.'
  },
  {
    id: 'gosaikunda-lakes',
    name: 'Gosaikunda - Sacred Alpine Glacial Lakes',
    nepaliName: 'गोसाइँकुण्ड',
    region: 'Langtang & Helambu',
    coordinates: { lat: 28.0833, lng: 85.4166 },
    altitude: 4380,
    vibes: ['calm', 'nature'],
    shortDesc: 'A cluster of holy glacial tarns nestled in rugged granite amphitheaters, revered as the trident-struck abode of Lord Shiva.',
    bestMonths: [9, 10, 11, 4, 5],
    shoulderMonths: [5, 10],
    sweetSpotReason: 'October offers crystal-clear mirror reflections of granite peaks and azure waters before winter freeze.',
    weatherSummary: 'Rapidly shifting mountain mist, biting cold evening winds, intense high-altitude sunlight.',
    sensory: {
      sound: 'Glacial water dripping over granite slabs, high-altitude wind gusts, and fluttering silk prayer flags',
      soundType: 'singing_bowl',
      smell: 'Sun-warmed alpine lichen, incense offerings from stone shrines, and hot ginger lemon honey tea',
      texture: 'Chilly granite rocks, icy mountain wind tingling cheeks, warm wool gloves',
      surprises: [
        'Saraswati Kunda and Bhairav Kunda lie just beyond the ridge with dramatic turquoise waters.',
        'You can drink pure glacier-filtered water directly from the lake inlet stream.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'High-altitude mountain trekking only with sustained rocky steps and steep ascents.',
      dietaryNotes: 'Classic high-altitude teahouse diet: Dal Bhat power, hot garlic soup (great for AMS), and porridge.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Rushing up from Dhunche in 2 days without allowing time for body acclimatization at Chandanbari.',
    offBeatenSwap: 'Spend a quiet night at Shin Gompa enjoying fresh yak cheese before pushing across the Lauribina ridge.'
  },
  {
    id: 'ilam-tea-gardens',
    name: 'Ilam & Kanyam - Organic Green Tea Valleys',
    nepaliName: 'इलाम र कन्याम',
    region: 'Eastern Hills',
    coordinates: { lat: 26.9112, lng: 87.9255 },
    altitude: 1208,
    vibes: ['nature', 'calm'],
    shortDesc: 'Rolling emerald hills blanketed in velvety organic tea estates, bamboo groves, and panoramic views of Mount Kanchenjunga.',
    bestMonths: [9, 10, 11, 3, 4, 5],
    shoulderMonths: [3, 11],
    sweetSpotReason: 'Spring (March-April) is the first-flush tea harvest with intoxicatingly fragrant tea blossom aromas.',
    weatherSummary: 'Subtropical morning mist clearing into mild sunny afternoons with cool mountain evening breezes.',
    sensory: {
      sound: 'Gentle snip of hand-plucked tea leaves into wicker baskets, mountain stream murmurs, and songbirds',
      soundType: 'river_rapids',
      smell: 'Freshly bruised green tea leaves, blooming magnolia, and damp mountain fern soil',
      texture: 'Silky smooth young tea leaves between fingertips, lush moss along hillside pathways',
      surprises: [
        'You can sample world-champion orthodox hand-rolled golden tip teas right at family-run micro-estates.',
        'Kanchenjunga, the world’s third highest peak, glows pink at sunset above the green tea carpet.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Paved highway roads connect the major tea gardens with easy walk access to lookouts.',
      dietaryNotes: 'Abundant fresh cow milk curd (chhurpi), fermented bamboo shoots (tama), and hill herbs.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Visiting only the crowded road-side selfie strip in lower Kanyam surrounded by tourist buses.',
    offBeatenSwap: 'Head higher up to Shree Antu village for a sunrise homestay with indigenous Lepcha families.'
  },
  {
    id: 'tsum-valley',
    name: 'Tsum Valley - The Sacred Hidden Beyul',
    nepaliName: 'चुम उपत्यका',
    region: 'Manaslu & Hidden Valleys',
    coordinates: { lat: 28.4862, lng: 85.0345 },
    altitude: 3700,
    vibes: ['calm', 'cultural'],
    shortDesc: 'A culturally preserved Tibetan Buddhist sanctuary where violence and slaughter have been forbidden for over a century.',
    bestMonths: [9, 10, 11, 4, 5],
    shoulderMonths: [4, 11],
    sweetSpotReason: 'November brings clear blue skies, quiet ancient nunneries, and golden buckwheat harvest drying in stone courtyards.',
    weatherSummary: 'Cold alpine nights, brilliant sunny high-altitude days sheltered from southern monsoon storms.',
    sensory: {
      sound: 'Nuns chanting in Mu Gompa, wooden butter-churn thumps, and glacial streams carving through granite boulders',
      soundType: 'prayer_wheel',
      smell: 'Highland juniper smoke, roasted barley tsampa flour, and dried wild apples',
      texture: 'Cold chiseled slate mani stones carved with mantras, warm wool yak blankets',
      surprises: [
        'A formal non-violence pact signed by the valley elders in 1920 bans killing any living creature.',
        'Milarepa’s Meditation Cave at Piren Phu with ancient footprints preserved in rock.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'Remote wilderness trail requiring multiple days on foot through narrow gorges and suspension bridges.',
      dietaryNotes: 'Strictly vegetarian highland diet: potato curry, buckwheat roti, butter tea, and lentil stews.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Rushing past the Tsum turnoff to do only the standard fast-track Manaslu Circuit loop.',
    offBeatenSwap: 'Detour into Tsum Valley for at least 5 days to stay in Rachen Gompa nunnery and meet the valley elders.'
  },
  {
    id: 'janakpur-dham',
    name: 'Janakpur Dham - Epicenter of Mithila Art',
    nepaliName: 'जनकपुरधाम',
    region: 'Terai & Mithila',
    coordinates: { lat: 26.7288, lng: 85.9244 },
    altitude: 74,
    vibes: ['cultural', 'calm'],
    shortDesc: 'Ancient capital of the Mithila Kingdom famous for the marble Janaki Temple and vibrant indigenous women’s folk paintings.',
    bestMonths: [10, 11, 12, 1, 2, 3],
    shoulderMonths: [11, 2],
    sweetSpotReason: 'November brings mild, pleasant 24°C winter weather and dazzling evening butter-lamp lighting around sacred Ganga Sagar.',
    weatherSummary: 'Warm sunny plains climate, cooling evening breeze across ancient temple ponds.',
    sensory: {
      sound: 'Melodic Maithili folk songs, harmonium chords at evening aarti, and gentle temple bells',
      soundType: 'singing_bowl',
      smell: 'Sweet fresh peda sweets, marigold flower garlands, and evening temple dhoop incense',
      texture: 'Cool white marble courtyard floors, textured natural mud plaster painted with rice flour colors',
      surprises: [
        'The Mithila Art Center empowers rural women to preserve 3,000-year-old geometric painting traditions.',
        'Over 70 historical sacred ponds (sagars) ring the historic city with sunset ghat steps.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Flat terai plains terrain with e-rickshaw transport accessible directly to temple courtyards.',
      dietaryNotes: 'Legendary sweet curd, malpua, litti chokha, and fresh subtropical fruits.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Viewing Janakpur merely through crowded religious procession weekends with heavy loudspeaker noise.',
    offBeatenSwap: 'Visit the rural Mithila painting villages of Kuwa and Janakpur Women’s Development Center on a bicycle tour.'
  },
  {
    id: 'sikles-gurung-village',
    name: 'Sikles - Untouched Stone Gurung Settlement',
    nepaliName: 'सिक्लेस गाउँ',
    region: 'Lamjung & Gurung Highlands',
    coordinates: { lat: 28.3582, lng: 84.1035 },
    altitude: 1980,
    vibes: ['cultural', 'nature'],
    shortDesc: 'One of the largest pristine Gurung villages in Nepal. Tightly clustered slate-roofed stone homes, cliff wild honey, and direct views of Annapurna II.',
    bestMonths: [9, 10, 11, 3, 4, 5],
    shoulderMonths: [3, 11],
    sweetSpotReason: 'April brings blooming rhododendron hillsides and clear views of avalanches thundering down Annapurna IV from the village edge.',
    weatherSummary: 'Cool mountain air, morning birdsong, woodsmoke evenings under deep starlit Himalayan skies.',
    sensory: {
      sound: 'Rooster calls echoing off stone alleys, wooden looms clacking, and distant glacial avalanche rumbles',
      soundType: 'mountain_wind',
      smell: 'Sal-wood cooking fire smoke, wild mountain nettle tea, and dry pine needles',
      texture: 'Chiseled slate stone pathways, rough hand-spun sheep wool blankets',
      surprises: [
        'Local Gurung elders still practice traditional spring cliff honey hunting on 300-meter rope ladders.',
        'Zero mass-commercial tourist hotels; visitors stay in welcoming family community homestays.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Stone-paved village steps require walking; 4WD jeep reaches the lower village plaza.',
      dietaryNotes: 'Traditional Gurung kodo ko dhedo (millet mash), organic chicken curry, and wild nettle soup (sisnu).',
      altitudeWarning: false
    },
    famousRouteTrap: 'Stopping only at Ghandruk which has become crowded with cement lodges and tour groups.',
    offBeatenSwap: 'Take the rugged jeep ride to Sikles and hike to the hidden Kapuche glacial lake—the lowest glacial lake in the world at 2,450m.'
  },
  {
    id: 'chitlang-markhu-lake',
    name: 'Chitlang Valley & Markhu (Indra Sarowar)',
    nepaliName: 'चित्लाङ र मार्खु (इन्द्र सरोवर)',
    region: 'Makwanpur & Mahabharat',
    coordinates: { lat: 27.6515, lng: 85.1762 },
    altitude: 1750,
    vibes: ['calm', 'nature', 'foodie'],
    shortDesc: 'Ancient trans-Himalayan walking valley where cars were carried into Kathmandu on human shoulders. Organic goat cheese farms and tranquil lake rowboats.',
    bestMonths: [9, 10, 11, 12, 2, 3, 4],
    shoulderMonths: [11, 2],
    sweetSpotReason: 'November brings crisp blue waters, ripe persimmons on trees, and cozy woodstove evenings.',
    weatherSummary: 'Breezy highland sunshine, cool lake breezes, misty morning hill inversions.',
    sensory: {
      sound: 'Rowboat oars dipping into Indra Sarowar lake, goat bells tinkling in pear orchards, and pine murmurs',
      soundType: 'river_rapids',
      smell: 'Aged goat cheese rinds, woodsmoke, and sweet ripe Asian pear orchards',
      texture: 'Cool lake water slipping through fingers, soft handwoven wool shawls',
      surprises: [
        'Ashoka Chaitya dating back to Emperor Ashoka’s legendary visit in the 3rd century BC.',
        'Nepal’s first artisanal French-style goat cheese estate founded by local returnee farmers.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Chitlang valley road and farm lodges are accessible; lakeside rowboat docks have stone steps.',
      dietaryNotes: 'Fresh organic goat cheese, country chicken, wood-fired bread, and fresh trout fish.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Rushing through on a noisy motocross bike rally and missing the historic Licchavi stone water conduits.',
    offBeatenSwap: 'Stay overnight at an organic pear farm homestay in Chitlang and hike over the Chandragiri pass on the ancient royal porter trail.'
  },
  {
    id: 'panauti-namobuddha',
    name: 'Panauti Medieval Confluence & Namo Buddha',
    nepaliName: 'पनौती र नमोबुद्ध',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.5840, lng: 85.5180 },
    altitude: 1480,
    vibes: ['cultural', 'calm', 'foodie'],
    shortDesc: '14th-century Newari stone citadel that miraculously survived major earthquakes, paired with the holy sacred tigress stupa of Namo Buddha.',
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [12, 2],
    sweetSpotReason: 'February offers golden mustard fields blooming around the medieval river ghats with pleasant warm days.',
    weatherSummary: 'Crisp sunny foothill weather, peaceful river valleys, warm afternoon courtyard light.',
    sensory: {
      sound: 'Rushing Punyamata river waters, ancient brass bells at Indreshwar temple, and monastery trumpet horns',
      soundType: 'prayer_wheel',
      smell: 'Burning mountain sal resin, damp river stones, and freshly steamed yomari Newari dumplings',
      texture: 'Smooth 700-year-old carved wooden temple brackets, cold river flagstones',
      surprises: [
        'Indreshwar Mahadev is one of the oldest original pagoda structures standing in all of Nepal (1294 AD).',
        'Panauti Community Homestay run by local women provides authentic Newari home-cooked feasts.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Panauti town center is flat flagstone; Namo Buddha stupa grounds have paved ramps and plazas.',
      dietaryNotes: 'Traditional Yomari sweet rice cakes, fresh farm curd, and organic seasonal greens.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Visiting only on a rushed day tour without spending sunset at the quiet sacred confluence ghats.',
    offBeatenSwap: 'Hike the scenic 3-hour ridgeline trail from Panauti to Namo Buddha through Tamang and Newari farm hamlets.'
  },
  {
    id: 'ghale-gaun-honey',
    name: 'Ghale Gaun - Highland Honey & Gurung Heritage',
    nepaliName: 'घले गाउँ (लमजुङ)',
    region: 'Lamjung & Gurung Highlands',
    coordinates: { lat: 28.2690, lng: 84.3415 },
    altitude: 2095,
    vibes: ['cultural', 'calm', 'nature'],
    shortDesc: 'A picturesque model cultural village situated atop a ridge in Lamjung. Famous for traditional Gurung architecture and wild cliff honey.',
    bestMonths: [9, 10, 11, 3, 4, 5],
    shoulderMonths: [4, 11],
    sweetSpotReason: 'October mornings reveal Annapurna I, II, IV, Machapuchare, and Manaslu all lined up in a single panoramic arc.',
    weatherSummary: 'Cool mountain climate, clear blue skies, crisp evening breezes around outdoor charcoal braziers.',
    sensory: {
      sound: 'Traditional madal drums during evening cultural welcomes, hill songbirds, and cowbells',
      soundType: 'mountain_wind',
      smell: 'Woodsmoke, boiling mountain tea, and fragrant fresh marigold garlands',
      texture: 'Hand-woven nettle fiber (allo) bags, smooth stone courtyard flagstones',
      surprises: [
        'Villagers welcome every guest with handmade flower garlands, tika, and freshly churned buttermilk.',
        'Viewpoint watchtower offers unobstructed sightlines of eight separate Himalayan peaks.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Stone-paved alleys have gradual gradients; vehicles can reach the village gate.',
      dietaryNotes: 'Organic village staples: red rice, local black lentils, gundruk (fermented leafy greens), and wild honey.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Visiting only for a 30-minute lunch photo and leaving before the evening community dance performance.',
    offBeatenSwap: 'Stay overnight in homestay house number 12 and rise before dawn to see the first ray of sunlight strike Manaslu peak.'
  },
  {
    id: 'khaptad-national-park',
    name: 'Khaptad - The Sacred Plateau of 22 Meadows',
    nepaliName: 'खप्तड राष्ट्रिय निकुञ्ज',
    region: 'Far-West Wilderness',
    coordinates: { lat: 29.3550, lng: 81.1440 },
    altitude: 3100,
    vibes: ['nature', 'calm', 'thrill'],
    shortDesc: 'A surreal high-altitude plateau in Far-West Nepal consisting of 22 rolling green pastures (patans), holy peat bogs, and medicinal herb forests.',
    bestMonths: [9, 10, 11, 4, 5],
    shoulderMonths: [5, 10],
    sweetSpotReason: 'May brings millions of blooming wild gentians, primulas, and buttercups carpeting the rolling green hills.',
    weatherSummary: 'Alpine sun, cool breeze across rolling grass plains, cold starlit nights with zero artificial light pollution.',
    sensory: {
      sound: 'Gentle wind rushing across miles of open grassland, horse hooves, and distant temple bells',
      soundType: 'singing_bowl',
      smell: 'Aromatic medicinal herbs, crushed black juniper needles, and crisp alpine morning dew',
      texture: 'Spongy soft moss and turf beneath hiking boots, cold pure stream water',
      surprises: [
        'The hermitage cave of Khaptad Baba, a renowned medical doctor turned ascetic sage who lived here for 50 years.',
        'Zero commercial settlements or hotels exist inside the park; visitors stay in small park barracks or carry tents.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'Remote wilderness requiring sustained multi-day trekking or chartered helicopter access.',
      dietaryNotes: 'Simple camp rations: Dal Bhat, mountain potatoes, and hot ginger lemon tea.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Attempting to rush the hike in monsoon season when leeches and heavy fog make navigation treacherous.',
    offBeatenSwap: 'Camp at Tribeni confluence where three sacred streams merge and meditate at the quiet Khaptad Baba ashram.'
  },
  {
    id: 'dhorpatan-hunting-reserve',
    name: 'Dhorpatan - Alpine Hunting & Nomadic Plateau',
    nepaliName: 'ढोरपाटन शिकार आरक्ष',
    region: 'Mustang & Manang',
    coordinates: { lat: 28.5300, lng: 83.0500 },
    altitude: 3000,
    vibes: ['nature', 'thrill', 'calm'],
    shortDesc: 'Nepal’s only hunting reserve, set in a massive high-altitude valley surrounded by snow peaks and marshlands. Home to blue sheep and Tibetan refugee horse camps.',
    bestMonths: [9, 10, 11, 3, 4],
    shoulderMonths: [3, 11],
    sweetSpotReason: 'Late autumn provides dry gravel roads, golden alpine grass, and herds of blue sheep descending from high crags.',
    weatherSummary: 'Dry crisp mountain winds, blazing daytime sunshine, freezing high-plateau nights.',
    sensory: {
      sound: 'Whistling wind across the vast flat plateau, Tibetan horse whickers, and high-altitude hawk cries',
      soundType: 'mountain_wind',
      smell: 'Juniper smoke, sun-dried yak cheese, and wild thyme crushed underfoot',
      texture: 'Coarse woolen yak rugs, cold granite stream pebbles, frosty morning grass',
      surprises: [
        'A historic Tibetan refugee settlement founded in 1960 that produces hand-knotted mountain wool rugs.',
        'Dhorpatan airport is one of the highest high-plateau turf airstrips in western Nepal.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'Rugged 4WD jeep track from Baglung or Burtibang; horse riding available on the plateau.',
      dietaryNotes: 'Highland Tibetan buckwheat flatbread, potato stews, yak butter tea, and mountain goat curry.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Trying to drive a small low-clearance vehicle; only sturdy 4WD jeeps or scrambler bikes can negotiate the pass.',
    offBeatenSwap: 'Hike to the Barse blue sheep lookout with an authorized wildlife warden for sightings of wild herds.'
  },
  {
    id: 'suklaphanta-wildlife',
    name: 'Suklaphanta - Grassland Savannah & Swamp Deer',
    nepaliName: 'शुक्लाफाँटा राष्ट्रिय निकुञ्ज',
    region: 'Terai & Wildlife',
    coordinates: { lat: 28.8410, lng: 80.2440 },
    altitude: 174,
    vibes: ['nature', 'thrill'],
    shortDesc: 'Vast open grassland savannah in the Far-Western plains home to the world’s largest single population of golden swamp deer (barasingha).',
    highlight: 'Watch a herd of over 1,500 swamp deer bounding through the golden grassland as the sun sets behind Mahakali river.',
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [11, 3],
    sweetSpotReason: 'March brings drying elephant grasses allowing unobstructed views of wild Bengal tigers and rhinos on open plains.',
    weatherSummary: 'Warm subtropical sunshine, cool river winds, misty dawn jungle walks.',
    sensory: {
      sound: 'Alarm barks of spotted deer, bird whistles in sal trees, and rustling golden grassland',
      soundType: 'river_rapids',
      smell: 'Sun-warmed grassland, blooming simal trees, and damp river silt',
      texture: 'Fine river sand, tall golden grass stalks brushing shoulders during safaris',
      surprises: [
        'Rani Tal (Queen’s Lake) sits hidden inside the sal forest covered in thousands of blooming lotus pads.',
        'Far fewer tourists visit Suklaphanta in an entire year than Chitwan receives in a single weekend.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Flat savannah terrain; 4WD open safari jeeps accommodate travelers with limited mobility.',
      dietaryNotes: 'Traditional Tharu and Terai home-style meals with organic freshwater fish and garden lentils.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Visiting only in peak monsoon when the grassland turns into deep waterlogged marshes.',
    offBeatenSwap: 'Climb the Rani Tal wooden watchtower at sunrise with binoculars to watch migratory pelicans and swamp deer herds.'
  },
  {
    id: 'gorkha-historic-durbar',
    name: 'Gorkha Historic Durbar & Kalika Cave Sanctuary',
    nepaliName: 'गोरखा दरबार',
    region: 'Gorkha & Historic Ridges',
    coordinates: { lat: 28.0060, lng: 84.6290 },
    altitude: 1060,
    vibes: ['cultural', 'calm'],
    shortDesc: 'The 16th-century fortress palace of King Prithvi Narayan Shah crowning a knife-edge ridge with sweeping views of the Trishuli valley and high peaks.',
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [12, 2],
    sweetSpotReason: 'Crisp winter mornings offer striking views of Mount Manaslu and Himalchuli towering directly above the fortress walls.',
    weatherSummary: 'Sunny foothill days, cool mountain breezes, twilight valley shadows.',
    sensory: {
      sound: 'Echoing temple brass bells, priests chanting Vedic verses at Gorakhnath cave, and wind in pine needles',
      soundType: 'singing_bowl',
      smell: 'Incense smoke, sweet marigold garlands, and wet slate stone after morning rain',
      texture: 'Cold chiseled stone stairs, heavy brass doors engraved with divine crests',
      surprises: [
        'The sacred cave of Guru Gorakhnath lies directly underneath the royal palace courtyard.',
        'Steep 1,500 stone stair ascent through monkey-inhabited sacred sal and pine woods.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Steep stone stairs to the upper fortress; road access reaches the lower museum palace.',
      dietaryNotes: 'Traditional hill thali, fresh organic ginger, and local river fish curry.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Rushing to Pokhara without stopping at Gorkha to understand the historical birthplace of Nepal.',
    offBeatenSwap: 'Walk down the western ridge trail to the ancient Upallokot watchtower for an untrammeled sunset over the Daraundi river.'
  },
  {
    id: 'kalinchowk-shrine',
    name: 'Kalinchowk - Snowy Alpine Ridge & Cable Car',
    nepaliName: 'कालिञ्चोक भगवती',
    region: 'Dolakha & Rolwaling',
    coordinates: { lat: 27.8160, lng: 86.0330 },
    altitude: 3842,
    vibes: ['thrill', 'nature', 'cultural'],
    shortDesc: 'A dramatic alpine ridge temple perched atop a sheer granite cliff in Dolakha, featuring a modern cable car and sweeping views of Gauri Shankar.',
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [11, 3],
    sweetSpotReason: 'January and February offer magical snowfall transforming the entire ridge into a winter wonderland with clear mountain skies.',
    weatherSummary: 'Sub-zero freezing winter mornings, intense high-altitude sunlight, biting evening winds.',
    sensory: {
      sound: 'Tridents clinking in the high mountain wind, pilgrim prayer bells, and creak of snow under boots',
      soundType: 'mountain_wind',
      smell: 'Camphor incense offerings, cold mountain ozone, and steaming mutton thukpa soup',
      texture: 'Powdery cold snow, icy metal safety railings, warm woolen fleece gloves',
      surprises: [
        'Thousands of iron tridents (trishuls) left by generations of devotees ring the cliff summit.',
        'On cloudless days, the view stretches across the Rolwaling range straight to Mount Everest.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Cable car connects Kuri village to the ridge; final 100 meters to the shrine has stone steps and a footbridge.',
      dietaryNotes: 'Highland mountain fare: hot garlic soup, Tibetan thukpa, yak cheese, and potato pancakes.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Visiting on snowy festival weekends without pre-booking hotel rooms in Kuri village.',
    offBeatenSwap: 'Stay at a quiet lodge in lower Charikot town and take the morning cable car up before the weekend crowds arrive.'
  },
  {
    id: 'marpha-apple-village',
    name: 'Marpha & Kagbeni - Stone Alleys & Apple Orchards',
    nepaliName: 'मार्फा र कागबेनी',
    region: 'Mustang & Manang',
    coordinates: { lat: 28.7540, lng: 83.6860 },
    altitude: 2670,
    vibes: ['foodie', 'cultural', 'calm'],
    shortDesc: 'Pristine whitewashed Thakali village in the Kali Gandaki gorge famous for sweet organic apple orchards, stone drainage canals, and apple brandy.',
    bestMonths: [9, 10, 11, 3, 4, 5],
    shoulderMonths: [3, 11],
    sweetSpotReason: 'September and October bring ripe red apple harvest, drying firewood on flat roofs, and calm windless mornings.',
    weatherSummary: 'Dry desert canyon sun, strong afternoon gusts blowing up the Kali Gandaki valley, cold starry nights.',
    sensory: {
      sound: 'Water rushing through stone street canals, wind whistling through narrow stone alleys, and prayer wheels',
      soundType: 'prayer_wheel',
      smell: 'Baking apple pie, fresh pressed apple cider, and mountain juniper incense',
      texture: 'Polished white slate stones underfoot, smooth hand-carved wooden prayer cylinders',
      surprises: [
        'Underground flagstone canal system channels fresh glacial water down every single alley street.',
        'Local bakeries serve fresh hot apple crumble and cider made from apples picked that very morning.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Village streets are flat, polished slate; Kagbeni town square is reachable by vehicle.',
      dietaryNotes: 'World-renowned authentic Thakali Dal Bhat with black buckwheat pancakes and dried mutton sukuti.',
      altitudeWarning: true
    },
    famousRouteTrap: 'Speeding through in a dust-raising highway jeep without spending an afternoon walking the quiet stone labyrinth.',
    offBeatenSwap: 'Visit the 200-year-old Nyingma Buddhist monastery overlooking Marpha and sample artisanal apple cider at the local distillery.'
  },
  {
    id: 'hattiban-rock-climbing',
    name: 'Hattiban Outdoor Rock Climbing Crag (Pharping)',
    nepaliName: 'हत्तीवन रक क्लाइम्बिङ',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.6085, lng: 85.2780 },
    altitude: 1850,
    vibes: ['thrill', 'nature'],
    highlight: 'Scale Nepal’s premier natural limestone sport climbing crag (5b to 7b+) on sheer forest cliffs overlooking snow-capped Himalayan peaks.',
    shortDesc: 'Nepal’s premier outdoor sport rock climbing cliff nestled in a high pine forest ridge above Pharping. Features over 15 bolted limestone routes, steep overhangs, and sweeping valley panoramas.',
    bestMonths: [9, 10, 11, 12, 2, 3, 4, 5],
    shoulderMonths: [12, 2],
    sweetSpotReason: 'Crisp autumn and sunny winter afternoons give maximum limestone grip friction without summer humidity or slick monsoon moisture.',
    weatherSummary: 'Sun-drenched south-facing crags, breezy pine air, mild valley temperatures.',
    sensory: {
      sound: 'Clinking carabiners, quickdraw snaps, and mountain wind whispering through tall Himalayan pine needles',
      soundType: 'mountain_wind',
      smell: 'Crushed pine needles, magnesium climbing chalk, and blooming hillside wildflowers',
      texture: 'Rough natural limestone pocket grips, friction-textured climbing rubber',
      surprises: [
        'Routes are named after Nepalese climbing legends and range from friendly beginner slabs to extreme roof overhangs.',
        'On clear mornings you can belay your partner with the snow-covered Langtang and Ganesh Himal peaks straight in the background.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Forest approach trail is a 20-minute uphill dirt hike from the Pharping highway roadhead.',
      dietaryNotes: 'Bring packed trail energy snacks; traditional Dal Bhat available in nearby Pharping village.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Arriving during midday summer heat or monsoon season when the natural rock face becomes slippery.',
    offBeatenSwap: 'Climb early morning on the shaded upper pitches, then hike 10 minutes further up the ridge to Asura Cave monastery for serene butter tea.'
  },
  {
    id: 'nagarjun-rock-climbing',
    name: 'Nagarjun Forest Natural Rock Climbing Wall',
    nepaliName: 'नागार्जुन रक क्लाइम्बिङ भित्ता',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.7420, lng: 85.2815 },
    altitude: 1550,
    vibes: ['thrill', 'nature'],
    highlight: 'Historic 12m to 25m outdoor limestone climbing wall set inside the dense protected forest of Shivapuri Nagarjun National Park.',
    shortDesc: 'Nepal’s original training cliff for Himalayan mountaineers. Over 20 bolted top-rope and lead climbing routes carved into a limestone cliff surrounded by dense oak forests.',
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4, 5],
    shoulderMonths: [1, 2],
    sweetSpotReason: 'Canopy shade keeps the rock cool and comfortable even during bright sunny midday hours.',
    weatherSummary: 'Shaded forest canopy breeze, cool mountain air, zero city dust.',
    sensory: {
      sound: 'Chalked hand slaps on solid limestone, singing Himalayan bulbuls, and distant temple bells',
      soundType: 'singing_bowl',
      smell: 'Damp forest moss, chalk, and wild rhododendron leaves',
      texture: 'Sharp limestone crimps, tactile dynamic rope tension',
      surprises: [
        'The wall offers both beginner friendly 5a slab pitches and daunting 6c overhang cracks on the same face.',
        'Located just 20 minutes drive from Thamel, making it the most accessible natural rock climbing wall in Nepal.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'Wall is a gentle 5-minute flat forest walk from the Balaju national park checkpost gate.',
      dietaryNotes: 'Bring drinking water and trail mix; national park rules prohibit single-use plastics.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Forgetting to bring national park entry permits and official climbing permits from the checkpost.',
    offBeatenSwap: 'Pair your morning climbing session with an afternoon trail walk to Jamacho Buddhist viewpoint atop the ridge (2,128m).'
  },
  {
    id: 'bimalnagar-rock-wall',
    name: 'Bimalnagar 55m Natural Rock Climbing Wall',
    nepaliName: 'विमलनगर रक क्लाइम्बिङ भित्ता',
    region: 'Tanahun & Central Mid-Hills',
    coordinates: { lat: 27.9710, lng: 84.4410 },
    altitude: 520,
    vibes: ['thrill', 'nature'],
    highlight: 'A colossal 55-meter multi-pitch natural limestone face towering above the Marshyangdi river with 25+ certified sport routes.',
    shortDesc: 'One of the longest bolted natural sport climbing walls in South Asia. Located halfway between Kathmandu and Pokhara, offering multi-pitch routes, technical overhangs, and breathtaking gorge views.',
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [3, 10],
    sweetSpotReason: 'Pleasant river valley warmth in winter months when high-altitude Himalayan crags are snowbound.',
    weatherSummary: 'Warm river canyon breeze, bright sunny limestone face, temperate evenings.',
    sensory: {
      sound: 'Rumbling roar of the Marshyangdi river below and wind echoing against the 55m cliff',
      soundType: 'river_rapids',
      smell: 'Sun-warmed limestone, wild river mint, and damp rock fissures',
      texture: 'Solid grey limestone jugs, sharp pocket flakes, and taught dynamic climbing cord',
      surprises: [
        'The cliff includes a true 4-pitch route that ascends all the way to the jungle-crested summit.',
        'Directly across the river lies the Siddha Gufa, the largest natural cave hall in Nepal.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Base of the climbing crag is reached via a 10-minute footpath from Bimalnagar highway suspension bridge.',
      dietaryNotes: 'Riverside tea shacks serve fresh river fish curry and warm local beaten rice.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Rushing past on the Kathmandu-Pokhara tourist bus without realizing a world-class rock wall is right by the road.',
    offBeatenSwap: 'Camp or stay in Bandipur hilltop village above, descent to Bimalnagar crag for a full morning of multi-pitch climbing.'
  },
  {
    id: 'bhotekoshi-canyoning-climbing',
    name: 'Bhotekoshi Granite Canyon Climbing & Waterfall Abseiling',
    nepaliName: 'भोटेकोशी रक क्लाइम्बिङ तथा क्यान्योनिङ',
    region: 'Langtang & Helambu',
    coordinates: { lat: 27.8710, lng: 85.8920 },
    altitude: 1250,
    vibes: ['thrill', 'nature'],
    highlight: 'Conquer steep granite canyon walls and abseil down roaring 45-meter waterfalls right beside Nepal’s wildest glacial river.',
    shortDesc: 'An adrenaline-fueled wonderland in the Sun Koshi / Bhotekoshi river gorge. Combine vertical granite climbing on natural riverside crags with heart-stopping waterfall canyoning and Class V whitewater rapids.',
    bestMonths: [9, 10, 11, 3, 4, 5],
    shoulderMonths: [3, 11],
    sweetSpotReason: 'Post-monsoon water levels offer crystal clear emerald pools and optimal river safety for waterfall abseiling.',
    weatherSummary: 'Rushing canyon mist, warm sub-tropical afternoon sunshine, crisp mountain evenings.',
    sensory: {
      sound: 'Thunderous roar of glacial whitewater crashing over boulders and water spray echoes',
      soundType: 'river_rapids',
      smell: 'Fresh glacial spray, wet slate granite, and burning campfire wood',
      texture: 'Cold rushing mountain water against neoprene wetsuits, rough abrasive granite holds',
      surprises: [
        'You can rappel directly down a 45m waterfall straight into a natural plunge pool before climbing back out.',
        'The gorge is also home to the famous 160m suspension bridge bungee jump.'
      ]
    },
    accessibility: {
      mobilityRating: 'Difficult',
      wheelchairNotes: 'Requires steep canyon scrambling, swimming, and wearing harness gear.',
      dietaryNotes: 'Riverside eco-resorts serve wood-fired pizzas, organic garden salads, and hot lemon ginger honey.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Attempting canyoning during peak monsoon flood surges in July/August.',
    offBeatenSwap: 'Stay at a riverside tented camp right beside the rapids for 2 days to combine rock climbing, waterfall abseiling, and whitewater rafting in a single trip.'
  },
  {
    id: 'namobuddha-monastery',
    name: 'Namo Buddha - Sacred Stupa & Thrangu Gompa',
    nepaliName: 'नमोबुद्ध टासी याङ्त्से गुम्बा',
    region: 'Kathmandu Valley',
    coordinates: { lat: 27.5682, lng: 85.5847 },
    altitude: 1750,
    vibes: ['calm', 'cultural'],
    highlight: 'One of the three most sacred Buddhist pilgrimage sites in Nepal, set on an isolated pine ridge where Buddha gave his body to a starving tigress.',
    shortDesc: 'Serene Tibetan monastic complex with breathtaking golden roofs, ringing wind bells, butter lamp sanctuaries, and tranquil views of the eastern Himalayas.',
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [1, 2],
    sweetSpotReason: 'Crystal clear winter air gives uninterrupted views from Ganesh Himal to Everest while monks chant morning pujas.',
    weatherSummary: 'Crisp mountain mornings, golden afternoon sunlight, silent starry nights.',
    sensory: {
      sound: 'Low bass Buddhist horn drones (dungchen), wind flapping thousands of prayer flags',
      soundType: 'prayer_wheel',
      smell: 'Pure Tibetan sandalwood incense, melting butter lamps, and wild pine needles',
      texture: 'Cool polished temple marble, warm brass prayer wheels',
      surprises: [
        'The monastery provides peaceful guest accommodation and vegetarian meals for slow travelers.',
        'Historical carvings recount the legendary Jataka tale of the Bodhisattva and the hungry tiger cubs.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Paved road leads directly to monastery courtyard; ramps provide access to the main prayer hall.',
      dietaryNotes: 'Wholesome 100% vegetarian monastic kitchen serving Tibetan bread, tsampa, and lentil soup.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Rushing through in 20 minutes on an overcrowded day tour from Kathmandu.',
    offBeatenSwap: 'Arrive at 3:30 PM to sit silently in the second-floor gallery during the daily monks’ evening chant and debate session.'
  },
  {
    id: 'bardia-wildlife-sanctuary',
    name: 'Bardia Wild Tiger & Elephant Reserve',
    nepaliName: 'बर्दिया राष्ट्रिय निकुञ्ज',
    region: 'Terai & Wildlife',
    coordinates: { lat: 28.5300, lng: 81.3300 },
    altitude: 162,
    vibes: ['nature', 'thrill'],
    highlight: 'Nepal’s wildest untamed lowland jungle with the highest density of Royal Bengal Tigers and walking safaris on foot.',
    shortDesc: 'Far less commercialized than Chitwan, Bardia offers genuine wilderness exploration. Track wild tigers on foot with veteran naturalists, spot freshwater Gangetic dolphins, and watch wild elephant herds bathe.',
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    shoulderMonths: [10, 4],
    sweetSpotReason: 'February through April brings drying waterholes where wild tigers and one-horned rhinos emerge daily to drink.',
    weatherSummary: 'Mild misty winter mornings, warm savannah sunshine, humid sub-tropical evenings.',
    sensory: {
      sound: 'Alarm calls of spotted deer, peacock calls at dusk, and deep river rustling',
      soundType: 'river_rapids',
      smell: 'Sal forest blossom, damp river mud, and elephant grass',
      texture: 'Soft sandy riverbanks, brittle autumn leaf litter underfoot',
      surprises: [
        'Bardia is one of the few national parks on earth where you can safely track tigers on foot with two trained bamboo-staff guides.',
        'The Karnali River is home to the critically endangered long-snouted Gharial crocodile.'
      ]
    },
    accessibility: {
      mobilityRating: 'Moderate',
      wheelchairNotes: 'Open-top 4WD jeeps are accessible; boat floats down the Karnali are suitable for all mobility levels.',
      dietaryNotes: 'Indigenous Tharu cuisine: steamed ghongi (water snails), duck curry, and sticky Anadi rice.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Taking an expensive commercial elephant-back ride instead of an ethical walking or river float safari.',
    offBeatenSwap: 'Spend a full morning sitting silently in a concealed wooden tree-hide overlooking the Tinkuni river junction.'
  },
  {
    id: 'janakpur-mithila-dham',
    name: 'Janakpur Dham & Mithila Art Heritage',
    nepaliName: 'जनकपुरधाम जानकी मन्दिर',
    region: 'Terai & Mithila',
    coordinates: { lat: 26.7271, lng: 85.9248 },
    altitude: 74,
    vibes: ['cultural', 'foodie'],
    highlight: 'The grand 19th-century white marble palace temple of Janaki Mandir and living epicenter of 2,500-year-old Mithila geometric art.',
    shortDesc: 'An ancient sacred city steeped in Ramayana mythology. Features dazzling Hindu-Islamic Rajput architecture, dozens of holy lotus ponds, women-led Mithila folk painting cooperatives, and mouthwatering Mithila sweets.',
    bestMonths: [10, 11, 12, 1, 2, 3],
    shoulderMonths: [10, 3],
    sweetSpotReason: 'Pleasantly cool winter days make walking between sacred ponds and bustling Mithila painting courtyards pure joy.',
    weatherSummary: 'Crisp pleasant winter afternoons, morning river mist, comfortable evenings.',
    sensory: {
      sound: 'Evening aarti conch shells, harmonium kirtans, and ringing brass bells echoing across the pond',
      soundType: 'singing_bowl',
      smell: 'Jasmine garlands, cow-ghee sweets frying, and fresh earth',
      texture: 'Cool carved white marble floor, hand-mixed natural mineral paint pigments',
      surprises: [
        'Over 70 sacred historic ponds (pokharis) are scattered across the city, illuminated by clay oil lamps at dusk.',
        'Local women artists use natural bamboo twigs and cotton swabs to paint sacred geometric deities on mud walls.'
      ]
    },
    accessibility: {
      mobilityRating: 'Good',
      wheelchairNotes: 'The temple courtyard and central square are level and spacious for manual wheelchairs.',
      dietaryNotes: 'Legendary Mithila sweets: hot melt-in-the-mouth Lassi, Malpua, and fresh spiced curd.',
      altitudeWarning: false
    },
    famousRouteTrap: 'Only seeing the main Janaki Mandir without visiting the women’s Mithila art painting workshops in nearby Kuva village.',
    offBeatenSwap: 'Visit Janakpur Women’s Development Centre to learn ancient mud-wall painting techniques directly from master artisans.'
  }
];

