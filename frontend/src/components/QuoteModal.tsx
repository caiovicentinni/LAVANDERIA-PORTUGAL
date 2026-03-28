'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Upload, CheckCircle2, Camera, Trash2 } from 'lucide-react';
import { createQuote, type ServiceData } from '@/lib/api';
import type { Lang, Translations } from '@/lib/translations';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
  lang: Lang;
  services: ServiceData[];
}

const uploadLabels = {
  pt: { title: 'Enviar foto da peça', hint: 'Arraste ou clique para enviar', formats: 'JPG, PNG ou WEBP (máx. 10MB)', remove: 'Remover foto' },
  br: { title: 'Enviar foto da peça', hint: 'Arraste ou clique para enviar', formats: 'JPG, PNG ou WEBP (máx. 10MB)', remove: 'Remover foto' },
  en: { title: 'Upload item photo', hint: 'Drag & drop or click to upload', formats: 'JPG, PNG or WEBP (max 10MB)', remove: 'Remove photo' },
};

export default function QuoteModal({ isOpen, onClose, t, lang, services }: QuoteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    length: '', width: '', cep: '', details: '',
    firstName: '', lastName: '', email: '', whatsapp: '',
  });

  const ul = uploadLabels[lang] || uploadLabels.pt;

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSuccess(false);
        setSelectedService(null);
        setPhoto(null);
        setPhotoPreview(null);
        setFormData({ length: '', width: '', cep: '', details: '', firstName: '', lastName: '', email: '', whatsapp: '' });
      }, 300);
    }
  }, [isOpen]);

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) return; // max 10MB
    if (!file.type.startsWith('image/')) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const removePhoto = () => { setPhoto(null); setPhotoPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getServiceName = (s: ServiceData) => {
    if (lang === 'en') return s.name_en;
    if (lang === 'br') return s.name_br;
    return s.name_pt;
  };

  const nextStep = () => {
    if (step === 1 && !selectedService) return;
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!selectedService) return;
    setSubmitting(true);
    try {
      await createQuote({
        service: selectedService.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        postal_code: formData.cep,
        length: selectedService.requires_dimensions ? formData.length : undefined,
        width: selectedService.requires_dimensions ? formData.width : undefined,
        details: formData.details || undefined,
        language: lang,
        photo: photo || undefined,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Erro ao criar orçamento:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-xl mx-4 bg-white p-8 rounded-[2rem] border border-border shadow-2xl overflow-hidden animate-[fadeIn_0.4s_ease-out] max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-textSecondary hover:text-dark z-10">
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-12 animate-[fadeIn_0.4s_ease-out]">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-dark mb-2">
              {lang === 'en' ? 'Quote sent successfully!' : 'Orçamento enviado com sucesso!'}
            </h2>
            <p className="text-textSecondary font-body mb-6">
              {lang === 'en' ? 'Check your email for confirmation.' : 'Verifique o seu e-mail para confirmação.'}
            </p>
            <button onClick={onClose} className="magnetic-btn px-6 py-3 rounded-full bg-primary text-white font-medium">OK</button>
          </div>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full bg-border overflow-hidden relative ${step >= i ? 'opacity-100' : 'opacity-30'}`}>
                  {step >= i && <div className="absolute inset-0 bg-primary w-full origin-left animate-[scaleX_0.5s_ease-out]" />}
                </div>
              ))}
            </div>

            {/* Step 1 - Service Selection + Photo Upload */}
            {step === 1 && (
              <div className="animate-[fadeIn_0.4s_ease-out]">
                <h2 className="text-3xl font-heading font-bold tracking-tight mb-2 text-dark">{t.mTitle1}</h2>
                <p className="text-textSecondary mb-6 font-body">{t.mSub1}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {services.map(srv => {
                    const isActive = selectedService?.id === srv.id;
                    return (
                      <button key={srv.id} onClick={() => setSelectedService(srv)}
                        className={`p-4 text-left rounded-2xl border transition-all duration-300 ${isActive ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-background border-border text-dark hover:bg-black/5 hover:border-black/10'}`}>
                        <div className="flex justify-between items-center">
                          <span className="font-heading tracking-wide text-sm font-medium">{getServiceName(srv)}</span>
                          {isActive && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>



                <div className="flex justify-end">
                  <button onClick={nextStep} disabled={!selectedService}
                    className="magnetic-btn px-6 py-3 rounded-full bg-dark text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    {t.mBtn1} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="animate-[fadeIn_0.4s_ease-out]">
                <h2 className="text-3xl font-heading font-medium tracking-tight mb-2 text-dark">{t.mTitle2}</h2>
                <p className="text-textSecondary mb-8 font-body">{t.mSub2}</p>
                
                <div className="space-y-4 mb-8">
                  {/* Upload de Foto */}
                  <div className="mb-2 animate-[fadeIn_0.3s_ease-out]">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 min-h-[8rem] flex flex-col items-center justify-center ${
                        isDragging
                          ? 'border-primary bg-primary/5 scale-[1.02]'
                          : 'border-border hover:border-primary/50 bg-backgroundAlt hover:bg-primary/5'
                      }`}
                    >
                      {!photoPreview ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-primary/20' : 'bg-surface'}`}>
                            <Upload className={`w-5 h-5 ${isDragging ? 'text-primary' : 'text-textSecondary'}`} />
                          </div>
                          <span className="text-sm font-heading text-textSecondary font-medium text-center px-2">
                            {selectedService ? t.mUpload(getServiceName(selectedService)) : ul.title}
                          </span>
                        </div>
                      ) : (
                        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm group w-full h-40">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <button
                              onClick={(e: React.MouseEvent) => { e.stopPropagation(); removePhoto(); }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg"
                            >
                              <Trash2 className="w-4 h-4" /> {ul.remove}
                            </button>
                          </div>
                          <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
                      />
                    </div>
                  </div>

                  {selectedService?.requires_dimensions ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mLength}</label>
                          <input type="text" placeholder="Ex: 2.5" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.length} onChange={e => handleChange('length', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mWidth}</label>
                          <input type="text" placeholder="Ex: 1.8" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.width} onChange={e => handleChange('width', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mCep}</label>
                        <input type="text" placeholder="Ex: 1000-001" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.cep} onChange={e => handleChange('cep', e.target.value)} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mDetails}</label>
                        <textarea rows={3} placeholder={t.mDetailsPlaceholder} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.details} onChange={e => handleChange('details', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mCep}</label>
                        <input type="text" placeholder="Ex: 1000-001" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.cep} onChange={e => handleChange('cep', e.target.value)} />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-between">
                  <button onClick={prevStep} className="px-6 py-3 rounded-full text-textSecondary flex items-center gap-2 hover:text-dark transition-colors font-medium">
                    <ChevronLeft className="w-4 h-4" /> {t.mBack}
                  </button>
                  <button onClick={nextStep} className="magnetic-btn px-6 py-3 rounded-full bg-dark text-white font-medium flex items-center gap-2">
                    {t.mNext} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="animate-[fadeIn_0.4s_ease-out]">
                <h2 className="text-3xl font-heading font-medium tracking-tight mb-2 text-dark">{t.mTitle3}</h2>
                <p className="text-textSecondary mb-8 font-body">{t.mSub3}</p>
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mName}</label>
                      <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mLast}</label>
                      <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mEmail}</label>
                    <input type="email" placeholder="seu@email.com" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-textSecondary font-bold mb-2 font-mono">{t.mWpp}</label>
                    <input type="text" placeholder="+351 900 000 000" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" value={formData.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} />
                  </div>

                  {/* Preview resumo da foto enviada */}
                  {photoPreview && (
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border">
                      <img src={photoPreview} alt="Foto anexada" className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-dark truncate">{photo?.name}</p>
                        <p className="text-xs text-textSecondary">{photo ? `${(photo.size / 1024).toFixed(0)} KB` : ''}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <button onClick={prevStep} className="px-6 py-3 rounded-full text-textSecondary flex items-center gap-2 hover:text-dark transition-colors font-medium">
                    <ChevronLeft className="w-4 h-4" /> {t.mBack}
                  </button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className="magnetic-btn px-6 py-3 rounded-full bg-primary text-white font-medium shadow-[0_4px_20px_rgba(37,170,225,0.4)] flex items-center gap-2 disabled:opacity-50">
                    {submitting ? '...' : t.mSubmit} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
