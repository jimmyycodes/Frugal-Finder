from multiprocessing import Process
from trader_joes_scraper import TJ_scraper
from qfc_scraper import QFC_scraper

def run_tj_scraper():
    categories = ["bread"]
    tj_scraper = TJ_scraper()
    tj_scraper.scrape(categories)

def run_qfc_scraper():
    categories = ["bread"]
    qfc_scraper = QFC_scraper()
    qfc_scraper.scrape(categories)

if __name__ == '__main__':
    # Create processes
    p1 = Process(target=run_tj_scraper)
    p2 = Process(target=run_qfc_scraper)

    # Start processes
    p1.start()
    p2.start()

    # Wait for both processes to finish
    p1.join()
    p2.join()
