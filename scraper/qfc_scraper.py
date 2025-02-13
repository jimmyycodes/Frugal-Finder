from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time
import csv
import datetime
import pandas as pd

params = {
  "latitude": 47.655548,
  "longitude": -122.303200,
  "accuracy": 100
}

class QFCScraper:
  BASE_URL = "https://www.qfc.com/search?query={}&searchType=default_search"
  PRODUCT_CARD = "ProductCard"
  LOAD_MORE_BUTTON = "LoadMore__load-more-button"
  PRODUCT_DESC_TRUNC = "ProductDescription-truncated"
  PROMO_PRICE = "kds-Price-promotional"
  REGULAR_PRICE = "kds-Price-original"

  def __init__(self, latitude=47.655548, longitude=-122.303200):
    self.chrome_options = self._setup_chrome_options()
    self.driver = webdriver.Chrome(options=self.chrome_options)
    self.wait = WebDriverWait(self.driver, 20)

    # # First load QFC homepage
    # self.driver.get("https://www.qfc.com")
    # time.sleep(2)

    # # Set geolocation permissions and coordinates
    # self.driver.execute_cdp_cmd("Browser.grantPermissions", {
    #     "origin": "https://www.qfc.com",
    #     "permissions": ["geolocation"]
    # })
    # self._set_location(latitude, longitude)

    # # Refresh the page to apply location settings
    # self.driver.refresh()
    time.sleep(3)

  def _setup_chrome_options(self):
    chrome_options = Options()
    # Basic settings
    chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6943.54 Safari/537.36")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-notifications")

    # Additional stability settings
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--ignore-certificate-errors")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--start-maximized")

    # Automation settings
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    return chrome_options

  def _set_location(self, latitude, longitude):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "accuracy": 100
    }
    try:
        self.driver.execute_cdp_cmd("Emulation.setGeolocationOverride", params)
        print(f"Location set to: {latitude}, {longitude}")
    except Exception as e:
        print(f"Error setting location: {e}")

  def _close_popup(self):
    try:
      no_thanks_button = self.wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'No thanks')]"))
      )

      # if the button is not found, break
      if no_thanks_button is None:
        return

      no_thanks_button.click()
      print("Popup closed")
      time.sleep(1)
    except NoSuchElementException:
      print("No popup found, continuing...")
    except TimeoutException:
      print("Popup not found within timeout")
    except Exception as e:
      print("Error closing popup:", e)

  def scrape_products(self):
    try:
      self._close_popup()
      product_cards = self.wait.until(
        EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD))
      )
      product_data = []
      for product in product_cards:
        try:
          name = product.find_element(By.CLASS_NAME, self.PRODUCT_DESC_TRUNC).text
          try:
            price = product.find_element(By.CLASS_NAME, self.PROMO_PRICE).text
          except NoSuchElementException:
            price = product.find_element(By.CLASS_NAME, self.REGULAR_PRICE).text

          price = price.replace("\n", "").replace(" ", "").replace("lb", "/lb")
        except Exception:
          price = "N/A"

        product_data.append({
          "name": name,
          "price": price
        })

      return product_data

    except NoSuchElementException:
      print("No products found.")
    except TimeoutException:
      print("Timeout waiting for products.")
    except Exception as e:
      print("Error scraping products:", e)

  def load_more_products(self):
    try:
        # First check if the button exists and is visible
        load_more_button = self.driver.find_element(By.CLASS_NAME, self.LOAD_MORE_BUTTON)

        # If button exists but is disabled, return False
        if "disabled" in load_more_button.get_attribute("class"):
            print("No more products to load.")
            return False

        # If button exists and is enabled, click it
        load_more_button.click()
        print("Loaded more products")
        time.sleep(3)
        return True

    except NoSuchElementException:
        # Button not found - this is expected when we've loaded all products
        print("No more products to load (button not found).")
        return False
    except Exception as e:
        print(f"Error loading more products: {e}")
        return False

  # want to save the data into a csv file and return a new csv file
  def save_to_csv(self, data, filename):
    # if the filename is not provided, use the current timestamp
    if filename is None:
      filename = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

    try:
      df = pd.DataFrame(data)
      df.to_csv(filename, index=False)
      print(f"Data saved to {filename}")
      return filename
    except Exception as e:
      print(f"Error saving data to CSV: {e}")
      return None

  def run(self, search_query, save_filename=None):
    product_data = []
    self.driver.execute_cdp_cmd("Emulation.setGeolocationOverride", params)
    for query in search_query:
        print(f"Running search for {query}")
        self.driver.get(self.BASE_URL.format(query))


        # Get initial products
        product_data += self.scrape_products()

        # Keep loading more products until no more are available
        while True:
            try:
                if self.load_more_products():
                    new_products = self.scrape_products()
                    if not new_products:  # If no new products were found
                        break
                    product_data += new_products
                else:
                    break
            except Exception as e:
                print(f"Stopped loading more products: {e}")
                break

    print(f"Total products scraped: {len(product_data)}")
    csv_file = self.save_to_csv(product_data, save_filename)

    return csv_file

  def close(self):
    self.driver.quit()

