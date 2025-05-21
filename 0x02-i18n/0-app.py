#!/usr/bin/env python3
"""This module setups a basic Flask app and creates route which renders
html file to display an output as page.
"""
from flask import Flask, render_template
from typing import Any

app = Flask(__name__)


@app.route('/')
def index() -> str:
    """Renders html page."""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(debug=True)
