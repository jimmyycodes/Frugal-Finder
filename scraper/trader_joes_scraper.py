from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException

from dotenv import find_dotenv, load_dotenv
import mysql.connector
import os
import re
import requests

from selenium.webdriver.common.action_chains import ActionChains

import time
import random

class TJ_scraper:
  # main card of the website
  PRODUCT_CARD = "SearchResultCard_searchResultCard__3V-_h"

  # button to load the next page
  LOAD_MORE_BUTTON = ".Pagination_pagination__arrow_side_right__9YUGr"

  # Inner details header of the product we clicked in
  PRODUCT_DESC_TRUNC = "ProductDetails_main__title__14Cnm"

  # Inner details Regular price of product
  REGULAR_PRICE = "ProductPrice_productPrice__price__3-50j"

  # Popup close button
  NO_THANKS_BUTTON = "CookiesAlert_cookiesAlert__3qSl1"

  # News letter popup close button
  NEWSLETTER_CLOSE_BUTTON = "needsclick.klaviyo-close-form"

  # Inner details weight of product
  PRODUCT_WEIGHT = "ProductPrice_productPrice__unit__2jvkA"

  # Search button to search for the product
  SEARCH_BUTTON = "SearchField_searchField__inputText__2IH6E"

  # Inner details detailed description of product
  PRODUCT_EXTRA_DESC = 'ProductDetails_main__description__2R7nN'

  # Store name
  STORE_NAME = "TraderJoes"

  # Store address
  STORE_ADDRESS = "4555 Roosevelt Way NE, Seattle, WA 98105"

  # Store longitude and latitude
  STORE_LONGITUDE = 47.6646866989066
  STORE_LATITUDE = -122.31754117071971

  # Inner detail page image class name
  IMAGE_CLASS_NAME = "iiz__zoom-img "

  def __init__(self, driver):
    # Load environment variables
    dotenv_path = find_dotenv()

    load_dotenv(dotenv_path)

    # Initialize MySQL connection
    self.db_connection = mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        ssl_ca="/etc/ssl/certs/DigiCertGlobalRootCA.crt.pem"
    )

    self.cursor = self.db_connection.cursor()

    # Initialize WebDriver
    self.driver = driver

    self.wait = WebDriverWait(self.driver, 20)

    self.url = "https://www.traderjoes.com/"

    # clear the images directory
    if os.path.exists('images'):
        # Remove all files in the images directory
        for file in os.listdir('images'):
            os.remove(os.path.join('images', file))
    else:
        os.makedirs('images')

  def close_connection(self):
    """Close database connection."""
    self.cursor.close()
    self.db_connection.close()
  
  def insert_into_db(self, name, description, weight, price, search_query, image_path):
    try:
        # Remove any non-numeric characters from the price (like $)
        price = re.sub(r"[^\d.]", "", price) if price != "N/A" else None

        # Convert price to float if it's valid
        price = float(price) if price else None

        # check if the store is already in the database for Stores
        store_name = self.STORE_NAME

        # in the future make this dynamic to your location
        address = self.STORE_ADDRESS

        long = self.STORE_LONGITUDE
        lat = self.STORE_LATITUDE

        self.cursor.execute("SELECT * FROM Stores WHERE name = %s", (store_name,))
        store = self.cursor.fetchone()

        if not store:
            # Insert the store into the database
            sql = """
                INSERT INTO Stores (name, address, longitudeStore, latitudeStore)
                VALUES (%s, %s, %s, %s)
            """
            self.cursor.execute(sql, (store_name, address, long, lat))
            self.db_connection.commit()

        # get the sid of the store
        self.cursor.execute("SELECT sid FROM Stores WHERE name = %s", (store_name,))
        sid = self.cursor.fetchone()[0]

        sql = """
            INSERT INTO Products (sid, name, description, amount, price, searchQuery, imagePath)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        values = (sid, name, description, weight, price, search_query, image_path)
        self.cursor.execute(sql, values)
        self.db_connection.commit()

        print(f"✅ Inserted into DB: {name} - {price}")
    except Exception as e:
        print("Error inserting into DB: ", e)

  def close_popup(self):
      try:
        cookie_banner = self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.NO_THANKS_BUTTON)))
        close_button = cookie_banner.find_element(By.TAG_NAME, "button")
        close_button.click()
        print("Closed cookie banner.")
        time.sleep(2)  # Allow time for the banner to disappear

      except NoSuchElementException:
          print("❌ No popup found, continuing...")
      except TimeoutException:
          print("⏳ Popup not found within timeout")
      except Exception as e:
          print("🚨 Error closing popup:", e)

    # Close the newsletter pop-up if it appears
  def close_newsletter_popup(self):
    """Check if the newsletter pop-up exists and close it."""
    try:
        # Wait for a short time (2 seconds) to see if the pop-up appears
        popup_close_button = WebDriverWait(self.driver, 3).until(
            EC.element_to_be_clickable((By.CLASS_NAME, self.NEWSLETTER_CLOSE_BUTTON))
        )

        popup_close_button.click()  # Click the close button
        print("✅ Closed newsletter pop-up.")

        # Wait briefly to ensure it's fully closed before continuing
        WebDriverWait(self.driver, 1).until(EC.invisibility_of_element(popup_close_button))

    except Exception:
        print("✅ No newsletter pop-up detected, continuing...")

  def download_image(self, image_url, product_name):
    """Download and save image from URL"""
    try:
        if image_url == "N/A":
            return "N/A"

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

  def scrape_products(self, search_query, retry=True, start_index=0):
    try:
        self.close_newsletter_popup()

        wait = WebDriverWait(self.driver, 10)
        product_cards = wait.until(
            EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD))
        )
        print(f"Found {len(product_cards)} products")

        for index in range(start_index, len(product_cards)):
            try:
                # Re-locate the product cards after navigating back
                product_cards = wait.until(
                    EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD))
                )
                product = product_cards[index]

                # Click on the product link to get more details
                link = product.find_element(By.TAG_NAME, "a")

                # Scroll element into view
                self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", link)
                time.sleep(1)

                href = link.get_attribute("href")
                print("\n")
                print(f"Product {index + 1} URL: {href}")

                time.sleep(2)
                link.click()

                # Wait for the product details to load
                wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.PRODUCT_DESC_TRUNC)))

                # Extract product details
                name = self.extract_text(wait, self.PRODUCT_DESC_TRUNC)
                price = self.extract_price(wait)
                weight = self.extract_weight(wait)
                description = self.extract_description(wait)
                image_url = self.extract_image(name)

                self.insert_into_db(name, description, weight, price, search_query, image_url)

                print(f"Product: {name}\nPrice: {price}\nWeight: {weight}\nDescription: {description}\n Image: {image_url}\n\n")

                # set retry back to true to retry the next product potentially
                retry = True

                # Go back to the previous page
                self.driver.back()

                time.sleep(1)

                wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD)))

            except Exception as e:
                # If an error occurs, retry the current product
                if retry and index < len(product_cards):
                    print(f"Error at product {index + 1}: {e}. Retrying from this product...")

                    self.scrape_products(retry=False, start_index=index)

                    # prevent infinite loop
                    return
                print("Error extracting product details at index: {index + 1}", e)

    except NoSuchElementException:
        print("No products found.")
    except TimeoutException:
        print("Timeout waiting for products.")
    except Exception as e:
        print("Error scraping products:", e)

  def extract_weight(self, wait):
    try:
        element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.PRODUCT_WEIGHT)))
        text_part = element.text.split("\n")
        filtered_text = "".join(text_part).replace("/", "").strip()
        return filtered_text
    except Exception as e:
        print(f"Error extracting weight: {e}")
        return "N/A"  # Let the main retry handle it
    
  def extract_image(self, name):
    # get the product image
    try:
        img_element = self.wait.until(EC.presence_of_element_located((By.XPATH, "//img[contains(@src, 'products')]")))
        image_url = img_element.get_attribute("src")
        if "jcr:content" in image_url or "renditions" in image_url:
            print("⚠️ Image is private and session-based:", image_url)
            local_image_path = self.download_image(image_url, name)
            return local_image_path
        else:
            return image_url
    except Exception as e:
        print("Error extracting image:", e)
        return "N/A"

  def extract_text(self, wait, class_name):
    try:
        return wait.until(EC.presence_of_element_located((By.CLASS_NAME, class_name))).text
    except Exception as e:
        print(f"Error extracting text for {class_name}: {e}")
        return "N/A"  # Let the main retry handle it

  def extract_price(self, wait):
    try:
        return wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.REGULAR_PRICE))).text
    except Exception as e:
        print("Error extracting price:", e)
        return "N/A"

  def extract_description(self, wait):
    try:
        description_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.PRODUCT_EXTRA_DESC)))
        all_paragraphs = description_element.find_elements(By.TAG_NAME, "p")
        description_text = " ".join([p.text for p in all_paragraphs])
        return description_text
    except Exception as e:
        return "N/A"

  def scrape(self, queries):
    for query in queries:
      print(f"\n🔍 Searching for '{query}' at Trader Joes...\n")

      self.driver.get(self.url)

      # Clear cookies/storage
      self.driver.delete_all_cookies()
      self.driver.execute_script("window.localStorage.clear();")

      # click the search action
      search_action = self.wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "Search_action__2LXEg")))
      search_action.click()

      # Human-like interaction with search bar
      search_bar = self.wait.until(EC.element_to_be_clickable((By.CLASS_NAME, self.SEARCH_BUTTON)))
      ActionChains(self.driver).move_to_element(search_bar).pause(1).click().perform()

      # Simulate typing
      search_term = query
      for char in search_term:
          search_bar.send_keys(char)
          time.sleep(random.uniform(0.1, 0.3))
      search_bar.send_keys(Keys.RETURN)

      # wait for the results to load
      time.sleep(2)

      self.close_popup()
      self.close_newsletter_popup()

      # go to the products tab
      products_view = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'All Products')]" )))
      products_view.click()

      time.sleep(5)

      self.scrape_products(query)
      while True:
        try:

          self.scrape_products(query)
          try:
            next_button = self.wait.until(
              EC.element_to_be_clickable((By.CSS_SELECTOR, self.LOAD_MORE_BUTTON))
            )
          except:
            # if pagination button is not found then break
            print("No more pages.")
            break

          try:
            print("Successfully clicked the button")
            next_button.click()
          except:
            print("Error clicking the button")
            break
          time.sleep(2)

        except Exception as e:
          print("Pagination button not found or error:", e)
          break

    # Close browser
    self.driver.quit()