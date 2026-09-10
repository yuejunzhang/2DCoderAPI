# QR Code API

一个简单的二维码生成服务，支持本地开发和 Vercel 部署。

## 功能

- 生成 PNG 二维码
- 支持自定义二维码内容
- 支持可选颜色参数：前景色 / 背景色
- 本地测试服务器可直接运行

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 启动本地服务器

```bash
node local-server.js
```

3. 访问二维码接口

```text
http://localhost:3000/api/qr?text=Hello
```

## API

### 生成二维码

```text
GET api/qr?text=你的内容
```

### 可选参数

```text
GET api/qr?text=Hello&dark=FF0000&light=00FF00
```

- `text`: 二维码内容（必填）
- `dark`: 二维码前景色，支持 `#RRGGBB`、`RRGGBB`、`RGB`
- `light`: 二维码背景色，支持 `#RRGGBB`、`RRGGBB`、`RGB`

### 默认颜色

如果不传 `dark` 和 `light`，默认使用：

- `dark=#000000`
- `light=#ffffff`

## Vercel 部署

项目已包含 `vercel.json`，可以直接部署到 Vercel。

## 说明

该服务会返回一张 PNG 图片，适合直接在页面中引用为图片地址。

例如：

```html
<img src="http://localhost:3000/qpi/qr?text=Hello" alt="QR Code" />
```
