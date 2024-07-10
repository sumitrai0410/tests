const { test, expect } = require('@playwright/test');
const fs = require('fs');
const { chromium } = require('playwright');


const csvPath = 'C:/Users/Testriq-48/Desktop/socilinks/Data/data.csv';

const csvData = fs.readFileSync(csvPath, 'utf-8');
const urls = csvData.split('\n').map(url => url.trim()).filter(url => url !== '');

test.only('Console Logs Check', async ({ browser }) => {
    for (let url of urls) {
        try {
            const context = await browser.newContext();
            const page = await context.newPage();

            let consoleMessages = [];

            page.on('console', async msg => {
                const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
                consoleMessages.push(args);
            });

            await page.goto(url);

   
            await page.waitForLoadState('load');

            await page.waitForTimeout(30000);


            const hasLoadingMessage = consoleMessages.some(msg => msg.includes('Loading gmap version'));
            const hasWeeklyMessage = consoleMessages.some(msg => msg.includes('weekly'));

            if (hasLoadingMessage && hasWeeklyMessage) {
                console.log("Condition met for", url);
            } else {
                console.log("Condition not met for", url);
            }

            await context.close();

        } catch (error) {
            console.error('Error navigating to URL:', url);
      
            continue;
        }
    }
});
