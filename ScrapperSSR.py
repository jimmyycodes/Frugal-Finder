from playwright.sync_api import sync_playwright
import time

def get_safeway_products(query: str):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Set to True for production
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        # Navigate to search page
        page.goto(f"https://www.safeway.com/shop/search-results.html?q={query}", timeout=60000)
        time.sleep(2)

        def log_response(response):
            print(f"Response URL: {response.url}, Status: {response.status}")
        # # Wait for content to load
        # page.wait_for_selector(".main-wrapper www-wrapper nextgen-main-wrapper", timeout=30000)

        # Extract API response from network requests
        api_response = None
        def handle_response(response):
            nonlocal api_response
            if "/xapi/pgmsearch/v1/search/products" in response.url:
                api_response = response.json()

        page.on("response", log_response)

        # Trigger scroll to load more products (if needed)
        page.mouse.wheel(0, 2000)
        time.sleep(2)

        browser.close()
        return api_response

def scrape_data(query: str):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Set to True for production
        page = browser.new_page()

        # Listen to all network requests
        def log_request(request):
            print("Request URL:", request.url)
            print("Request Method:", request.method)
            print("Resource Type:", request.resource_type)
            print("---")

        # Attach the listener to the page
        page.on("request", log_request)

        # Navigate to the site
        page.goto(f"https://www.fredmeyer.com/search?query={query}", timeout=100000)

        # Scroll to trigger the API request
        page.mouse.wheel(0, 2000)  # Scroll down
        time.sleep(5)  # Wait for the request to complete

        # Close the browser
        browser.close()


# Example usage
scrape_data("meat")



# # Example usage
# response = get_safeway_products("bread")
# print(response)