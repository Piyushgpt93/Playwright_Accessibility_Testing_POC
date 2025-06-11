import { test, expect } from './accessibility/utils';
import path from 'path';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import dataArray from './testData.json';

dataArray.forEach((data) => {
  test.describe('Accessibility testing', () => {
    test(`should not have any accessibility violations outside of wcag21aa ${data.TestURL}`, async ({
      page,
      accessibilityBuilder,
      browser,
    }) => {
      await page.goto(data.TestURL);
      await page.waitForLoadState('networkidle');
      const accessibilityScanResults = await accessibilityBuilder.analyze();

      createHtmlReport({
        results: accessibilityScanResults,
        options: {
          outputDir: path.join(
            'src',
            'test-results',
            `${data.TestURL.replace(/[^a-zA-z0-9]/g, '_')}`
          ),
          reportFileName: `${data.TestURL.replace(/[^a-zA-z0-9]/g, '_').}.html`,
        },
      });

      await expect.soft(accessibilityScanResults.violations).toEqual([]);

      await page.close();
      await browser.close();
    });
  });
});
