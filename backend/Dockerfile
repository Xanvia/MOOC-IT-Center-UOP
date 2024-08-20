FROM python:3.12-slim

# Set the working directory in the container.
WORKDIR /app

# Copy the requirements file into the container.
COPY backend/requirements.txt .

# Install any dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container.
COPY backend/ .

# Expose the port the app runs on.
EXPOSE 8000

# Define environment variables.
ENV DJANGO_SETTINGS_MODULE=mooc.settings

# Run the application.
CMD ["gunicorn", "mooc.wsgi:application", "--bind", "0.0.0.0:8000"]
