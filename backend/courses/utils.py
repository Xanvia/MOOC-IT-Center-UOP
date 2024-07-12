# import os
# import google.oauth2.credentials
# import google_auth_oauthlib.flow
# import googleapiclient.discovery
# from googleapiclient.http import MediaFileUpload
# from django.conf import settings

# SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
# API_SERVICE_NAME = 'youtube'
# API_VERSION = 'v3'

# def get_client_config():
#     return {
#         "web": {
#             "client_id": settings.GOOGLE_CLIENT_ID,
#             "client_secret": settings.GOOGLE_CLIENT_SECRET,
#             "redirect_uris": ["http://localhost:8000/oauth2callback","http://localhost:8000"],
#             "auth_uri": "https://accounts.google.com/o/oauth2/auth",
#             "token_uri": "https://oauth2.googleapis.com/token"
#         }
#     }

# def get_authenticated_service():
#     flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_config(
#         get_client_config(), SCOPES)
#     credentials = flow.run_local_server(port=0)
#     return googleapiclient.discovery.build(API_SERVICE_NAME, API_VERSION, credentials=credentials)

# def upload_video_to_youtube(video_file):
#     youtube = get_authenticated_service()

#     # Define the video metadata
#     body = {
#         'snippet': {
#             'title': 'Test Video',
#             'description': 'This is a test video upload.',
#             'tags': ['test', 'video'],
#             'categoryId': '22'
#         },
#         'status': {
#             'privacyStatus': 'private'
#         }
#     }

#     # Upload the video
#     media = MediaFileUpload(video_file.temporary_file_path(), chunksize=-1, resumable=True)
#     request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
#     response = request.execute()

#     return f"https://www.youtube.com/watch?v={response['id']}"
