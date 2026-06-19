import os, re, glob

files = glob.glob('e:\\acm-static-build\\**\\*.html', recursive=True)
for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        
        # Remove PHP Warning injected in JS
        new_content = re.sub(r'document\.cookie\s*=\s*"livesite_<br />\s*<b>Warning</b>.*?<br />\s*_engage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"[;]?', 'document.cookie = "livesite_engage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";', new_content, flags=re.DOTALL)
        
        # Remove crossorigin attribute from leaflet scripts/links
        new_content = re.sub(r'(<link rel="stylesheet" href="[^"]*leaflet\.css")\s*crossorigin="[^"]*"(.*?>)', r'\1\2', new_content)
        new_content = re.sub(r'(<script src="[^"]*leaflet\.js")\s*crossorigin="[^"]*"(.*?>)', r'\1\2', new_content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Fixed {filepath}')
    except Exception as e:
        print(f'Failed {filepath}: {e}')
