<h1> Internationalization (i18n) </h1>
This is the process of inferring user's preferred language - here using Flask

There is a Flask extension that makes working with translations very easy. The extension is called Flask-Babel and is installed with pip:

<code> (venv) $ pip install flask-babel </code>

To keep track of the list of supported languages, I'm going to add a configuration variable:

config.py: Supported languages list.
<code>
class Config:
    # ...
    LANGUAGES = ['en', 'es']
</code>

The <b><i>Babel</i></b> instance is initialized as <b><i>locale_selector</i></b> argument, which must be set to a
function that will be invoked for each request

<code>
app/__init__.py: Initialize Flask-Babel.

from flask import request
# ...
from flask_babel import Babel

def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])

app = Flask(__name__)
# ...
babel = Babel(app, locale_selector=get_locale)
# ...
</code>

## Mark text to Translate using _()
from flask_babel import _
flash(_('This is an example'))
In the case of a variable within a string literals e.g
flash(f'User {username} not found'), it becomes
flash(_(User %(username)s not found.', username=username))

However, for an html file, there is addition of {{ _() }}
<code> <h1> File not found</h1></code>
The translation enabled version becomes:

<code><h1>{{ _('File not found') }}</h1></code>

<h1>Extracting Text to Translate</h1>
In a babel.cfg - PyBabel configuration file
<code>
[python: app/**.py]
[jinja2: app/templates/**.html]
</code>
The above lines define the filename patterns for Python and Jinja template files respectively.
Babel will look for any files matching these patterns and scan them for texts that are wrapped for translation.

To extract all the texts to a .pot file - <i>pot - Portable Object Template</i>, you can use the following command:
<code>(venv) $ pybabel extract -F babel.cfg -k _l -o messages.pot .</code>

The pybabel extract command reads the configuration file given in the -F option, then scans all the code and template files in the directories that match the configured sources, starting from the directory given in the command (the current directory or . in this case). By default, pybabel will look for _() as a text marker, but I have also used the lazy version, which I imported as _l(), so I need to tell the tool to look for those too with the -k _l. The -o option provides the name of the output file.
