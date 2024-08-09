import React from 'react';

const NotFound = () => {
  return (
    <main aria-labelledby="not-found-heading" role="main" className="not-found">
      <h1 id="not-found-heading">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or return to the <a href="/">homepage</a>.</p>
    </main>
  );
};

export default NotFound;