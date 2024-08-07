from django.conf import settings
from django.shortcuts import redirect
import requests


def google_authenticate(code, redirect_uri):

    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
    }

    token_response = requests.post(token_url, data=token_data)
    token_response_data = token_response.json()
    access_token = token_response_data.get("access_token")
   
    return get_user_info(access_token)

def get_user_info(access_token):
    # Use access token to get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    userinfo_response = requests.get(userinfo_url, headers={"Authorization": f"Bearer {access_token}"})
    userinfo = userinfo_response.json()
    

    # Organize user info
    user_info = {
        "firstname": userinfo.get("given_name"),
        "lastname": userinfo.get("family_name"),
        "email": userinfo.get("email"),
        "username": userinfo.get("email"),
        "profile_picture": userinfo.get("picture"),
    }
    return user_info