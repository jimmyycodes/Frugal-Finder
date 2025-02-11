from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time

PATH = '/Users/dibaggioramirez-diaz/Downloads/chromedriver-mac-arm64/chromedriver'
URL = "https://www.qfc.com/search?query=meat&searchType=default_search"
PRODUCT_CARD = "ProductCard"
LOAD_MORE_BUTTON = "LoadMore__load-more-button"
PRODUCT_DESC_TRUNC = "ProductDescription-truncated"
PROMO_PRICE = "kds-Price-promotional"
# PRICE_SUPERSCRIPT = "kds-Price-superscript"
REGULAR_PRICE = "kds-Price-original"

service = Service(executable_path=PATH)
driver = webdriver.Chrome()

# Set the geolocation to Seattle, specifically the UW campus
params = {
  "latitude": 47.655548,
  "longitude": -122.303200,
  "accuracy": 100
}
driver.execute_cdp_cmd("Emulation.setGeolocationOverride", params)

# Load the page, meat search example
driver.get(URL)

"""
TODO: Add a loop to continuously click the "Load More" button until all search results are loaded.
Add all these products to a big list, then parse them out to get name, price, and image.
"""

# Wait for elements to load (longer timeout for React-rendered content)
wait = WebDriverWait(driver, 15)  # Increased to 15 seconds for reliability

try:
  #Wait until at least one product appears
  product_cards = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, PRODUCT_CARD)))
  print(f"Found {len(product_cards)} product cards.")

  for product in product_cards:
    try:
      # Extract the product name
      name = product.find_element(By.CLASS_NAME, PRODUCT_DESC_TRUNC).text

      try:
        # Extract the price
        # Some products have promotional prices, check if promo price exists, if not, use regular price
        try:
          price = product.find_element(By.CLASS_NAME, PROMO_PRICE).text
        except Exception:
          price = product.find_element(By.CLASS_NAME, REGULAR_PRICE).text

        # Clean up the price string
        price = price.replace("\n", "").replace(" ", "").replace("lb", "/lb")
      except Exception:
        price = "N/A"

      print(f"Name: {name}, Price: {price}")

    except Exception as e:
      print("Error extracting product details:", e)

except Exception as e:
  print("Timeout: No search results found.", e)

driver.quit()