const { test, expect } = require('@playwright/test');
const fs = require('fs');
const { chromium } = require('playwright');

// Direct path to your CSV file
const csvPath = 'C:\\Users\\Testriq-48\\Desktop\\instagramfollower\\Data\\data.csv';

// Read and parse the CSV file to get URLs
const csvData = fs.readFileSync(csvPath, 'utf-8');
const urls = csvData.split('\n').map(url => url.trim()).filter(url => url !== '');

// Define your test using Playwright's test syntax
test('Console Logs Check', async ({ browser }) => {
    for (let url of urls) {
        try {
            const context = await browser.newContext();
            const page = await context.newPage();

            let newArray = [];

            // Listen for console messages and capture their values
            page.on('console', async msg => {
                const values = [];
                for (const arg of msg.args()) {
                    values.push(await arg.jsonValue());
                }
                newArray.push(...values);
            });

            await page.goto(url);

            // Ensure the page is fully loaded
            await page.waitForLoadState('load');

            // Give the page some time to load and log messages
            await page.waitForTimeout(50000);

            // Check conditions
            if (newArray.includes("Loading gmap version") && newArray.includes("weekly")) {
                console.log("Condition met for", url);
            } else {
                console.log("Condition not met for", url);
            }

            await context.close();

        } catch (error) {
            console.error('Error navigating to URL:', url);
            // console.error(error); // Log the specific error for debugging
            continue;
        }
    }
});
