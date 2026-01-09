# Theme Description Template

Use this template to define a new color theme for the UI Interactions page. Copy this file and fill out all sections to create a complete theme specification.

---

## 1. Theme Identity

### Theme Name
**Display Name:** _(e.g., "Sunset Vibes", "Midnight Purple", "Corporate Professional")_

**CSS Class Name:** `theme-___` _(lowercase, no spaces, e.g., "theme-sunset")_

### Description
_(2-3 sentences describing the theme's personality, mood, and intended feeling)_

Example:
> A warm, energetic theme inspired by golden hour sunsets. This theme evokes creativity and optimism with vibrant orange and pink gradients. Perfect for portfolios and creative showcases.

### Target Use Case
_(Who is this theme for? What context or industry?)_

- [ ] Creative/Design portfolios
- [ ] Corporate/Professional
- [ ] Tech/Developer focused
- [ ] Gaming/Entertainment
- [ ] Educational/Academic
- [ ] E-commerce/Retail
- [ ] Other: ___________

---

## 2. Color Palette

### Primary Gradient
These colors create the main visual identity (used in titles, buttons, progress bars, etc.)

**Gradient Start Color:**
- Hex: `#______`
- RGB: `rgb(___, ___, ___)`
- Color Name: _(e.g., "Coral Red", "Sky Blue")_

**Gradient End Color:**
- Hex: `#______`
- RGB: `rgb(___, ___, ___)`
- Color Name: _(e.g., "Deep Purple", "Ocean Teal")_

**Visual Preview:**
```
████████████████ (Gradient Start)
████████████████ (Gradient Middle)
████████████████ (Gradient End)
```

### Accent Color
Single solid color for borders, icons, and interactive states

**Accent Color:**
- Hex: `#______`
- RGB: `rgb(___, ___, ___)`
- Usage: _(e.g., "Matches gradient start for consistency")_

### Background Gradient
Subtle gradient for the page background

**Background Start Color:**
- Hex: `#______`
- RGB: `rgb(___, ___, ___)`
- Description: _(e.g., "Light cream", "Pale blue")_

**Background End Color:**
- Hex: `#______`
- RGB: `rgb(___, ___, ___)`
- Description: _(e.g., "Soft gray", "Muted teal")_

### Supporting Colors (Optional)
Any additional colors that complement the theme

| Color Purpose | Hex Code | Usage |
|---------------|----------|-------|
| Success State | `#______` | _(e.g., "Checkmarks, success messages")_ |
| Warning State | `#______` | _(e.g., "Alerts, warnings")_ |
| Error State   | `#______` | _(e.g., "Error messages")_ |
| Neutral       | `#______` | _(e.g., "Secondary text, borders")_ |

---

## 3. Visual References

### Inspiration Sources
_(Provide links, images, or descriptions of visual inspiration)_

- **Inspiration 1:** _(URL or description)_
- **Inspiration 2:** _(URL or description)_
- **Inspiration 3:** _(URL or description)_

### Comparable Designs
_(Websites, apps, or designs with similar aesthetics)_

Example:
> - Spotify's dark theme with green accents
> - Apple's clean gradient backgrounds
> - Stripe's blue-to-purple developer documentation

### Aesthetic Keywords
_(3-5 words that capture the theme's essence)_

Examples: Modern, Vibrant, Professional, Playful, Elegant, Bold, Minimalist, Energetic, Calming, Luxurious

Your keywords:
1. _____________
2. _____________
3. _____________
4. _____________
5. _____________

---

## 4. Technical Specifications

### CSS Variable Values
Copy these exact values for implementation:

```css
body.theme-YOURTHEME {
  --primary-start: #______;    /* Primary gradient start */
  --primary-end: #______;      /* Primary gradient end */
  --bg-start: #______;         /* Background gradient start */
  --bg-end: #______;           /* Background gradient end */
  --accent-color: #______;     /* Accent/border color */
}
```

### Theme Dropdown Color Preview
The circular color indicator shown in the dropdown menu:

```css
.theme-option-color.YOURTHEME {
  background: linear-gradient(135deg, #______ /* start */, #______ /* end */);
}
```

### Special Styling Considerations
_(Any additional CSS needed for this theme)_

Example:
> - Increase contrast for text readability
> - Add subtle box shadows for depth
> - Use rounded corners consistently

Notes:
- _______________________________________________
- _______________________________________________
- _______________________________________________

---

## 5. Accessibility Notes

### Color Contrast Ratios
_(Ensure WCAG 2.1 AA compliance: 4.5:1 for normal text, 3:1 for large text)_

**Primary Gradient on White Background:**
- Contrast Ratio: ___:1
- Status: [ ] Pass [ ] Fail

**Accent Color on White Background:**
- Contrast Ratio: ___:1
- Status: [ ] Pass [ ] Fail

**Text on Background Gradient:**
- Contrast Ratio: ___:1
- Status: [ ] Pass [ ] Fail

**Recommended Contrast Tool:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Color Blindness Considerations

Test your theme with color blindness simulators:

- [ ] Protanopia (Red-Blind) - Colors remain distinguishable
- [ ] Deuteranopia (Green-Blind) - Colors remain distinguishable
- [ ] Tritanopia (Blue-Blind) - Colors remain distinguishable
- [ ] Monochromacy (Total Color Blindness) - Sufficient contrast

**Recommended Tool:** [Coblis Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)

### Additional Accessibility Notes
_(Any other considerations for users with visual impairments)_

- _______________________________________________
- _______________________________________________

---

## 6. Implementation Checklist

Before submitting this theme for development:

- [ ] All color hex codes are filled in
- [ ] Theme name and CSS class name are defined
- [ ] Gradient colors create a pleasing visual blend
- [ ] Accent color complements the gradient
- [ ] Background gradient is subtle and doesn't distract
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Theme has been tested with color blindness simulators
- [ ] Visual references or inspiration sources are provided
- [ ] CSS variable values are ready to copy-paste

---

## 7. Example Usage

After implementation, the theme will be applied like this:

**HTML (Theme Dropdown Option):**
```html
<div class="theme-option" data-theme="YOURTHEME">
  <div class="theme-option-color YOURTHEME"></div>
  <span class="theme-option-name">Your Theme Name</span>
  <span class="theme-option-check">✓</span>
</div>
```

**JavaScript (Theme Application):**
```javascript
// Theme is applied automatically when user selects it
document.body.classList.add('theme-YOURTHEME');
localStorage.setItem('uiInteractionsTheme', 'YOURTHEME');
```

---

## Template Version
Version 1.0 - Created for UI Interactions Page Theme Selector

**Questions or Issues?**
Contact the development team or refer to the existing themes in `ui-interactions/index.html` for examples.

