// crawlee.js
import { Dataset, PlaywrightCrawler, Configuration } from 'crawlee';
import { router } from './router.js';

// Configure Crawlee to launch all browsers
// in headful mode (window visible).
Configuration.set('headless', false);

const crawler = new PlaywrightCrawler({
    requestHandler: router
})

await crawler.run(['https://www.google.com/travel/hotels/google%20faial%20prime/entity/CgoI6badro71jYZ9EAE/reviews?q=google%20faial%20prime&g2lb=2502548%2C2503771%2C2503781%2C4258168%2C4270442%2C4284970%2C4291517%2C4306835%2C4308227%2C4429192%2C4515404%2C4597339%2C4731329%2C4757164%2C4778035%2C4814050%2C4850738%2C4861688%2C4864715%2C4874190%2C4886480%2C4893075%2C4906023%2C4920132%2C4924070%2C4936396%2C4956020%2C4959857%2C4964835%2C4964966%2C4965990%2C4968087%2C4972345%2C4977394%2C4977987%2C4980840&hl=pt-BR&gl=br&ssta=1&rp=EOm2na6O9Y2GfRDptp2ujvWNhn04AkAASAHAAQI&ictx=1&sa=X&ved=0CAAQ5JsGahcKEwiw_oWa1u39AhUAAAAAHQAAAAAQBA&utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESABpJCisSJzIlMHg5NTI3MzgyMWIwODJkZmY5OjB4N2QwYzM3YThlNWM3NWI2ORoAEhoSFAoHCOcPEAUYFhIHCOcPEAUYFxgBMgIQACoJCgU6A0JSTBoA'])
await Dataset.exportToCSV('google');