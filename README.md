<div align="center">
  <img src="logo" alt="K-PDF's Logo" width="200" />
  <h1>K-PDF's</h1>
  <p><strong>Every tool you need to work with PDFs in one place</strong></p>
  
  ![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Demo](#demo)
- [Features](#features)
- [Tools Available](#tools-available)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**K-PDF's** is a comprehensive, responsive web application designed to handle all your PDF needs. Whether you need to merge, split, compress, convert, edit, or secure your PDF documents, K-PDF's provides a complete suite of 30+ professional-grade tools - all 100% FREE and easy to use!

### Why K-PDF's?

- ✅ **100% Secure** - Files are processed locally in your browser or deleted immediately after processing
- ⚡ **Lightning Fast** - No installation required, works instantly in your browser
- 🎨 **Premium Quality** - High-fidelity conversion ensures documents look exactly as intended
- 🔧 **Comprehensive** - 30+ tools covering every PDF operation you could need
- 🤖 **AI-Powered** - Smart OCR using Google's Gemini AI for document scanning
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices

---

## 🎬 Demo

Experience K-PDF's live features:

1. **Merge PDFs** - Combine multiple PDF files in your desired order
2. **Smart OCR** - Extract text from scanned documents and images using AI
3. **Compress PDFs** - Reduce file size while maintaining quality
4. **Convert Files** - Transform between PDF and various formats (Word, Excel, JPG, etc.)
5. **Edit & Secure** - Add watermarks, page numbers, passwords, and more

---

## ✨ Features

### Core Capabilities

- **Zero Installation** - Run directly in your web browser
- **Privacy First** - No file storage, processing happens locally or ephemerally
- **Batch Processing** - Handle multiple files simultaneously
- **Drag & Drop** - Intuitive file upload interface
- **Real-time Preview** - See changes before downloading
- **Mobile Friendly** - Fully responsive design for all devices

### AI-Powered Tools

- **OCR Technology** - Convert scanned documents to searchable, editable text
- **Smart Document Analysis** - Powered by Google Gemini AI
- **Image Recognition** - Extract text from photos and screenshots

### Security & Privacy

- **No File Storage** - Documents are not saved on servers
- **Secure Processing** - Files processed and deleted immediately
- **Password Protection** - Add encryption to sensitive documents
- **Redaction Tools** - Permanently remove sensitive information

---

## 🛠️ Tools Available

K-PDF's offers **30+ professional PDF tools** organized into 5 categories:

### 📂 Organize PDF

| Tool | Description |
|------|-------------|
| **Merge PDF** | Combine multiple PDFs in the order you want |
| **Split PDF** | Separate pages into independent PDF files |
| **Organize PDF** | Sort, add, or delete pages from your PDF |
| **Scan to PDF** | Capture document scans from mobile devices |

### ⚙️ Optimize PDF

| Tool | Description |
|------|-------------|
| **Compress PDF** | Reduce file size while optimizing quality |
| **Repair PDF** | Fix damaged PDFs and recover data |
| **OCR PDF** | Convert scanned PDFs into searchable documents |

### 📄 Convert TO PDF

| Tool | Description |
|------|-------------|
| **JPG to PDF** | Convert JPG images to PDF |
| **Word to PDF** | Convert DOC/DOCX files to PDF |
| **PowerPoint to PDF** | Convert PPT/PPTX to PDF |
| **Excel to PDF** | Convert Excel spreadsheets to PDF |
| **HTML to PDF** | Convert webpages to PDF |

### 🔄 Convert FROM PDF

| Tool | Description |
|------|-------------|
| **PDF to JPG** | Convert PDF pages to JPG images |
| **PDF to Word** | Convert PDF to editable DOC/DOCX |
| **PDF to PowerPoint** | Convert PDF to PPT/PPTX slideshows |
| **PDF to Excel** | Extract data to Excel spreadsheets |
| **PDF to PDF/A** | Convert to ISO-standardized archival format |

### ✏️ Edit & Security

| Tool | Description |
|------|-------------|
| **Edit PDF** | Add text, images, shapes, or annotations |
| **Rotate PDF** | Rotate pages in any direction |
| **Page Numbers** | Add custom page numbers |
| **Watermark** | Stamp images or text on PDFs |
| **Crop PDF** | Crop margins or select specific areas |
| **Unlock PDF** | Remove password security |
| **Protect PDF** | Add password encryption |
| **Sign PDF** | Add electronic signatures |
| **Redact PDF** | Permanently remove sensitive information |
| **Compare PDF** | Side-by-side document comparison |

---

## 💻 Tech Stack

K-PDF's is built with modern web technologies:

### Frontend Framework
- **React 19.2.3** - UI library for building interactive interfaces
- **TypeScript 5.8.2** - Type-safe JavaScript
- **Vite 6.2.0** - Next-generation frontend build tool

### PDF Processing
- **pdf-lib 1.17.1** - Create and modify PDF documents
- **downloadjs 1.4.7** - Handle file downloads

### AI & Machine Learning
- **@google/genai 1.33.0** - Google Gemini AI for OCR and document analysis

### UI Components & Icons
- **lucide-react 0.561.0** - Beautiful icon library
- **Custom Components** - Responsive, accessible UI components

### Development Tools
- **@vitejs/plugin-react** - Fast Refresh for React
- **@types/node** - Node.js type definitions

---

## 🚀 Installation

Follow these steps to set up K-PDF's locally:

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn** package manager
- **Google Gemini API Key** (for OCR features)

### Step 1: Clone the Repository

```bash
git clone https://github.com/kupendrav/K-Pdf.git
cd K-Pdf
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** Get your Gemini API key from [Google AI Studio](https://ai.google.dev/)

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📖 Usage

### Basic Workflow

1. **Select a Tool** - Choose from 30+ available PDF tools
2. **Upload Files** - Drag & drop or browse for files
3. **Configure Options** - Adjust settings as needed
4. **Process** - Click to execute the operation
5. **Download** - Get your processed PDF instantly

### Example: Merging PDFs

```typescript
// The app uses the UniversalTool component for most operations
// Here's how merge works internally:

1. User selects "Merge PDF" from the tool grid
2. Uploads multiple PDF files via drag-and-drop
3. Arranges files in desired order
4. Clicks "Merge PDFs"
5. Downloads combined PDF
```

### Example: Using OCR

```typescript
// OCR feature uses Google Gemini AI
// Workflow:

1. User selects "OCR PDF" or "Scan to PDF"
2. Uploads a scanned document or image
3. AI processes and extracts text
4. User receives searchable PDF
```

---

## 📁 Project Structure

```
K-Pdf/
├── components/           # React components
│   ├── Navbar.tsx       # Navigation bar
│   ├── ToolCard.tsx     # Tool display cards
│   ├── OCRDemo.tsx      # OCR functionality
│   ├── UniversalTool.tsx # Generic tool handler
│   ├── MergePDFTool.tsx # Merge PDF tool
│   └── LoginModal.tsx   # User authentication
├── services/            # External services
│   └── geminiService.ts # Google Gemini AI integration
├── utils/              # Utility functions
├── constants.tsx       # Tool definitions and configuration
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── index.html         # HTML template
├── logo               # Brand logo (JPEG)
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite build configuration
└── README.md          # This file
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for OCR features | Yes |

### Getting Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy and paste into `.env.local`

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License**. See the repository for license details.

---

## 👤 Author

**Kupendra V**
- GitHub: [@kupendrav](https://github.com/kupendrav)
- Project Link: [https://github.com/kupendrav/K-Pdf](https://github.com/kupendrav/K-Pdf)

---

## 🌟 Acknowledgments

- **Google Gemini AI** - For providing powerful OCR capabilities
- **pdf-lib** - For PDF manipulation functionality
- **React Community** - For the excellent ecosystem
- **Lucide Icons** - For beautiful, consistent icons

---

## 📞 Support

If you encounter any issues or have questions:

1. Open an issue on the [GitHub repository](https://github.com/kupendrav/K-Pdf)
2. Provide detailed information about your problem
3. Include steps to reproduce any bugs

---

<div align="center">
  <p>Made with ❤️ by Kupendra V</p>
  <p>© 2024 K-PDF's. All rights reserved.</p>
  <p><strong>Your files are safe with us.</strong></p>
</div>
