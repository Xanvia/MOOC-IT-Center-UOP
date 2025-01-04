# MOOC-IT-Center-UOP

## **Step 1: Prepare Your New Server**

1. **Update and Upgrade the Server**:
    
    bash
    
    Copy code
    
    `sudo apt update && sudo apt upgrade -y`
    
2. **Install Required Packages**:
    - Install Nginx:
        
        bash
        
        Copy code
        
        `sudo apt install nginx -y`
        
    - Install FFmpeg:
        
        bash
        
        Copy code
        
        `sudo apt install ffmpeg -y`
        
    - Install PHP (if needed):
        
        bash
        
        Copy code
        
        `sudo apt install php-fpm php-cli php-curl -y`
        

---

## **Step 2: Set Up the File Structure**

1. **Create Directories**:
    
    bash
    
    Copy code
    
    `sudo mkdir -p /var/www/videos/uploads sudo mkdir -p /var/www/videos/hls`
    
2. **Set Permissions**:
    
    bash
    
    Copy code
    
    `sudo chown -R www-data:www-data /var/www/videos sudo chmod -R 775 /var/www/videos`
    

---

## **Step 3: Configure Nginx for HLS**

1. **Edit Nginx Configuration**: Open the Nginx configuration file for editing:
    
    bash
    
    Copy code
    
    `sudo nano /etc/nginx/sites-available/videos`
    
2. **Add the Following Configuration**:
    
    nginx
    
    Copy code
    
    `server {     listen 80;     server_name your_server_ip_or_domain;      # PHP Uploads     location /upload.php {         root /var/www/html;         include fastcgi_params;         fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Adjust PHP version as needed         fastcgi_index index.php;         fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;     }      # Serve HLS Streams     location /hls/ {         root /var/www/videos/;         types {             application/vnd.apple.mpegurl m3u8;             video/mp2t ts;         }         add_header Cache-Control no-cache;         add_header Access-Control-Allow-Origin *;         alias /var/www/videos/hls/;     } }`
    
3. **Enable the Site and Restart Nginx**:
    
    bash
    
    Copy code
    
    `sudo ln -s /etc/nginx/sites-available/videos /etc/nginx/sites-enabled/ sudo nginx -t sudo systemctl restart nginx`
    

---

## **Step 4: Upload Script (PHP)**

1. **Create `upload.php`**: Save this script in `/var/www/html/upload.php`:
    
    php
    
    Copy code
    
    `<?php if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['video'])) {     $target_dir = "/var/www/videos/uploads/";     $target_file = $target_dir . basename($_FILES["video"]["name"]);      if (move_uploaded_file($_FILES["video"]["tmp_name"], $target_file)) {         // Convert the video to HLS format         $output_dir = "/var/www/videos/hls/" . pathinfo($target_file, PATHINFO_FILENAME);         mkdir($output_dir, 0775, true);          $cmd = "ffmpeg -i " . escapeshellarg($target_file) .                 " -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls " .                 escapeshellarg($output_dir . "/output.m3u8");         exec($cmd);          echo "Video uploaded and converted successfully!";     } else {         echo "Sorry, there was an error uploading your file.";     } } ?>`
    
2. **Set Correct Permissions**:
    
    bash
    
    Copy code
    
    `sudo chown www-data:www-data /var/www/html/upload.php sudo chmod 644 /var/www/html/upload.php`
    

---

## **Step 5: Test Video Upload and Conversion**

1. **Upload a Video**: Use a form like this to test:
    
    html
    
    Copy code
    
    `<form action="http://your_server_ip/upload.php" method="POST" enctype="multipart/form-data">     <input type="file" name="video">     <button type="submit">Upload</button> </form>`
    
2. **Check Upload and HLS Conversion**:
    - Verify the uploaded file in `/var/www/videos/uploads/`.
    - Verify the HLS files (e.g., `output.m3u8`, `output0.ts`, etc.) in `/var/www/videos/hls/{video_name}/`.

---

## **Step 6: Play the HLS Stream**

1. **Basic HTML Player**: Save this as `index.html` or any test file:
    
    html
    
    Copy code
    
    `<!DOCTYPE html> <html> <body>     <video controls width="640" height="360">         <source src="http://your_server_ip/hls/{video_name}/output.m3u8" type="application/x-mpegURL">         Your browser does not support HLS.     </video> </body> </html>`
    
2. **Test in a Browser**:
    - Open the test HTML file in your browser.
    - Replace `{video_name}` with the actual folder name.

---

## **Step 7: Debugging Common Issues**

1. **Check Permissions**: Ensure all necessary directories (`uploads` and `hls`) have `www-data` ownership and `775` permissions:
    
    bash
    
    Copy code
    
    `sudo chown -R www-data:www-data /var/www/videos sudo chmod -R 775 /var/www/videos`
    
2. **Check FFmpeg Logs**: If conversion fails, run the FFmpeg command manually to identify errors.
3. **Nginx Errors**: Check the Nginx error log for issues:
    
    bash
    
    Copy code
    
    `sudo tail -f /var/log/nginx/error.log`