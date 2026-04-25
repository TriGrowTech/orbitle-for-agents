import mongoose from 'mongoose';
import Package from '../server/src/models/Package.model.js';

const MONGO_URI = 'mongodb+srv://trigrowtech_db_user:wskt3MqZpcwRVrez@oribitle.2ew7mix.mongodb.net/';
const AGENT_ID = '69ec918b31f27e710a7c5ea5';

const packages = [
  // Domestic
  {
    title: 'Goa Beach Party',
    description: 'Enjoy the sun, sand and nightlife of Goa.',
    location: 'Goa, India',
    duration: '4 Days / 3 Nights',
    category: 'domestic',
    packageType: 'beach',
    originalPrice: 15000,
    discountedPrice: 12000,
    isTrending: true,
    hasOffer: true,
    badges: ['bestseller'],
    inclusions: ['Breakfast', 'Transfers', 'Sightseeing'],
    exclusions: ['Flights', 'Lunch', 'Dinner'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival', description: 'Arrive at Goa and check in to hotel.' },
      { dayNumber: 2, title: 'Beach Tour', description: 'Visit Calangute and Baga beach.' },
      { dayNumber: 3, title: 'South Goa', description: 'Old Goa churches and Dona Paula.' },
      { dayNumber: 4, title: 'Departure', description: 'Transfer to airport/railway station.' }
    ]
  },
  {
    title: 'Manali Adventure',
    description: 'Thrilling adventure in the mountains of Manali.',
    location: 'Manali, India',
    duration: '5 Days / 4 Nights',
    category: 'domestic',
    packageType: 'adventure',
    originalPrice: 18000,
    discountedPrice: 15500,
    isTrending: true,
    badges: ['hot'],
    inclusions: ['Breakfast', 'Dinner', 'Paragliding'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival', description: 'Arrive at Manali.' },
      { dayNumber: 2, title: 'Solang Valley', description: 'Adventure activities at Solang.' },
      { dayNumber: 3, title: 'Rohtang Pass', description: 'Visit the snow point.' },
      { dayNumber: 4, title: 'Local Manali', description: 'Hadimba temple and Mall road.' },
      { dayNumber: 5, title: 'Departure', description: 'Back to home.' }
    ]
  },
  {
    title: 'Kerala Backwaters',
    description: 'Serene experience in the backwaters of Alleppey.',
    location: 'Alleppey, Kerala',
    duration: '3 Days / 2 Nights',
    category: 'domestic',
    packageType: 'honeymoon',
    originalPrice: 20000,
    discountedPrice: 17000,
    isTrending: false,
    hasOffer: true,
    badges: ['premium'],
    inclusions: ['Houseboat Stay', 'All Meals'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival', description: 'Check in to Houseboat.' },
      { dayNumber: 2, title: 'Cruising', description: 'Enjoy the scenic beauty.' },
      { dayNumber: 3, title: 'Departure', description: 'Transfer to Cochin.' }
    ]
  },
  {
    title: 'Rajasthan Royal Tour',
    description: 'Experience the royalty of Jaipur and Udaipur.',
    location: 'Rajasthan, India',
    duration: '7 Days / 6 Nights',
    category: 'domestic',
    packageType: 'cultural',
    originalPrice: 35000,
    discountedPrice: 31000,
    isTrending: true,
    badges: ['bestseller'],
    inclusions: ['4-Star Hotels', 'Breakfast', 'Guide'],
    itinerary: [
      { dayNumber: 1, title: 'Jaipur Arrival', description: 'Welcome to the Pink City.' },
      { dayNumber: 2, title: 'Amer Fort', description: 'Elephant ride and fort visit.' },
      { dayNumber: 3, title: 'Pushkar', description: 'Visit the Brahma temple.' },
      { dayNumber: 4, title: 'Udaipur', description: 'Arrival at the City of Lakes.' },
      { dayNumber: 5, title: 'City Palace', description: 'Boat ride at Lake Pichola.' },
      { dayNumber: 6, title: 'Mount Abu', description: 'Visit Dilwara temples.' },
      { dayNumber: 7, title: 'Departure', description: 'Drop at Ahmedabad/Udaipur.' }
    ]
  },
  {
    title: 'Ladakh Bike Trip',
    description: 'Ultimate bike trip to the land of high passes.',
    location: 'Leh, Ladakh',
    duration: '10 Days / 9 Nights',
    category: 'domestic',
    packageType: 'adventure',
    originalPrice: 45000,
    discountedPrice: 42000,
    isTrending: true,
    badges: ['hot', 'limited'],
    inclusions: ['Bikes', 'Fuel', 'Permits', 'Stay'],
    itinerary: [
      { dayNumber: 1, title: 'Leh Arrival', description: 'Acclimatization day.' },
      { dayNumber: 2, title: 'Leh Local', description: 'Shanti Stupa and Leh Palace.' },
      { dayNumber: 3, title: 'Nubra Valley', description: 'Via Khardung La.' },
      { dayNumber: 4, title: 'Hunder', description: 'Camel safari.' },
      { dayNumber: 5, title: 'Pangong Lake', description: 'Via Shyok river.' },
      { dayNumber: 6, title: 'Pangong to Leh', description: 'Via Chang La.' },
      { dayNumber: 7, title: 'Leh to Sarchu', description: 'High altitude ride.' },
      { dayNumber: 8, title: 'Sarchu to Manali', description: 'Via Baralacha La.' },
      { dayNumber: 9, title: 'Manali Rest', description: 'Relax in Manali.' },
      { dayNumber: 10, title: 'Departure', description: 'End of trip.' }
    ]
  },
  // International
  {
    title: 'Dubai Extravaganza',
    description: 'Luxury shopping and desert adventures in Dubai.',
    location: 'Dubai, UAE',
    duration: '6 Days / 5 Nights',
    category: 'international',
    packageType: 'city',
    originalPrice: 85000,
    discountedPrice: 78000,
    isTrending: true,
    hasOffer: true,
    badges: ['bestseller'],
    inclusions: ['Visa', 'Flights', 'Hotels', 'Burj Khalifa Ticket'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival', description: 'Arrive at Dubai International.' },
      { dayNumber: 2, title: 'City Tour', description: 'Half day city tour + Dhow cruise.' },
      { dayNumber: 3, title: 'Burj Khalifa', description: '124th floor visit + Dubai Mall.' },
      { dayNumber: 4, title: 'Desert Safari', description: 'Dune bashing and BBQ dinner.' },
      { dayNumber: 5, title: 'Aquaventure', description: 'Waterpark fun at Atlantis.' },
      { dayNumber: 6, title: 'Departure', description: 'Back to India.' }
    ]
  },
  {
    title: 'Bali Honeymoon Special',
    description: 'Romantic getaway to the island of gods.',
    location: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    category: 'international',
    packageType: 'honeymoon',
    originalPrice: 110000,
    discountedPrice: 95000,
    isTrending: true,
    badges: ['premium', 'limited'],
    inclusions: ['Private Villa', 'Candle Light Dinner', 'Spa'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival', description: 'Flower garland welcome.' },
      { dayNumber: 2, title: 'Ubud Tour', description: 'Monkey forest and rice terraces.' },
      { dayNumber: 3, title: 'Kintamani', description: 'Volcano view and coffee plantation.' },
      { dayNumber: 4, title: 'Water Sports', description: 'Nusa Dua beach activities.' },
      { dayNumber: 5, title: 'Tanah Lot', description: 'Sunset at the temple.' },
      { dayNumber: 6, title: 'Leisure Day', description: 'Relax at your villa.' },
      { dayNumber: 7, title: 'Departure', description: 'Transfer to airport.' }
    ]
  },
  {
    title: 'Thailand Island Hopper',
    description: 'Explore the beautiful islands of Phuket and Krabi.',
    location: 'Thailand',
    duration: '6 Days / 5 Nights',
    category: 'international',
    packageType: 'beach',
    originalPrice: 65000,
    discountedPrice: 58000,
    isTrending: true,
    badges: ['hot'],
    inclusions: ['Internal Transfers', 'Phi Phi Island Tour'],
    itinerary: [
      { dayNumber: 1, title: 'Phuket Arrival', description: 'Check in to beach resort.' },
      { dayNumber: 2, title: 'Phi Phi Island', description: 'Speedboat tour with lunch.' },
      { dayNumber: 3, title: 'Krabi', description: 'Transfer by ferry.' },
      { dayNumber: 4, title: '4 Island Tour', description: 'Snorkeling and swimming.' },
      { dayNumber: 5, title: 'Bangkok', description: 'Shopping day in Bangkok.' },
      { dayNumber: 6, title: 'Departure', description: 'Drop at BKK airport.' }
    ]
  },
  {
    title: 'Singapore City Lights',
    description: 'Modern marvels and theme parks in Singapore.',
    location: 'Singapore',
    duration: '5 Days / 4 Nights',
    category: 'international',
    packageType: 'city',
    originalPrice: 95000,
    discountedPrice: 88000,
    isTrending: false,
    hasOffer: true,
    badges: ['familyFriendly'],
    inclusions: ['Universal Studios', 'Gardens by the Bay'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival', description: 'Night Safari.' },
      { dayNumber: 2, title: 'City Tour', description: 'Merlion park and Chinatown.' },
      { dayNumber: 3, title: 'Universal Studios', description: 'Full day at Sentosa.' },
      { dayNumber: 4, title: 'Gardens by the Bay', description: 'Cloud Forest and Flower Dome.' },
      { dayNumber: 5, title: 'Departure', description: 'Changi airport drop.' }
    ]
  },
  {
    title: 'Europe Best of 3',
    description: 'Visit Paris, Swiss and Amsterdam in one go.',
    location: 'Europe',
    duration: '10 Days / 9 Nights',
    category: 'international',
    packageType: 'cultural',
    originalPrice: 250000,
    discountedPrice: 235000,
    isTrending: true,
    badges: ['premium'],
    inclusions: ['Schengen Visa', 'Eiffel Tower Ticket', 'Jungfraujoch'],
    itinerary: [
      { dayNumber: 1, title: 'Paris Arrival', description: 'Welcome to France.' },
      { dayNumber: 2, title: 'Paris City', description: 'Eiffel Tower and Seine cruise.' },
      { dayNumber: 3, title: 'Disneyland', description: 'Full day fun.' },
      { dayNumber: 4, title: 'Switzerland', description: 'Train to Lucerne.' },
      { dayNumber: 5, title: 'Mt. Titlis', description: 'Cable car ride.' },
      { dayNumber: 6, title: 'Jungfraujoch', description: 'Top of Europe.' },
      { dayNumber: 7, title: 'Amsterdam', description: 'Train to Netherlands.' },
      { dayNumber: 8, title: 'Canal Cruise', description: 'Explore Amsterdam.' },
      { dayNumber: 9, title: 'Zaanse Schans', description: 'Windmills and cheese.' },
      { dayNumber: 10, title: 'Departure', description: 'Drop at AMS airport.' }
    ]
  },
  // Adding 10 more to make it 20
  {
    title: 'Shimla & Kullu Retreat',
    description: 'Classic hill station tour of North India.',
    location: 'Himachal, India',
    duration: '6 Days / 5 Nights',
    category: 'domestic',
    packageType: 'mountain',
    originalPrice: 22000,
    discountedPrice: 19500,
    itinerary: [{ dayNumber: 1, title: 'Delhi to Shimla', description: 'Scenic drive.' }]
  },
  {
    title: 'Char Dham Yatra',
    description: 'Sacred pilgrimage to the four holy shrines.',
    location: 'Uttarakhand, India',
    duration: '12 Days / 11 Nights',
    category: 'domestic',
    packageType: 'pilgrimage',
    originalPrice: 55000,
    discountedPrice: 51000,
    itinerary: [{ dayNumber: 1, title: 'Haridwar', description: 'Ganga Aarti.' }]
  },
  {
    title: 'Andaman Escape',
    description: 'Emerald islands and clear blue waters.',
    location: 'Andaman, India',
    duration: '6 Days / 5 Nights',
    category: 'domestic',
    packageType: 'beach',
    originalPrice: 40000,
    discountedPrice: 36000,
    isTrending: true,
    itinerary: [{ dayNumber: 1, title: 'Port Blair', description: 'Cellular Jail.' }]
  },
  {
    title: 'Maldives Paradise',
    description: 'Stay in over-water villas in Maldives.',
    location: 'Maldives',
    duration: '5 Days / 4 Nights',
    category: 'international',
    packageType: 'honeymoon',
    originalPrice: 150000,
    discountedPrice: 135000,
    isTrending: true,
    badges: ['premium'],
    itinerary: [{ dayNumber: 1, title: 'Male Arrival', description: 'Speedboat transfer.' }]
  },
  {
    title: 'Vietnam Discovery',
    description: 'Explore the history and beauty of Vietnam.',
    location: 'Vietnam',
    duration: '8 Days / 7 Nights',
    category: 'international',
    packageType: 'cultural',
    originalPrice: 120000,
    discountedPrice: 105000,
    itinerary: [{ dayNumber: 1, title: 'Hanoi', description: 'City tour.' }]
  },
  {
    title: 'Srinagar & Gulmarg',
    description: 'Heaven on earth experience in Kashmir.',
    location: 'Kashmir, India',
    duration: '5 Days / 4 Nights',
    category: 'domestic',
    packageType: 'mountain',
    originalPrice: 28000,
    discountedPrice: 25000,
    isTrending: true,
    itinerary: [{ dayNumber: 1, title: 'Srinagar', description: 'Houseboat stay.' }]
  },
  {
    title: 'South Africa Safari',
    description: 'Wildlife and scenic beauty in South Africa.',
    location: 'South Africa',
    duration: '9 Days / 8 Nights',
    category: 'international',
    packageType: 'wildlife',
    originalPrice: 180000,
    discountedPrice: 165000,
    itinerary: [{ dayNumber: 1, title: 'Cape Town', description: 'Arrival.' }]
  },
  {
    title: 'Egypt Wonders',
    description: 'Pyramids and Nile cruise in Egypt.',
    location: 'Egypt',
    duration: '7 Days / 6 Nights',
    category: 'international',
    packageType: 'cultural',
    originalPrice: 140000,
    discountedPrice: 128000,
    itinerary: [{ dayNumber: 1, title: 'Cairo', description: 'Pyramid visit.' }]
  },
  {
    title: 'Golden Triangle Tour',
    description: 'Visit Delhi, Agra and Jaipur.',
    location: 'North India',
    duration: '5 Days / 4 Nights',
    category: 'domestic',
    packageType: 'cultural',
    originalPrice: 25000,
    discountedPrice: 22000,
    itinerary: [{ dayNumber: 1, title: 'Delhi', description: 'Local sightseeing.' }]
  },
  {
    title: 'Swiss Alps Luxury',
    description: 'Snowy mountains and luxury stay in Swiss.',
    location: 'Switzerland',
    duration: '6 Days / 5 Nights',
    category: 'international',
    packageType: 'mountain',
    originalPrice: 190000,
    discountedPrice: 175000,
    isTrending: true,
    itinerary: [{ dayNumber: 1, title: 'Zurich', description: 'Arrival.' }]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing packages for this agent
    await Package.deleteMany({ agentId: AGENT_ID });
    console.log('Cleared existing packages');

    const packagesWithAgent = packages.map(pkg => ({
      ...pkg,
      agentId: AGENT_ID,
      isActive: true,
      imageUrl1: 'orbitle-logo.png', // Placeholder image in public folder
      imageUrl2: 'orbitle-logo.png'
    }));

    await Package.insertMany(packagesWithAgent);
    console.log('Successfully added 20 packages for Bilal!');

    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
