from PIL import Image

from util.helpers import sorting_helper
from util.helpers import file_helper

import util.helpers.image_helper as image_helper

def main():
	
	files = file_helper.get_files("./images")

	sorted = sorting_helper.sort_descending(files)

	for item in sorted:
		print(item)

	most_recent = image_helper.get_most_recent_image()

	print(most_recent)
	image = Image.open("./images/" + most_recent)

	image_helper.force_dimensions(image, 1920, 1080, "white").show()

if __name__ == "__main__":
	main()
