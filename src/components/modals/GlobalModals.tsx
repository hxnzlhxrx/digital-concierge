import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Utensils, Car, CheckCircle2, Wine, Clock, Shield } from 'lucide-react';
import { useConcierge } from '../../context/ConciergeContext';

export const GlobalModals: React.FC = () => {
  const { activeModal, setActiveModal, addRequest, t, language } = useConcierge();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Amenities Modal State
  const [pillowType, setPillowType] = useState('Goose Down Soft');
  const [linenSet, setLinenSet] = useState('600-Thread Egyptian Cotton');
  const [bathRitual, setBathRitual] = useState('L’Occitane Caju & Ocean Salts');
  const [amenityTime, setAmenityTime] = useState('21:00 (Evening Turn-Down)');
  const [amenityNotes, setAmenityNotes] = useState('');

  // Fine Dining Modal State
  const [venue, setVenue] = useState('The Carioca by Chef Amaral');
  const [partySize, setPartySize] = useState('2 Guests');
  const [diningTime, setDiningTime] = useState('20:30 BRT');
  const [sommelierPref, setSommelierPref] = useState('Old World Barolo & Brunello Pairing');
  const [seatingPref, setSeatingPref] = useState('Oceanfront Terrace Window');

  // Executive Valet & Chauffeur Modal State
  const [vehicleClass, setVehicleClass] = useState('Mercedes-Benz S-Class Luxury Sedan');
  const [destination, setDestination] = useState('Museu do Amanhã & Boulevard Olímpico');
  const [pickupTime, setPickupTime] = useState('10:00 BRT · Main Porte-Cochère');
  const [securityProtocol, setSecurityProtocol] = useState('Bilingual Private Chauffeur & City Concierge');

  // Open native <dialog> via showModal() with fallback for test environments
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeModal) {
      if (typeof dialog.showModal === 'function' && !dialog.open) {
        try {
          dialog.showModal();
        } catch {
          dialog.setAttribute('open', '');
        }
      } else {
        dialog.setAttribute('open', '');
      }
    } else {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  }, [activeModal]);

  // Escape key & light-dismiss fallback per modern-web-guidance
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (!activeModal) return null;

  const handleAmenitiesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      category: 'Amenity',
      title: `In-Room Linen & Amenity Curation (${pillowType})`,
      details: `${linenSet} · ${bathRitual} · Window: ${amenityTime}${
        amenityNotes ? ` · Note: ${amenityNotes}` : ''
      }`,
      priority: 'VIP Titanium',
    });
    setActiveModal(null);
  };

  const handleDiningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      category: 'Dining',
      title: `${venue} — Table Reservation`,
      details: `${partySize} · ${diningTime} · ${seatingPref} · Sommelier: ${sommelierPref}`,
      priority: 'VIP Titanium',
    });
    setActiveModal(null);
  };

  const handleValetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      category: 'Chauffeur',
      title: `${vehicleClass} — ${destination}`,
      details: `Pickup: ${pickupTime} · Protocol: ${securityProtocol}`,
      priority: 'Immediate',
    });
    setActiveModal(null);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-headline"
      onClose={() => setActiveModal(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 m-auto w-full max-w-xl rounded-3xl leather-ivory stitched-ivory text-[#1C1C1C] border border-[#9E7E47]/50 shadow-[0_24px_60px_-8px_rgba(28,28,28,0.35)] p-0 overflow-hidden max-h-[90vh] overflow-y-auto backdrop:bg-[#141414]/68 backdrop:backdrop-blur-md"
    >
      {/* Top Brass Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#9E7E47] via-[#C5A880] to-[#9E7E47]" />

      {/* Modal Header */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[#9E7E47]/20 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47] mb-1">
            {activeModal === 'amenities' && <Sparkles className="w-3.5 h-3.5" />}
            {activeModal === 'dining' && <Utensils className="w-3.5 h-3.5" />}
            {activeModal === 'valet' && <Car className="w-3.5 h-3.5" />}
            <span>
              {activeModal === 'amenities' && t.modals.amenitiesModalSub}
              {activeModal === 'dining' && t.modals.diningModalSub}
              {activeModal === 'valet' && t.modals.valetModalSub}
            </span>
          </div>
          <h2
            id="modal-headline"
            className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C]"
          >
            {activeModal === 'amenities' && t.modals.amenitiesModalTitle}
            {activeModal === 'dining' && t.modals.diningModalTitle}
            {activeModal === 'valet' && t.modals.valetModalTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setActiveModal(null)}
          aria-label="Close modal"
          className="p-2 rounded-full bg-[#EAE5DC] text-[#1C1C1C] hover:bg-[#9E7E47] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* MODAL 1: IN-ROOM AMENITIES & LINEN REQUEST */}
      {activeModal === 'amenities' && (
        <form onSubmit={handleAmenitiesSubmit} className="p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              {language === 'en' ? 'Bespoke Pillow Menu' : 'Menu de Travesseiros Sob Medida'}
            </label>
            <select
              autoFocus
              value={pillowType}
              onChange={(e) => setPillowType(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
            >
              <option value="Goose Down Soft">Hungarian Goose Down · Soft Cloud</option>
              <option value="Orthopedic Memory Contour">Ergonomic Cervical Memory Contour</option>
              <option value="Organic Buckwheat & Lavender">Organic Buckwheat & French Lavender</option>
              <option value="Hypoallergenic Micro-Silk">Hypoallergenic Botanical Micro-Silk</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
                {language === 'en' ? 'Linen Selection' : 'Seleção de Enxoval'}
              </label>
              <select
                value={linenSet}
                onChange={(e) => setLinenSet(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
              >
                <option value="600-Thread Egyptian Cotton">600-Thread Egyptian Cotton</option>
                <option value="Cool Italian Linen Weave">Cool Breezy Italian Linen</option>
                <option value="Extra Heated Plush Towels">Heated Plush Bath & Beach Set</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
                {language === 'en' ? 'Service Window' : 'Horário de Atendimento'}
              </label>
              <select
                value={amenityTime}
                onChange={(e) => setAmenityTime(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
              >
                <option value="Immediate Dispatch (Within 15m)">Immediate Dispatch (15 mins)</option>
                <option value="21:00 (Evening Turn-Down)">21:00 Evening Turn-Down</option>
                <option value="08:00 (Morning Refresh)">08:00 Morning Refresh</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              {language === 'en' ? 'Bath & Aromatherapy Ritual' : 'Ritual de Banho e Aromaterapia'}
            </label>
            <input
              type="text"
              value={bathRitual}
              onChange={(e) => setBathRitual(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border-b-2 border-[#9E7E47] text-sm text-[#1C1C1C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              {language === 'en' ? 'Personal Butler Notes' : 'Observações para o Mordomo'}
            </label>
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'e.g., Extra still mineral water & ice bucket...'
                  : 'ex.: Água mineral sem gás extra e balde de gelo...'
              }
              value={amenityNotes}
              onChange={(e) => setAmenityNotes(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] text-sm text-[#1C1C1C] focus:border-[#9E7E47] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
            >
              {t.modals.cancel}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#9E7E47]" />
              <span>{t.modals.submitRequest}</span>
            </button>
          </div>
        </form>
      )}

      {/* MODAL 2: FINE DINING TABLE RESERVATION WITH SOMMELIER PREFERENCES */}
      {activeModal === 'dining' && (
        <form onSubmit={handleDiningSubmit} className="p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              {language === 'en' ? 'Culinary Destination' : 'Destino Gastronômico'}
            </label>
            <select
              autoFocus
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
            >
              <option value="The Carioca by Chef Amaral">
                {language === 'en'
                  ? 'The Carioca by Chef Amaral (Signature Coastal Fine Dining)'
                  : 'The Carioca por Chef Amaral (Alta Gastronomia Costeira)'}
              </option>
              <option value="The Carioca — Chef Amaral Exclusive Tasting Table">
                {language === 'en'
                  ? 'The Carioca — Chef Amaral Private Tasting Table'
                  : 'The Carioca — Mesa Privativa de Degustação do Chef Amaral'}
              </option>
              <option value="Baretto-Londra Jazz Lounge">
                {language === 'en'
                  ? 'Baretto-Londra Jazz & Vinyl Cocktail Sanctuary'
                  : 'Baretto-Londra Jazz Lounge & Coquetelaria Autoral'}
              </option>
              <option value="Suite 802 Private Oceanfront Balcony Dining">
                {language === 'en'
                  ? 'Suite 802 Private Oceanfront Balcony Candlelight Dinner'
                  : 'Jantar Privativo à Luz de Velas na Varanda da Suíte 802'}
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
                {language === 'en' ? 'Party Size' : 'Número de Convidados'}
              </label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
              >
                <option value="2 Guests (Intimate Table)">2 Guests (Intimate Table)</option>
                <option value="4 Guests (Executive Booth)">4 Guests (Executive Booth)</option>
                <option value="6 Guests (Chef’s Private Table)">6 Guests (Chef’s Private Table)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-[#9E7E47]" />
                {language === 'en' ? 'Preferred Seating Time' : 'Horário Preferido'}
              </label>
              <select
                value={diningTime}
                onChange={(e) => setDiningTime(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
              >
                <option value="19:30 BRT (Sunset Aperitivo)">19:30 BRT (Sunset Aperitivo)</option>
                <option value="20:30 BRT (Prime Tasting)">20:30 BRT (Prime Tasting)</option>
                <option value="21:45 BRT (Late Jazz Seating)">21:45 BRT (Late Jazz Seating)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              <Wine className="w-3.5 h-3.5 inline mr-1 text-[#9E7E47]" />
              {language === 'en'
                ? 'Master Sommelier Cellar Preferences'
                : 'Preferências de Adega & Sommelier'}
            </label>
            <select
              value={sommelierPref}
              onChange={(e) => setSommelierPref(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
            >
              <option value="Old World Barolo & Brunello Pairing">
                Old World Piedmont Barolo & Tuscan Brunello Pairing
              </option>
              <option value="Grand Cru Champagne & White Burgundy">
                Grand Cru Champagne & Puligny-Montrachet Flight
              </option>
              <option value="Bespoke Artisanal Cachaça & Botanical Flight">
                Bespoke Artisanal Cachaça & Zero-Proof Botanical Flight
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              {language === 'en' ? 'Table Location' : 'Localização da Mesa'}
            </label>
            <input
              type="text"
              value={seatingPref}
              onChange={(e) => setSeatingPref(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border-b-2 border-[#9E7E47] text-sm text-[#1C1C1C] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
            >
              {t.modals.cancel}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#9E7E47] text-white hover:bg-[#1C1C1C] transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.modals.submitRequest}</span>
            </button>
          </div>
        </form>
      )}

      {/* MODAL 3: EXECUTIVE VALET & CHAUFFEUR SCHEDULING */}
      {activeModal === 'valet' && (
        <form onSubmit={handleValetSubmit} className="p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              <Car className="w-3.5 h-3.5 inline mr-1 text-[#9E7E47]" />
              {language === 'en' ? 'Luxury Fleet Selection' : 'Seleção da Frota de Luxo'}
            </label>
            <select
              autoFocus
              value={vehicleClass}
              onChange={(e) => setVehicleClass(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
            >
              <option value="Mercedes-Benz S-Class Luxury Sedan">
                Mercedes-Benz S-Class 580 (Luxury Executive Sedan)
              </option>
              <option value="Mercedes-Benz V-Class Luxury Van">
                Mercedes-Benz V-Class Luxury Lounge (Up to 6 Passengers)
              </option>
              <option value="Personal Vehicle Valet Retrieval (Suite 802)">
                Immediate Personal Vehicle Valet Retrieval at Porte-Cochère
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
                {language === 'en' ? 'Curated Destination' : 'Destino Curado'}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
              >
                <option value="Museu do Amanhã & Boulevard Olímpico">
                  Museu do Amanhã (Calatrava Cultural Route)
                </option>
                <option value="Forte de Copacabana & Confeitaria Colombo">
                  Forte de Copacabana & Confeitaria Colombo
                </option>
                <option value="Corcovado & Cristo Redentor Private Access">
                  Corcovado & Cristo Redentor VIP Ascent
                </option>
                <option value="Pão de Açúcar Sunset Charter">
                  Pão de Açúcar (Sugarloaf VIP Terminal)
                </option>
                <option value="Galeão International Airport (GIG) VIP Tarmac">
                  GIG International Airport Executive Transfer
                </option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
                {language === 'en' ? 'Departure Schedule' : 'Horário de Partida'}
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#D1C5B5] focus:border-[#9E7E47] focus:outline-none text-sm text-[#1C1C1C]"
              >
                <option value="Immediate Readiness (10 mins)">Immediate Readiness (10 mins)</option>
                <option value="10:00 BRT · Main Porte-Cochère">10:00 BRT · Main Porte-Cochère</option>
                <option value="16:30 BRT · Sunset Arpoador Route">16:30 BRT · Sunset Route</option>
                <option value="20:00 BRT · Evening Dining Escort">20:00 BRT · Evening Escort</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2">
              {language === 'en' ? 'Chauffeur & Concierge Protocol' : 'Protocolo do Chofer & Concierge'}
            </label>
            <input
              type="text"
              value={securityProtocol}
              onChange={(e) => setSecurityProtocol(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border-b-2 border-[#9E7E47] text-sm text-[#1C1C1C] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
            >
              {t.modals.cancel}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#9E7E47]" />
              <span>{t.modals.submitRequest}</span>
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
};
