import { test as base, TestInfo } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export const test = base.extend<{
  accessibilityBuilder: AxeBuilder;
}>({
  accessibilityBuilder: async ({ page }, use, testInfo) => {
    const accessibilityBuilder = await new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
    ]);

    await use(accessibilityBuilder);
  },
});

export const expect = base.expect;