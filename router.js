// router.js
import { createPlaywrightRouter, Dataset, Request } from 'crawlee';

export const router = createPlaywrightRouter();



router.use(async ({ page }) => {
    const title = await page.title()
    console.log(title);
})

router.addDefaultHandler(async ({ page, infiniteScroll, crawler }) => {
    let revLocator;

    await page
    .getByRole('option')
    .filter({ hasText: 'úteis' })
    .click();

    await page
    .getByRole('option')
    .filter({ hasText: 'recentes' })
    .click();

    await page.waitForTimeout(1500);

    await infiniteScroll({
        scrollDownAndUp: true,
        stopScrollCallback: async () => {
            //const reviews = await page.$$('div.Svr5cf');
            const data = await page.getByText('um mês atrás').count();
            if(data >= 1) {
                const locator = page.locator('span.Jmi7d');
                revLocator = page.locator('div.Svr5cf');
                for (const li of await locator.all())
                    await li.click();
            }
            
            return data >= 1;
        },
    });

    await page.waitForTimeout(1500);

    const lerMaisCount = await page
                        .getByRole('button')
                        .filter({ hasText: 'Ler mais' }).count()

                        await page.waitForTimeout(10500);

    console.log('Reviews count2:', lerMaisCount);

    const locator = revLocator;
    const reviews = await locator.evaluateAll((reviewsData) => {
        return reviewsData.map(data => {
            const user = data.querySelector('a.DHIhE').innerText; 
            const date = data.querySelector('span.iUtr1').innerText;
            const review = data.querySelector('div.K7oBsc').innerText;
            console.log(review);
            const stars = data.querySelector('div.GDWaad').innerText;

            return {
                user: user,
                date: date,
                review: review,
                stars: stars,
            };
        });
    });

    console.log('Reviews count:', reviews.length);
    
    const revs = reviews;
    const commitCount = reviews.length;
    await Dataset.pushData({
        revs,
        commitCount,
    });

    await page.waitForTimeout(50000);

    //await crawler.addRequests(requests);
})