#!/usr/bin/env python3
"""This module implements the FIFO cache replacement policy.
"""
from collections import deque

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """Implements the FIFO cache replacement policy."""
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
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            oldest_key = self.order.popleft()
            del self.cache_data[oldest_key]
            print("DISCARD: {}".format(oldest_key))

        self.cache_data[key] = item
        self.order.append(key)
