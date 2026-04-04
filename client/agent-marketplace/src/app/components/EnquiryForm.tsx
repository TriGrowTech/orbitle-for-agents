import { useState, useEffect } from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Users, MessageSquare, Hotel, Plane,
  CheckCircle2, DollarSign, Clock, Shield, Send
} from 'lucide-react';

// ── Shared sub-components ───────────────────────────────

interface FormFieldProps {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  required?: boolean;
  tooltip?: string;
}

const FormField = ({ label, icon: Icon, children, required, tooltip }: FormFieldProps) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
      {Icon && <Icon className="h-3.5 w-3.5 text-[var(--theme-primary)]" />}
      {label} {required && <span className="text-red-500">*</span>}
      {tooltip && <span className="text-xs text-gray-500 font-normal">({tooltip})</span>}
    </label>
    {children}
  </div>
);

interface ProgressStepProps {
  number: number;
  active: boolean;
  completed: boolean;
}

const ProgressStep = ({ number, active, completed }: ProgressStepProps) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
    completed
      ? 'bg-green-500 text-white'
      : active
        ? 'bg-[var(--theme-primary)] text-white ring-2 ring-[var(--theme-primary)]/20'
        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
  }`}>
    {completed ? <CheckCircle2 className="w-4 h-4" /> : number}
  </div>
);

const inputClass = 'w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] transition-all text-gray-900 dark:text-white placeholder-gray-400 text-sm bg-white dark:bg-gray-800';

// ── Types ───────────────────────────────────────────────

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  numberOfDays: string;
  hotelBooked: string;
  hotelType: string;
  budgetRupees: string;
  adults: number;
  children: number;
  ticketsBooked: string;
  ticketFlight: boolean;
  ticketTrain: boolean;
  ticketBus: boolean;
  specialRequests: string;
  formFillTime: number;
}

export interface EnquiryFormProps {
  /** Pre-fill destination (e.g. from package detail page) */
  prefilledDestination?: string;
  /** Pre-fill package name for display */
  prefilledPackageName?: string;
  /** Pre-fill duration in days */
  prefilledDuration?: string;
  /** Lock the destination field (user can't change it) */
  lockDestination?: boolean;
  /** Callback when form is submitted successfully */
  onSubmitSuccess?: () => void;
  /** Compact mode — hides the "How It Works" sidebar */
  compact?: boolean;
  /** Hide the hero header section */
  hideHeader?: boolean;
}

const initialFormData: EnquiryFormData = {
  name: '', email: '', phone: '', fromLocation: '', toLocation: '', departureDate: '',
  numberOfDays: '', hotelBooked: 'no', hotelType: '', budgetRupees: '', adults: 1,
  children: 0, ticketsBooked: 'no', ticketFlight: false, ticketTrain: false,
  ticketBus: false, specialRequests: '', formFillTime: 0,
};

// ── Component ───────────────────────────────────────────

export function EnquiryForm({
  prefilledDestination = '',
  prefilledPackageName = '',
  prefilledDuration = '',
  lockDestination = false,
  onSubmitSuccess,
  compact = false,
  hideHeader = false,
}: EnquiryFormProps) {
  const [startTime] = useState(Date.now());
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>({
    ...initialFormData,
    toLocation: prefilledDestination,
    numberOfDays: prefilledDuration,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData(prev => ({ ...prev, formFillTime: Math.floor((Date.now() - startTime) / 1000) }));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: return !!(formData.name && formData.email && formData.phone);
      case 2: return !!(formData.fromLocation && formData.toLocation && formData.departureDate && formData.numberOfDays);
      case 3: return !!formData.budgetRupees;
      default: return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shouldSubmit) return;
    console.log('Form submitted:', formData);
    setShouldSubmit(false);
    setTimeout(() => setShowSuccess(true), 200);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setTimeout(() => {
      setCurrentStep(1);
      setShouldSubmit(false);
      setFormData({ ...initialFormData, toLocation: prefilledDestination, numberOfDays: prefilledDuration });
      onSubmitSuccess?.();
    }, 500);
  };

  const steps = [
    { number: 1, label: 'Your Info' },
    { number: 2, label: 'Travel Plan' },
    { number: 3, label: 'Preferences' },
    { number: 4, label: 'Details' },
  ];

  const howItWorks = [
    { icon: Send, title: 'Submit Your Request', desc: 'Fill in your travel preferences' },
    { icon: Phone, title: "We'll Contact You", desc: 'Personal call within 24 hours' },
    { icon: CheckCircle2, title: 'Get Custom Plan', desc: 'Receive tailored itinerary' },
  ];

  const tickets = [
    { name: 'ticketFlight', icon: Plane, label: 'Flight' },
    { name: 'ticketTrain', icon: null, label: 'Train' },
    { name: 'ticketBus', icon: null, label: 'Bus' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <FormField label="Full Name" icon={User} required>
              <input name="name" className={inputClass} onChange={handleChange} value={formData.name} placeholder="Your full name" required />
            </FormField>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Phone Number" icon={Phone} required>
                <input name="phone" type="tel" className={inputClass} onChange={handleChange} value={formData.phone} placeholder="+91 98765 43210" required />
              </FormField>
              <FormField label="Email Address" icon={Mail} required>
                <input name="email" type="email" className={inputClass} onChange={handleChange} value={formData.email} placeholder="your@email.com" required />
              </FormField>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Departure City" icon={MapPin} required>
                <input name="fromLocation" className={inputClass} onChange={handleChange} value={formData.fromLocation} placeholder="e.g., Mumbai" required />
              </FormField>
              <FormField label="Destination" icon={MapPin} required>
                {lockDestination ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-sm">
                    <MapPin className="w-4 h-4 text-[var(--theme-primary)]" />
                    <span className="font-medium text-gray-900 dark:text-white">{formData.toLocation}</span>
                    {prefilledPackageName && <span className="text-xs text-gray-500 ml-auto">({prefilledPackageName})</span>}
                  </div>
                ) : (
                  <input name="toLocation" className={inputClass} onChange={handleChange} value={formData.toLocation} placeholder="e.g., Goa" required />
                )}
              </FormField>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Travel Date" icon={Calendar} required>
                <input type="date" name="departureDate" className={inputClass} onChange={handleChange} value={formData.departureDate} required />
              </FormField>
              <FormField label="Duration (days)" required>
                <input type="number" name="numberOfDays" min="1" className={inputClass} onChange={handleChange} value={formData.numberOfDays} placeholder="e.g., 5" required />
              </FormField>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Adults" icon={Users} required>
                <input type="number" name="adults" min="1" className={inputClass} onChange={handleChange} value={formData.adults} required />
              </FormField>
              <FormField label="Children" icon={Users}>
                <input type="number" name="children" min="0" className={inputClass} onChange={handleChange} value={formData.children} placeholder="0" />
              </FormField>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <FormField label="Budget Per Person (₹)" icon={DollarSign} required>
              <input type="number" name="budgetRupees" className={inputClass} onChange={handleChange} value={formData.budgetRupees} placeholder="e.g., 25000" required />
            </FormField>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Need Hotel?" icon={Hotel} required>
                <select name="hotelBooked" value={formData.hotelBooked} onChange={handleChange} className={inputClass} required>
                  <option value="no">I'll book myself</option>
                  <option value="yes">Yes, please arrange</option>
                </select>
              </FormField>
              {formData.hotelBooked === 'yes' && (
                <FormField label="Hotel Type" required>
                  <select name="hotelType" value={formData.hotelType} onChange={handleChange} className={inputClass} required>
                    <option value="">Select</option>
                    {['budget', '3-star', '4-star', '5-star', '6-star', '7-star'].map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </FormField>
              )}
            </div>
            <FormField label="Travel Tickets" icon={Plane} required>
              <select name="ticketsBooked" value={formData.ticketsBooked} onChange={handleChange} className={inputClass} required>
                <option value="no">Need help booking</option>
                <option value="yes">Already booked</option>
              </select>
            </FormField>
            {formData.ticketsBooked === 'yes' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ticket type:</label>
                <div className="flex flex-wrap gap-2">
                  {tickets.map(ticket => (
                    <label key={ticket.name} className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-all text-sm ${
                      (formData as any)[ticket.name] ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/5' : 'border-gray-200 dark:border-gray-600 hover:border-[var(--theme-primary)]/50'
                    }`}>
                      <input type="checkbox" name={ticket.name} checked={(formData as any)[ticket.name]} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-[var(--theme-primary)] focus:ring-[var(--theme-primary)]" />
                      {ticket.icon && <ticket.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                      <span className="font-medium text-gray-900 dark:text-white">{ticket.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      case 4:
        return (
          <>
            <FormField label="Special Requests (Optional)" icon={MessageSquare}>
              <textarea name="specialRequests" rows={4} value={formData.specialRequests} onChange={handleChange} className={inputClass} placeholder="E.g., vegetarian meals, wheelchair access, anniversary celebration, specific activities..." />
            </FormField>
            <div className="bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-primary)]" />
                Review Your Request
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs">
                {([
                  ['Name:', formData.name],
                  ['Phone:', formData.phone],
                  ['Email:', formData.email],
                  ['Route:', `${formData.fromLocation} → ${formData.toLocation}`],
                  ['Start Date:', formData.departureDate],
                  ['Duration:', `${formData.numberOfDays} days`],
                  ['Travelers:', `${formData.adults} Adults + ${formData.children} Children`],
                  ['Budget:', `₹${formData.budgetRupees}`],
                  ['Hotel Required:', formData.hotelBooked === 'yes' ? `Yes (${formData.hotelType || 'Not selected'})` : 'No'],
                  ['Tickets Booked:', formData.ticketsBooked === 'yes'
                    ? [formData.ticketFlight && 'Flight', formData.ticketTrain && 'Train', formData.ticketBus && 'Bus'].filter(Boolean).join(', ') || 'Booked'
                    : 'Need help'],
                ] as [string, string][]).map(([label, value], i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <span className="text-gray-600 dark:text-gray-400 shrink-0">{label}</span>
                    <span className={`font-semibold text-gray-900 dark:text-white text-right ${label === 'Email:' ? 'truncate' : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-green-800 dark:text-green-300">
                <strong>What happens next?</strong> We'll review your request and call you within 24 hours to discuss your personalized itinerary.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className={compact ? '' : 'w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'}>
        <div className="w-full">
          {/* Hero Header */}
          {!hideHeader && (
            <div className="bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-secondary)] to-[var(--theme-primary)] text-white py-12 px-6">
              <div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/20">
                  <Clock className="w-3.5 h-3.5" />
                  Quick Response · Personal Service
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">Plan Your Journey with Us</h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Share your travel preferences and we'll create a personalized itinerary tailored just for you
                </p>
              </div>
            </div>
          )}

          <div className={`max-w-6xl mx-auto ${hideHeader ? '' : 'px-4 sm:px-6 py-6 sm:py-8'}`}>
            <div className={`grid ${compact ? '' : 'lg:grid-cols-12'} gap-4 sm:gap-6`}>
              {/* Left Sidebar — desktop only, non-compact */}
              {!compact && (
                <>
                  <div className="lg:col-span-4 space-y-3 sm:space-y-5 lg:block hidden">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">How This Works</h3>
                      <div className="space-y-3 sm:space-y-4">
                        {howItWorks.map((item, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 p-2 rounded-lg shrink-0">
                              <item.icon className="h-4 w-4 text-[var(--theme-primary)]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{item.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 sm:p-4 border border-green-300 dark:border-green-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-green-100 dark:bg-green-800 p-1.5 sm:p-2 rounded-lg">
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-md font-semibold text-green-900 dark:text-green-300">100% Secure</p>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">Your information is private</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile — How It Works before form */}
                  <div className="lg:hidden">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">How This Works</h3>
                      <div className="space-y-3 sm:space-y-4">
                        {howItWorks.map((item, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 p-2 rounded-lg shrink-0">
                              <item.icon className="h-4 w-4 text-[var(--theme-primary)]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{item.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Main Form */}
              <div className={compact ? 'w-full' : 'lg:col-span-8'}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 sm:p-5 pb-0 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--theme-primary)] mb-1">Plan Your Journey With Us</h2>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Share your preferences and let us handle the details</p>
                  </div>
                  {/* Progress Bar */}
                  <div className="bg-gradient-to-r from-gray-50 to-[var(--theme-primary)]/5 dark:from-gray-700 dark:to-gray-700 p-3 sm:p-5 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center mb-2 sm:mb-3 justify-center">
                      {steps.map((step, i) => (
                        <div key={step.number} className="flex items-center">
                          <ProgressStep number={step.number} active={currentStep === step.number} completed={currentStep > step.number} />
                          {i < steps.length - 1 && (
                            <div className={`w-8 sm:w-16 md:w-24 h-0.5 mx-1 sm:mx-2 transition-all ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Step {currentStep} of 4: {steps[currentStep - 1].label}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {renderStep()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-200 dark:border-gray-700">
                      {currentStep > 1 && (
                        <button type="button" onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-xs sm:text-sm">
                          ← Back
                        </button>
                      )}
                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={() => validateStep(currentStep) && setCurrentStep(prev => Math.min(prev + 1, 4))}
                          disabled={!validateStep(currentStep)}
                          className={`flex-1 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                            validateStep(currentStep)
                              ? 'bg-[var(--theme-primary)] hover:opacity-90 text-white shadow-sm'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          }`}>
                          Continue →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={() => setShouldSubmit(true)}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Send Request
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Mobile trust badge — non-compact */}
              {!compact && (
                <div className="lg:hidden space-y-3 sm:space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 sm:p-4 border border-green-300 dark:border-green-700">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-green-100 dark:bg-green-800 p-1.5 sm:p-2 rounded-lg">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-md font-semibold text-green-900 dark:text-green-300">100% Secure</p>
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">Your information is private</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 max-w-md w-full text-center shadow-2xl">
            <div className="bg-green-100 dark:bg-green-800 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Request Sent Successfully!</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">
              Thank you! We will review your request and contact you within 24 hours with a personalized itinerary.
            </p>
            <button onClick={handleSuccessClose} className="bg-[var(--theme-primary)] hover:opacity-90 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-xs sm:text-sm">
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
