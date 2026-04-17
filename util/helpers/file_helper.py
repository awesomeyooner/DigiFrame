import numpy as np
import os
from util.helpers import sorting_helper

def get_files(folder: str) -> list[str]:

    # Store files in this array
    files = []

    # Scanned Directory object
    entries = os.scandir(folder)

    # For every entry in the folder
    # Add it to the list if it is a file
    for entry in entries:
         if(entry.is_file()):
              files.append(entry.name)

    return files


def get_files_ascending(folder: str) -> list[str]:
    files = get_files(folder)

    return sorting_helper.sort_ascending(files)


def get_files_descending(folder: str) -> np.ndarray:
    files = get_files(folder)

    return sorting_helper.sort_descending(files)

    
def get_filename_no_extension(filename: str) -> str:

    # Find where the dot is
    dot_pos = filename.find(".")

    # If there's no file extension 
    # Then just return the filename
    if dot_pos == -1:
        return filename
    
    # Return the filename up until the position for where the dot is
    return filename[:dot_pos]


def get_file_extension(filename: str):

    # Find where the dot is
    dot_pos = filename.find(".")

    # If the dot isn't found
    # Then there's no extension
    if dot_pos == -1:
        return None
    
    # Only return from the dot position to the end (just the extension)
    return filename[dot_pos:]


def change_file_extension(src_name: str, extension: str) -> str:
    
    # Get the filename without the original extension
    name_no_extension = get_filename_no_extension(src_name)

    # Add the new extension
    return name_no_extension + extension