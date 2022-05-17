import requests
from bs4 import BeautifulSoup
import json


def Article(siteURL):
    data = []
    obj = {}
    r0 = requests.get(siteURL)
    soup0 = BeautifulSoup(r0.content, 'html.parser')
    images_list = []
    images = soup0.select('figure')
    section = soup0.find_all('div', {"class": "typography__StyledTypography-owin6q-0 hUdDVt at-text"})
    published = soup0.find('div', {"class": "at-created label-with-icon"})
 
    obj['title'] = soup0.find('h1').getText()
    if(published == None):
        obj['published'] = None
    else:
        obj['published'] = published.getText()
    
    for image in images:
        src = image.img.get('src')
        alt = image.img.get('alt')
        images_list.append({"src": src, "alt": alt})
       
    for image in images_list:
        obj["image"] = image
    
    paragraphs = []
  
    for paragraph in section:
        paragraphs.append(paragraph.p.getText())
    obj['paragraph'] = paragraphs

    data.append(obj)
    return data


data = []

site0 = 'https://www.coindesk.com'
# site1 = 'https://coinmarketcap.com/headlines/news/'

r0 = requests.get(site0)
# r1 = requests.get(site1)

# Parsing the HTML
soup0 = BeautifulSoup(r0.content, 'html.parser')

# soup1 = BeautifulSoup(r1.content, 'html.parser')

# find_all will locate a particular tag
# .text will store items listed within a tag
# .get will store the data within a parameter of the given tag

# for link in soup1.find_all('a'):
#     title = link.text
#     url = link.get('href')
#     if title and url:
#         title = title.replace('\n', '')
#         title = title.replace('#038;', '')
#         if 'https:' in url and 'coinmarketcap' not in url.lower() and 'youtube' not in url.lower():

#             if "www" in url.lower() or "crypto.news" in url.lower() or "blockchain.news" in url.lower():
#                 source = url

#             else:
#                 char1 = "/"
#                 char2 = "."
#                 source = url[url.find(char1) + 2: url.find(char2)]

#             obj = {
#                 "title": title,
#                 "source": source,
#                 "url": url,
#             }
#             data.append(obj)
for link in soup0.find_all('a'):
    title = link.get('title')
    url = site0+link.get('href')
    source = 'CoinDesk'
  
    if title and len(url) > 1:
     
        title = title.replace('\n', '')
        title = title.replace('#038;', '')
     
   
        obj = {
            "article": Article(url),
            "title": title,
            "source": source,
            "url": url,
        }
     
        data.append(obj)

unique_data = {each['url']: each for each in data}.values()
formattedData = []

for x in unique_data:
    formattedData.append(x)

with open('news.json', 'w', encoding='utf-8') as f:
    json.dump(formattedData, f, ensure_ascii=False, indent=4)


# Making a GET request

# images_list = []
#
# images = soup.select('img')
# for image in images:
#     src = image.get('src')
#     alt = image.get('alt')
#     images_list.append({"src": src, "alt": alt})
#
# for image in images_list:
#     print(image)
#
# soup = BeautifulSoup(r.text, 'html.parser')
# titles = soup.find_all('a', attrs={'class', 'head'})
# print(titles)
