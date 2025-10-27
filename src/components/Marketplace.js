import React, { useState } from 'react';
import './Marketplace.css';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);

  const categories = [
    { id: 'all', name: 'Alla vårdgivare' },
    { id: 'gynecologists', name: 'Gynekologer' },
    { id: 'endocrinologists', name: 'Endokrinologer' },
    { id: 'naturopaths', name: 'Naturläkare' },
    { id: 'counselors', name: 'Terapeuter' },
    { id: 'nutritionists', name: 'Kostrådgivare' }
  ];

  const providers = [
    {
      id: 1,
      name: 'Dr. Anna Lindqvist',
      title: 'Klimakteriespecialist & Gynekolog',
      category: 'gynecologists',
      rating: 4.9,
      reviewCount: 127,
      location: 'Stockholm',
      distance: '2.3 km',
      specialties: ['Hormonbehandling', 'Kirurgisk klimakterie', 'Benskydd'],
      availability: 'Nästa tillgänglig: Imorgon',
      priceRange: '3000-4000 kr',
      image: '',
      description: 'Specialistläkare med 15+ års erfarenhet av klimakterievård. Expert på HRT-hantering och stöd vid kirurgisk klimakterie.',
      verified: true,
      acceptsInsurance: true
    },
    {
      id: 2,
      name: 'Dr. Maria Andersson',
      title: 'Naturläkare',
      category: 'naturopaths',
      rating: 4.8,
      reviewCount: 89,
      location: 'Göteborg',
      distance: '5.1 km',
      specialties: ['Naturliga hormoner', 'Kostterapi', 'Stresshantering'],
      availability: 'Nästa tillgänglig: Nästa vecka',
      priceRange: '2000-3000 kr',
      image: '',
      description: 'Naturläkare som fokuserar på naturliga tillvägagångssätt för klimakteriehantering genom livsstil och växtmedicin.',
      verified: true,
      acceptsInsurance: false
    },
    {
      id: 3,
      name: 'Dr. Eva Johansson',
      title: 'Endokrinolog',
      category: 'endocrinologists',
      rating: 4.7,
      reviewCount: 156,
      location: 'Malmö',
      distance: '8.2 km',
      specialties: ['Hormonrubbningar', 'Sköldkörtelhälsa', 'Metabolisk hälsa'],
      availability: 'Nästa tillgänglig: Denna vecka',
      priceRange: '3500-4500 kr',
      image: '',
      description: 'Endokrinolog som specialiserar sig på komplexa hormonsjukdomar och metabolisk hälsa under klimakterietransitionen.',
      verified: true,
      acceptsInsurance: true
    },
    {
      id: 4,
      name: 'Karin Svensson',
      title: 'Legitimerad terapeut',
      category: 'counselors',
      rating: 4.9,
      reviewCount: 73,
      location: 'Stockholm',
      distance: '1.8 km',
      specialties: ['Klimakterierådgivning', 'Ångesthantering', 'Relationsstöd'],
      availability: 'Nästa tillgänglig: Idag',
      priceRange: '1500-2000 kr',
      image: '',
      description: 'Legitimerad terapeut som specialiserar sig på emotionellt stöd under klimakterietransitionen och relationsrådgivning.',
      verified: true,
      acceptsInsurance: true
    },
    {
      id: 5,
      name: 'Dr. Lena Nilsson',
      title: 'Kostrådgivare & Välmåendecoach',
      category: 'nutritionists',
      rating: 4.6,
      reviewCount: 94,
      location: 'Uppsala',
      distance: '12.5 km',
      specialties: ['Klimakteriekost', 'Vikthantering', 'Benskydd'],
      availability: 'Nästa tillgänglig: Nästa vecka',
      priceRange: '1200-1800 kr',
      image: '',
      description: 'Legitimerad dietist som specialiserar sig på koststrategier för klimakteriesymptom och långsiktig hälsa.',
      verified: true,
      acceptsInsurance: false
    }
  ];

  const filteredProviders = selectedCategory === 'all' 
    ? providers 
    : providers.filter(provider => provider.category === selectedCategory);

  const handleBookAppointment = (provider) => {
    alert(`Bokar tid med ${provider.name}. Detta skulle integrera med ett riktigt bokningssystem och betalningshantering.`);
  };

  const handleShareAssessment = (provider) => {
    alert(`Delar självskattningsrapport med ${provider.name}. Detta skulle låta vårdgivaren granska dina symptom och förbereda för ditt möte.`);
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>Hitta stöd & vårdgivare</h2>
        <p>Anslut dig till verifierade specialister som förstår klimakteriet och kan ge personlig vård</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="providers-grid">
        {filteredProviders.map(provider => (
          <div key={provider.id} className="provider-card">
            <div className="provider-header">
              <div className="provider-avatar">
                {provider.verified && <span className="verified-badge">Verified</span>}
              </div>
              <div className="provider-info">
                <h3 className="provider-name">{provider.name}</h3>
                <p className="provider-title">{provider.title}</p>
                <div className="provider-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-score">{provider.rating}</span>
                  <span className="rating-count">({provider.reviewCount} recensioner)</span>
                </div>
              </div>
            </div>

            <div className="provider-details">
              <div className="location-info">
                <span>{provider.location} • {provider.distance}</span>
              </div>
              
              <div className="availability">
                <span>{provider.availability}</span>
              </div>

              <div className="price-info">
                <span>{provider.priceRange}</span>
                {provider.acceptsInsurance && (
                  <span className="insurance-badge">Tar emot försäkring</span>
                )}
              </div>
            </div>

            <div className="specialties">
              <h4>Specialiteter:</h4>
              <div className="specialty-tags">
                {provider.specialties.map(specialty => (
                  <span key={specialty} className="specialty-tag">{specialty}</span>
                ))}
              </div>
            </div>

            <p className="provider-description">{provider.description}</p>

            <div className="provider-actions">
              <button 
                className="book-btn"
                onClick={() => handleBookAppointment(provider)}
              >
                Boka tid
              </button>
              <button 
                className="share-btn"
                onClick={() => handleShareAssessment(provider)}
              >
                Dela skattning
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProvider && (
        <div className="provider-modal">
          <div className="modal-content">
            <h3>Vårdgivardetaljer</h3>
            <p>Detaljerad vårdgivarinformation skulle visas här</p>
            <button onClick={() => setSelectedProvider(null)}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
