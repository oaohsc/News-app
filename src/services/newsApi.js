import axios from 'axios';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'demo';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNewsByCategory = async (category = 'general', country = 'us') => {
  // Check if API key is configured
  if (!NEWS_API_KEY || NEWS_API_KEY === 'demo' || NEWS_API_KEY.includes('your_')) {
    console.warn('News API key not configured. Using mock data.');
    return getMockNews(category);
  }

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: category,
        country: country,
        apiKey: NEWS_API_KEY,
        pageSize: 20
      }
    });
    
    if (response.data.articles && response.data.articles.length > 0) {
      return response.data.articles;
    } else {
      console.warn('No articles returned from API, using mock data');
      return getMockNews(category);
    }
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    // Return mock data if API fails
    return getMockNews(category);
  }
};

export const searchNews = async (query) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
        pageSize: 20,
        sortBy: 'publishedAt'
      }
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('Error searching news:', error);
    return [];
  }
};

// Mock data for demo purposes
const getMockNews = (category) => {
  const mockNews = {
    sports: [
      {
        title: 'Major League Baseball Season Opens',
        description: 'The new season brings exciting matchups and rising stars.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'Sports News' }
      },
      {
        title: 'Championship Finals This Weekend',
        description: 'Top teams compete for the ultimate prize in an epic showdown.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'Sports Daily' }
      }
    ],
    technology: [
      {
        title: 'New AI Breakthrough Announced',
        description: 'Scientists achieve major milestone in artificial intelligence research.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'Tech News' }
      },
      {
        title: 'Latest Smartphone Release',
        description: 'New features and improved performance in the latest model.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'Tech Review' }
      }
    ],
    business: [
      {
        title: 'Stock Market Reaches New Highs',
        description: 'Investors celebrate as markets continue upward trend.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'Business Today' }
      }
    ],
    general: [
      {
        title: 'Breaking: Major News Event',
        description: 'Important developments in current events.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'News Network' }
      }
    ]
  };
  
  return mockNews[category] || mockNews.general;
};

