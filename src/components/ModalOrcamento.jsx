import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronRight, ChevronLeft, Upload, CheckCircle2 } from 'lucide-react';

export default function ModalOrcamento({ isOpen, onClose, t }) {
  const SERVICES = [
    t.sSeco || 'Limpeza a Seco',
    t.sTapetes || 'Limpeza Tapetes',
    t.sCortinas || 'Limpeza Cortinados',
    t.sImper || 'Impermeabilização',
    t.sTinta || 'Tinturaria',
    t.sEdredoes || 'Edredões'
  ];
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    length: '',
    width: '',
    cep: '',
    photo: null,
    details: '',
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(modalRef.current, { opacity: 1, visibility: 'visible', duration: 0.3 });
        gsap.fromTo(contentRef.current,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
        );
      } else {
        gsap.to(contentRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
        gsap.to(modalRef.current, {
          opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => {
            gsap.set(modalRef.current, { visibility: 'hidden' });
            setTimeout(() => {
              setStep(1);
              setIsSubmitting(false);
            }, 300);
          }
        });
      }
    });
    return () => ctx.revert();
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.service) return;
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);

  const generateWhatsAppLink = () => {
    let message = `*Novo Pedido de Orçamento | Edson Lavanderia*%0A%0A`;
    message += `*Serviço:* ${formData.service}%0A`;
    if ([t.sTapetes, t.sEdredoes].includes(formData.service)) {
      message += `*Medidas:* ${formData.length}x${formData.width}m%0A`;
      message += `*CEP:* ${formData.cep}%0A`;
    } else {
      message += `*Detalhes:* ${formData.details || 'Nenhum'}%0A`;
      message += `*CEP:* ${formData.cep}%0A`;
    }
    message += `%0A*Dados do Cliente:*%0A`;
    message += `Nome: ${formData.firstName} ${formData.lastName}%0A`;
    message += `Email: ${formData.email}%0A`;
    message += `WhatsApp: ${formData.whatsapp}`;

    return `https://wa.me/5521999994940?text=${message}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Create FormData object matching Django parameters
    const formDataObj = new FormData();
    formDataObj.append('service', formData.service);
    formDataObj.append('length', formData.length);
    formDataObj.append('width', formData.width);
    formDataObj.append('cep', formData.cep);
    formDataObj.append('details', formData.details);
    formDataObj.append('first_name', formData.firstName);
    formDataObj.append('last_name', formData.lastName);
    formDataObj.append('email', formData.email);
    formDataObj.append('whatsapp', formData.whatsapp);
    
    if (formData.photo) {
      formDataObj.append('photo', formData.photo);
    }

    // Determine the API URL depending on deployment context
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    try {
      const res = await fetch(`${API_URL}/quotes/`, {
        method: 'POST',
        body: formDataObj,
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      
      // Send them to the dynamic API WhatsApp link, or the fallback one
      const finalUrl = data.whatsapp_url || generateWhatsAppLink();
      window.open(finalUrl, '_blank');
      
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback: If backend is unreachable, still open WhatsApp
      window.open(generateWhatsAppLink(), '_blank');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 invisible"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-xl mx-4 bg-white p-8 rounded-[2rem] border border-border shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-textSecondary hover:text-dark"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full bg-border overflow-hidden relative ${step >= i ? 'opacity-100' : 'opacity-30'}`}>
              {step >= i && <div className="absolute inset-0 bg-primary w-full origin-left animate-[scaleX_0.5s_ease-out]"></div>}
            </div>
          ))}
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-3xl font-heading font-bold tracking-tight mb-2 text-dark">{t.mTitle1}</h2>
            <p className="text-textSecondary mb-8 font-body">{t.mSub1}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {SERVICES.map(srv => {
                const isActive = formData.service === srv;
                return (
                  <button
                    key={srv}
                    onClick={() => handleChange('service', srv)}
                    className={`p-4 text-left rounded-2xl border transition-all duration-300 ${isActive ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-background border-border text-dark hover:bg-black/5 hover:border-black/10'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-heading tracking-wide text-sm font-medium">{srv}</span>
                      {isActive && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!formData.service}
                className="magnetic-btn px-6 py-3 rounded-full bg-dark text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {t.mBtn1} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-3xl font-heading font-medium tracking-tight mb-2 text-dark">{t.mTitle2}</h2>
            <p className="text-textSecondary mb-8 font-body">{t.mSub2}</p>

            <div className="space-y-4 mb-8">
              <div onClick={() => document.getElementById('photo-upload').click()} className="p-4 border border-dashed border-border rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group flex items-center justify-center flex-col gap-2 h-32 bg-backgroundAlt">
                <Upload className="w-6 h-6 text-textSecondary group-hover:text-primary transition-colors" />
                <span className="text-sm font-heading text-textSecondary font-medium text-center px-4">
                  {formData.photo ? formData.photo.name : t.mUpload(formData.service)}
                </span>
                <input id="photo-upload" type="file" className="hidden" onChange={(e) => handleChange('photo', e.target.files[0])} />
              </div>

              {[t.sTapetes, t.sEdredoes].includes(formData.service) ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mLength}</label>
                      <input type="text" placeholder="Ex: 2.5" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.length} onChange={(e) => handleChange('length', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mWidth}</label>
                      <input type="text" placeholder="Ex: 1.8" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.width} onChange={(e) => handleChange('width', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mCep}</label>
                    <input type="text" placeholder="Ex: 1000-001" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.cep} onChange={(e) => handleChange('cep', e.target.value)} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mDetails}</label>
                    <textarea rows="3" placeholder={t.mDetailsPlaceholder} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.details} onChange={(e) => handleChange('details', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mCep}</label>
                    <input type="text" placeholder="Ex: 1000-001" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.cep} onChange={(e) => handleChange('cep', e.target.value)} />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={prevStep} className="px-6 py-3 rounded-full text-textSecondary flex items-center gap-2 hover:text-dark transition-colors font-medium">
                <ChevronLeft className="w-4 h-4" /> {t.mBack}
              </button>
              <button onClick={nextStep} className="magnetic-btn px-6 py-3 rounded-full bg-dark text-white font-medium disabled:opacity-50 flex items-center gap-2">
                {t.mNext} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-3xl font-heading font-medium tracking-tight mb-2 text-dark">{t.mTitle3}</h2>
            <p className="text-textSecondary mb-8 font-body">{t.mSub3}</p>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mName}</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mLast}</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mEmail}</label>
                <input type="email" placeholder="seu@email.com" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mWpp}</label>
                <input type="text" placeholder="+55 21 00000 0000" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} />
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={prevStep} disabled={isSubmitting} className="px-6 py-3 rounded-full text-textSecondary flex items-center gap-2 hover:text-dark transition-colors font-medium disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" /> {t.mBack}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="magnetic-btn px-6 py-3 rounded-full bg-primary text-white font-medium shadow-[0_4px_20px_rgba(37,170,225,0.4)] flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? 'Enviando...' : t.mSubmit} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
