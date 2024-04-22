import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import FacebookEmbed from './fbsdk';

const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAds = useCallback(debounce(async (filterParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:30/ads', {
        params: filterParams,
      });
      setAds(response.data.ads);
    } catch (err) {
      setError(`Failed to fetch ads: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  }, 300), []);

  useEffect(() => {
    fetchAds(filters);
  }, [filters, fetchAds]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAds(filters);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">Ad Campaigns</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-4">
          {filterOptions.map(({ name, placeholder, type, options, required }) => (
            <div key={name} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
              {type === 'select' ? (
                <select
                  name={name}
                  value={filters[name] || ''}
                  onChange={handleFilterChange}
                  className="input input-bordered input-primary w-full"
                >
                  {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : type === 'checkbox' ? (
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={name}
                    checked={!!filters[name]}
                    onChange={handleFilterChange}
                    className="checkbox checkbox-primary"
                  />
                  <span>{placeholder}</span>
                </label>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={filters[name] || ''}
                  onChange={handleFilterChange}
                  placeholder={placeholder}
                  required={required}
                  className="input input-bordered input-primary w-full"
                />
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {ads.length > 0 ? (
        <ul className="space-y-4">
          {ads.map(ad => (
            <li key={ad.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-lg">Ad Details</h2>
              <p><strong>Page ID:</strong> {ad.page_id}</p>
              <p><strong>Start:</strong> {ad.ad_delivery_start_time}</p>
              <p><strong>End:</strong> {ad.ad_delivery_stop_time}</p>
              <p><a href={ad.ad_snapshot_url} target="_blank" rel="noopener noreferrer">Ad Snapshot</a></p>
              {/* <FacebookEmbed facebookPostUrl={ad.ad_snapshot_url} /> */}
            </li>
          ))}
        </ul>
      ) : <div className="text-center">No ads to display.</div>
      }
    </div >
  );
};

export default AdsPage;




const languageOptions = [
  { value: 'ALL', label: 'All Languages' },
  { value: 'BR', label: 'Brazilian' },
  { value: 'IN', label: 'Indian' },
  { value: 'GB', label: 'British English' },
  { value: 'US', label: 'American English' },
  { value: 'CA', label: 'Canadian English' },
  { value: 'AR', label: 'Argentinian' },
  { value: 'AU', label: 'Australian' },
  { value: 'AT', label: 'Austrian' },
  { value: 'BE', label: 'Belgian' },
  { value: 'CL', label: 'Chilean' },
  { value: 'CN', label: 'Chinese' },
  { value: 'CO', label: 'Colombian' },
  { value: 'HR', label: 'Croatian' },
  { value: 'DK', label: 'Danish' },
  { value: 'DO', label: 'Dominican' },
  { value: 'EG', label: 'Egyptian' },
  { value: 'FI', label: 'Finnish' },
  { value: 'FR', label: 'French' },
  { value: 'DE', label: 'German' },
  { value: 'GR', label: 'Greek' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'ID', label: 'Indonesian' },
  { value: 'IE', label: 'Irish' },
  { value: 'IL', label: 'Israeli' },
  { value: 'IT', label: 'Italian' },
  { value: 'JP', label: 'Japanese' },
  { value: 'JO', label: 'Jordanian' },
  { value: 'KW', label: 'Kuwaiti' },
  { value: 'LB', label: 'Lebanese' },
  { value: 'MY', label: 'Malaysian' },
  { value: 'MX', label: 'Mexican' },
  { value: 'NL', label: 'Dutch' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NG', label: 'Nigerian' },
  { value: 'NO', label: 'Norwegian' },
  { value: 'PK', label: 'Pakistani' },
  { value: 'PA', label: 'Panamanian' },
  { value: 'PE', label: 'Peruvian' },
  { value: 'PH', label: 'Filipino' },
  { value: 'PL', label: 'Polish' },
  { value: 'RU', label: 'Russian' },
  { value: 'SA', label: 'Saudi' },
  { value: 'RS', label: 'Serbian' },
  { value: 'SG', label: 'Singaporean' },
  { value: 'ZA', label: 'South African' },
  { value: 'KR', label: 'South Korean' },
  { value: 'ES', label: 'Spanish' },
  { value: 'SE', label: 'Swedish' },
  { value: 'CH', label: 'Swiss' },
  { value: 'TW', label: 'Taiwanese' },
  { value: 'TH', label: 'Thai' },
  { value: 'TR', label: 'Turkish' },
  { value: 'AE', label: 'Emirati' },
  { value: 'VE', label: 'Venezuelan' },
  { value: 'PT', label: 'Portuguese' },
  { value: 'LU', label: 'Luxembourgish' },
  { value: 'BG', label: 'Bulgarian' },
  { value: 'CZ', label: 'Czech' },
  { value: 'SI', label: 'Slovenian' },
  { value: 'IS', label: 'Icelandic' },
  { value: 'SK', label: 'Slovak' },
  { value: 'LT', label: 'Lithuanian' },
  { value: 'TT', label: 'Trinidadian' },
  { value: 'BD', label: 'Bangladeshi' },
  { value: 'LK', label: 'Sri Lankan' },
  { value: 'KE', label: 'Kenyan' },
  { value: 'HU', label: 'Hungarian' },
  { value: 'MA', label: 'Moroccan' },
  { value: 'CY', label: 'Cypriot' },
  { value: 'JM', label: 'Jamaican' },
  { value: 'EC', label: 'Ecuadorian' },
  { value: 'RO', label: 'Romanian' },
  { value: 'BO', label: 'Bolivian' },
  { value: 'GT', label: 'Guatemalan' },
  { value: 'CR', label: 'Costa Rican' },
  { value: 'QA', label: 'Qatari' },
  { value: 'SV', label: 'Salvadoran' },
  { value: 'HN', label: 'Honduran' },
  { value: 'NI', label: 'Nicaraguan' },
  { value: 'PY', label: 'Paraguayan' },
  { value: 'UY', label: 'Uruguayan' },
  { value: 'PR', label: 'Puerto Rican' },
  { value: 'BA', label: 'Bosnian' },
  { value: 'PS', label: 'Palestinian' },
  { value: 'TN', label: 'Tunisian' },
  { value: 'BH', label: 'Bahraini' },
  { value: 'VN', label: 'Vietnamese' },
  { value: 'GH', label: 'Ghanaian' },
  { value: 'MU', label: 'Mauritian' },
  // and so on...
];


const filterOptions = [
  { name: 'ad_active_status', placeholder: 'Ad Active Status', type: 'select', options: ['ACTIVE', 'INACTIVE', 'ALL'] },
  { name: 'ad_delivery_date_max', placeholder: 'Maximum Delivery Date', type: 'date' },
  { name: 'ad_delivery_date_min', placeholder: 'Minimum Delivery Date', type: 'date' },
  { name: 'ad_reached_countries', placeholder: 'Reached Countries', type: 'text' },
  { name: 'ad_type', placeholder: 'Ad Type', type: 'select', options: ['ALL', 'CREDIT_ADS', 'EMPLOYMENT_ADS', 'HOUSING_ADS', 'POLITICAL_AND_ISSUE_ADS'] },
  { name: 'bylines', placeholder: 'Bylines', type: 'text' },
  { name: 'delivery_by_region', placeholder: 'Delivery by Region', type: 'text' },
  { name: 'estimated_audience_size_max', placeholder: 'Max Audience Size', type: 'number' },
  { name: 'estimated_audience_size_min', placeholder: 'Min Audience Size', type: 'number' },
  { name: 'languages', placeholder: 'Languages (comma-separated)', options: languageOptions, type: 'text' },
  { name: 'media_type', placeholder: 'Media Type', type: 'select', options: ['ALL', 'IMAGE', 'MEME', 'VIDEO', 'NONE'] },
  { name: 'publisher_platforms', placeholder: 'Publisher Platforms', type: 'text' },
  { name: 'search_page_ids', placeholder: 'Search Page IDs (comma-separated)', type: 'text' },
  { name: 'search_terms', placeholder: 'Search Terms', type: 'text', required: true },
  { name: 'search_type', placeholder: 'Search Type', type: 'select', options: ['KEYWORD_UNORDERED', 'KEYWORD_EXACT_PHRASE'] },
  { name: 'unmask_removed_content', placeholder: 'Unmask Removed Content', type: 'checkbox' }
];