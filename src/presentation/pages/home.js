import { GetFeaturedOverviewUseCase } from '../../application/usecases/GetFeaturedOverviewUseCase.js';
import { MockGameRepository } from '../../infrastructure/repositories/MockGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/HeroSection.js';
import '../components/AgentSection.js';
import '../components/WeaponSection.js';
import '../components/MapSection.js';
import '../components/NexusFooter.js';
import './LandingPage.js';

const repository = new MockGameRepository();
const overview = new GetFeaturedOverviewUseCase(repository).execute();
document.querySelector('landing-page').data = overview;
