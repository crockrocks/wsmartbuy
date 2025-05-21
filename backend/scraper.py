import requests
from bs4 import BeautifulSoup
import time
import random
from typing import List, Dict
from urllib.parse import quote_plus
import logging
import mongo

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EcommerceScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def _clean_price(self, price_str: str) -> float:
        """Clean price string and convert to float."""
        if not price_str:
            return 0.0
        cleaned = price_str.replace('₹', '').replace(',', '').strip()
        try:
            return float(cleaned)
        except ValueError:
            return 0.0

    def _get_flipkart_items(self, query: str, page: int = 1, preferences: Dict = None) -> List[Dict]:
        items = []
        try:
            search_url = f"https://www.flipkart.com/search?q={quote_plus(query)}&page={page}"
            response = self.session.get(search_url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            product_cards = soup.find_all('div', {'class': '_1AtVbE'})
            
            for card in product_cards:
                try:
                    title_elem = card.find('div', {'class': '_4rR01T'})
                    price_elem = card.find('div', {'class': '_30jeq3'})
                    image_elem = card.find('img', {'class': '_396cs4'})
                    link_elem = card.find('a', {'class': '_1fQZEK'})
                    
                    if title_elem and price_elem:
                        price = self._clean_price(price_elem.text)
                        
                        if preferences and 'max_price' in preferences and price > preferences['max_price']:
                            continue
                            
                        items.append({
                            'id': str(len(items) + 1),
                            'name': title_elem.text.strip(),
                            'price': price,
                            'image': image_elem.get('src', '') if image_elem else '',
                            'category': 'all',
                            'source': 'Flipkart',
                            'link': 'https://www.flipkart.com' + link_elem.get('href', '') if link_elem else ''
                        })
                except Exception as e:
                    logger.error(f"Error processing Flipkart item: {str(e)}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error scraping Flipkart: {str(e)}")
        
        return items

    def _get_amazon_items(self, query: str, page: int = 1, preferences: Dict = None) -> List[Dict]:
        items = []
        try:
            search_url = f"https://www.amazon.in/s?k={quote_plus(query)}&page={page}"
            response = self.session.get(search_url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            product_cards = soup.find_all('div', {'data-component-type': 's-search-result'})
            
            for card in product_cards:
                try:
                    title_elem = card.find('h2')
                    price_elem = card.find('span', {'class': 'a-price-whole'})
                    image_elem = card.find('img', {'class': 's-image'})
                    link_elem = card.find('a', {'class': 'a-link-normal'})
                    
                    if title_elem and price_elem:
                        price = self._clean_price(price_elem.text)
                        
                        if preferences and 'max_price' in preferences and price > preferences['max_price']:
                            continue
                            
                        items.append({
                            'id': str(len(items) + 1),
                            'name': title_elem.text.strip(),
                            'price': price,
                            'image': image_elem.get('src', '') if image_elem else '',
                            'category': 'all',
                            'source': 'Amazon',
                            'link': 'https://www.amazon.in' + link_elem.get('href', '') if link_elem else ''
                        })
                except Exception as e:
                    logger.error(f"Error processing Amazon item: {str(e)}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error scraping Amazon: {str(e)}")
        
        return items

    def _get_myntra_items(self, query: str, page: int = 1, preferences: Dict = None) -> List[Dict]:
        items = []
        try:
            search_url = f"https://www.myntra.com/{quote_plus(query)}?p={page}"
            response = self.session.get(search_url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            product_cards = soup.find_all('li', {'class': 'product-base'})
            
            for card in product_cards:
                try:
                    title_elem = card.find('h3', {'class': 'product-brand'})
                    price_elem = card.find('span', {'class': 'product-discountedPrice'})
                    image_elem = card.find('img', {'class': 'img-responsive'})
                    link_elem = card.find('a', {'class': 'product-base-link'})
                    
                    if title_elem and price_elem:
                        price = self._clean_price(price_elem.text)
                        
                        # Apply price filter from preferences
                        if preferences and 'max_price' in preferences and price > preferences['max_price']:
                            continue
                            
                        items.append({
                            'id': str(len(items) + 1),
                            'name': title_elem.text.strip(),
                            'price': price,
                            'image': image_elem.get('src', '') if image_elem else '',
                            'category': 'all',
                            'source': 'Myntra',
                            'link': 'https://www.myntra.com' + link_elem.get('href', '') if link_elem else ''
                        })
                except Exception as e:
                    logger.error(f"Error processing Myntra item: {str(e)}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error scraping Myntra: {str(e)}")
        
        return items

    def _get_souled_store_items(self, query: str, page: int = 1, preferences: Dict = None) -> List[Dict]:
        items = []
        try:
            search_url = f"https://www.thesouledstore.com/search?q={quote_plus(query)}&page={page}"
            response = self.session.get(search_url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            product_cards = soup.find_all('div', {'class': 'product-card'})
            
            for card in product_cards:
                try:
                    title_elem = card.find('h3', {'class': 'product-title'})
                    price_elem = card.find('span', {'class': 'product-price'})
                    image_elem = card.find('img', {'class': 'product-image'})
                    link_elem = card.find('a', {'class': 'product-link'})
                    
                    if title_elem and price_elem:
                        price = self._clean_price(price_elem.text)
                        
                        # Apply price filter from preferences
                        if preferences and 'max_price' in preferences and price > preferences['max_price']:
                            continue
                            
                        items.append({
                            'id': str(len(items) + 1),
                            'name': title_elem.text.strip(),
                            'price': price,
                            'image': image_elem.get('src', '') if image_elem else '',
                            'category': 'all',
                            'source': 'The Souled Store',
                            'link': 'https://www.thesouledstore.com' + link_elem.get('href', '') if link_elem else ''
                        })
                except Exception as e:
                    logger.error(f"Error processing Souled Store item: {str(e)}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error scraping Souled Store: {str(e)}")
        
        return items

    def _apply_preferences_to_query(self, query: str, preferences: Dict) -> str:
        """Enhance search query based on user preferences."""
        if not preferences:
            return query
            
        enhanced_query = query
        
        # Add preferred brands if specified
        if 'preferred_brands' in preferences and preferences['preferred_brands']:
            brands = ' OR '.join(preferences['preferred_brands'])
            enhanced_query = f"{enhanced_query} ({brands})"
            
        # Add preferred categories if specified
        if 'preferred_categories' in preferences and preferences['preferred_categories']:
            categories = ' OR '.join(preferences['preferred_categories'])
            enhanced_query = f"{enhanced_query} ({categories})"
            
        return enhanced_query

    def scrape_items(self, query: str, page: int = 1, user_id: str = None) -> List[Dict]:
        """Scrape items from multiple e-commerce websites with user preferences."""
        all_items = []
        
        # Get user preferences if user_id is provided
        preferences = None
        if user_id:
            preferences = mongo.get_preferences(user_id)
            
        # Enhance query based on preferences
        enhanced_query = self._apply_preferences_to_query(query, preferences)
        
        # Add random delay between requests
        time.sleep(random.uniform(1, 3))
        
        # Scrape from all supported sites
        sites = [
            self._get_flipkart_items,
            self._get_amazon_items,
            self._get_myntra_items,
            self._get_souled_store_items
        ]
        
        for site_scraper in sites:
            try:
                items = site_scraper(enhanced_query, page, preferences)
                all_items.extend(items)
                # Add random delay between sites
                time.sleep(random.uniform(1, 3))
            except Exception as e:
                logger.error(f"Error scraping site: {str(e)}")
                continue
        
        # Sort items by price if preferred_price_range is specified
        if preferences and 'preferred_price_range' in preferences:
            all_items.sort(key=lambda x: x['price'])
            
        return all_items 