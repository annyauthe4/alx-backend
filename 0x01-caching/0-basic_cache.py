#!/usr/bin/env python3
"""This module implements a subclass which inherits from a base class
and initializes using the base class initialization.
It also ensure contract implementation of some defined methods to
be overriden in the subclass.
"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """A caching system that uses parent initialization."""
    def __init__(self):
        """Initialize using parent init method."""
        super().__init__()

    def get(self, key):
        """Returns value in cache data."""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data.get(key)

    def put(self, key, item):
        """Assigns item to key in cache_data dictionary."""
        if key is None or item is None:
            return

        self.cache_data[key] = item
