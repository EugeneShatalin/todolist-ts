describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
// APIs from jest-puppeteer
        let page;
        await page.goto('http://localhost:9009/iframe.html?id=additemform-component--add-item-form-base-example');
        const image = await page.screenshot();
// API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});