from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import undetected_chromedriver as uc

class WaitForProductsToLoad:
    def __init__(self, locator, timeout=10):
        self.locator = locator
        self.timeout = timeout

    def __call__(self, driver):
        elements = driver.find_elements(*self.locator)
        if len(elements) > 0:
            WebDriverWait(driver, self.timeout).until(
                lambda d: len(d.find_elements(*self.locator)) == len(elements)
            )
            return elements
        return False


def scrape_dynamic_safeway(url):

    '''
    Adding user agent to the 'chromedriver' to avoid getting blocked by the website.
    Headless mode is enabled to avoid opening a browser window.
    '''
    chrome_options = Options()
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    chrome_options.add_argument(f'user-agent={user_agent}')
    chrome_options.add_argument("--headless")
    driver = uc.Chrome(options=chrome_options)

    '''
    Load the page, wait for the products to load, then scrape for the name and price.
    First, it creates a product_card list of all the product containers, then it iterates
    through each card for name and price. Selectors are as follows:
    .product-card-container: product container, contains image, price, name, etc
    .product-title__name: product name
    .product-price__saleprice: product price

    Returns a list of dictionaries containing the name and price of each product.
    '''
    try:
        driver.get(url)
        print("Page loaded, waiting for products to load...")

        product_locator = (By.CLASS_NAME, "product-card-container")
        product_cards = WebDriverWait(driver, 20).until(WaitForProductsToLoad(product_locator))
        # WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "product-card-container")))
        print("Products loaded.")

        # product_cards = driver.find_elements(By.CLASS_NAME, "product-card-container")
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
                print(e)

        return products
    except Exception as e:
        print(e)
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