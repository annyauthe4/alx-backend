#!/usr/bin/env python3
"""This module instantiates a Babel object in a Flask app, creates a
Config class that has a LANGUAGE class attribute which has English
and French stored and set default locale to English.
"""
from flask import Flask, render_template
from flask_babel import Babel
from typing import List


class Config:
    """Configures languages for English and French."""
    LANGUAGES: List[str] = ["en", "fr"]
    BABEL_DEFAULT_LOCALE: str = "en"
    BABEL_DEFAULT_TIMEZONE: str = "UTC"


app: Flask = Flask(__name__)
app.config.from_object(Config)

babel: Babel = Babel(app)


@app.route('/')
def index() -> str:
    """Route handler for the home page."""
    return render_template("1-index.html")


if __name__ == '__main__':
    app.run(debug=True)
