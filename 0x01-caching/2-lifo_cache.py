#!/usr/bin/env python3
"""This module implements the LIFO cache replacement policy.
"""
from collections import deque

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """Implements the LIFO cache replacement policy."""
    def __init__(self):
        """Initialize."""
        super().__init__()
        self.order = deque()

    def get(self, key):
        """Return the value in a key stored in cache data."""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]

    def put(self, key, item):
        """Assigns item to key."""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            # Move key to the end to reflect latest insertion
            self.order.remove(key)
            self.order.append(key)
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            latest_key = self.order.pop()
            del self.cache_data[latest_key]
            print("DISCARD: {}".format(latest_key))

        self.cache_data[key] = item
        self.order.append(key)
