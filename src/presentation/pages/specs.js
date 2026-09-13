import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import './SpecsPage.js';

const init = () => {
  const specsPage = document.querySelector('specs-page');
  if (specsPage) specsPage.initialize();
};

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init, { once: true }) : init();
