from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
# Initialize WebDriver
driver = webdriver.Chrome()

# Open Trader Joe's search results page
url = "https://www.traderjoes.com/home/search?q=meat&section=products&global=yes"
driver.get(url)

# Wait for elements to load (longer timeout for React-rendered content)
wait = WebDriverWait(driver, 20)  # Increased to 15 seconds for reliability

# Close the cookie banner if it exists
def close_cookie_banner():
    """Check and close the cookie banner if it exists."""
    try:
        cookie_banner = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "CookiesAlert_cookiesAlert__3qSl1")))
        close_button = cookie_banner.find_element(By.TAG_NAME, "button")  # Assuming it's a button
        close_button.click()
        print("Closed cookie banner.")
        time.sleep(2)  # Allow time for the banner to disappear
    except Exception:
        print("No cookie banner found, continuing...")

# Close the newsletter pop-up if it appears
def close_newsletter_popup(driver):
    """Check if the newsletter pop-up exists and close it."""
    try:
        # Wait for a short time (2 seconds) to see if the pop-up appears
        popup_close_button = WebDriverWait(driver, 2).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "needsclick.klaviyo-close-form"))
        )

        popup_close_button.click()  # Click the close button
        print("✅ Closed newsletter pop-up.")

        # Wait briefly to ensure it's fully closed before continuing
        WebDriverWait(driver, 1).until(EC.invisibility_of_element(popup_close_button))

    except Exception:
        print("✅ No newsletter pop-up detected, continuing...")

def scrape_page():
    try:
        close_newsletter_popup(driver)
        # Wait until at least one product appears
        items = wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, "SearchResultCard_searchResultCard__3V-_h")))
        print("\n" + "=" * 80) 
        print(f"📌 Found {len(items)} items on this page.")
        print("=" * 80)

        for index, item in enumerate(items, start = 1):
            try:
                # Extract the product name
                name = item.find_element(By.CSS_SELECTOR, "a.SearchResultCard_searchResultCard__titleLink__2nz6x").text

                try:
                    price = item.find_element(By.CLASS_NAME, "ProductPrice_productPrice__price__3-50j").text
                except Exception:
                    price = "N/A"

                print(f"\n🔹 Product {index}")
                print(f"\t📌 Name:  {name}")
                print(f"\t💰 Price: {price}")
                print("-" * 40)

            except Exception as e:
                print("Error extracting product details:", e)
        close_newsletter_popup(driver)

    except Exception as e:
        print("Timeout: No search results found.", e)

close_cookie_banner()
count = 1

while True:
    scrape_page()
    try:
        close_newsletter_popup(driver)
        next_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".Pagination_pagination__arrow_side_right__9YUGr")))

        if "disabled" in next_button.get_attribute("class"):
            print("No more pages.")
            break
        close_newsletter_popup(driver)
        next_button.click()
        count += 1
        print("Navigating to next page ", count)

        time.sleep(3)
    except Exception as e:
        print("Pagination button not found or error:", e)
        break

# Close browser
driver.quit()