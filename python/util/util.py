import numpy as np

def sort_alphabetically_az(original):
    sorted = np.array([])

    for item in original:
        if len(sorted) == 0:
            sorted = np.append(sorted, item)
            continue

        for i in range(len(sorted)):
            if item < sorted[i]:
                sorted = np.insert(sorted, i, item)
                break

            elif i == len(sorted) - 1:
                sorted = np.append(sorted, item)
                break

    return sorted

def sort_alphabetically_za(original):
    sorted = np.array([])

    for item in original:
        if len(sorted) == 0:
            sorted = np.append(sorted, item)
            continue

        for i in range(len(sorted)):
            if item > sorted[i]:
                sorted = np.insert(sorted, i, item)
                break

            elif i == len(sorted) - 1:
                sorted = np.append(sorted, item)
                break

    return sorted