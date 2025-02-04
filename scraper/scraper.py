from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import undetected_chromedriver as uc

def scrape_dynamic_safeway(url):
    chrome_options = Options()
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    chrome_options.add_argument(f"user-agent={user_agent}")
    driver = uc.Chrome(
        options=chrome_options,
        use_subprocess=False,
    )

    driver.get(url)
    print("Waiting for dynamic content to load...")

    try:
        # Wait for the dynamic content to load
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pc-grid-prdItem"))
        )
        print("Dynamic content loaded successfully.")
    except Exception as e:
        print("Dynamic content did not load in time:", e)
        driver.quit()
        return []

    product_elements = driver.find_elements(By.CLASS_NAME, "pc-grid-prdItem")
    products = []

    for product in product_elements:
        try:
            name = product.find_element(By.CLASS_NAME, "title-xxs").text.strip()
            price = product.find_element(By.CLASS_NAME, "product-comp-v1__price__text").text.strip()
            # image_url = product.find_element(By.TAG_NAME, "img").get_attribute("src")
            products.append({
                "name": name,
                "price": price,
                # "image_url": image_url,
            })
        except Exception as e:
            print(f"Error processing product: {e}")

    # driver.quit()
    return products

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