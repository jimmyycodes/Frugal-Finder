from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class TJScraper:

    def __init__(self):
        # Initialize WebDriver
        self.driver = webdriver.Chrome()

        # Wait for elements to load (longer timeout for React-rendered content)
        self.wait = WebDriverWait(self.driver, 20)

        # Open Trader Joe's search results page
        self.url = "https://www.traderjoes.com/home/search?q={}&section=products&global=yes"


    # Close the cookie banner if it exists
    def close_cookie_banner(self):
        """Check and close the cookie banner if it exists."""
        try:
            cookie_banner = self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "CookiesAlert_cookiesAlert__3qSl1")))
            close_button = cookie_banner.find_element(By.TAG_NAME, "button")
            close_button.click()
            print("Closed cookie banner.")
            time.sleep(2)  # Allow time for the banner to disappear
        except Exception:
            print("No cookie banner found, continuing...")

    # Close the newsletter pop-up if it appears
    def close_newsletter_popup(self):
        """Check if the newsletter pop-up exists and close it."""
        try:
            # Wait for a short time (2 seconds) to see if the pop-up appears
            popup_close_button = WebDriverWait(self.driver, 1).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "needsclick.klaviyo-close-form"))
            )

            popup_close_button.click()  # Click the close button
            print("✅ Closed newsletter pop-up.")

            # Wait briefly to ensure it's fully closed before continuing
            WebDriverWait(self.driver, 1).until(EC.invisibility_of_element(popup_close_button))

        except Exception:
            print("✅ No newsletter pop-up detected, continuing...")

    def scrape_page(self):
        products = []
        try:
            self.close_newsletter_popup()
            # Wait until at least one product appears
            items = self.wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, "SearchResultCard_searchResultCard__3V-_h")))

            print("\n" + "=" * 80)
            print(f"📌 Found {len(items)} items on this page.")
            print("=" * 80)

            for index, item in enumerate(items, start = 1):
                try:
                    # Extract the product name
                    name = item.find_element(By.CSS_SELECTOR, "a.SearchResultCard_searchResultCard__titleLink__2nz6x").text

                    try:
                        img_element = item.find_element(By.TAG_NAME, "img")
                        image_url = img_element.get_attribute("src")
                    except Exception:
                        image_url = "N/A"

                    try:
                        price = item.find_element(By.CLASS_NAME, "ProductPrice_productPrice__price__3-50j").text
                    except Exception:
                        price = "N/A"

                    product_info = {"name": name, "price": price, "image_url": image_url}
                    products.append(product_info)

                    print(f"\n🔹 Product {index}")
                    print(f"\t📌 Name:  {name}")
                    print(f"\t💰 Price: {price}")
                    print(f"\t📸 Image: {image_url}")
                    print("-" * 40)

                except Exception as e:
                    print("Error extracting product details:", e)
            self.close_newsletter_popup()

        except Exception as e:
            print("Timeout: No search results found.", e)

        return products


    def scrape(self, queries):
        all_products = {}

        for query in queries:
            print(f"\n🔍 Searching for '{query}' at Trader Joe's...\n")

            self.driver.get(self.url.format(query))
            count = 1

            self.close_cookie_banner()
            query_products = []

            while True:
                query_products.extend(self.scrape_page())

                try:
                    next_button = self.driver.find_element(By.CSS_SELECTOR, ".Pagination_pagination__arrow_side_right__9YUGr")

                    if "disabled" in next_button.get_attribute("class"):
                        print("No more pages.")
                        break

                    next_button.click()

                    count += 1
                    print("Navigating to next page ", count)

                    time.sleep(1)
                except Exception as e:
                    print("Pagination button not found or error:", e)
                    break
            all_products[query] = query_products

        # Close browser
        self.driver.quit()

        return all_products


# Sample queries to search
current_cart = ["meat", "eggs"]

# Create an instance of the scraper
tj_scraper = TJScraper()

# Scrape all queries
tj_all_products = tj_scraper.scrape(current_cart)

# Print all collected data
for query, products in tj_all_products.items():
    print(f"\n📌 Results for '{query}':")
    for product in products:
        print(f"🔹 {product['name']} - {product['price']} - {product['image_url']}  ")
