from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests
import os
from urllib.parse import urlparse
import pandas as pd
import datetime

class TJScraper:

    def __init__(self):
        # Initialize WebDriver
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Chrome(options=options)

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

    def download_image(self, image_url, product_name):
        """Download and save image from URL."""
        try:
            if image_url == "N/A":
                return "N/A"

            # Create images directory if it doesn't exist
            if not os.path.exists('images'):
                os.makedirs('images')

            # Clean filename of invalid characters
            clean_name = "".join(c for c in product_name if c.isalnum() or c in (' ', '-', '_')).rstrip()
            filename = f'images/{clean_name}.jpg'

            # Download image
            response = requests.get(image_url)
            if response.status_code == 200:
                with open(filename, 'wb') as f:
                    f.write(response.content)
                return filename
            return "Bad status code"
        except Exception as e:
            print(f"Error downloading image: {e}")
            return "N/A"

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
                        # Download the image and get local path
                        print(f"Downloading image: {image_url}")
                        local_image_path = self.download_image(image_url, name)

                    except Exception:
                        image_url = "N/A"
                        local_image_path = "N/A"

                    try:
                        price = item.find_element(By.CLASS_NAME, "ProductPrice_productPrice__price__3-50j").text
                    except Exception:
                        price = "N/A"

                    product_info = {
                        "name": name,
                        "price": price,
                        "image_url": image_url,
                        "local_image_path": local_image_path
                    }
                    products.append(product_info)

                    print(f"\n🔹 Product {index}")
                    print(f"\t📌 Name:  {name}")
                    print(f"\t💰 Price: {price}")
                    print(f"\t📸 Image: {image_url}")
                    print(f"\t💾 Saved: {local_image_path}")
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

    def save_to_csv(self, data, filename=None):
        """Save product data to CSV file."""
        try:
            # If filename not provided, use timestamp
            if filename is None:
                filename = f"trader_joes_products_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

            # Flatten the nested dictionary structure
            flattened_data = []
            for query, products in data.items():
                for product in products:
                    product_data = {
                        'search_query': query,
                        'name': product['name'],
                        'price': product['price'],
                        'local_image_path': product['local_image_path']
                    }
                    flattened_data.append(product_data)

            # Create and save DataFrame
            df = pd.DataFrame(flattened_data)
            df.to_csv(filename, index=False)
            print(f"✅ Data saved to {filename}")
            return filename
        except Exception as e:
            print(f"❌ Error saving data to CSV: {e}")
            return None


# Sample queries to search
current_cart = ["meat"]

# Create an instance of the scraper
tj_scraper = TJScraper()

# Scrape all queries
tj_all_products = tj_scraper.scrape(current_cart)

# Print all collected data
for query, products in tj_all_products.items():
    print(f"\n📌 Results for '{query}':")
    for product in products:
        print(f"🔹 {product['name']} - {product['price']} - {product['image_url']}  ")

# Update the end of the script to save the results
tj_scraper.save_to_csv(tj_all_products)
