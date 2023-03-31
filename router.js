// router.js
import { createPlaywrightRouter, Dataset, Request } from 'crawlee';

export const routerGoogle = createPlaywrightRouter();
export const routerBooking = createPlaywrightRouter();
export const routerTripadvisor = createPlaywrightRouter();

var title;

routerGoogle.use(async ({ page }) => {
    title = await page.title();
})

routerGoogle.addDefaultHandler(async ({ page, infiniteScroll, crawler }) => {

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

    const reviews = await page.locator('div.Svr5cf').evaluateAll((reviewsData) => {
        return reviewsData.map(data => {
            if(data.querySelector('div.STQFb.eoY5cb').firstChild.innerText.length) {
                const user = data.querySelector('a.DHIhE').innerText;
                const date = data.querySelector('span.iUtr1').innerText;
                const review = data.querySelector('div.STQFb.eoY5cb').firstChild.innerText;
                const stars = data.querySelector('div.GDWaad').innerText;

                var reviewFiltered;
                reviewFiltered = review.replace('(Tradução do Google) ',"");
                reviewFiltered = review.replace('\n',"");

                return {
                    user: user,
                    date: date,
                    review: reviewFiltered,
                    stars: stars,
                };
            }
        });
    });

    console.log('Reviews count:', reviews.length);
   
    const revs = reviews;
    var filtered = revs.filter(function (el) {
        return el != null;
    });
    const commitCount = filtered.length;
    await Dataset.pushData({
        filtered,
        commitCount,
    });

    //await crawler.addRequests(requests);
})

routerBooking.use(async ({ page }) => {
    title = await page.title();
})

routerBooking.addDefaultHandler(async ({ page, infiniteScroll, crawler }) => {

    let nextpagecount = 0;
    while (nextpagecount == 0) {
        const nextPageLoc = page.locator('p.page_link.review_next_page');
        await nextPageLoc.first().waitFor();
        nextpagecount = await page.locator('p.review_item_date').filter({ hasText: 'dezembro de 2022'}).count();
        console.log(nextpagecount);

        const reviews = await page.locator('li.review_item.clearfix').evaluateAll((reviewsData) => {
            return reviewsData.map(data => {

                const user = data.querySelector('p.reviewer_name').innerText;
                const date = data.querySelector('p.review_item_date').innerText;
                const title = data.querySelector('div.review_item_header_content_container').innerText;
                let positive;
                if (data.querySelector('p.review_pos ')) {
                    positive = data.querySelector('p.review_pos ').innerText;
                }
                let negative;
                if (data.querySelector('p.review_neg ')) {
                    negative = data.querySelector('p.review_neg ').innerText;
                }
                const stars = data.querySelector('span.review-score-badge').innerText;

                return {
                    user: user,
                    date: date,
                    title: title,
                    positive: positive,
                    negative: negative,
                    stars: stars,
                };

            });
        });

        console.log('Reviews count:', reviews.length);
   
        const revs = reviews;

        const commitCount = revs.length;
        await Dataset.pushData({
            revs,
            commitCount,
        });

        await nextPageLoc.first().click();
    }
})

routerTripadvisor.use(async ({ page }) => {
    title = await page.title();
})

routerTripadvisor.addDefaultHandler(async ({ page, infiniteScroll, crawler }) => {

    /*let cookies = true;
    while (cookies) {
        let button = page.getByRole('button').filter({ hasText: 'Aceito' });
        const count = await button.count();
        if(count) {
            await button.click();
            cookies = false;
        }
        else {
            cookies = false;
        }
    }*/

    /*let button = page.getByRole('button').filter({ hasText: 'Aceito' });
    const visible = await button.isVisible();
    if(visible) await button.click();*/
    //await page.locator('div.ot-sdk-row').first().click();
    /*await button.count().then((value) => {
        if(value > 0) {
            await button.click();
        }
    })*/

    await page.getByRole('button').filter({ hasText: 'Aceito' }).click();

    //await page.waitForTimeout(5500);

    let nextpagecount = 0;
    while (nextpagecount == 0) {
        const nextPageLoc = page.locator('a.ui_button.nav.next.primary ');
        await nextPageLoc.first().waitFor();
        nextpagecount = await page.locator('div.cRVSd').filter({ hasText: 'dez. de 2022'}).count();
        console.log(nextpagecount);

        const lerMais = page.locator('div.TnInx');
        await lerMais.first().click();

        const reviews = await page.locator('div.YibKl').evaluateAll((reviewsData) => {
            return reviewsData.map(data => {

                const user = data.querySelector('a.ui_header_link.uyyBf').innerText;
                const date = data.querySelector('a.ui_header_link.uyyBf').innerText;
                const title = data.querySelector('div.KgQgP').innerText;
                //const review = data.querySelector('div.QewHA').innerText;
                //const stars = data.querySelector('span.review-score-badge').innerText;

                return {
                    user: user,
                    date: date,
                    title: title,
                    //review: review,
                    //stars: stars,
                };

            });
        });

        console.log('Reviews count:', reviews.length);
   
        const revs = reviews;

        const commitCount = revs.length;
        await Dataset.pushData({
            revs,
            commitCount,
        });

        await nextPageLoc.first().click();
    }
})