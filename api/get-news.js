
// Vercel Serverless Function
// This function will run on the server, not in the browser.

export default async function handler(request, response) {
  // Set CORS headers to allow requests from your Vercel domain
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*'); // Or specify your domain: https://<your-vercel-app>.vercel.app
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests for CORS
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  const {
    topic = 'general',
    country = 'us',
    language = 'en',
    searchTerm = '',
    fromDate = '',
    toDate = '',
    page = 1,
    apiSource = 'gnews'
  } = request.query;

  const GNEWS_TOKEN = process.env.VITE_GNEWS_TOKEN;
  const NEWSAPI_KEY = process.env.VITE_NEWSAPI_KEY;
  const THENEWSAPI_TOKEN = process.env.VITE_THENEWSAPI_TOKEN;

  const attemptFetch = async (source) => {
    let url;
    try {
      if (source === 'gnews') {
        if (searchTerm) {
          url = `https://gnews.io/api/v4/search?q=${searchTerm}&token=${GNEWS_TOKEN}&lang=${language}&page=${page}`;
        } else {
          url = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_TOKEN}&topic=${topic}&country=${country}&lang=${language}&page=${page}`;
        }
        if (fromDate) url += `&from=${fromDate}T00:00:00Z`;
        if (toDate) url += `&to=${toDate}T23:59:59Z`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`GNews API error: ${res.statusText}`);
        const data = await res.json();
        return {
            articles: data.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                image: article.image,
                publishedAt: article.publishedAt,
                source: article.source.name,
            })),
            totalResults: data.totalArticles,
        };
      } else if (source === 'thenewsapi') {
         if (searchTerm) {
            url = `https://api.thenewsapi.com/v1/news/all?api_token=${THENEWSAPI_TOKEN}&search=${searchTerm}&language=${language}&limit=100`;
        } else {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${THENEWSAPI_TOKEN}&categories=${topic}&language=${language}&limit=100`;
        }
        if (fromDate) url += `&published_after=${fromDate}`;
        if (toDate) url += `&published_before=${toDate}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`TheNewsAPI error: ${res.statusText}`);
        const data = await res.json();
        return {
            articles: data.data.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                image: article.image_url,
                publishedAt: article.published_at,
                source: article.source,
            })),
            totalResults: data.meta.found,
        };
      } else if (source === 'newsapi') {
        if (searchTerm) {
            url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${NEWSAPI_KEY}&language=${language}&page=${page}`;
        } else {
            url = `https://newsapi.org/v2/top-headlines?category=${topic}&country=${country}&apiKey=${NEWSAPI_KEY}&language=${language}&page=${page}`;
        }
        if (fromDate) url += `&from=${fromDate}`;
        if (toDate) url += `&to=${toDate}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`NewsAPI error: ${res.statusText}`);
        const data = await res.json();
        return {
            articles: data.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                image: article.urlToImage,
                publishedAt: article.publishedAt,
                source: article.source.name,
            })),
            totalResults: data.totalResults,
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching from ${source}:`, error);
      return null; // Return null on failure
    }
  };

  const fallbackOrder = ['gnews', 'thenewsapi', 'newsapi'];
  let data = null;
  let currentSource = apiSource;
  let sourceIndex = fallbackOrder.indexOf(currentSource);

  // Try the preferred source first, then fall back
  for (let i = 0; i < fallbackOrder.length; i++) {
    const sourceToTry = fallbackOrder[sourceIndex % fallbackOrder.length];
    console.log(`Attempting to fetch from ${sourceToTry}...`);
    data = await attemptFetch(sourceToTry);
    if (data) {
      currentSource = sourceToTry;
      break;
    }
    sourceIndex++;
  }

  if (data) {
    response.status(200).json({ ...data, apiSource: currentSource });
  } else {
    response.status(500).json({ error: 'All news APIs failed to fetch data.' });
  }
}
