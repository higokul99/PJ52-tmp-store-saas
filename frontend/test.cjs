const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('[' + msg.type().toUpperCase() + ']', msg.text()));
    page.on('pageerror', err => console.log('[PAGE ERROR]', err.toString()));
    await page.goto('http://localhost:5173/owner/dashboard');
    await new Promise(r => setTimeout(r, 4000));
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.innerText.includes('Add New Product'));
        if (addBtn) addBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.type('input[placeholder="e.g. Classic White T-Shirt"]', 'My Puppeteer Product');
    await page.type('input[placeholder="$0.00"]', '50');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const saveBtn = btns.find(b => b.innerText.includes('Add Product') && b.type === 'submit');
        if (saveBtn) saveBtn.click();
    });
    await new Promise(r => setTimeout(r, 4000));
    await browser.close();
})();
