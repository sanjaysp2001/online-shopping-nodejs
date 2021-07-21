# online-shopping-nodejs
This is the backend for a simple ecommerce application. This provides some basic functionalities like user authentication, adding products,buying products etc.

# Usage
1.Download or clone this repository

2.Run ```npm install ```

3.Create an .env file with your mongodb url and your own secretkey as follows:
```
MONGO_URL:<your mongodb url>
SECRETKEY:<your secret key>
```

4.Run ``` npm start ```

5.Hit the endpoints using commandline or tools like postman.

(If you use the postman collection given below you dont need to configure auth settings.When you hit the login endpoint with valid credentials a collection variable will be created with the generated token and all the requests use this token.

If not, then after login, you need to copy the token and paste it on every request you give manually.)

# Making a User as Owner

After registering a user if you want to grant owner rights, you must manually update a field in User Schema called "isOwner".

isOwner is set to false by default

# Endpoints

You can import this collection in Postman to get started quickly.

https://www.getpostman.com/collections/3813dff5108b26a75366

These are the endpoints implemented:

User Registration:
```
method: POST
url: http://<domain-name>/users/signup

body:
{
    "firstname":"user_firstname",
    "lastname":"user_lastname",
    "email":"useremail@gmail.com",
    "password":"user password"
}
```
User Login
```
method: POST
url: http://<domain_name>/users/login

body:
{
    "email":"useremail@gmail.com",
    "password":"password"
}

```
Add Product(Only with Owner Rights)
```
method: POST
url: http://<domain-name>/products/add

body:
{
    "product_name":"name",
    "product_description":"description",
    "price":"Integer value greater than 0",
    "quantity":"Integer value greater than 0"
}

```
Update Product(Only with Owner Rights)
```
method: POST
url: http://<domain-name>/products/update/:prod_id

body updated:
{
    "product_name":"name",
    "product_description":"description",
    "price":1000,
    "quantity":10
}
```
List all Products
```
method: GET
url: http://<domain-name>/products/all
```
Place Order
```
method: POST
url: http://<domain-name>/order/new

body:
{
    "order_detail":
    [
        {
            "product_id":"id",
            "quantity": 1
        },
        {
            "product_id":"id",
            "quantity": 1
        },
        ...
    ]
}
```
Get all order details(Only with Owner rights)
```
method: GET
url: http://<domain-name>/order/all
```
Get your Order details
```
method: GET
url: http://<domain-name>/order/myorders
```

