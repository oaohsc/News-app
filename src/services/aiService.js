import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const askAboutNews = async (question, articles) => {
  // Check if API key is properly configured
  if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('your_') || OPENAI_API_KEY.length < 20) {
    console.warn('OpenAI API key not configured properly');
    return {
      answer: "AI features require an OpenAI API key. Please add VITE_OPENAI_API_KEY to your .env file with a valid key. Make sure to restart the dev server after adding the key. Current key status: " + (OPENAI_API_KEY ? 'Key found but may be invalid' : 'No key found'),
      error: "API key not configured"
    };
  }

  try {
    const articlesText = articles.slice(0, 5).map((article, idx) => 
      `${idx + 1}. ${article.title}: ${article.description || 'No description available'}`
    ).join('\n\n');

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful news assistant. Answer questions based on the provided news articles. Be concise and informative.'
          },
          {
            role: 'user',
            content: `Based on these news articles:\n\n${articlesText}\n\nQuestion: ${question}\n\nPlease provide a helpful answer based on the articles above.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      answer: response.data.choices[0].message.content,
      error: null
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      answer: "I'm sorry, I couldn't process your question at the moment. Please try again later.",
      error: error.message
    };
  }
};

export const summarizeCategory = async (category, articles) => {
  // Check if API key is properly configured
  if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('your_') || OPENAI_API_KEY.length < 20) {
    console.warn('OpenAI API key not configured properly');
    return {
      summary: `Summary for ${category} category: The articles in this category cover various topics and recent developments. This is a demo summary as the OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file and restart the dev server.`,
      error: "API key not configured"
    };
  }

  try {
    const articlesText = articles.slice(0, 10).map((article, idx) => 
      `${idx + 1}. ${article.title}: ${article.description || 'No description available'}`
    ).join('\n\n');

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a news summarizer. Provide a concise summary of the main themes and key points from the provided news articles.'
          },
          {
            role: 'user',
            content: `Please provide a comprehensive summary of these ${category} news articles:\n\n${articlesText}\n\nSummary:`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      summary: response.data.choices[0].message.content,
      error: null
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      summary: `I'm sorry, I couldn't generate a summary at the moment. Please try again later.`,
      error: error.message
    };
  }
};

