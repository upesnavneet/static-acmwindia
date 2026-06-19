import os
mappings = {'</head>': '<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script></head>'}
for root, dirs, files in os.walk('e:\\acm-static-build'):
    for file in files:
        if file.endswith('index.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = content.replace('</head>', mappings['</head>'])
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
