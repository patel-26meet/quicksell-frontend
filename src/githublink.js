import React from 'react';
import GitHubLogo from './assets/icons_FEtask/github-mark.svg';  

const GitHubLink = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <a 
        href="https://github.com/patel-26meet/quicksell-frontend" 
        target="_blank"  
        rel="noopener noreferrer"  
        style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}
      >
        <img 
          src={GitHubLogo}
          alt="GitHub Logo" 
          style={{ width: '17px', height: '17px', marginRight: '8px' }} 
        />
        GitHub link
      </a>
    </div>
  );
};

export default GitHubLink;
