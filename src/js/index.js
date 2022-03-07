import GNB from './components/GNB/index.js';
import Video from './components/Video/index.js';
import Carousel from './components/Carousel/index.js';
import Banner from './components/Banner/index.js';
import { $ } from './utils/index.js';

new GNB($('#navbar'));
new Video($('#video'));
new Carousel($('#carousel'));
new Banner($('#banner'));
