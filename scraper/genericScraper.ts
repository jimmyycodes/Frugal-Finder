import puppeteer from "puppeteer";
import { storeConfigs } from "./storeConfigs";

class GenericScraper implements StoreScraper {
  private storeName: string;

  constructor(storeName: string) {
    this.storeName = storeName;
  }

  async fetchProductData(productName: string): Promise<ProductData[]> {
    const storeConfig = storeConfigs[this.storeName];
    if (!storeConfig) {
      throw new Error("Store not supported");
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`${storeConfig.url}${encodeURIComponent(productName)}`);

    // Extract data
    const products = await page.evaluate((config) => {
      const items: ProductData[] = [];
      document
        .querySelectorAll(config.selectors.productContainer)
        .forEach((el) => {
          const name =
            el.querySelector(config.selectors.name)?.textContent?.trim() ||
            "Unknown";
          const price = parseFloat(
            el
              .querySelector(config.selectors.price)
              ?.textContent?.replace(/[^0-9.]/g, "") || "0"
          );
          const imgUrl =
            el.querySelector(config.selectors.img)?.getAttribute("src") || "";

          items.push({ name, price, store: config.storeName, imgURL: imgUrl });
        });
      return items;
    }, storeConfig);

    await browser.close();
    return products;
  }
}
