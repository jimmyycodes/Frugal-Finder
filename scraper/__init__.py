import undetected_chromedriver as uc
from trader_joes_scraper import TJ_scraper
from qfc_scraper import QFC_scraper
from dotenv import find_dotenv, load_dotenv
import mysql.connector
import os

def init_driver():
    options = uc.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument("--start-maximized")
    options.add_argument("--disable-popup-blocking")
    options.add_argument("--disable-notifications")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")

    driver = uc.Chrome(options=options, use_subprocess=True)
    return driver

def clear_products_table(): 
    # deletes all the necessary records from the product table before running the scrapers.

    # Load environment variables
    dotenv_path = find_dotenv()

    load_dotenv(dotenv_path)

    # Initialize MySQL connection
    db_connection = mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        ssl_ca="/etc/ssl/certs/DigiCertGlobalRootCA.crt.pem"
    )

    cursor = db_connection.cursor()
    cursor.execute("DELETE FROM products")
    cursor.execute("ALTER TABLE products AUTO_INCREMENT = 1")
    db_connection.commit()
    cursor.close()
    db_connection.close()

def run_tj_scraper():
    driver = init_driver()
    categories = ["Fruits", "Vegetables", "Meat"]
    tj_scraper = TJ_scraper(driver=driver)
    tj_scraper.scrape(categories)
    driver.quit()

def run_qfc_scraper():
    driver = init_driver()
    categories = ["Fruits", "Vegetables", "Meat"]
    qfc_scraper = QFC_scraper(driver=driver)
    qfc_scraper.scrape(categories)
    driver.quit()

if __name__ == '__main__':

    # Clear products table
    clear_products_table()

    run_tj_scraper()

    run_qfc_scraper()