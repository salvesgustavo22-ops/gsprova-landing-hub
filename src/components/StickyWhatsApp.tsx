import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircleIcon, XIcon } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export const StickyWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('sticky_whatsapp', 'geral');

    const message = encodeURIComponent(
      'Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.'
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="rounded-full bg-green-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600"
        title="Fale conosco no WhatsApp"
      >
        <MessageCircleIcon className="size-6" />
      </button>
    </div>
  );
};
