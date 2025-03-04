import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Dict
from dataclasses import dataclass
import faiss
import torch
from transformers import pipeline

@dataclass
class Product:
    id: int
    name: str
    description: str
    category: str
    price: float
    inventory: int

class ProductRecommender:
    def __init__(self):
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.llm = pipeline(
            "text2text-generation",
            model="google/flan-t5-base",
            device=0 if torch.cuda.is_available() else -1
        )
        self.products: List[Product] = []
        self.product_embeddings = None
        self.index = None
        
    def add_products(self, products: List[Product]):
        self.products = products
        descriptions = [f"{p.name} {p.description} {p.category}" for p in products]
        self.product_embeddings = self.embedding_model.encode(descriptions)
        dimension = self.product_embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(self.product_embeddings.astype('float32'))
    
    def _parse_user_intent(self, query: str) -> str:
        prompt = f"""
        Convert the following customer query into relevant search terms for a retail store:
        Query: {query}
        Extract key ingredients or products needed. If it's a recipe-like query,
        list all possible ingredients needed.
        """
        response = self.llm(prompt, max_length=100)[0]['generated_text']
        return response
    
    def search(self, query: str, top_k: int = 5) -> List[Dict]:
        parsed_query = self._parse_user_intent(query)
        query_embedding = self.embedding_model.encode([parsed_query])
        distances, indices = self.index.search(
            query_embedding.astype('float32'), 
            top_k
        )
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            product = self.products[idx]
            results.append({
                'id': product.id,
                'name': product.name,
                'category': product.category,
                'price': product.price,
                'inventory': product.inventory,
                'relevance_score': float(1 / (1 + distance))
            })
        
        return results

    def get_recipe_recommendations(self, recipe_query: str) -> Dict:
        prompt = f"""
        Break down the following recipe request into required ingredients:
        Recipe: {recipe_query}
        List all possible ingredients needed, including basic pantry items.
        """
        
        ingredients = self.llm(prompt, max_length=150)[0]['generated_text']
        

        recommendations = {
            'recipe_query': recipe_query,
            'required_ingredients': [],
            'total_cost': 0.0
        }
        
        for ingredient in ingredients.split('\n'):
            if ingredient.strip():
                matches = self.search(ingredient, top_k=1)
                if matches:
                    recommendations['required_ingredients'].append(matches[0])
                    recommendations['total_cost'] += matches[0]['price']
        
        return recommendations

# def main():
#     sample_products = [
#         Product(1, "Pizza Dough", "Fresh pizza dough", "Bakery", 3.99, 50),
#         Product(2, "Mozzarella", "Fresh mozzarella cheese", "Dairy", 4.99, 100),
#         Product(3, "Tomato Sauce", "Pizza sauce", "Condiments", 2.99, 75),
#         Product(4, "Pepperoni", "Sliced pepperoni", "Deli", 3.99, 60),
#         Product(5, "Fresh Basil", "Organic basil leaves", "Produce", 1.99, 30),
#     ]
    
#     recommender = ProductRecommender()
#     recommender.add_products(sample_products)
#     print("Basic product search:")
#     results = recommender.search("I need cheese for pizza")
#     print(results)
#     print("\nRecipe-based recommendation:")
#     recipe_results = recommender.get_recipe_recommendations("I want to make a margherita pizza")
#     print(recipe_results)

# if __name__ == "__main__":
#     main()