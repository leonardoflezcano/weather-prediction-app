from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
CORS(app)

# Ruta al archivo donde se guardarán los artículos
FILE_PATH = './server/noticia.json'

# Función para obtener el contenido HTML de la página
def get_html(url):
    response = requests.get(url)
    return response.text

# Función para extraer los artículos con la clase específica
def parse_articles(page_number):
    # Incluir el número de página en la URL
    BASE_URL = f"https://agenfor.com.ar/page/{page_number}/?s=temperatura"
    htmldata = get_html(BASE_URL)
    soup = BeautifulSoup(htmldata, 'html.parser')
    
    container = soup.find('div', class_='jeg_block_container')
    if not container:
        print(f"No se encontró el contenedor en la página {page_number}.")
        return []

    articles_html = container.find_all('div', class_='jeg_post_excerpt')
    if not articles_html:
        print(f"No se encontraron artículos en la página {page_number}.")
        return []

    articles = []
    for article_html in articles_html:
        article = {
            'title': '',
            'description': '',
            'image': '',
            'url': ''
        }
        
        title_tag = article_html.find_previous('h3', class_='jeg_post_title')
        if title_tag:
            article['title'] = title_tag.get_text(strip=True)
            link_tag = title_tag.find('a')
            if link_tag:
                article['url'] = link_tag['href']

        article['description'] = article_html.get_text(strip=True)

        thumbnail_container = article_html.find_previous('div', class_='jeg_thumb')
        if thumbnail_container:
            img_tag = thumbnail_container.find('img')
            if img_tag:
                src = img_tag.get('data-src') or img_tag.get('src')
                if src and "jeg-empty" not in src:
                    article['image'] = src

        articles.append(article)

    return articles

# Función para iterar sobre varias páginas y obtener los artículos
def scrape_all_articles():
    page_number = 1
    all_articles = []
    while page_number <= 7:  # Cambia este número según cuántas páginas desees raspar
        print(f"Scraping página {page_number}...")
        articles_data = parse_articles(page_number)
        if not articles_data:
            print(f"No se encontraron artículos en la página {page_number}. Deteniendo.")
            break
        all_articles.extend(articles_data)
        page_number += 1
    return all_articles

# Función para guardar los artículos en el archivo JSON
def addJson(articles):
    if not articles:  # Verifica si hay artículos para guardar
        print("No hay artículos para guardar.")
        return
    with open(FILE_PATH, 'w') as f:
        json.dump(articles, f, indent=2)
    print(f"{len(articles)} artículos guardados en {FILE_PATH}.")

# Ruta de la API para obtener las noticias
@app.route('/api/news', methods=['GET'])
def get_news():
    articles = scrape_all_articles()  # Llamar a la función que obtiene los artículos
    addJson(articles)  # Guardar los artículos en el archivo JSON
    return jsonify(articles)  # Devolver los artículos en formato JSON

# Iniciar el servidor
if __name__ == '__main__':
    app.run(port=5000, debug=True)