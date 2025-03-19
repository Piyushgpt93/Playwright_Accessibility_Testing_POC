import { test, expect } from './accessibility/utils';
import path from 'path';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

test.describe('Accessibility testing', () => {
  test('should not have any accessibility violations outside of wcag21aa', async ({
    page,
    accessibilityBuilder,
    browser,
  }) => {
    await page.goto('https://www.engineersmind.com/');
    await page.waitForLoadState('networkidle');
    const accessibilityScanResults = await accessibilityBuilder.analyze();

    createHtmlReport({
      results: accessibilityScanResults,
      options: {
        outputDir: path.join('src', 'test-results', 'accessibility-results'),
        reportFileName: `my-report.html`,
      },
    });

    await expect.soft(accessibilityScanResults.violations).toEqual([]);

    await page.close();
    await browser.close();
  });
});
