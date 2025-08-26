import requests
from urllib.parse import urlencode
import ssl
import certifi

import requests
from urllib.parse import urlencode

class PaymentParser:
    def __init__(self, config):
        self.gateway_url = config['gatewayUrl']
        self.version = config['version']
        self.merchant_id = config['merchantId']
        self.api_username = config['apiUsername']
        self.password = config['password']

    def form_request_url(self):
        """Format request URL for NVP"""
        return f"{self.gateway_url}/version/{self.version}"

    def parse_request(self, data):
        if not isinstance(data, dict):
            data = dict(data)

        data.update({
            'merchant': self.merchant_id,
            'apiUsername': self.api_username,
            'apiPassword': self.password,
            # do NOT add version here for NVP
        })

        return data  # let requests urlencode


    def send_transaction(self, data):
        """Send transaction request"""
        request_url = self.form_request_url()
        request_body = self.parse_request(data)

        try:
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }

            response = requests.post(
                url=request_url,
                data=request_body,   # dict → requests will urlencode
                headers=headers,
                verify=False,  # keep for testing, but fix for prod
                timeout=35.0,
            )

            return response.text
        except Exception as error:
            return str(error)
