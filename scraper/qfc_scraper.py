from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time

PATH = '/Users/dibaggioramirez-diaz/Downloads/chromedriver-mac-arm64/chromedriver'
URL = "https://www.qfc.com/search?query=meat&searchType=default_search"
service = Service(executable_path=PATH)
driver = webdriver.Chrome(service=service)

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

# Wait for the initial search results to be present
try:
  initial_elements = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "ProductCard"))
  )
  print(f"Found {len(initial_elements)} initial elements")
  print("Initial elements:")
  for element in initial_elements:
    print(element.get_attribute('outerHTML'))
except Exception as e:
  print(f"Could not find initial elements: {e}")
  driver.quit()

# Wait for the "Load More" button to be present and clickable
try:
  load_more = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CLASS_NAME, "LoadMore__load-more-button"))
  )
  print("Found load more button")
except Exception as e:
  print(f"Could not find load more button: {e}")
  driver.quit()

# Click the "Load More" button
load_more.click()
print("Clicked the load more button")

# Wait for new content to load
try:
  new_elements = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "ProductCard"))
  )
  print(f"Found {len(new_elements)} elements after clicking load more")
  print("New elements:")
  for element in new_elements:
    print(element.get_attribute('outerHTML'))
except Exception as e:
  print(f"Could not find new elements: {e}")

driver.quit()