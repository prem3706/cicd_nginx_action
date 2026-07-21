# Use official Nginx image 
FROM nginx:latest  
# Copy website files 
COPY . /usr/share/nginx/html/  
# Expose port 80 
EXPOSE 80  
# Start Nginx 
CMD ["nginx", "-g", "daemon off;"]