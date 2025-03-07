from multiprocessing import Process
from trader_joes_scraper import TJ_scraper
from qfc_scraper import QFC_scraper
from dotenv import find_dotenv, load_dotenv
import mysql.connector
import os

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
    categories = ["Fruits", "Vegetables", "Meat"]
    tj_scraper = TJ_scraper()
    tj_scraper.scrape(categories)

def run_qfc_scraper():
    categories = ["Fruits", "Vegetables", "Meat"]
    qfc_scraper = QFC_scraper()
    qfc_scraper.scrape(categories)

if __name__ == '__main__':
    # Clear products table
    clear_products_table()

    # Create processes
    p1 = Process(target=run_tj_scraper)
    p2 = Process(target=run_qfc_scraper)

    # Start processes
    p1.start()
    p2.start()

    # Wait for both processes to finish
    p1.join()
    p2.join()
