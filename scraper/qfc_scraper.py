from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time

URL = "https://www.qfc.com/search?query=meat&searchType=default_search"
PRODUCT_CARD = "ProductCard"
LOAD_MORE_BUTTON = "LoadMore__load-more-button"
PRODUCT_DESC_TRUNC = "ProductDescription-truncated"
PROMO_PRICE = "kds-Price-promotional"
# PRICE_SUPERSCRIPT = "kds-Price-superscript"
REGULAR_PRICE = "kds-Price-original"

chrome_options = Options()
chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6943.54 Safari/537.36")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--disable-notifications")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("useAutomationExtension", False)
driver = webdriver.Chrome(options=chrome_options)
params = {
  "latitude": 47.655548,
  "longitude": -122.303200,
  "accuracy": 100
}

driver.execute_cdp_cmd("Emulation.setGeolocationOverride", params)
driver.get(URL)
count = 1
wait = WebDriverWait(driver, 20)

def scrape_products():
  try:
    # add a pop-up close function here if needed

    product_cards = wait.until(
      EC.visibility_of_all_elements_located((By.CLASS_NAME, PRODUCT_CARD))
    )

    for product in product_cards:
      try:
        # Extract the product name
        name = product.find_element(By.CLASS_NAME, PRODUCT_DESC_TRUNC).text

        try:
          # Extract the price
          # Some products have promotional prices, check if promo price exists, if not, use regular price
          try:
            price = product.find_element(By.CLASS_NAME, PROMO_PRICE).text
          except NoSuchElementException:
            price = product.find_element(By.CLASS_NAME, REGULAR_PRICE).text

          # Clean up the price string
          price = price.replace("\n", "").replace(" ", "").replace("lb", "/lb")
        except Exception:
          price = "N/A"
      except Exception as e:
        print("Error extracting product details:", e)

      print(f"Name: {name}, Price: {price}")

  except NoSuchElementException:
    print("No products found.")
  except TimeoutException:
    print("Timeout waiting for products.")
  except Exception as e:
    print("Error scraping products:", e)


while True:
  scrape_products()
  try:
    load_more_button = wait.until(
      EC.presence_of_element_located((By.CLASS_NAME, LOAD_MORE_BUTTON))
    )

    if "disabled" in load_more_button.get_attribute("class"):
      print("No more products to load.")
      break

    load_more_button.click()
    count += 1
    print(f"Loading more products... {count}")
    time.sleep(3)
  except (NoSuchElementException, TimeoutException):
    print("Load more button not found or timeout.")
    break
  except Exception as e:
    print("Unexpected error:", e)
    break


driver.quit()