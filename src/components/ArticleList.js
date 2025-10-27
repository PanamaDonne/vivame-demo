import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ArticleList.css';

const ArticleList = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCredibility, setSelectedCredibility] = useState('all');

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "Understanding Perimenopause: The Transition Phase",
      excerpt: "Perimenopause can begin as early as your 30s and last for several years. Learn about the signs, symptoms, and how to manage this transitional period.",
      content: "Perimenopause is the transitional period before menopause when your body begins to produce less estrogen. This phase can last anywhere from 2 to 10 years and typically begins in your 40s, though it can start earlier. Common symptoms include irregular periods, hot flashes, sleep disturbances, mood changes, and vaginal dryness. Understanding these changes and working with healthcare providers can help you navigate this phase more comfortably.",
      category: "evidence-based",
      author: "Dr. Sarah Johnson, MD",
      readTime: "5 min read",
      publishDate: "2024-01-15",
      tags: ["perimenopause", "symptoms", "hormones"],
      credibility: "medical_reviewed",
      source: "peer_reviewed",
      validationBadge: "medically_reviewed"
    },
    {
      id: 2,
      title: "My Journey Through Early Menopause at 35",
      excerpt: "A personal story about navigating early menopause, the challenges faced, and the support systems that made a difference.",
      content: "At 35, I never expected to be dealing with menopause. When my periods became irregular and I started experiencing hot flashes, I thought it was stress. After months of uncertainty, my doctor confirmed I was in early menopause. The emotional journey was challenging - feeling like my body was betraying me, worrying about fertility, and dealing with symptoms I wasn't prepared for. But through support groups, therapy, and finding the right medical team, I've learned to embrace this new chapter of my life.",
      category: "community",
      author: "Maria S.",
      readTime: "7 min read",
      publishDate: "2024-01-10",
      tags: ["early menopause", "personal story", "support"],
      credibility: "community_verified",
      source: "user_submitted",
      validationBadge: "community_story"
    },
    {
      id: 3,
      title: "Hormone Replacement Therapy: Benefits and Risks",
      excerpt: "A comprehensive look at HRT options, their effectiveness, and important considerations for women considering treatment.",
      content: "Hormone replacement therapy (HRT) can be an effective treatment for managing menopause symptoms, but it's not right for everyone. This article explores the different types of HRT available, their benefits in treating hot flashes, vaginal dryness, and bone health, as well as the potential risks including blood clots and certain cancers. It's important to discuss your individual risk factors and family history with your healthcare provider to determine if HRT is appropriate for you.",
      category: "evidence-based",
      author: "Dr. Emily Chen, MD",
      readTime: "8 min read",
      publishDate: "2024-01-08",
      tags: ["HRT", "treatment", "hormones", "medical advice"],
      credibility: "medical_reviewed",
      source: "peer_reviewed",
      validationBadge: "medically_reviewed"
    },
    {
      id: 4,
      title: "Natural Remedies for Hot Flashes: What Actually Works",
      excerpt: "Explore evidence-based natural approaches to managing hot flashes, from lifestyle changes to herbal supplements.",
      content: "While hot flashes are one of the most common and bothersome symptoms of menopause, there are several natural approaches that may help. Regular exercise, maintaining a healthy weight, avoiding triggers like spicy foods and alcohol, and practicing stress-reduction techniques like yoga and meditation can all make a difference. Some women find relief with black cohosh, soy isoflavones, or acupuncture, though research on their effectiveness is mixed. Always consult with your healthcare provider before trying new supplements.",
      category: "evidence-based",
      author: "Dr. Lisa Rodriguez, ND",
      readTime: "6 min read",
      publishDate: "2024-01-05",
      tags: ["natural remedies", "hot flashes", "lifestyle", "supplements"],
      credibility: "expert_reviewed",
      source: "professional_created",
      validationBadge: "expert_verified"
    },
    {
      id: 5,
      title: "Supporting Your Partner Through Menopause",
      excerpt: "A guide for partners and family members on how to provide meaningful support during this life transition.",
      content: "Menopause affects not just the woman experiencing it, but also her partner and family. Understanding the physical and emotional changes your partner is going through is crucial for providing meaningful support. This includes being patient with mood changes, understanding that intimacy may need to be approached differently, and encouraging open communication about symptoms and needs. Partners can also help by learning about menopause, attending doctor's appointments when appropriate, and being a source of emotional support during this challenging transition.",
      category: "community",
      author: "James M.",
      readTime: "4 min read",
      publishDate: "2024-01-03",
      tags: ["partners", "support", "relationships", "family"],
      credibility: "community_verified",
      source: "user_submitted",
      validationBadge: "community_story"
    },
    {
      id: 6,
      title: "Workplace Accommodations for Menopause Symptoms",
      excerpt: "How to advocate for workplace support and accommodations to help manage menopause symptoms while working.",
      content: "Menopause symptoms can significantly impact work performance, but many women are reluctant to discuss these issues with their employers. This article provides practical advice on how to approach conversations about workplace accommodations, from flexible working arrangements to temperature control and access to restrooms. It also covers your legal rights and how to work with HR to create a more supportive work environment. Remember, you don't have to disclose your medical condition, but you can request reasonable accommodations for symptoms that affect your work.",
      category: "evidence-based",
      author: "Dr. Rachel Green, PhD",
      readTime: "6 min read",
      publishDate: "2024-01-01",
      tags: ["workplace", "accommodations", "career", "advocacy"],
      credibility: "expert_reviewed",
      source: "professional_created",
      validationBadge: "expert_verified"
    }
  ];

  // Filter articles based on search query, category, and credibility
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesCredibility = selectedCredibility === 'all' || article.credibility === selectedCredibility;
    
    return matchesSearch && matchesCategory && matchesCredibility;
  });

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'evidence-based', label: 'Evidence-Based' },
    { value: 'community', label: 'Community Stories' }
  ];

  const credibilityFilters = [
    { value: 'all', label: 'All Sources' },
    { value: 'medical_reviewed', label: 'Medically Reviewed' },
    { value: 'expert_reviewed', label: 'Expert Verified' },
    { value: 'community_verified', label: 'Community Stories' }
  ];



  return (
    <div className="article-list-container">
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      {/* Filters */}
      <div className="category-filter">
        <div className="filter-group">
          <h4 className="filter-title">Content Type</h4>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.value}
                className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="category-name">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="filter-group">
          <h4 className="filter-title">Credibility</h4>
          <div className="filter-buttons">
            {credibilityFilters.map(filter => (
              <button
                key={filter.value}
                className={`category-btn ${selectedCredibility === filter.value ? 'active' : ''}`}
                onClick={() => setSelectedCredibility(filter.value)}
              >
                <span className="category-name">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="results-count">
          <span className="count-text">{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full">
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-gray-500 mb-2 text-xl font-semibold">
                No articles found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <div key={article.id} className="article-card">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="h-full"
              >
                <div className="article-header">
                  <div className="article-badges">
                    <span className={`article-badge ${article.category === 'evidence-based' ? 'evidence' : 'community'}`}>
                      {article.category === 'evidence-based' ? 'Evidence-Based' : 'Community Story'}
                    </span>
                    <span className={`article-badge ${article.validationBadge === 'medically_reviewed' ? 'medical' : article.validationBadge === 'expert_verified' ? 'expert' : 'community'}`}>
                      {(article.validationBadge === 'medically_reviewed' && 'Medically Reviewed') ||
                       (article.validationBadge === 'expert_verified' && 'Expert Verified') ||
                       (article.validationBadge === 'community_story' && 'Community Story')}
                    </span>
                  </div>
                  <span className="read-time">{article.readTime}</span>
                </div>

                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                </div>

                <div className="article-details">
                  <div className="author-info">
                    <span>By {article.author}</span>
                  </div>
                  
                  <div className="date-info">
                    <span>{article.publishDate}</span>
                  </div>
                </div>

                <div className="article-tags">
                  <h4>Topics:</h4>
                  <div className="tag-list">
                    {article.tags.map(tag => (
                      <span key={tag} className="article-tag">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="article-actions">
                  <button className="read-btn">Read Article</button>
                  <button className="share-btn">Share</button>
                </div>
              </motion.div>
            </div>
          ))
        )}
      </div>
      </motion.div>
    </div>
  );
};

export default ArticleList;
