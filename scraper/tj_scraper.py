from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize WebDriver
driver = webdriver.Chrome()

# Open Trader Joe's search results page
url = "https://www.traderjoes.com/home/search?q=meat&section=products&global=yes"
driver.get(url)

# Wait for elements to load (longer timeout for React-rendered content)
wait = WebDriverWait(driver, 15)  # Increased to 15 seconds for reliability

try:
    # Wait until at least one product appears
    items = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "SearchResultCard_searchResultCard__3V-_h")))
    print(f"Found {len(items)} items.")

    for item in items:
        try:
            # Extract the product name
            name = item.find_element(By.CSS_SELECTOR, "a.SearchResultCard_searchResultCard__titleLink__2nz6x").text

            try:
                price = item.find_element(By.CLASS_NAME, "ProductPrice_productPrice__price__3-50j").text
            except Exception:
                price = "N/A"

            print(f"Name: {name}, Price: {price}")

        except Exception as e:
            print("Error extracting product details:", e)

except Exception as e:
    print("Timeout: No search results found.", e)

# Close browser
driver.quit()
