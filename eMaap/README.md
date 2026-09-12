# eMaap - Online Legal Metrology Verification System

## 📋 Overview

**eMaap** (Electronic Management and Authentication Platform) is a unified online verification and digital certification system for weighing and measuring instruments under the Legal Metrology Act, 2009. It streamlines the entire lifecycle of instrument verification from registration through renewal, providing transparency and efficiency to all stakeholders.

### Key Features

- ✅ **Online Registration** - Register instruments and create stakeholder accounts
- 🎫 **Digital Certificates** - QR-enabled verification certificates with digital signatures
- 📅 **Smart Scheduling** - Convenient appointment booking for field inspections
- 📱 **Mobile Field App** - Offline-capable inspection recording system
- 🔔 **Automated Alerts** - Email/SMS reminders for certificate expiry
- 📊 **Real-time Dashboards** - Monitor applications, certificates, and enforcement activities
- 🔍 **Public Certificate Search** - Verify certificate authenticity with QR scanning
- 📈 **Advanced Reporting** - MIS exports for compliance monitoring

## 🎯 System Architecture

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Mobile** | Progressive Web App (PWA) with offline support |
| **Backend** | Node.js/Python REST APIs |
| **Database** | PostgreSQL / MongoDB (encrypted) |
| **Authentication** | OAuth 2.0, JWT tokens, Multi-factor OTP |
| **Hosting** | Government Cloud (GCCP/AWS GovCloud) |
| **Certificates** | QR Code generation, Digital signing |
| **Payment** | Razorpay, NEFT gateway integration |

### Security Framework

- **Transport**: HTTPS/TLS 1.2+ encryption for all communications
- **Data**: AES-256 encryption at rest in database
- **Access Control**: Role-based access (User, LMO, GATC, Admin)
- **Authentication**: Multi-factor OTP via SMS/Email
- **Audit Logging**: Complete activity trail with timestamps
- **Certificate Security**: Digital signatures with non-repudiation

## 👥 User Roles & Workflows

### 1. Users (Businesses, Retailers, Manufacturers)
- Register weighing and measuring instruments
- Submit applications for initial verification and re-verification
- Schedule inspection slots at convenient times
- Download digital certificates with QR codes
- Track application status and certificate validity
- Receive renewal reminders before expiry
- Pay verification fees online via UPI/NEFT

### 2. Legal Metrology Officers (LMOs)
- View and manage verification queue
- Schedule inspections with users
- Access field inspection mobile app
- Record inspection observations and test results
- Issue digital verification certificates
- Monitor enforcement activities and compliance

### 3. Government Approved Test Centres (GATCs)
- Manage lab queue and test schedules
- Record inspection results digitally
- Issue certificates for specialized instruments
- Track laboratory capacity and utilization
- Export lab reports and compliance data

### 4. Administrators
- Monitor applications and pendency across India
- View state-wise SLA compliance
- Generate national MIS reports
- Manage user accounts and access
- Configure system settings and fee structures
- Enforce compliance and track violations

## 📁 Project Structure

```
eMaap/
├── index.html              # Home page
├── login.html              # Authentication
├── register.html           # User registration
├── dashboard.html          # Role-based dashboard
├── instruments.html        # Instrument inventory
├── apply.html              # Verification application
├── applications.html       # Application tracking
├── certificates.html       # Certificate management
├── search.html             # Public certificate verification
├── field.html              # Field inspection mobile app
├── queue.html              # Verification queue (LMO/GATC)
├── schedule.html           # Inspection scheduling
├── certificate.html        # Individual certificate view
├── alerts.html             # Expiry notifications
├── enforcement.html        # Compliance monitoring
├── reports.html            # MIS and analytics
├── admin.html              # Administration panel
├── architecture.html       # System documentation
├── help.html               # FAQ and support
├── js/
│   ├── app.js              # Core application functions
│   ├── auth.js             # Authentication logic
│   ├── data.js             # Data models and storage
│   ├── pages.js            # Page rendering functions
│   ├── workflow.js         # Workflow automation
├── css/
│   └── style.css           # Responsive styling
└── README.md               # This file
```

## 🚀 Getting Started

### Installation & Setup

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd eMaap
   ```

2. **Open in a web browser**
   ```bash
   # Simply open index.html in a modern browser (Chrome, Firefox, Safari, Edge)
   # Or use a local server:
   python -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

3. **Demo Credentials**
   - Password for all demo accounts: `demo123`
   - User: `accounts@shreemart.in`
   - LMO: `kavita.lmo@maharashtra.gov.in`
   - GATC: `gatc.pune@demo.gov.in`
   - Admin: `lm.admin@nic.in`

### Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 User Guide

### For Users (Businesses)

1. **Create Account**
   - Click "Register Account" on home page
   - Enter business name, email, phone, state/district
   - Optionally provide GSTIN
   - Set password and confirm

2. **Register Instruments**
   - Go to "Apply" → "Step 1: Add Instrument"
   - Select instrument type and fill specifications
   - Include make, model, serial number, capacity, accuracy
   - Specify installation location

3. **Apply for Verification**
   - Go to "Apply" → "Step 2: Submit Application"
   - Select your instrument and verification type
   - Add any remarks or special requirements
   - Submit and pay verification fee

4. **Schedule Inspection**
   - Go to "Apply" → "Step 3: Schedule"
   - Choose preferred date and time slot
   - Select preferred officer/GATC if available
   - Confirm scheduling

