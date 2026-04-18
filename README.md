# tabdrop

CLI tool to export and restore browser tab sessions as markdown or JSON.

## Installation

```bash
npm install -g tabdrop
```

## Usage

Export your current browser tabs to a markdown file:

```bash
tabdrop export --format markdown --output tabs.md
```

Export as JSON:

```bash
tabdrop export --format json --output session.json
```

Restore a saved session:

```bash
tabdrop restore --input tabs.md
```

List saved sessions:

```bash
tabdrop list
```

### Example Output (`tabs.md`)

```markdown
# Tab Session — 2024-01-15 10:32

- [GitHub](https://github.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Hacker News](https://news.ycombinator.com)
```

## Supported Browsers

- Chrome / Chromium
- Firefox
- Edge

## License

MIT © 2024