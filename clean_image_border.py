from PIL import Image

def clear_border(image_path, margin=15):
    img = Image.open(image_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    for x in range(width):
        for y in range(margin):
            pixels[x, y] = (0, 0, 0, 0)
            pixels[x, height - 1 - y] = (0, 0, 0, 0)
            
    for y in range(height):
        for x in range(margin):
            pixels[x, y] = (0, 0, 0, 0)
            pixels[width - 1 - x, y] = (0, 0, 0, 0)
            
    img.save(image_path)
    print("Cleared border of", image_path)

clear_border("c:/Users/a6644/OneDrive/Documents/Ember2/public/hologram_transparent.png", 15)
