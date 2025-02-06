from curl_cffi import requests as cureq
import pandas as pd
from config import sites

def get_network_data():
    for site in sites:
        url = site['url']
        headers = site['headers']
        cookies = site['cookies']

        response = cureq.get(url, headers=headers, cookies=cookies, impersonate='chrome', timeout=100)
        if response.status_code == 200:
            df = pd.DataFrame(response.json())
            df.to_json(site['name'] + '_network_data.json', orient='records', lines=True)
        else:
            return None

get_network_data()