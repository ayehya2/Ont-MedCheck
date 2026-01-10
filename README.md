# 🏥 MedsCheck Forms - Ontario Pharmacy Documentation System

A comprehensive web application for Ontario pharmacists to efficiently complete all 4 government-mandated MedsCheck forms with AI-powered clinical note extraction and instant PDF generation.

## 📋 Overview

MedsCheck Forms streamlines the documentation process for Ontario's MedsCheck program by providing:
- **Single data entry** across all 4 required forms
- **AI-powered extraction** from clinical notes using Google Gemini
- **Real-time PDF preview** with professional formatting
- **Instant download** of completed forms
- **Dark/Light mode** for comfortable use

## ✨ Key Features

### 🤖 AI-Powered Data Extraction
- **OCR Support**: Upload images of patient profiles, prescriptions, or medical records
- Paste clinical notes into the input section
- AI automatically extracts and populates:
  - Patient demographics (name, DOB, health card, contact info)
  - Pharmacy information
  - Healthcare providers (physicians, specialists)
  - Medications with strengths, directions, and indications
  - Allergies and medical conditions
  - Service details and clinical assessments

### ✍️ Digital Signatures
- Draw signatures with mouse/touchpad
- Upload signature images
- Signatures appear in downloaded PDFs

### 📄 Professional PDF Generation
- Live preview with 100ms update (near-instant)
- Download individual forms or all 4 at once
- **Note**: PDFs are currently static (flattened)
  - Text fields cannot be edited after download
  - Checkboxes cannot be clicked in PDF readers
  - This is standard for most form PDFs and suitable for record-keeping
  - See `PDF_EDITABILITY_NOTES.md` for technical details on making PDFs fillable
  
### 📄 Complete Form Coverage
1. **Form 1**: Annual/Follow-up Summary & Action Plan
2. **Form 2**: Initial Medication Review Record
3. **Form 3**: Follow-up Medication Review Record  
4. **Form 4**: Diabetes Medication Review Record

### 🎯 Smart Workflow
- Tab-based interface to switch between forms
- Live PDF preview updates as you type
- Collapsible clinical notes input section
- Download individual form PDFs with one click
- Session persistence (data saved during browser session)

### 🎨 Modern UI/UX
- Built with React + TypeScript + Tailwind CSS
- Responsive design with fixed layout (50/50 split)
- Dark mode support with theme toggle
- Professional landing page with feature highlights
- Radix UI components for accessibility

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ali Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your free API key at: https://makersuite.google.com/app/apikey

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 📦 Tech Stack

### Core
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### UI/Styling
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants

### PDF Generation
- **@react-pdf/renderer** - React-based PDF creation

### Routing
- **React Router DOM** - Client-side routing

### AI Integration
- **Google Gemini API** - Clinical note extraction

## 🏗️ Project Structure

```
Ali Project/
├── src/
│   ├── components/
│   │   ├── forms/           # Form field components
│   │   │   ├── PatientInfoSection.tsx
│   │   │   ├── PharmacyInfoSection.tsx
│   │   │   ├── HealthcareProviderSection.tsx
│   │   │   ├── Form1Fields.tsx
│   │   │   ├── Form2Fields.tsx
│   │   │   ├── Form3Fields.tsx
│   │   │   └── Form4Fields.tsx
│   │   ├── pdf/             # PDF rendering components
│   │   │   ├── Form1PDF.tsx
│   │   │   ├── Form2PDF.tsx
│   │   │   ├── Form3PDF.tsx
│   │   │   ├── Form4PDF.tsx
│   │   │   └── pdfStyles.ts
│   │   ├── layout/          # App layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/              # Reusable UI components
│   │   ├── InputSection.tsx # Clinical notes input
│   │   ├── LeftPanel.tsx    # Forms interface
│   │   ├── RightPanel.tsx   # PDF preview
│   │   └── TabBar.tsx       # Form selector tabs
│   ├── context/
│   │   └── FormDataContext.tsx  # Global state management
│   ├── services/
│   │   └── aiService.ts     # AI extraction logic
│   ├── types/
│   │   └── forms.ts         # TypeScript interfaces
│   ├── pages/
│   │   └── LandingPage.tsx  # Landing page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── .env                     # Environment variables (not in git)
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 💡 How to Use

### Step 1: Landing Page
- Read about the features
- Click "Start Creating Forms" to enter the app

### Step 2: Enter Clinical Notes
1. Paste your clinical notes in the input section at the bottom left
2. Click "Extract with AI" button
3. AI will automatically populate all form fields

### Step 3: Review & Edit
1. Use the tabs (Form 1, 2, 3, 4) to switch between forms
2. Review auto-populated data
3. Manually edit any field as needed
4. Watch the PDF preview update in real-time on the right

### Step 4: Download
- Click the download button in the top-right corner of each form
- PDF will download with the patient's name in the filename

## 🔒 Privacy & Security

- **No data storage**: All data is stored only in browser sessionStorage
- **Local processing**: PDFs generated client-side in the browser
- **No server uploads**: No patient data sent to servers (except AI API)
- **Session-based**: Data cleared when browser tab is closed

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Key Development Files

- **FormDataContext.tsx**: Central state management for all form data
- **aiService.ts**: AI extraction prompt engineering and API calls
- **forms.ts**: Complete TypeScript type definitions (957 lines!)
- **Form[1-4]PDF.tsx**: PDF rendering logic using @react-pdf/renderer

## 🐛 Known Limitations

- AI extraction accuracy depends on clinical note format/clarity
- Requires internet connection for AI features
- No data persistence beyond browser session (by design for privacy)
- Desktop-optimized layout (mobile support coming soon)

## 📝 Future Enhancements

- [ ] User authentication & cloud storage
- [ ] Export all 4 PDFs as single download
- [ ] Email PDFs directly to prescribers
- [ ] Template library for common medication reviews
- [ ] Mobile-responsive layout
- [ ] Print optimization
- [ ] Offline mode with service workers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for use by licensed Ontario pharmacists in accordance with Ontario College of Pharmacists regulations.

## 👨‍💻 Author

Built with ❤️ for Ontario pharmacists

## 🙏 Acknowledgments

- Ontario Ministry of Health for MedsCheck program
- Google Gemini for AI capabilities
- React PDF Renderer community
- Radix UI & shadcn/ui for components

---

**Need Help?** Open an issue or contact the maintainer.
