FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install ffmpeg and any necessary system dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean

# Copy the requirements file and install Python dependencies
COPY ./backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Django project into the container
COPY ./backend /app

# Command to run Gunicorn server with the correct Django app
CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "mooc.wsgi:application"]
