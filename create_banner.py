#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont
import os

def create_banner():
    # Banner dimensions
    width = 1584
    height = 396

    # Create image with gradient background
    image = Image.new('RGB', (width, height), color='#1a202c')  # Dark blue-gray
    draw = ImageDraw.Draw(image)

    # Create a gradient background
    for y in range(height):
        # Gradient from dark blue to slightly lighter
        r = int(26 + (y / height) * 20)  # 26 to 46
        g = int(32 + (y / height) * 25)  # 32 to 57
        b = int(44 + (y / height) * 30)  # 44 to 74
        color = (r, g, b)
        draw.line([(0, y), (width, y)], fill=color)

    # Define areas
    left_width = width // 4  # 396px
    right_width = width - left_width  # 1188px

    # Try to load fonts, fall back to default if not available
    try:
        # Try different font paths that might exist on the system
        title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 48)
        subtitle_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
        blog_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 20)
    except:
        try:
            title_font = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 48)
            subtitle_font = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 24)
            blog_font = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 20)
        except:
            # Fall back to default font
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            blog_font = ImageFont.load_default()

    # Left side - Blog visit text (top area)
    blog_text_1 = "visit my blog"
    blog_text_2 = "owais.io"

    # Calculate blog text positions
    blog_y_start = 60

    # Draw blog text
    draw.text((20, blog_y_start), blog_text_1, fill='#e2e8f0', font=blog_font)
    draw.text((20, blog_y_start + 30), blog_text_2, fill='#60a5fa', font=blog_font)  # Blue color for URL

    # Right side - Professional branding
    right_x_start = left_width + 40

    # Main title
    main_title = "AIOps Engineer"
    # Get text size for centering
    title_bbox = draw.textbbox((0, 0), main_title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = right_x_start + (right_width - 40 - title_width) // 2

    draw.text((title_x, 80), main_title, fill='#ffffff', font=title_font)

    # Subtitle 1
    subtitle_1 = "DevSecOps Engineer"
    sub1_bbox = draw.textbbox((0, 0), subtitle_1, font=subtitle_font)
    sub1_width = sub1_bbox[2] - sub1_bbox[0]
    sub1_x = right_x_start + (right_width - 40 - sub1_width) // 2

    draw.text((sub1_x, 150), subtitle_1, fill='#94a3b8', font=subtitle_font)

    # Subtitle 2
    subtitle_2 = "Cloud Engineer"
    sub2_bbox = draw.textbbox((0, 0), subtitle_2, font=subtitle_font)
    sub2_width = sub2_bbox[2] - sub2_bbox[0]
    sub2_x = right_x_start + (right_width - 40 - sub2_width) // 2

    draw.text((sub2_x, 190), subtitle_2, fill='#94a3b8', font=subtitle_font)

    # Add a vertical separator line
    separator_x = left_width
    draw.line([(separator_x, 40), (separator_x, height - 40)], fill='#374151', width=2)

    # Add some decorative elements
    # Small dots pattern on the right
    for i in range(5, 15):
        for j in range(2, 8):
            dot_x = right_x_start + right_width - 100 + (i * 8)
            dot_y = 250 + (j * 8)
            if dot_x < width - 20 and dot_y < height - 20:
                draw.ellipse([dot_x, dot_y, dot_x + 3, dot_y + 3], fill='#4a5568')

    # Save the image
    output_path = '/home/centos9/blog/public/siawo-banner.png'
    image.save(output_path, 'PNG', quality=95)
    print(f"Banner created successfully: {output_path}")

    return output_path

if __name__ == "__main__":
    create_banner()