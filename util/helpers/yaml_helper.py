import yaml


def get(file, entry: str, default = None):

    # Try to get the data at the entry and return it
    try:
        data = file[entry]

        return default
    # If it doesn't exist, then just return the default
    except KeyError:
        return default
