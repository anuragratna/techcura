# Techcura Website

This repository contains the source code for the official website of Techcura, an IT services company. The website is a modern, responsive, and localized static site built to showcase the company's services and provide a point of contact for inquiries.

## ✨ Features

- **Responsive Design:** Fully functional on both desktop and mobile devices.
- **Localization:** Supports both English (EN) and Dutch (NL) languages, with content dynamically loaded from JSON files.
- **Contact Form:** Integrated with [Formspree](https://formspree.io/) for easy and reliable form submissions.
- **Secure:** Implements a Content Security Policy (CSP) and other security headers to protect against common web vulnerabilities.
- **Self-Contained:** No external CSS or JavaScript frameworks. The entire design is implemented with a single, internal stylesheet for maximum performance and portability.

## 🚀 Technologies Used

- **HTML5**
- **CSS3 (Internal Stylesheet)** for all styling.
- **Vanilla JavaScript** for interactive features like localization and the mobile menu.
- **Formspree** for backend form handling.
- **Git & GitHub** for version control.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You'll need a modern web browser and a way to serve the files locally. Using Python's built-in HTTP server is a straightforward option.

### Installation & Running Locally

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/anuragratna/techcura.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd techcura
    ```
3.  **Start a local web server.** If you have Python installed, you can use:
    ```sh
    python3 -m http.server 8000
    ```
4.  **View the website:**
    Open your web browser and go to `http://localhost:8000`.