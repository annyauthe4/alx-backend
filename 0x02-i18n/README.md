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
