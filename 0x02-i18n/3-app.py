#!/usr/bin/env python3
"""This module contains a basic flask app set up and a Babel object instance
With a get locale method which returns the supported languages of the user.
"""
from flask import Flask, render_template, request
from flask_babel import Babel, _


# Define config class with attributes
class Config:
    """Sets class with attributes."""
    LANGUAGES = ["en", "fr"]
    DEFAULT_BABEL_LOCALE = "en"
    DEFAULT_BABEL_TIMEZONE = "UTC"


# Instantiate the flask app
app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False

# Instantiate babel object
babel = Babel(app)


# Use local selecor decorator to create a method
@babel.localeselector
def get_locale() -> str:
    """Returns the best match for supported languages."""
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/')
def get_homepage() -> str:
    """Returns homepage."""
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
