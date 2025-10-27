import React, { useState } from 'react';
import './Marketplace.css';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);

  const categories = [
    { id: 'all', name: 'All Providers' },
    { id: 'gynecologists', name: 'Gynecologists' },
    { id: 'endocrinologists', name: 'Endocrinologists' },
    { id: 'naturopaths', name: 'Naturopaths' },
    { id: 'counselors', name: 'Counselors' },
    { id: 'nutritionists', name: 'Nutritionists' }
  ];

  const providers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Menopause Specialist & Gynecologist',
      category: 'gynecologists',
      rating: 4.9,
      reviewCount: 127,
      location: 'San Francisco, CA',
      distance: '2.3 miles',
      specialties: ['Hormone Therapy', 'Surgical Menopause', 'Bone Health'],
      availability: 'Next available: Tomorrow',
      priceRange: '$300-400',
      image: '',
      description: 'Board-certified gynecologist with 15+ years specializing in menopause care. Expert in HRT management and surgical menopause support.',
      verified: true,
      acceptsInsurance: true
    },
    {
      id: 2,
      name: 'Dr. Lisa Chen',
      title: 'Naturopathic Doctor',
      category: 'naturopaths',
      rating: 4.8,
      reviewCount: 89,
      location: 'Berkeley, CA',
      distance: '5.1 miles',
      specialties: ['Natural Hormones', 'Nutrition Therapy', 'Stress Management'],
      availability: 'Next available: Next week',
      priceRange: '$200-300',
      image: '',
      description: 'Naturopathic doctor focusing on natural approaches to menopause management through lifestyle and herbal medicine.',
      verified: true,
      acceptsInsurance: false
    },
    {
      id: 3,
      name: 'Dr. Maria Rodriguez',
      title: 'Endocrinologist',
      category: 'endocrinologists',
      rating: 4.7,
      reviewCount: 156,
      location: 'Oakland, CA',
      distance: '8.2 miles',
      specialties: ['Hormone Imbalances', 'Thyroid Health', 'Metabolic Health'],
      availability: 'Next available: This week',
      priceRange: '$350-450',
      image: '',
      description: 'Endocrinologist specializing in complex hormone disorders and metabolic health during menopause transition.',
      verified: true,
      acceptsInsurance: true
    },
    {
      id: 4,
      name: 'Jennifer Walsh',
      title: 'Licensed Therapist',
      category: 'counselors',
      rating: 4.9,
      reviewCount: 73,
      location: 'San Francisco, CA',
      distance: '1.8 miles',
      specialties: ['Menopause Counseling', 'Anxiety Management', 'Relationship Support'],
      availability: 'Next available: Today',
      priceRange: '$150-200',
      image: '',
      description: 'Licensed therapist specializing in emotional support during menopause transition and relationship counseling.',
      verified: true,
      acceptsInsurance: true
    },
    {
      id: 5,
      name: 'Dr. Amanda Foster',
      title: 'Nutritionist & Wellness Coach',
      category: 'nutritionists',
      rating: 4.6,
      reviewCount: 94,
      location: 'Palo Alto, CA',
      distance: '12.5 miles',
      specialties: ['Menopause Nutrition', 'Weight Management', 'Bone Health'],
      availability: 'Next available: Next week',
      priceRange: '$120-180',
      image: '',
      description: 'Registered dietitian specializing in nutrition strategies for menopause symptoms and long-term health.',
      verified: true,
      acceptsInsurance: false
    }
  ];

  const filteredProviders = selectedCategory === 'all' 
    ? providers 
    : providers.filter(provider => provider.category === selectedCategory);

  const handleBookAppointment = (provider) => {
    alert(`Booking appointment with ${provider.name}. This would integrate with a real booking system and payment processing.`);
  };

  const handleShareAssessment = (provider) => {
    alert(`Sharing self-assessment report with ${provider.name}. This would allow the provider to review your symptoms and prepare for your appointment.`);
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>Find Support & Healthcare Providers</h2>
        <p>Connect with verified specialists who understand menopause and can provide personalized care</p>
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
                  <span className="rating-count">({provider.reviewCount} reviews)</span>
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
                  <span className="insurance-badge">Accepts Insurance</span>
                )}
              </div>
            </div>

            <div className="specialties">
              <h4>Specialties:</h4>
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
                Book Appointment
              </button>
              <button 
                className="share-btn"
                onClick={() => handleShareAssessment(provider)}
              >
                Share Assessment
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProvider && (
        <div className="provider-modal">
          <div className="modal-content">
            <h3>Provider Details</h3>
            <p>Detailed provider information would appear here</p>
            <button onClick={() => setSelectedProvider(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
