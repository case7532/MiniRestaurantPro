## 📝 Description

<!-- Provide a clear and concise description of what this PR does -->

## 🎯 Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 🎨 UI/UX improvement (styling or user interface changes)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] 📝 Documentation update
- [ ] 🔧 Configuration change
- [ ] 🧪 Test improvement
- [ ] ⚡️ Performance improvement

## 🔗 Related Issues

<!-- Link related issues. Use "Closes #123" to auto-close issues when PR is merged -->

Closes #

## 🧪 Testing

### Test Coverage
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

### Tested On
- [ ] iOS Simulator (version: ___)
- [ ] Android Emulator (version: ___)
- [ ] iOS Physical Device (optional)
- [ ] Android Physical Device (optional)

### Test Scenarios
<!-- Describe the test scenarios you've covered -->

1. 
2. 
3. 

## ✅ Code Quality Checklist

### Architecture & Patterns
- [ ] Follows MiniRestaurantPro architecture patterns (see `copilot-instructions.md`)
- [ ] Uses **path aliases** (`@hooks/`, `@screens/`, etc.) - NO relative imports
- [ ] Screen structure follows modular pattern (index.tsx, styles.ts, types.ts)
- [ ] Uses TypeScript strict mode - all types are explicit

### Theme & Styling
- [ ] All styles use `theme` parameter: `(theme: Theme) => StyleSheet.create(...)`
- [ ] NO hardcoded colors - uses `theme.colors.*`
- [ ] NO hardcoded spacing - uses `theme.spacing.*`
- [ ] NO hardcoded typography - uses `theme.typography.*`
- [ ] Platform-specific shadows handled via `theme.shadows.*`

### Internationalization
- [ ] All user-facing text uses `t('key')` from `useTranslation()`
- [ ] Translation keys added to **both** `en.json` and `vi.json`
- [ ] NO hardcoded English text in components

### Navigation
- [ ] Navigation uses typed `RootStackParamList` or `MainTabParamList`
- [ ] Screen props use `NativeStackScreenProps` or `BottomTabScreenProps`
- [ ] Navigation params are type-safe

### Firebase
- [ ] Uses `@react-native-firebase` (NOT web SDK)
- [ ] Follows modular imports pattern
- [ ] Error handling implemented for Firebase calls

### Code Quality
- [ ] TypeScript type check passes: `npm run type-check` ✅
- [ ] ESLint check passes: `npm run lint` ✅
- [ ] Prettier format check passes: `npm run format:check` ✅
- [ ] All tests pass: `npm test` ✅

## 📸 Screenshots / Videos

<!-- Add screenshots for UI changes, before/after comparisons if applicable -->

### Before
<!-- Screenshot or description of previous state -->

### After
<!-- Screenshot or description of new state -->

## 📚 Documentation

- [ ] Code is well-commented for complex logic
- [ ] README updated (if needed)
- [ ] Architecture docs updated (if needed)
- [ ] API documentation updated (if applicable)

## 🚀 Deployment Notes

<!-- Any special deployment considerations, environment variables, migrations, etc. -->

## 🤔 Additional Context

<!-- Add any other context about the PR here -->

---

**Reviewer Guidelines:**
- Verify all checklist items are completed
- Test on both iOS and Android if UI changes
- Check translation keys exist in both languages
- Ensure no hardcoded values (colors, spacing, text)
- Validate TypeScript types are strict