5. **Track Application**
   - Check "My Applications" for real-time status
   - View "My Certificates" after inspection
   - Download and print digital certificates

6. **Manage Renewals**
   - Check "Expiry Alerts" for upcoming renewals
   - Apply for re-verification before expiry
   - Set up email notifications

### For LMOs & GATCs

1. **Login & Access Queue**
   - Login with government credentials
   - Access "Verification Queue" dashboard
   - View pending applications and scheduled inspections

2. **Schedule Inspections**
   - Go to "Scheduling"
   - Select application and preferred officer
   - Choose inspection date and time slot
   - Confirm allocation

3. **Conduct Field Inspection**
   - Go to "Field Inspection"
   - Fill inspection observations form
   - Record test results and observations
   - Upload site photographs
   - Submit inspection report

4. **Issue Certificates**
   - System auto-generates certificate after "Pass" result
   - View certificate with unique ID and QR code
   - Print or share digitally with applicant
   - Track certificate validity

5. **View Reports**
   - Check "Certificates" for issued certificates
   - Export reports for compliance monitoring
   - Track workload and SLA compliance

### For Administrators

1. **Dashboard Overview**
   - View national monitoring dashboard
   - Check state-wise statistics and pendency
   - Monitor SLA compliance rates

2. **User Management**
   - View all registered users
   - Manage access permissions
   - Generate user audit reports

3. **Generate Reports**
   - Export certificates, applications, instruments
   - Generate MIS reports for authorities
   - Create compliance summaries by state

4. **System Configuration**
   - Adjust verification fees by instrument type
   - Configure alert periods and SLA targets
   - Monitor system health and uptime

## 🔑 Key Workflows

### Verification Process (User Flow)
1. Register → Add Instrument → Apply → Pay Fee → Schedule → Inspection → Certificate

### Certificate Verification (Public)
1. Visit "Verify Certificate" page → Enter Certificate ID/QR → View authenticity status

### Renewal Process
1. Receive expiry alert → Apply for re-verification → Schedule slot → Re-inspection → New certificate

### Enforcement (Admin)
1. Identify expired certificates → Send reminders → Track compliance → Take enforcement action

## 📱 Mobile Access

### Progressive Web App (PWA)
- Works on any smartphone (iOS/Android)
- Installable as standalone app
- Offline functionality for field inspections
- Automatic sync when network available

### Features
- Mobile-optimized responsive design
- Touch-friendly interfaces
- GPS location tracking for inspections
- Photo capture and upload
- Offline form submission with local storage

## 🔐 Security & Compliance

### Data Protection
- All data transmitted over HTTPS/TLS
- Database encryption at rest (AES-256)
- Row-level security controls
- Regular security audits and penetration testing

### Compliance Standards
- Legal Metrology Act, 2009 & Rules, 2011
- Information Technology Act, 2000
- NIST Cybersecurity Framework
- ISO 27001 compliance
- GDPR requirements for international data

### Digital Signatures
- Certificates digitally signed by government
- QR code authentication for verification
- Tamper detection mechanisms
- Non-repudiation through officer signatures

## 📊 Reporting & Analytics

### Available Reports
- Certificate issuance by instrument type
- Applications by state and processing time
- SLA compliance monitoring
- User engagement metrics
- Enforcement violation tracking
- Revenue and fee collection

### Export Formats
- CSV for Excel analysis
- PDF for official documentation
- JSON for API integration
- Excel workbooks with charts

## ⚙️ API Integration (Planned)

### Public APIs
```
POST /api/v1/auth/login
GET  /api/v1/certificates/:id
POST /api/v1/certificates/verify
GET  /api/v1/search/instrument/:id
```

### Internal APIs
```
POST /api/v1/instruments
GET  /api/v1/applications
POST /api/v1/inspections
POST /api/v1/certificates/generate
GET  /api/v1/reports/national
```

## 🐛 Troubleshooting

### Common Issues

**Q: Certificate not displaying properly**
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser
- Ensure JavaScript is enabled

**Q: QR code not scanning**
- Ensure sufficient lighting
- Try different QR scanner app
- Check certificate ID manually

**Q: Application stuck in "Submitted" status**
- Check if payment was successful
- Contact LMO for scheduling
- Verify email for any messages

**Q: Field app offline sync not working**
- Check internet connection
- Clear browser storage and retry
- Contact technical support

## 📞 Support & Contact

### Help Resources
- **FAQ Page**: Visit "Help & Support" for common questions
- **Email**: support@emaap.india.gov.in
- **Phone**: +91-11-2300-0000 (Toll-free: 1800-000-000)
- **Hours**: Mon-Fri, 9 AM - 6 PM IST

### Technical Support
- Bug reports and feature requests
- Account access issues
- Payment and transaction support
- Data recovery and backups

## 📄 License & Terms

- This is a Government of India initiative
- Licensed under Ministry of Consumer Affairs
- Use is subject to Legal Metrology Act, 2009
- Terms of Service available on the platform

## 🔄 Version & Updates

**Current Version**: 1.0.0 (Prototype - SIH 2026)

### Planned Enhancements
- Blockchain-based certificate ledger
- AI-powered defect detection from photos
- Native mobile apps (iOS/Android)
- Voice-based application submission
- Integration with State e-governance
- Predictive maintenance analytics

## 👏 Contributors

Developed as part of Smart India Hackathon 2026

---

**Last Updated**: September 2026

For the latest information and updates, visit the official eMaap portal.
