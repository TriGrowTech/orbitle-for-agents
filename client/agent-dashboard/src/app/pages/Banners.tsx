import { Plus, Edit, Trash2, Upload, Eye, EyeOff, Tag, Percent, ImageIcon } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const mockBanners = [
  {
    id: 1,
    title: 'Summer Sale - 30% Off',
    buttonText: 'Book Now',
    buttonLink: 'WhatsApp',
    active: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Bali Special - Limited Offer',
    buttonText: 'Enquire Now',
    buttonLink: 'Package Page',
    active: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Dubai Tour - Best Prices',
    buttonText: 'Contact Us',
    buttonLink: 'WhatsApp',
    active: false,
    order: 3,
  },
];

export function Banners() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Banners & Promotions</h1>
          <p className="text-sm text-gray-600 mt-0.5">Manage promotional banners and offers</p>
        </div>
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit text-sm h-auto">
          <Plus className="w-4 h-4" />
          Add New Banner
        </Button>
      </div>

      {/* Hero Background Carousel */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Hero Background Carousel</h2>
            <p className="text-xs text-gray-600">Main sliding background images for homepage hero section</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Carousel images list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Slide {index}</p>
                  </div>
                </div>
                <Button className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity h-auto">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <Button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors h-auto border-none">
              <Plus className="w-3 h-3" />
              Add Slide
            </Button>
            <Button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs h-auto">
              Save Carousel
            </Button>
          </div>
        </div>
      </div>

      {/* Topbar Offer */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Topbar Offer Banner</h2>
            <p className="text-xs text-gray-600">Small banner displayed at the top of website</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Offer Text
            </label>
            <Input
              type="text"
              placeholder="🎉 Limited Time: Get 20% OFF on all packages!"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              CTA Button Text
            </label>
            <Input
              type="text"
              placeholder="Claim Offer"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <Button className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors h-auto border-none shadow-none">
            <Eye className="w-3 h-3" />
            Active
          </Button>
          <Button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs h-auto">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Package Card Offer */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
            <Percent className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Package Card Offer Strip</h2>
            <p className="text-xs text-gray-600">Small offer banner shown on package cards</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Offer Text
            </label>
            <Input
              type="text"
              placeholder="Save 15% • Book Before April 30"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Background Color
            </label>
            <Select defaultValue="red">
              <SelectTrigger className="w-full h-9 bg-white border border-gray-300 rounded-lg px-3 text-sm">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red (Urgent)</SelectItem>
                <SelectItem value="orange">Orange (Sale)</SelectItem>
                <SelectItem value="green">Green (Special)</SelectItem>
                <SelectItem value="blue">Blue (Info)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <Button className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors h-auto border-none shadow-none">
            <Eye className="w-3 h-3" />
            Active
          </Button>
          <Button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs h-auto">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Banners List */}
      <div className="space-y-3">
        {mockBanners.map((banner) => (
          <div key={banner.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row">
              {/* Banner Preview - 5:1 aspect ratio */}
              <div className="lg:w-96 aspect-[5/1] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <div className="text-center text-white px-6">
                  <h3 className="text-lg font-semibold mb-2">{banner.title}</h3>
                  <Button className="px-5 py-1.5 bg-white text-blue-600 rounded-lg font-medium text-sm h-auto hover:bg-gray-100">
                    {banner.buttonText}
                  </Button>
                </div>
              </div>

              {/* Banner Details */}
              <div className="flex-1 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Banner Title
                    </label>
                    <Input
                      type="text"
                      defaultValue={banner.title}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Button Text
                    </label>
                    <Input
                      type="text"
                      defaultValue={banner.buttonText}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Button Link
                    </label>
                    <Select defaultValue={banner.buttonLink}>
                      <SelectTrigger className="w-full h-9 bg-white border border-gray-300 rounded-lg px-3 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Package Page">Package Page</SelectItem>
                        <SelectItem value="Custom URL">Custom URL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Display Order
                    </label>
                    <Input
                      type="number"
                      defaultValue={banner.order}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Banner Image (5:1 aspect ratio)
                  </label>
                  <div className="flex items-center gap-3">
                    <Button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm h-auto bg-white shadow-none">
                      <Upload className="w-3 h-3" />
                      Upload Image
                    </Button>
                    <span className="text-xs text-gray-500">Recommended: 2000x400px (5:1 ratio)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <Button className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors h-auto border-none shadow-none ${banner.active
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {banner.active ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Inactive
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-xs h-auto">
                      <Edit className="w-3 h-3" />
                      Save
                    </Button>
                    <Button className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 text-xs h-auto bg-white shadow-none">
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}