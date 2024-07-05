const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test("Check search input visibility on each page", async ({ browser }) => {
    const csvFileName = 'meetsocilink.csv'; // Adjust file name if necessary
    const csvPath = path.join(__dirname, 'Data', csvFileName); // Adjust folder structure as needed

    console.log('CSV File Path:', csvPath); // Debugging output

    try {
        const csvData = fs.readFileSync(csvPath, 'utf-8');
        const urls = csvData.split('\n').map(url => url.trim()).filter(url => url !== '');

        for (let url of urls) {
            try {
                const context = await browser.newContext();
                const page = await context.newPage();

                await page.goto(url);

                // Use proper assertion with await
                await expect(page.locator('#search_input')).toBeVisible();

                await context.close(); // Close context to cleanup resources
            } catch (error) {
                console.error(`Error navigating to ${url}: ${error}`);
                // Handle navigation error
            }
        }
    } catch (error) {
        console.error(`Error reading CSV file: ${error}`);
        // Handle file read error
    }
});
