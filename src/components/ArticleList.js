import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ArticleList.css';

const ArticleList = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCredibility, setSelectedCredibility] = useState('all');

  // Klimakterieartiklar på svenska
  const articles = [
    {
      id: 1,
      title: "Förstå klimakteriet: Övergångsfasen",
      excerpt: "Klimakteriet kan börja redan i 30-årsåldern och pågå i flera år. Lär dig om tecken, symptom och hur du hanterar denna övergångsperiod.",
      content: "Klimakteriet är övergångsperioden före menopaus när din kropp börjar producera mindre östrogen. Denna fas kan pågå i 2-10 år och börjar vanligtvis i 40-årsåldern, även om den kan starta tidigare. Vanliga symptom inkluderar oregelbundna menstruationer, hettflusher, sömnstörningar, humörsvängningar och vaginal torrhet. Att förstå dessa förändringar och arbeta med vårdgivare kan hjälpa dig att navigera denna fas bekvämare.",
      category: "evidence-based",
      author: "Dr. Anna Lindqvist, MD",
      readTime: "5 min läsning",
      publishDate: "2024-01-15",
      tags: ["klimakteriet", "symptom", "hormoner"],
      credibility: "medical_reviewed",
      source: "peer_reviewed",
      validationBadge: "medically_reviewed"
    },
    {
      id: 2,
      title: "Min resa genom tidig klimakterie vid 35",
      excerpt: "En personlig berättelse om att navigera tidig klimakterie, de utmaningar som möttes och stödsystemen som gjorde skillnad.",
      content: "Vid 35 förväntade jag mig aldrig att hantera klimakteriet. När mina menstruationer blev oregelbundna och jag började uppleva hettflusher trodde jag det var stress. Efter månader av osäkerhet bekräftade min läkare att jag var i tidig klimakterie. Den emotionella resan var utmanande - känslan av att min kropp förrådde mig, oro för fertilitet och att hantera symptom jag inte var förberedd på. Men genom stödgrupper, terapi och att hitta rätt medicinteam har jag lärt mig att omfamna detta nya kapitel i mitt liv.",
      category: "community",
      author: "Maria S.",
      readTime: "7 min läsning",
      publishDate: "2024-01-10",
      tags: ["tidig klimakterie", "personlig berättelse", "stöd"],
      credibility: "community_verified",
      source: "user_submitted",
      validationBadge: "community_story"
    },
    {
      id: 3,
      title: "Hormonbehandling: Fördelar och risker",
      excerpt: "En omfattande översikt av HRT-alternativ, deras effektivitet och viktiga överväganden för kvinnor som överväger behandling.",
      content: "Hormonbehandling (HRT) kan vara en effektiv behandling för att hantera klimakteriesymptom, men det är inte rätt för alla. Denna artikel utforskar de olika typerna av HRT som finns tillgängliga, deras fördelar vid behandling av hettflusher, vaginal torrhet och benskydd, samt de potentiella riskerna inklusive blodproppar och vissa cancertyper. Det är viktigt att diskutera dina individuella riskfaktorer och familjehistoria med din vårdgivare för att avgöra om HRT är lämpligt för dig.",
      category: "evidence-based",
      author: "Dr. Eva Johansson, MD",
      readTime: "8 min läsning",
      publishDate: "2024-01-08",
      tags: ["HRT", "behandling", "hormoner", "medicinsk rådgivning"],
      credibility: "medical_reviewed",
      source: "peer_reviewed",
      validationBadge: "medically_reviewed"
    },
    {
      id: 4,
      title: "Naturliga botemedel mot hettflusher: Vad som faktiskt fungerar",
      excerpt: "Utforska evidensbaserade naturliga tillvägagångssätt för att hantera hettflusher, från livsstilsförändringar till växtbaserade kosttillskott.",
      content: "Även om hettflusher är ett av de vanligaste och mest besvärliga symptomen vid klimakteriet finns det flera naturliga tillvägagångssätt som kan hjälpa. Regelbunden träning, att bibehålla en hälsosam vikt, att undvika utlösare som kryddig mat och alkohol, och att praktisera stressreducerande tekniker som yoga och meditation kan alla göra skillnad. Vissa kvinnor finner lindring med svart cohosh, soja-isoflavoner eller akupunktur, även om forskning om deras effektivitet är blandad. Konsultera alltid din vårdgivare innan du provar nya kosttillskott.",
      category: "evidence-based",
      author: "Dr. Maria Andersson, ND",
      readTime: "6 min läsning",
      publishDate: "2024-01-05",
      tags: ["naturliga botemedel", "hettflusher", "livsstil", "kosttillskott"],
      credibility: "expert_reviewed",
      source: "professional_created",
      validationBadge: "expert_verified"
    },
    {
      id: 5,
      title: "Stödja din partner genom klimakteriet",
      excerpt: "En guide för partners och familjemedlemmar om hur man ger meningsfullt stöd under denna livsomställning.",
      content: "Klimakteriet påverkar inte bara kvinnan som upplever det, utan också hennes partner och familj. Att förstå de fysiska och emotionella förändringar din partner går igenom är avgörande för att ge meningsfullt stöd. Detta inkluderar att vara tålmodig med humörsvängningar, förstå att intimitet kan behöva närmas på ett annat sätt, och uppmuntra öppen kommunikation om symptom och behov. Partners kan också hjälpa genom att lära sig om klimakteriet, delta på läkarbesök när det är lämpligt, och vara en källa till emotionellt stöd under denna utmanande övergång.",
      category: "community",
      author: "Erik M.",
      readTime: "4 min läsning",
      publishDate: "2024-01-03",
      tags: ["partners", "stöd", "relationer", "familj"],
      credibility: "community_verified",
      source: "user_submitted",
      validationBadge: "community_story"
    },
    {
      id: 6,
      title: "Arbetsplatsanpassningar för klimakteriesymptom",
      excerpt: "Hur man förespråkar arbetsplatsstöd och anpassningar för att hjälpa till att hantera klimakteriesymptom medan man arbetar.",
      content: "Klimakteriesymptom kan påverka arbetsprestationen avsevärt, men många kvinnor är ovilliga att diskutera dessa frågor med sina arbetsgivare. Denna artikel ger praktiska råd om hur man närmar sig samtal om arbetsplatsanpassningar, från flexibla arbetsscheman till temperaturkontroll och tillgång till toaletter. Den täcker också dina juridiska rättigheter och hur man arbetar med HR för att skapa en mer stödjande arbetsmiljö. Kom ihåg att du inte behöver avslöja din medicinska tillstånd, men du kan begära rimliga anpassningar för symptom som påverkar ditt arbete.",
      category: "evidence-based",
      author: "Dr. Lena Nilsson, PhD",
      readTime: "6 min läsning",
      publishDate: "2024-01-01",
      tags: ["arbetsplats", "anpassningar", "karriär", "förespråkande"],
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
    { value: 'all', label: 'Alla artiklar' },
    { value: 'evidence-based', label: 'Evidensbaserade' },
    { value: 'community', label: 'Gemenskapsberättelser' }
  ];

  const credibilityFilters = [
    { value: 'all', label: 'Alla källor' },
    { value: 'medical_reviewed', label: 'Medicinskt granskade' },
    { value: 'expert_reviewed', label: 'Expertverifierade' },
    { value: 'community_verified', label: 'Gemenskapsberättelser' }
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
          <h4 className="filter-title">Innehållstyp</h4>
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
          <h4 className="filter-title">Trovärdighet</h4>
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
          <span className="count-text">{filteredArticles.length} artikel{filteredArticles.length !== 1 ? 'ar' : ''} hittade</span>
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
                Inga artiklar hittades
              </h3>
              <p className="text-gray-400">
                Prova att justera dina söktermer eller kategorifilter.
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
                      {article.category === 'evidence-based' ? 'Evidensbaserad' : 'Gemenskapsberättelse'}
                    </span>
                    <span className={`article-badge ${article.validationBadge === 'medically_reviewed' ? 'medical' : article.validationBadge === 'expert_verified' ? 'expert' : 'community'}`}>
                      {(article.validationBadge === 'medically_reviewed' && 'Medicinskt granskad') ||
                       (article.validationBadge === 'expert_verified' && 'Expertverifierad') ||
                       (article.validationBadge === 'community_story' && 'Gemenskapsberättelse')}
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
                    <span>Av {article.author}</span>
                  </div>
                  
                  <div className="date-info">
                    <span>{article.publishDate}</span>
                  </div>
                </div>

                <div className="article-tags">
                  <h4>Ämnen:</h4>
                  <div className="tag-list">
                    {article.tags.map(tag => (
                      <span key={tag} className="article-tag">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="article-actions">
                  <button className="read-btn">Läs artikel</button>
                  <button className="share-btn">Dela</button>
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
