import { Waves, Mountain, Landmark, Church, Heart, Utensils, Camera, Tent } from 'lucide-react';

const themes = [
  {
    icon: Waves,
    title: 'Beach & Islands',
    description: 'Tropical paradises and coastal getaways',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Mountain,
    title: 'Adventure & Trekking',
    description: 'Mountain expeditions and thrilling experiences',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Landmark,
    title: 'Heritage & Culture',
    description: 'Historical monuments and cultural tours',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Church,
    title: 'Pilgrimage',
    description: 'Spiritual journeys to sacred places',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Honeymoon',
    description: 'Romantic destinations for couples',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Utensils,
    title: 'Culinary Tours',
    description: 'Food and wine experiences',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Picturesque locations for photographers',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Tent,
    title: 'Camping & Wildlife',
    description: 'Nature camps and safari adventures',
    color: 'from-green-600 to-teal-600',
  },
];

export function TravelThemes() {
  return (
    <section id="themes" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Travel <span className="text-[var(--theme-primary)]">Themes</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose your perfect travel experience based on your interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => {
            const Icon = theme.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${theme.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{theme.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{theme.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}