import { useState, useEffect } from 'react';
import { fetchNewsByCategory } from './services/newsApi';
import { askAboutNews, summarizeCategory } from './services/aiService';
import NewsCard from './components/NewsCard';
import CategorySelector from './components/CategorySelector';
import AIChat from './components/AIChat';
import { Sparkles, Newspaper } from 'lucide-react';

const CATEGORIES = [
  { id: 'general', name: 'General', icon: '📰' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'science', name: 'Science', icon: '🔬' }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [categorySummary, setCategorySummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ news: false, ai: false });

  useEffect(() => {
    loadNews(selectedCategory);
  }, [selectedCategory]);

  const loadNews = async (category) => {
    setLoading(true);
    try {
      const articles = await fetchNewsByCategory(category);
      setNews(articles);
      // Check if we got real articles (not mock data)
      const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
      const hasValidKey = newsApiKey && newsApiKey !== 'demo' && !newsApiKey.includes('your_');
      setApiStatus(prev => ({ ...prev, news: hasValidKey }));
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check API key status on mount
    const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
    const aiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setApiStatus({
      news: newsApiKey && newsApiKey !== 'demo' && !newsApiKey.includes('your_'),
      ai: aiApiKey && !aiApiKey.includes('your_') && aiApiKey.length > 20
    });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCategorySummary(null);
  };

  const handleSummarizeCategory = async () => {
    setSummaryLoading(true);
    try {
      const result = await summarizeCategory(selectedCategory, news);
      setCategorySummary(result.summary);
    } catch (error) {
      console.error('Error summarizing category:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">AI News App</h1>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <button
              onClick={() => setShowAIChat(!showAIChat)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              AI Assistant
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* API Status Banner */}
        {(!apiStatus.news || !apiStatus.ai) && (
          <div className="mb-6 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              <strong>⚠️ API Configuration:</strong>
              {!apiStatus.news && ' News API key not configured - showing mock data. '}
              {!apiStatus.ai && ' OpenAI API key not configured - AI features disabled. '}
              Add your API keys to <code className="bg-black/30 px-2 py-1 rounded">.env</code> file and restart the server.
            </p>
          </div>
        )}

        {/* Category Selector */}
        <CategorySelector
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Summary Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              {CATEGORIES.find(c => c.id === selectedCategory)?.icon}{' '}
              {CATEGORIES.find(c => c.id === selectedCategory)?.name} News
            </h2>
            <button
              onClick={handleSummarizeCategory}
              disabled={summaryLoading || news.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {summaryLoading ? 'Summarizing...' : '📝 Summarize Category'}
            </button>
          </div>

          {categorySummary && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                AI Summary
              </h3>
              <p className="text-gray-200 leading-relaxed">{categorySummary}</p>
            </div>
          )}
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl">No news articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChat
          news={news}
          selectedCategory={selectedCategory}
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
}

export default App;