if __name__ == "__main__":
  scraper = QFCScraper()
  scraper.run(["meat", "milk", "eggs"])
  scraper.close()


# driver.execute_cdp_cmd("Emulation.setGeolocationOverride", params)
# driver.get(URL)
# count = 1
# wait = WebDriverWait(driver, 20)

# def close_popup():
#   try:
#     no_thanks_button = WebDriverWait(driver, 2).until(
#       EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'No thanks')]"))
#     )

#     # if the button is not found, break
#     if no_thanks_button is None:
#       return

#     no_thanks_button.click()
#     print("Popup closed")
#     time.sleep(1)
#   except NoSuchElementException:
#     print("No popup found, continuing...")
#   except TimeoutException:
#     print("Popup not found within timeout")
#   except Exception as e:
#     print("Error closing popup:", e)

# def scrape_products():
#   try:
#     # add a pop-up close function here if needed
#     close_popup()
#     product_cards = wait.until(
#       EC.visibility_of_all_elements_located((By.CLASS_NAME, PRODUCT_CARD))
#     )

#     for product in product_cards:
#       try:
#         # Extract the product name
#         name = product.find_element(By.CLASS_NAME, PRODUCT_DESC_TRUNC).text

#         try:
#           # Extract the price
#           # Some products have promotional prices, check if promo price exists, if not, use regular price
#           try:
#             price = product.find_element(By.CLASS_NAME, PROMO_PRICE).text
#           except NoSuchElementException:
#             price = product.find_element(By.CLASS_NAME, REGULAR_PRICE).text

#           # Clean up the price string
#           price = price.replace("\n", "").replace(" ", "").replace("lb", "/lb")
#         except Exception:
#           price = "N/A"
#       except Exception as e:
#         print("Error extracting product details:", e)

#       print(f"Name: {name}, Price: {price}")

#   except NoSuchElementException:
#     print("No products found.")
#   except TimeoutException:
#     print("Timeout waiting for products.")
#   except Exception as e:
#     print("Error scraping products:", e)


# while True:
#   scrape_products()
#   try:
#     # close_popup()
#     load_more_button = wait.until(
#       EC.presence_of_element_located((By.CLASS_NAME, LOAD_MORE_BUTTON))
#     )

#     if "disabled" in load_more_button.get_attribute("class"):
#       print("No more products to load.")
#       break

#     # close_popup()
#     load_more_button.click()
#     count += 1
#     print(f"Loading more products... {count}")
#     time.sleep(3)
#   except (NoSuchElementException, TimeoutException):
#     print("Load more button not found or timeout.")
#     break
#   except Exception as e:
#     print("Unexpected error:", e)
#     break

# print("Done")
# time.sleep(120)
# driver.quit()