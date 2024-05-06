from bs4 import BeautifulSoup
import requests
import json

# Load the webpage
response = requests.get("https://pouzzafest.com/en/bands")

# Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find all bands
bands = soup.find_all(attrs={"itemprop": "performer"})
for outer_band in soup.find_all(attrs={"itemprop": "performer"}):
    bands.extend(outer_band.find_all(attrs={"itemprop": "performer"}))

# Initialize an empty list to hold band info
band_info = []

for band in bands:
	# Find the band name
	band_name = band.find(attrs={"itemprop": "name"}).get_text()

	# Find the city
	city = band.find('h6', class_=lambda x: x != 'bandextrainfo').get_text()

	# Find website link that is not from bandcamp.com
	website_link = band.find('a', href=lambda href: href and "bandcamp.com" not in href, itemprop='sameAs')
	website_url = website_link['href'] if website_link else None

	facebook_link = band.find('a', href=lambda href: href and "facebook.com" in href)
	facebook_url = facebook_link['href'] if facebook_link else None

	instagram_link = band.find('a', href=lambda href: href and "instagram.com" in href)
	instagram_url = instagram_link['href'] if instagram_link else None

	bandcamp_link = band.find('a', href=lambda href: href and "bandcamp.com" in href)
	bandcamp_url = bandcamp_link['href'] if bandcamp_link else None

# Add the info to the list
	band_info.append({
		"name": band_name,
		"city": city,
		"websiteURL": website_url,
		"facebookURL": facebook_url,
		"instagramURL": instagram_url,
		"bandcampURL": bandcamp_url
	})

# Now 'band_info' is a list of dictionaries, each containing info about a band

# Write the list to a JSON file
with open('list.json', 'w') as f:
    json.dump(band_info, f, ensure_ascii=False, indent=4)
