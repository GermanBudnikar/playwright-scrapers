// crawlee.js
import { Dataset, PlaywrightCrawler, Configuration } from 'crawlee';
import { routerGoogle, routerBooking } from './router.js';

// Configure Crawlee to launch all browsers
// in headful mode (window visible).
Configuration.set('headless', false);

const crawlerGoogle = new PlaywrightCrawler({
    requestHandler: routerGoogle,
})
const crawlerBooking = new PlaywrightCrawler({
    requestHandler: routerBooking,
})


/*await crawlerGoogle.run(['https://www.google.com/travel/hotels/hotel%20faial%20prime/entity/CgoI6badro71jYZ9EAE/reviews?q=hotel%20faial%20prime&g2lb=2502548%2C2503771%2C2503781%2C4258168%2C4270442%2C4284970%2C4291517%2C4306835%2C4429192%2C4515404%2C4597339%2C4757164%2C4778035%2C4814050%2C4850738%2C4861688%2C4864715%2C4874190%2C4886480%2C4893075%2C4920132%2C4924070%2C4936396%2C4958786%2C4965990%2C4968087%2C4972345%2C4977394%2C4977493%2C4977495%2C4977499%2C4977922%2C4983289&hl=pt-BR&gl=br&ssta=1&grf=EmQKLAgOEigSJnIkKiIKBwjnDxAEGAgSBwjnDxAEGAkgADAeQMoCSgcI5w8QAxgbCjQIDBIwEi6yASsSKQonCiUweDk1MjczODIxYjA4MmRmZjk6MHg3ZDBjMzdhOGU1Yzc1YjY5&rp=EOm2na6O9Y2GfRDptp2ujvWNhn04AkAASAHAAQI&ictx=1&sa=X&ved=0CAAQ5JsGahcKEwjowp3Vovv9AhUAAAAAHQAAAAAQBA&utm_campaign=sharing&utm_medium=link&utm_source=htls'])
await Dataset.exportToCSV('google');*/
await crawlerBooking.run(['https://www.booking.com/reviews/br/hotel/faial.pt-br.html?label=gen173nr-1FCA0oIEIFZmFpYWxILVgEaCCIAQGYAS24ARfIAQzYAQHoAQH4AQKIAgGoAgO4AsLmjKEGwAIB0gIkNDFjYTA0Y2UtMDc0YS00ZGQzLTk5OTgtMzAwMjJmZTFkODYz2AIF4AIB&sid=a8213420eb4ca1b8392c53c4d3b681fb&r_lang=pt&customer_type=total&order=completed_desc'])
//await Dataset.exportToCSV('booking');