import { useState } from 'react';
import { Plus, Edit, Eye, EyeOff, Palette, X, Check } from 'lucide-react';

interface Theme {
  id: number;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  isListed: boolean;
  isDefault: boolean;
}

const mockThemes: Theme[] = [
  {
    id: 1,
    name: 'Navy Blue',
    description: 'Professional & Trust',
    primaryColor: '#1e3a8a',
    secondaryColor: '#1d4ed8',
    accentColor: '#3b82f6',
    isListed: true,
    isDefault: true,
  },
  {
    id: 2,
    name: 'Bold Red',
    description: 'Energy & Passion',
    primaryColor: '#b91c1c',
    secondaryColor: '#dc2626',
    accentColor: '#f87171',
    isListed: true,
    isDefault: false,
  },
  {
    id: 3,
    name: 'Fresh Cyan',
    description: 'Modern & Clean',
    primaryColor: '#0e7490',
    secondaryColor: '#06b6d4',
    accentColor: '#67e8f9',
    isListed: true,
    isDefault: false,
  },
  {
    id: 4,
    name: 'Purple Dream',
    description: 'Creative & Unique',
    primaryColor: '#7c3aed',
    secondaryColor: '#a855f7',
    accentColor: '#c084fc',
    isListed: false,
    isDefault: false,
  },
];

export function ThemeManagement() {
  const [themes, setThemes] = useState<Theme[]>(mockThemes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    accentColor: '#000000',
  });

  const handleAddTheme = () => {
    setEditingTheme(null);
    setFormData({
      name: '',
      description: '',
      primaryColor: '#3b82f6',
      secondaryColor: '#60a5fa',
      accentColor: '#93c5fd',
    });
    setIsModalOpen(true);
  };

  const handleEditTheme = (theme: Theme) => {
    setEditingTheme(theme);
    setFormData({
      name: theme.name,
      description: theme.description,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
    });
    setIsModalOpen(true);
  };

  const handleToggleListed = (id: number) => {
    setThemes(themes.map(theme =>
      theme.id === id ? { ...theme, isListed: !theme.isListed } : theme
    ));
  };

  const handleSaveTheme = () => {
    if (editingTheme) {
      // Update existing theme
      setThemes(themes.map(theme =>
        theme.id === editingTheme.id ? { ...theme, ...formData } : theme
      ));
    } else {
      // Add new theme
      const newTheme: Theme = {
        id: Math.max(...themes.map(t => t.id)) + 1,
        ...formData,
        isListed: true,
        isDefault: false,
      };
      setThemes([...themes, newTheme]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Theme Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage available color themes for your website</p>
        </div>
        <button
          onClick={handleAddTheme}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Theme
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Theme
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Color Palette
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {themes.map((theme) => (
              <tr key={theme.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg shadow-md"
                      style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{theme.name}</p>
                        {theme.isDefault && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ring-1 ring-blue-600/20">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{theme.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: theme.primaryColor }}
                        title="Primary"
                      />
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: theme.secondaryColor }}
                        title="Secondary"
                      />
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: theme.accentColor }}
                        title="Accent"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleListed(theme.id)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      theme.isListed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {theme.isListed ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Listed
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Unlisted
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditTheme(theme)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1 text-xs font-medium"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1 text-xs font-medium"
                    >
                      <Palette className="w-3 h-3" />
                      Preview
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {editingTheme ? 'Edit Theme' : 'Add New Theme'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {editingTheme ? 'Update theme colors and details' : 'Create a custom color theme'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Theme Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Theme Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ocean Blue"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Calm & Peaceful"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Theme Preview
                </label>
                <div className="p-6 rounded-xl border-2 border-gray-200">
                  <div
                    className="h-32 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.accentColor})` }}
                  >
                    {formData.name || 'Theme Name'}
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: formData.primaryColor }}
                    />
                    <div
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: formData.secondaryColor }}
                    />
                    <div
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: formData.accentColor }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTheme}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {editingTheme ? 'Update Theme' : 'Add Theme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
