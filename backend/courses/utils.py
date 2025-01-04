import os
import subprocess
from django.conf import settings
from django.core.exceptions import ValidationError
from .models import VideoFile
from mooc.settings import MEDIA_ROOT, MEDIA_URL

def segment_video(video_file):
    """
    Convert uploaded video to HLS format using original filename
    Returns the playlist URL path
    """
    # Get original filename without extension
    filename = os.path.splitext(os.path.basename(video_file.file.name))[0]
    
    # Create folder based on filename
    segments_folder = os.path.join(MEDIA_ROOT, f"videos/hls/{filename}")
    os.makedirs(segments_folder, exist_ok=True)

    playlist_path = os.path.join(segments_folder, "playlist.m3u8")

    command = [
        "ffmpeg",
        "-i", video_file.file.path,
        "-codec", "copy",  # Use copy codec for faster processing
        "-start_number", "0",
        "-hls_time", "10",
        "-hls_list_size", "0",
        "-f", "hls",
        "-hls_segment_filename", os.path.join(segments_folder, "segment_%03d.ts"),
        playlist_path
    ]

    try:
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            raise ValidationError(f"Error processing video: {stderr.decode()}")

        # Return the relative URL path for the playlist
        return f'/media/videos/hls/{filename}/playlist.m3u8'

    except subprocess.CalledProcessError as e:
        raise ValidationError(f"Error processing video: {str(e)}")
    except Exception as e:
        raise ValidationError(f"Unexpected error: {str(e)}")