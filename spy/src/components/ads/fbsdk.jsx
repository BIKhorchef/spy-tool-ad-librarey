import React, { useEffect } from 'react';

const FacebookEmbed = ({ facebookPostUrl }) => {
  useEffect(() => {
    // Ensure the Facebook SDK script is included
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId=1483149778957830&autoLogAppEvents=1`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      script.onload = () => {
        // Initialize the SDK
        window.FB.init({
          appId: '1483149778957830',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v9.0'
        });
      };
    } else {
      // Parse the new content to render the embed
      window.FB.XFBML.parse();
    }
  }, [facebookPostUrl]);

  return (
    <div
      className="fb-post"
      data-href={facebookPostUrl}
      data-width="500"
    ></div>
  );
};

export default FacebookEmbed;
