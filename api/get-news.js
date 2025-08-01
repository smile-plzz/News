const GNEWS_TOKEN = process.env.VITE_GNEWS_TOKEN;
const NEWSAPI_KEY = process.env.VITE_NEWSAPI_KEY;
const THENEWSAPI_TOKEN = process.env.VITE_THENEWSAPI_TOKEN;

const apiConfigs = {
  gnews: {
    token: GNEWS_TOKEN,
    buildUrl: ({ searchTerm, topic, country, language, page, fromDate, toDate }) => {
      if (!GNEWS_TOKEN) throw new Error("GNews API key is missing.");
      let url;
      if (searchTerm) {
        url = `https://gnews.io/api/v4/search?q=${searchTerm}&token=${GNEWS_TOKEN}&lang=${language}&page=${page}`;
      } else {
        url = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_TOKEN}&topic=${topic}&country=${country}&lang=${language}&page=${page}`;
      }
      if (fromDate) url += `&from=${fromDate}T00:00:00Z`;
      if (toDate) url += `&to=${toDate}T23:59:59Z`;
      return url;
    },
    transformData: (data) => ({
      articles: data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        source: article.source.name,
      })),
      totalResults: data.totalArticles,
    }),
  },
  thenewsapi: {
    token: THENEWSAPI_TOKEN,
    buildUrl: ({ searchTerm, topic, language, fromDate, toDate }) => {
      if (!THENEWSAPI_TOKEN) throw new Error("TheNewsAPI key is missing.");
      let url;
      if (searchTerm) {
        url = `https://api.thenewsapi.com/v1/news/all?api_token=${THENEWSAPI_TOKEN}&search=${searchTerm}&language=${language}&limit=100`;
      } else {
        url = `https://api.thenewsapi.com/v1/news/top?api_token=${THENEWSAPI_TOKEN}&categories=${topic}&language=${language}&limit=100`;
      }
      if (fromDate) url += `&published_after=${fromDate}`;
      if (toDate) url += `&published_before=${toDate}`;
      return url;
    },
    transformData: (data) => ({
      articles: data.data.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image_url,
        publishedAt: article.published_at,
        source: article.source,
      })),
      totalResults: data.meta.found,
    }),
  },
  newsapi: {
    token: NEWSAPI_KEY,
    buildUrl: ({ searchTerm, topic, country, language, page, fromDate, toDate }) => {
      if (!NEWSAPI_KEY) throw new Error("NewsAPI key is missing.");
      let url;
      if (searchTerm) {
        url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${NEWSAPI_KEY}&language=${language}&page=${page}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?category=${topic}&country=${country}&apiKey=${NEWSAPI_KEY}&language=${language}&page=${page}`;
      }
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;
      return url;
    },
    transformData: (data) => ({
      articles: data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
      })),
      totalResults: data.totalResults,
    }),
  },
};

const fetchFromApi = async (source, params) => {
  const config = apiConfigs[source];
  if (!config) {
    throw new Error(`Invalid API source: ${source}`);
  }

  // Check if API key is present before building URL
  if (!config.token) {
    throw new Error(`${source} API key is missing. Please configure it in your environment variables.`);
  }

  const url = config.buildUrl(params);
  const res = await fetch(url);

  if (!res.ok) {
    let errorMessage = `${source} API error: ${res.statusText}`;
    if (res.status === 429) {
      errorMessage = `You have exceeded the rate limit for ${source} API. Please try again later.`;
    } else if (res.status === 401 || res.status === 403) {
      errorMessage = `Authentication failed for ${source} API. Please check your API key.`;
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return config.transformData(data);
};

export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

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

  try {
    const data = await fetchFromApi(apiSource, { topic, country, language, searchTerm, fromDate, toDate, page });
    response.status(200).json({ ...data, apiSource: apiSource });
  } catch (error) {
    console.error(`Error fetching from ${apiSource}:`, error);
    response.status(500).json({ error: error.message });
  }
}
