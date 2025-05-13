#!/usr/bin/env python3
"""This module contains a function which takes two integer args
and return a tuple of size two containing a start and end indices
to return in a list for the pagination parameters.
"""

from typing import Tuple
def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Returns a tuple of size two.

    Args:
        page (int):: Page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        A tuple of size two.
    """
    if not isinstance(page, int) or not isinstance(page_size, int):
        raise ValueError("Page and page size must be integer")
    if page <= 0 or page_size <= 0:
        raise ValueError("Page and page size must be positive integer")

    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
