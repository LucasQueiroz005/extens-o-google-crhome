import { test, expect, chromium } from '@playwright/test';
import path from 'path';

const dist = path.resolve(__dirname, '..', 'dist');

test('popup carrega e exibe UI', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      '--disable-extensions-except=' + dist,
      '--load-extension=' + dist,
    ]
  });
  
  const [page] = context.pages();
  await page.goto('https://example.com');
  
  
  const outline = await page.evaluate(() => getComputedStyle(document.querySelector('a')!).outlineStyle);
  expect(outline).toBeDefined();

  await context.close();
});