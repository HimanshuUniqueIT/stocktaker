"""Builds self-contained index.html and screens.html (CSS, data, JS and logo inlined) from src/ + assets/.
Run:  python3 build.py   — needed after editing anything in assets/ or src/. Self-contained pages open
straight from disk even where the browser cannot read sibling files."""
import base64, re, os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(here, p), encoding='utf-8').read()
logo = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(here, 'assets/logo-small.png'), 'rb').read()).decode()
css, data = rd('assets/app.css'), rd('assets/data.js')
js = rd('assets/app.js').replace('assets/logo-icon.png', logo)
for name in ('index', 'screens'):
    s = rd('src/%s.src.html' % name)
    s = s.replace('<link rel="stylesheet" href="assets/app.css">', '<style>\n%s\n</style>' % css)
    s = s.replace('<script src="assets/data.js"></script>', '<script>\n%s\n</script>' % data)
    s = s.replace('<script src="assets/app.js"></script>', '<script>\n%s\n</script>' % js)
    open(os.path.join(here, name + '.html'), 'w', encoding='utf-8').write(s)
    print(name + '.html', len(s) // 1024, 'KB')
