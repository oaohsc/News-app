import { ExternalLink, Calendar } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(article.publishedAt)}</span>
          {article.source?.name && (
            <>
              <span>•</span>
              <span>{article.source.name}</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-gray-300 mb-4 line-clamp-3">
            {article.description}
          </p>
        )}
        {article.url && article.url !== '#' && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Read More
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsCard;

