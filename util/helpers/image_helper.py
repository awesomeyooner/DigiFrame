from PIL import Image, ImageDraw

from util.helpers import file_helper

IMAGE_FOLDER = "./images"

def get_most_recent_image(folder: str=IMAGE_FOLDER):
    ascending = file_helper.get_files_descending(folder)

    if(len(ascending) == 0):
        return None
    
    # Index 1 since 0 is "default.png"
    return ascending[1]


def force_dimensions(src: Image.Image, width: int, height: int, bg_color: str ="black") -> Image.Image:

    # The ratio to scale the source in order to match the max dimensions
    width_ratio = width / src.width
    height_ratio = height / src.height

    # The overall scale is the smallest ratio
    # Because if we choose the bigger one then that means one of the
    # Dimensions will be OVER scaled
    scale = min(width_ratio, height_ratio)

    # The target dimensions while maintaining aspect ratio
    target_width = round(scale * src.width)
    target_height = round(scale * src.height)

    # Resize the image
    resized = src.resize((target_width, target_height))

    # Add the background to keep the image at the specified dimensions while keeping aspect ratio
    return add_background(resized, width, height, bg_color)


def add_background(src: Image.Image, width, height, color="black"):
    background = Image.new('RGB', (width, height), color=color)
    draw = ImageDraw.Draw(background)

    draw.rectangle([0, 0, width, height], fill=color, outline=color)

    corner = (round(abs(src.width - width) / 2), round(abs(src.height - height) / 2))

    background.paste(src, corner)

    return background