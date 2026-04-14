from inky.auto import auto
from PIL import Image

display = auto()

image = Image.open("images/oj.png")

def main():
	print(display.colour)
	print(display.resolution)
	print("hello world")

	display.set_image(image.resize((800, 480)))
	display.show()

if __name__ == "__main__":
	main()
