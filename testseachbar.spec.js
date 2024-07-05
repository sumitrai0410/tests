const { test, expect } = require('@playwright/test');
const fs = require('fs');
const { chromium } = require('playwright');


const csvPath = 'C:\\Users\\Testriq-48\\Desktop\\instagramfollower\\Data\\meetsocilink.csv';


const csvData = fs.readFileSync(csvPath, 'utf-8');
const urls = csvData.split('\n').map(url => url.trim()).filter(url => url !== '');

test.only('Search bar ', async ({ browser }) => {
    for (let url of urls) {
        try {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto(url);
            
   
            await page.waitForLoadState('load');


            const searchBar = await page.locator('.search-box');

    
            await expect(searchBar).toBeVisible();

      
            await searchBar.fill('50266');

          
            await page.locator('.button-search').click();

         
            await page.waitForLoadState('load');
            await expect(page.locator('.poi_right')).first().toBeVisible();

        
            await context.close();

        } catch (error) {
            console.error('Error in searching in the URL:', url);
            console.info(error);
         
            continue;
        }
    }
});