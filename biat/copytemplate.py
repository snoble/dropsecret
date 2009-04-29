import os
import shutil

for name in os.listdir('.'):
  if not name in ('about', 'create', 'theme', 'howitworks', 'contactus'):
    dirname = os.path.join('.', name)
    if os.path.isdir(dirname):
      shutil.copy(os.path.join('.', 'template.tpl'), os.path.join(dirname, 'index.html'))


