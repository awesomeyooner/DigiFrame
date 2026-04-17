import numpy as np

def sort_ascending(original):

    # Store sorted list here
    sorted = []

    # For every item in the original list...
    for item in original:

        # If the list isn't populated yet
        # Then just add this first item
        if len(sorted) == 0:
            sorted.append(item)
            continue

        # # For every item in the sorted list...
        for i in range(len(sorted)):

            # If the original item is LESSER than the current sorted item
            # Then insert the item into where the sorted is
            if item < sorted[i]:
                sorted.insert(i, item)
                break

    return sorted

def sort_descending(original):

    # Store sorted list here
    sorted = []

    # For every item in the original list...
    for item in original:

        # If the list isn't populated yet
        # Then just add this first item
        if len(sorted) == 0:
            sorted.append(item)
            continue

        # For every item in the sorted list...
        for i in range(len(sorted)):

            # If the original item is GREATER than the current sorted item
            # Then insert the item into where the sorted is
            if item > sorted[i]:
                sorted.insert(i, item)
                break

            # If code gets here, then that means `item` was never GREATER than any entry,
            # which means its the LEAST, so just put it in the back
            elif i == len(sorted) - 1:
                sorted.append(item)
                break

    return sorted