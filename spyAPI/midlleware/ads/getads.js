const axios = require('axios');
require('dotenv').config(); // Best practice: this should be at the entry point of your application

const fetchAds = async (req, res) => {
  if (!process.env.FB_API_TOKEN) {
    return res.status(403).json({ success: false, message: "API token is not available." });
  }

  const params = {
    access_token: process.env.FB_API_TOKEN,
    ad_type: req.query.ad_type,
    search_terms: req.query.search_terms,
    ad_active_status: req.query.ad_active_status,
    ad_delivery_date_max: req.query.ad_delivery_date_max,
    ad_delivery_date_min: req.query.ad_delivery_date_min,
    ad_reached_countries: req.query.ad_reached_countries,
    ad_type: req.query.ad_type,
    bylines: req.query.bylines,
    delivery_by_region: req.query.delivery_by_region,
    estimated_audience_size_max: req.query.estimated_audience_size_max,
    estimated_audience_size_min: req.query.estimated_audience_size_min,
    languages: req.query.languages,
    media_type: req.query.media_type,
    publisher_platforms: req.query.publisher_platforms,
    search_page_ids: req.query.search_page_ids,
    search_types: req.query.search_types,
    unmask_removed_content: req.query.unmask_removed_content,
    limit: req.query.limit,
    
  };

  if (!params.search_terms && !params.ad_reached_countries) {
    return res.status(400).json({ success: false, message: 'search_terms or ad_reached_countries is required.' });
  }
  const errorCodes = {
    613: 'Calls to this API have exceeded the rate limit.',
    100: 'Invalid parameter',
    190: 'Invalid OAuth 2.0 Access Token',
    1009: 'Failed to pass parameter validation.',
    2500: 'Error parsing graph query',
  };

  try {
    const response = await axios.get('https://graph.facebook.com/v19.0/ads_archive', { params });
    const { data, paging } = response.data;
    res.json({ success: true, ads: data, paging });
  } catch (error) {
    console.error('Error fetching ads:', error);
    const status = error.response?.status || 500;
    const errorCode = error.response?.data?.error?.code;
    const errorMessage = errorCodes[errorCode] || 'Unexpected error occurred';

    res.status(status).json({
      success: false,
      message: 'Error fetching data from Ad Library API',
      details: errorMessage
    });
  }
};

module.exports = { fetchAds };
