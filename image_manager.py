from PIL import Image, ImageDraw

from util import file_helper

IMAGE_FOLDER = "./images"

def get_most_recent_image(folder: str=IMAGE_FOLDER):
    ascending = file_helper.get_files_descending(folder)

    if(len(ascending) == 0):
        return None
    
    # Index 1 since 0 is "default.png"
    return ascending[1]


def force_dimensions(src: Image.Image, width: int, height: int, bg_color: str ="black") -> Image.Image:
    width_diff = width - src.width
    height_diff = height - src.height

    scale = 1

    if(width_diff > 0 and height_diff > 0):
        
        if(width_diff < height_diff):
            scale = width / src.width
        elif(height_diff < width_diff):
            scale = height / src.height
        else:
            if(width > height):
                scale = width / src.width
            elif(height > width):
                scale = height / src.height
    elif(width_diff < 0 and height_diff > 0):
        scale = width / src.width
    elif(width_diff > 0 and height_diff < 0):
        scale = height / src.height
    elif(width_diff < 0 and height_diff < 0):
        if(abs(width_diff) < abs(height_diff)):
            scale = width / src.width
        elif(abs(width_diff) > abs(height_diff)):
            scale = height / src.height

    target_width = round(scale * src.width)
    target_height = round(scale * src.height)

    resized = src.resize((target_width, target_height))

    print(src.width)
    print(src.height)

    print(width_diff)
    print(height_diff)

    print(target_width)
    print(target_height)

    return add_background(resized, width, height, bg_color)


def add_background(src: Image.Image, width, height, color="black"):
    background = Image.new('RGB', (width, height), color=color)
    draw = ImageDraw.Draw(background)

    draw.rectangle([0, 0, width, height], fill=color, outline=color)

    corner = (round(abs(src.width - width) / 2), round(abs(src.height - height) / 2))

    background.paste(src, corner)

    return background