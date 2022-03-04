# Social Exchange 🚀

## Summary

Xây dựng website rao vặt, mua bán hoặc trao đổi đồ cũ cho sinh viên

## Features

-   Sinh viên có món đồ
    -   Đăng ký tài khoản
    -   Đăng nhập
    -   Cập nhật thông tin cá nhân
    -   Đăng bài
    -   Comment bài đăng của sinh viên khác
    -   Xác nhận giao dịch mua bán hoặc trao đổi với sinh viên có nhu cầu
-   Sinh viên có nhu cầu trao đổi
    -   Đăng ký tài khoản
    -   Đăng nhập
    -   Cập nhật thông tin cá nhân
    -   Đăng ký trao đổi hoặc mua bán với sinh viên khác
    -   Report bài đăng
-   Admin
    -   Quản lý danh mục bài đăng
    -   Quản lý tài khoản
    -   Phản hồi yêu cầu của sinh viên

### Requirements

NodeJS, MongoDB, React, npm

### Installation

#### Install backend dependencies

```bash
git clone https://github.com/thanhtuan472k/Social-Market
npm install
```

#### Create .env file

```env
PORT=
DATABASE_CONNECTION=
JWT_SECRET=
JWT_EXPIRE=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRE=
```

### API Design

| Endpoint                 |          Output          |                           Additional Note |
| :----------------------- | :----------------------: | ----------------------------------------: |
| POST/ api/auth/register  |    Register new user     |                                        No |
| POST/ api/auth/login     |   Login into homepage    |                             Private route |
| GET/ api/profile/:id     |   Get user information   |                             Private route |
| PATCH/ api/profile/:id   | Update user information  |                             Private route |
| PUT/ api/profile/:id     |      Update avatar       | Private route, upload image to cloudinary |
| POST/ api/category       |   Create new category    |                             Admin account |
| GET/ api/category/list   | Get all list of category |                             Admin account |
| PUT/ api/category/:id    |     Update category      |                             Admin account |
| DELETE/ api/category/:id |     Delete category      |                             Admin account |
