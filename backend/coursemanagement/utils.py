import requests
from urllib.parse import urlencode
import ssl
import certifi

class PaymentParser:
    def __init__(self, config):
        self.gateway_url = config['gatewayUrl']
        self.version = config['version']
        self.merchant_id = config['merchantId']
        self.api_username = config['apiUsername']
        self.password = config['password']

    def form_request_url(self):
        """Format request URL"""
        return f"{self.gateway_url}/version/{self.version}"

    def parse_request(self, data):
        """Format request data into Name-Value Pair (NVP) format"""
        # Convert data to dictionary if it's not already
        if not isinstance(data, dict):
            data = dict(data)
        
        # Add authentication details
        data.update({
            'merchant': self.merchant_id,
            'apiUsername': self.api_username,
            'apiPassword': self.password
        })
        
        # Convert to URL-encoded string
        return urlencode(data)

    def send_transaction(self, data):
        """Send transaction request"""
        request_url = self.form_request_url()
        request_body = self.parse_request(data)

        try:
            # Configure SSL context
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE

            # Configure request headers
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Length': str(len(request_body))
            }

            # Make the request
            response = requests.post(
                url=request_url,
                data=request_body,
                headers=headers,
                verify=False,  # Equivalent to rejectUnauthorized: false
                timeout=35.0,
                proxies=None  # Disable proxies
            )

            # Return the response data
            return response.text

        except Exception as error:
            return str(error)