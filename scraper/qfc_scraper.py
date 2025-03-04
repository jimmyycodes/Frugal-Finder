from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException

import undetected_chromedriver as uc

from selenium.webdriver.common.action_chains import ActionChains

import time
import random

class QFCScraper:

  PRODUCT_CARD = "ProductCard"
  LOAD_MORE_BUTTON = "LoadMore__load-more-button"
  PRODUCT_DESC_TRUNC = "ProductDetails-header"
  PROMO_PRICE = "kds-Price-promotional"
  REGULAR_PRICE = "kds-Price-original"
  NO_THANKS_BUTTON = "QSIWebResponsiveDialog-Layout1-SI_9yJLD8psVL8MwL4_button QSIWebResponsiveDialog-Layout1-SI_9yJLD8psVL8MwL4_button-2 QSIWebResponsiveDialog-Layout1-SI_9yJLD8psVL8MwL4_button-medium QSIWebResponsiveDialog-Layout1-SI_9yJLD8psVL8MwL4_button-border-radius-moderately-rounded"
  PRODUCT_UPC = "ProductDetails-upc"
  PRODUCT_WEIGHT = "ProductDetails-sellBy"

  PRODUCT_EXTRA_DESC = "body-l line-length"

  def __init__(self):

    # Configure Chrome
    self.options = uc.ChromeOptions()
    self.options.add_argument("--start-maximized")
    self.options.add_argument("--disable-popup-blocking")
    self.options.add_argument("--disable-notifications")
    # self.options.add_argument("--incognito")  # Fresh session
    self.options.add_argument("--disable-blink-features=AutomationControlled")
    self.options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")

    # Initialize WebDriver
    self.driver = uc.Chrome(options=self.options)

    self.wait = WebDriverWait(self.driver, 20)

    self.url = "https://www.qfc.com/"

  def close_popup(self):
      try:
          # Wait for the popup button
          no_thanks_buttons = WebDriverWait(self.driver, 3).until(
              EC.presence_of_all_elements_located((By.XPATH, "//button[contains(text(), 'No, thanks')]"))
          )

          if no_thanks_buttons:
              self.driver.execute_script("arguments[0].click();", no_thanks_buttons[0])
              print("✅ Popup closed")
              time.sleep(1)
          else:
              print("⚠️ No popup button found")

      except NoSuchElementException:
          print("❌ No popup found, continuing...")
      except TimeoutException:
          print("⏳ Popup not found within timeout")
      except Exception as e:
          print("🚨 Error closing popup:", e)


  def scrape_products(self):
    try:
        self.close_popup()

        wait = WebDriverWait(self.driver, 10)
        product_cards = wait.until(
            EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD))
        )
        print(f"Found {len(product_cards)} products")

        for index in range(len(product_cards)):
            try:
                # Re-locate the product cards after navigating back
                product_cards = wait.until(
                    EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD))
                )
                product = product_cards[index]

                # Click on the product link to get more details
                link = product.find_element(By.TAG_NAME, "a")
                href = link.get_attribute("href")
                print(f"Product {index + 1} URL: {href}")

                link.click()

                # Wait for the product details to load
                wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.PRODUCT_DESC_TRUNC)))

                # Extract product details
                name = self.extract_text(wait, self.PRODUCT_DESC_TRUNC)
                price = self.extract_price(wait)
                upc = self.extract_text(wait, self.PRODUCT_UPC)
                weight = self.extract_text(wait, self.PRODUCT_WEIGHT)
                description = self.extract_description(wait)

                print(f"Product: {name}\nPrice: {price}\nUPC: {upc}\nWeight: {weight}\nDescription: {description}\n")
                
                self.close_popup()

                # Go back to the previous page
                self.driver.back()
                wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, self.PRODUCT_CARD)))

            except Exception as e:
                print("Error extracting product details:", e)

    except NoSuchElementException:
        print("No products found.")
    except TimeoutException:
        print("Timeout waiting for products.")
    except Exception as e:
        print("Error scraping products:", e)

  def extract_text(self, wait, class_name):
    try:
        return wait.until(EC.presence_of_element_located((By.CLASS_NAME, class_name))).text
    except Exception as e:
        print(f"Error extracting text for {class_name}:", e)
        return "N/A"

  def extract_price(self, wait):
    try:
        try:
            price = wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.PROMO_PRICE))).text
        except NoSuchElementException:
            price = wait.until(EC.presence_of_element_located((By.CLASS_NAME, self.REGULAR_PRICE))).text
        return price.replace("\n", "").replace(" ", "").replace("lb", "/lb")
    except Exception as e:
        print("Error extracting price:", e)
        return "N/A"

  def extract_description(self, wait):
    try:
        drop_down = wait.until(EC.element_to_be_clickable((By.ID, "product-details-button")))
        drop_down.click()
        time.sleep(2)
        description_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="product-details-romance-description"] p')))
        description_text = description_element.text

        return description_text
    except NoSuchElementException:
        return "N/A"
    except Exception as e:
        return "N/A"

  def scrape(self, queries):
    for query in queries:
      print(f"\n🔍 Searching for '{query}' at QFC...\n")

      self.driver.get(self.url)

      # Clear cookies/storage
      self.driver.delete_all_cookies()
      self.driver.execute_script("window.localStorage.clear();")

      # Human-like interaction with search bar
      search_bar = self.wait.until(EC.element_to_be_clickable((By.ID, "SearchBar-input")))
      ActionChains(self.driver).move_to_element(search_bar).pause(1).click().perform()

      # Simulate typing
      search_term = query
      for char in search_term:
          search_bar.send_keys(char)
          time.sleep(random.uniform(0.1, 0.3))
      search_bar.send_keys(Keys.RETURN)

      # wait for the results to load
      time.sleep(2)

      self.close_popup()
      while True:
        try:

          try:
            next_button = self.wait.until(
              EC.element_to_be_clickable((By.CLASS_NAME, self.LOAD_MORE_BUTTON))
            )
          except:
            # if pagination button is not found then break
            print("No more pages.")
            break

          # Scroll the button into view
          self.driver.execute_script("arguments[0].scrollIntoView(true);", next_button)
          time.sleep(1)

          # Second try: Remove any overlapping elements that might intercept the click
          self.driver.execute_script("""
              // Remove fixed header
              var header = document.querySelector('.query.searchInputWrapper');
              if (header) header.style.display = 'none';

              // Remove any other fixed elements that might interfere
              var fixedElements = document.querySelectorAll('[style*="position: fixed"]');
              fixedElements.forEach(function(el) {
                  el.style.display = 'none';
              });
          """)

          try:
            self.close_popup()
            print("Successfully clicked the button")
            next_button.click()
          except:
            try:
              self.driver.execute_script("arguments[0].click();", next_button)
            except:
              ActionChains(self.driver).move_to_element(next_button).click().perform()

          time.sleep(2)

                  # Restore any elements we hid
          self.driver.execute_script("""
              var header = document.querySelector('.query.searchInputWrapper');
              if (header) header.style.display = '';

              var fixedElements = document.querySelectorAll('[style*="position: fixed"]');
              fixedElements.forEach(function(el) {
                  el.style.display = '';
              });
          """)
        except Exception as e:
          print("Pagination button not found or error:", e)
          break

      self.scrape_products()

    # Close browser
    self.driver.quit()


current_cart = ["bread"]

qfc_scraper = QFCScraper()

qfc_scraper.scrape(current_cart)
