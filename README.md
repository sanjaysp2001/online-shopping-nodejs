# online-shopping-nodejs
This is the backend for a simple ecommerce application. This provides some basic functionalities like user authentication, adding products,buying products etc.

# Usage
1.Download or clone this repository

2.Run ```npm install ```

3.Create an .env file with your mongodb url and your own secretkey.

4.Run ``` npm start ```

5.Hit the endpoints using commandline or tools like postman.

(If you use the postman collection given below you dont need to configure auth settings.When you hit the login endpoint with valid credentials a collection variable will be created with the generated token and all the requests use this token.

If not, then after login, you need to copy the token and paste it on every request you give manually.)

# Notes

After registering a user if you want to grant owner rights, you must manually update a field in User Schema called "isOwner".

isOwner is set to false by default

# Endpoints

You can import this collection in Postman to get started quickly.

https://www.getpostman.com/collections/3813dff5108b26a75366

These are the endpoints implemented:

User Registration
```
http://<domain-name>/users/signup
```
User Login
```
http://<domain_name>/users/login
```
Add Product(Only with Owner Rights)
```
http://<domain-name>/products/add
```
Update Product(Only with Owner Rights)
```
http://<domain-name>/products/update/:prod_id
```
List all Products
```
http://<domain-name>/products/all
```
Place Order
```
http://<domain-name>/order/new
```
Get all order details(Only with Owner rights)
```
http://<domain-name>/order/all
```
Get your Order details
```
http://<domain-name>/order/myorders
```

