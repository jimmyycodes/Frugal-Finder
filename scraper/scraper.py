from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import undetected_chromedriver as uc
import time

class WaitForProductsToLoad:
    def __init__(self, locator, timeout=30, poll_frequency=1):
        self.locator = locator
        self.timeout = timeout
        self.poll_frequency = poll_frequency

    def __call__(self, driver):
        previous_count = 0
        stable_count = 0
        while stable_count < 3:  # Wait for the count to be stable for 3 consecutive checks
            elements = driver.find_elements(*self.locator)
            current_count = len(elements)
            if current_count > previous_count:
                previous_count = current_count
                stable_count = 0
            else:
                stable_count += 1
            time.sleep(self.poll_frequency)
        return elements

def scroll_to_bottom(driver):
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # Wait for new products to load
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

def scrape_dynamic_safeway(url):
    chrome_options = Options()
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    chrome_options.add_argument(f'user-agent={user_agent}')
    # chrome_options.add_argument("--headless")

    driver = uc.Chrome(options=chrome_options)

    try:
        driver.get(url)
        print("Page loaded, waiting for products to load...")

        scroll_to_bottom(driver)

        product_locator = (By.CLASS_NAME, "product-card-container")
        product_cards = WebDriverWait(driver, 30).until(WaitForProductsToLoad(product_locator))
        print(f"Found {len(product_cards)} products.")

        products = []

        for product in product_cards:
            try:
                name = product.find_element(By.CLASS_NAME, "product-title__name").text.strip()
                price = product.find_element(By.CLASS_NAME, "product-price__saleprice").text.strip()

                products.append({
                    "name": name,
                    "price": price
                })
            except Exception as e:
                print(f"Error processing product: {e}")

        return products
    except Exception as e:
        print(f"An error occurred: {e}")
        return []
    finally:
        driver.quit()

def main():
    url = "https://www.safeway.com/shop/search-results.html?q=bread"
    products = scrape_dynamic_safeway(url)
    if products:
        df = pd.DataFrame(products)
        print(df)
        df.to_csv("dynamic_safeway_products.csv", index=False)
    else:
        print("No products found.")

if __name__ == "__main__":
    main()