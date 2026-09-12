# Contributing to KrishiBazar 🤝

We welcome contributions from farmers, developers, designers, and agriculture enthusiasts!

---

## 📋 Code of Conduct

- Be respectful and inclusive
- Focus on the problem, not the person
- Help others learn and grow
- Report issues constructively

---

## 🚀 Getting Started

### 1. Fork & Clone
```bash
git clone https://github.com/yourusername/krishibazar.git
cd krishibazar
```

### 2. Create a Branch
```bash
# For bug fixes
git checkout -b fix/issue-title

# For features
git checkout -b feature/feature-name

# For documentation
git checkout -b docs/update-name
```

### 3. Make Changes
- Edit files as needed
- Keep commits small & focused
- Test thoroughly before pushing

### 4. Commit & Push
```bash
git add .
git commit -m "Clear description of changes"
git push origin feature/feature-name
```

### 5. Create Pull Request
- Go to GitHub → Compare & pull request
- Describe what you changed & why
- Link related issues: `Fixes #123`
- Wait for review

---

## 📝 Contribution Guidelines

### Code Style

#### JavaScript
```javascript
// Use const/let, not var
const store = JSON.parse(localStorage.getItem("kb_"));

// Use arrow functions
const greet = (name) => `Hello, ${name}!`;

// Comments for complex logic
function calculateLift(farm, mandi) {
  // Calculate percentage increase vs APMC price
  return ((farm - mandi) / mandi) * 100;
}
```

#### CSS
```css
/* Use CSS variables for colors */
.card { background: var(--white); color: var(--ink); }

/* Mobile-first media queries */
@media (min-width: 481px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Descriptive class names */
.hero-actions { /* clear */ }
.btn-lg { /* clear */ }
.sidebar-nav { /* clear */ }
```

#### HTML
```html
<!-- Use semantic tags -->
<header>Navigation</header>
<main>Content</main>
<footer>Info</footer>

<!-- Add accessibility attributes -->
<button aria-label="Toggle menu" class="mobile-menu-toggle">☰</button>
<img alt="Nashik onion" src="onion.jpg">

<!-- Use data attributes for JS -->
<div data-page="home" data-i18n="heroTitle">Title</div>
```

### Testing Checklist

Before submitting, test:
- [ ] Desktop view (1024px+)
- [ ] Tablet view (480–768px)
- [ ] Mobile view (< 480px)
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Console for errors (F12)
- [ ] localStorage data persists
- [ ] All links work
- [ ] Images load

### Documentation

For new features, update:
- [ ] [FEATURES.md](FEATURES.md) with implementation details
- [ ] [README.md](README.md) if it's a major feature
- [ ] [SETUP.md](SETUP.md) if it requires configuration
- [ ] Inline code comments for complex logic
- [ ] Data structure documentation in data.js

---

## 🎯 Types of Contributions

### Bug Fixes
```markdown
## Description
Brief description of the bug.

## Steps to Reproduce
1. Open marketplace.html
2. Filter by state: Maharashtra
3. Search for "onion"
4. Expected: Show only onion in Maharashtra
5. Actual: Shows all onions

## Environment
- Browser: Chrome 120
- Device: Desktop
- OS: Windows 11
```

### Features
```markdown
## Feature: User Ratings System

### Problem
Farmers/FPOs have no way to build reputation on the platform.

### Proposed Solution
Add star rating (1–5) on order completion.

### Implementation
- New page: ratings.html
- New data: ratings array in data.js
- New logic: renderRatings() in ratings.js

### Success Criteria
- Users can rate after delivery
- Average rating shown on farmer profile
- Filter marketplace by rating
```

### Documentation
- Fix typos & clarify explanations
- Add code examples
- Improve structure & readability
- Translate to more languages

### Design Improvements
- Better mobile UI
- Accessibility enhancements (WCAG AA compliance)
- Visual polish & branding consistency
- Performance optimizations

---

## 📋 Issue Labels

- `good first issue` — Great for beginners
- `help wanted` — Community input needed
- `bug` — Something isn't working
- `enhancement` — New feature request
- `documentation` — Docs improvements
- `mobile` — Mobile-specific issues
- `responsive` — Responsive design issues
- `accessibility` — A11y improvements
- `roadmap` — Related to long-term vision

---

## 🎓 Project Architecture

### File Organization
```
krishiBazar/
├── index.html, marketplace.html, ...  (pages)
├── css/style.css                      (all styling)
├── js/
│   ├── data.js                       (KB object, data, i18n)
│   ├── app.js                        (utilities, nav, auth)
│   ├── farmer.js, marketplace.js, etc (page-specific logic)
├── README.md, FEATURES.md, etc        (docs)
```

### Data Flow
```
HTML (pages)
    ↓
CSS (responsive styling via media queries)
    ↓
JavaScript (app.js utilities)
    ↓
Page-specific JS (farmer.js, marketplace.js)
    ↓
localStorage (data persistence)
```

### Key Functions (app.js)
```javascript
Store.get(key, fallback)      // Retrieve from localStorage
Store.set(key, value)         // Save to localStorage
toast(msg)                    // Show notification
session()                     // Get current user
addToCart(id, qty, bulk)      // Add item to cart
applyI18n()                   // Apply language translations
navHTML(active)               // Render navigation
```

---

## 🔍 Reviewing PRs

### Checklist for Reviewers
- [ ] Code follows style guidelines
- [ ] Tests pass (visual + functional)
- [ ] Mobile responsiveness working
- [ ] Documentation updated
- [ ] No console errors
- [ ] Changes are focused & well-scoped
- [ ] Commit messages are clear

### Feedback
```markdown
✅ **Good:** Clear variable names, modular functions
⚠️ **Minor:** Add media query for tablet view
❌ **Must Fix:** Missing aria-labels for accessibility
```

---

## 🚀 Deployment

### Staging
- Branch: `develop`
- URL: https://develop.krishibazar.dev
- Auto-deployed on push

### Production
- Branch: `main`
- URL: https://krishibazar.com
- Requires PR review + approval

### Release Process
1. Create release notes on GitHub
2. Tag with version: `v1.0.0`
3. Automated deployment to production
4. Announce on social media

---

## 💡 Ideas for Contributors

### Good First Issues (Beginners)
- [ ] Add new produce item to data.js
- [ ] Fix typo in README.md
- [ ] Translate UI to new language
- [ ] Improve CSS for better mobile view
- [ ] Add form validation feedback

### Intermediate Issues
- [ ] Implement dark mode toggle
- [ ] Add user profile page
- [ ] Create chart for price forecast
- [ ] Build admin dashboard skeleton
- [ ] Add PWA support

### Advanced Issues
- [ ] Backend API integration
- [ ] Real payment processing
- [ ] ML-based forecasting model
- [ ] Mobile app with React Native
- [ ] Analytics & reporting system

---

## 📞 Getting Help

- **Questions:** Open GitHub Discussion
- **Bugs:** Open GitHub Issue with reproduction steps
- **Ideas:** Open GitHub Issue with `enhancement` label
- **Chat:** Join our Discord/Slack community
- **Email:** contact@krishibazar.local

---

## 🎉 Recognition

Contributors are recognized in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md) (to be created)
- GitHub repo "Contributors" section
- Monthly "Contributor Spotlight" on social media
- Project changelog & release notes

---

## 📚 Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🙏 Thank You!

Every contribution—no matter how small—helps build the future of Indian agriculture. Thank you for being part of this mission! 🌾

**Together, we're bridging the farm-to-kitchen gap.** 💚
