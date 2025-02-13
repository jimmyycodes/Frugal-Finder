from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import TimeoutException,StaleElementReferenceException, WebDriverException
import time

URL = "https://www.qfc.com/search?query=meat&searchType=default_search"
PRODUCT_CARD = "ProductCard"
LOAD_MORE_BUTTON = "LoadMore__load-more-button"
PRODUCT_DESC_TRUNC = "ProductDescription-truncated"
PROMO_PRICE = "kds-Price-promotional"
# PRICE_SUPERSCRIPT = "kds-Price-superscript"
REGULAR_PRICE = "kds-Price-original"

def load_all_products():
  while True:
    WebDriverWait(driver, 10)
    try:
      # Check if the browser window is still open
      if not driver.current_window_handle:
        print("Browser window closed.")
        break

      load_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, LOAD_MORE_BUTTON))
      )

      print("Load button found, clicking it...")
      WebDriverWait(driver, 10)
      load_button.click()

      WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, PRODUCT_CARD))
      )
      print("New products loaded.")
    except TimeoutException:
      print("No more products to load.")
      break
    except StaleElementReferenceException:
      print("Stale element, retrying...")
      continue
    except WebDriverException:
      print("Browser closed.")
      break
    except Exception as e:
      print("Error loading products:", e)
      break


def scrape_products(product_cards):
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

chrome_options = Options()
chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6943.54 Safari/537.36")
driver = webdriver.Chrome(options=chrome_options)
params = {
  "latitude": 47.655548,
  "longitude": -122.303200,
  "accuracy": 100
}

driver.execute_cdp_cmd("Emulation.setGeolocationOverride", params)
driver.get(URL)
WebDriverWait(driver, 15)
# Load all products
load_all_products()

try:
  product_cards = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, PRODUCT_CARD)))
  scrape_products(product_cards)
except Exception as e:
  print("Timeout: No search results found.", e)

driver.quit()