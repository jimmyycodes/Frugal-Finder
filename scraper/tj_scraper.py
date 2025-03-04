from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests
import os
from dotenv import find_dotenv, load_dotenv
import mysql.connector
from urllib.parse import urlparse
import pandas as pd
import datetime
import re

class TJScraper:

    def __init__(self):
        # Load environment variables
        dotenv_path = find_dotenv()

        load_dotenv(dotenv_path)
        # Initialize MySQL connection
        self.db_connection = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST"),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE")
        )

        self.cursor = self.db_connection.cursor()

        # Initialize WebDriver
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Chrome(options=options)

        # Wait for elements to load (longer timeout for React-rendered content)
        self.wait = WebDriverWait(self.driver, 20)

        # Open Trader Joe's search results page
        self.url = "https://www.traderjoes.com/home/search?q={}&section=products&global=yes"


    def close_connection(self):
        """Close database connection."""
        self.cursor.close()
        self.db_connection.close()

    def insert_into_db(self, name, price, search_query, image_path):
        """Insert product data into MySQL database."""
        try:
                    # Remove any non-numeric characters from the price (like $)
            price = re.sub(r"[^\d.]", "", price) if price != "N/A" else None

            # Convert price to float if it's valid
            price = float(price) if price else None

            sql = """
                INSERT INTO tjproducts (name, price, searchQuery, imagePath)
                VALUES (%s, %s, %s, %s)
            """

            values = (name, price, search_query, image_path)
            self.cursor.execute(sql, values)
            self.db_connection.commit()
            print(f"✅ Inserted into DB: {name} - {price}")
        except Exception as e:
            print(f"❌ Error inserting into DB: {e}")

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

    def scrape_page(self, search_query):
        try:
            self.close_newsletter_popup()
            # Wait until at least one product appears
            items = self.wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, "SearchResultCard_searchResultCard__3V-_h")))

            for index, item in enumerate(items, start = 1):
                try:
                    # Extract the product name
                    name = item.find_element(By.CSS_SELECTOR, "a.SearchResultCard_searchResultCard__titleLink__2nz6x").text

                    try:
                        img_element = item.find_element(By.TAG_NAME, "img")
                        image_url = img_element.get_attribute("src")

                        # Download the image and get local path
                        local_image_path = self.download_image(image_url, name)

                    except Exception:
                        image_url = "N/A"
                        local_image_path = "N/A"

                    try:
                        price = item.find_element(By.CLASS_NAME, "ProductPrice_productPrice__price__3-50j").text
                    except Exception:
                        price = "N/A"

                except Exception as e:
                    print("Error extracting product details:", e)
            self.close_newsletter_popup()

        except Exception as e:
            print("Timeout: No search results found.", e)

    def scrape(self, queries):

        for query in queries:
            print(f"\n🔍 Searching for '{query}' at Trader Joe's...\n")

            self.driver.get(self.url.format(query))

            self.close_cookie_banner()

            while True:
                self.scrape_page(query)

                try:
                    next_button = self.driver.find_element(By.CSS_SELECTOR, ".Pagination_pagination__arrow_side_right__9YUGr")

                    if "disabled" in next_button.get_attribute("class"):
                        print("No more pages.")
                        break

                    next_button.click()

                    time.sleep(1)
                except Exception as e:
                    print("Pagination button not found or error:", e)
                    break

        # Close browser
        self.driver.quit()
        self.close_connection()

# Sample queries to search
current_cart = ["meat"]

# Create an instance of the scraper
tj_scraper = TJScraper()

tj_scraper.scrape(current_cart)