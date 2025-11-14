# AI News App

AI-powered news web application that fetches news by categories and provides intelligent features like asking questions about articles and summarizing news categories.
<!-- Uploading "Screenshot 2025-11-14 075325.png"... -->
## Features

- 📰 **Category-based News**: Browse news by categories (Sports, Technology, Business, Entertainment, Health, Science, General)
- 🤖 **AI-Powered Features**:
  - Ask questions about specific news articles
  - Get AI-generated summaries of entire news categories
  - Interactive AI chat assistant
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- ⚡ **Fast Performance**: Built with React and Vite for optimal performance

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Keys**
   
   put your api key on the .env file
   ```env
   VITE_NEWS_API_KEY=your_news_api_key_here
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   - **News API**: Get a free API key from [NewsAPI.org](https://newsapi.org/)
   - **OpenAI API**: Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   
   Note: The app will work with mock data if API keys are not configured, but AI features will be limited.

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Browse News by Category**: Click on any category button to view news articles
2. **Ask AI Questions**: Click the "AI Assistant" button to open the chat interface
3. **Get Category Summaries**: Click "Summarize Category" to get an AI-generated summary of all articles in the current category
4. **Read Articles**: Click "Read More" on any news card to view the full article

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (Icons)
- NewsAPI
- OpenAI API

## Project Structure

```
src/
  ├── components/
  │   ├── NewsCard.jsx       # Individual news article card
  │   ├── CategorySelector.jsx # Category selection buttons
  │   └── AIChat.jsx          # AI chat interface
  ├── services/
  │   ├── newsApi.js          # News API integration
  │   └── aiService.js        # OpenAI API integration
  ├── App.jsx                 # Main application component
  ├── main.jsx                # Application entry point
  └── index.css               # Global styles
```

## License

MIT

