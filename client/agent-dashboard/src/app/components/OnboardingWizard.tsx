import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { BrandSetup } from './onboarding/BrandSetup';
import { DomainSetup } from './onboarding/DomainSetup';
import { FirstPackage } from './onboarding/FirstPackage';
import { TestEnquiry } from './onboarding/TestEnquiry';
import { DashboardTour } from './onboarding/DashboardTour';
import { useNavigate } from 'react-router';
import orbitleLogo from "../../assets/orbitle-logo.png";

interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function OnboardingWizard({ isOpen, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();

  const [brandData, setBrandData] = useState({
    theme: 'navy',
    name: 'Your Business Name',
    tagline: 'Creating Memories, One Journey at a Time'
  });

  const steps = [
    { id: 1, title: 'Your Brand', subtitle: 'Logo & Colors', icon: '🎨', component: BrandSetup },
    { id: 2, title: 'Domain', subtitle: 'Website URL', icon: '🌐', component: DomainSetup },
    { id: 3, title: 'First Package', subtitle: 'Core Activation', icon: '📦', component: FirstPackage },
    { id: 4, title: 'Test Enquiry', subtitle: 'Try It Out', icon: '🧪', component: TestEnquiry },
    { id: 5, title: 'Dashboard Tour', subtitle: 'Final Steps', icon: '📊', component: DashboardTour },
  ];

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => handleNext();

  const CurrentStepComponent = steps[currentStep - 1].component;

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(8px, 2vh, 16px)',
        background: 'linear-gradient(135deg, #0f1e35 0%, #1a3a5c 50%, #0f1e35 100%)',
      }}
    >
      {/* Background accents */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', top: -160, right: -160, background: 'radial-gradient(circle, rgba(37,99,168,0.18) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', bottom: -160, left: -160, background: 'radial-gradient(circle, rgba(59,130,196,0.12) 0%, transparent 70%)' }} />
      </div>

      {/* Main wizard container */}
      <div
        style={{
          position: 'relative', background: '#ffffff',
          borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          width: '100%', maxWidth: 860,
          display: 'flex', flexDirection: 'column',
          maxHeight: '96vh', overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #1a2f4e, #2563a8, #3b82c4)' }} />

        {/* Header with logo + steps */}
        <div style={{ flexShrink: 0, background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: 'clamp(12px, 2vh, 20px) clamp(16px, 3vw, 28px)' }}>
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(12px, 2vh, 18px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #1a2f4e, #2563a8)',
                boxShadow: '0 4px 10px rgba(37,99,168,0.3)',
                overflow: 'hidden',
              }}>
                <img src={orbitleLogo} alt="Orbitle" style={{ width: 22, height: 22, objectFit: 'contain' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px', color: '#1a2f4e' }}>Orbitle</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
              <Sparkles style={{ width: 13, height: 13, color: '#2563a8' }} />
              <span style={{ fontWeight: 600, color: '#1a2f4e' }}>Step {currentStep}</span>
              <span>of {steps.length}</span>
              <span style={{ marginLeft: 8, padding: '2px 10px', borderRadius: 999, background: '#eef4fb', color: '#2563a8', fontWeight: 600, fontSize: 11 }}>
                {Math.round((completedSteps.length / steps.length) * 100)}% done
              </span>
            </div>
          </div>

          {/* Step indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: index < steps.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 700,
                      transition: 'all 0.3s',
                      background: isCompleted
                        ? 'linear-gradient(135deg, #16a34a, #059669)'
                        : isCurrent
                        ? 'linear-gradient(135deg, #1a2f4e, #2563a8)'
                        : '#e2e8f0',
                      color: isCompleted || isCurrent ? '#fff' : '#94a3b8',
                      boxShadow: isCurrent ? '0 0 0 3px rgba(37,99,168,0.2)' : 'none',
                    }}>
                      {isCompleted ? <Check style={{ width: 16, height: 16 }} /> : <span style={{ fontSize: 15 }}>{step.icon}</span>}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 10, fontWeight: 600, color: isCurrent ? '#1a2f4e' : '#94a3b8', margin: 0, whiteSpace: 'nowrap' }}>{step.title}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div style={{
                      flex: 1, height: 2, margin: '0 6px', marginBottom: 18, borderRadius: 2,
                      background: isCompleted ? '#16a34a' : '#e2e8f0',
                      transition: 'background 0.3s',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content — scrollable only if needed */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(14px, 2.5vh, 24px) clamp(16px, 3vw, 28px)' }}>
          <CurrentStepComponent onNext={handleNext} onSkip={handleSkip} brandData={brandData} setBrandData={setBrandData} />
        </div>

        {/* Footer */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(10px, 1.8vh, 16px) clamp(16px, 3vw, 28px)',
          borderTop: '1px solid #e2e8f0', background: '#f8fafc',
        }}>
          <button
            onClick={handleSkip}
            style={{ fontSize: 13, color: '#64748b', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1a2f4e')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
          >
            Skip for now
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{
                  padding: '8px 18px', fontSize: 13, fontWeight: 500,
                  color: '#374151', background: '#fff', border: '1px solid #d1d5db',
                  borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              style={{
                padding: '8px 20px', fontSize: 13, fontWeight: 600,
                color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
                background: 'linear-gradient(135deg, #1a2f4e 0%, #2563a8 100%)',
                boxShadow: '0 4px 12px rgba(37,99,168,0.35)',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {currentStep === steps.length ? 'Complete Setup 🎉' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}