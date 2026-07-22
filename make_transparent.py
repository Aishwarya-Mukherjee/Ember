from PIL import Image
import numpy as np

img = Image.open(r"c:\Users\a6644\OneDrive\Documents\Ember2\public\hologram_ai_assistant.png").convert("RGBA")
data = np.array(img)

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
# Create alpha mask based on lightness
alpha = np.maximum(np.maximum(r, g), b)
data[:,:,3] = alpha

img2 = Image.fromarray(data)
img2.save(r"c:\Users\a6644\OneDrive\Documents\Ember2\public\hologram_transparent.png")
print("Successfully created transparent hologram image.")
