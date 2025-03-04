from store_helper import ProductRecommender, Product

def load_sample_products():
    """Load sample product data."""
    return [
        Product(1, "Pizza Dough", "Fresh pizza dough, ready to roll", "Bakery", 3.99, 50),
        Product(2, "Mozzarella", "Fresh mozzarella cheese", "Dairy", 4.99, 100),
        Product(3, "Tomato Sauce", "Pizza sauce, Italian herbs", "Condiments", 2.99, 75),
        Product(4, "Pepperoni", "Sliced pepperoni", "Deli", 3.99, 60),
        Product(5, "Fresh Basil", "Organic basil leaves", "Produce", 1.99, 30),
        Product(6, "Olive Oil", "Extra virgin olive oil", "Pantry", 6.99, 40),
        Product(7, "Garlic", "Fresh garlic bulbs", "Produce", 0.99, 100),
        Product(8, "Oregano", "Dried oregano leaves", "Spices", 2.99, 45),
        Product(9, "Red Pepper Flakes", "Crushed red pepper", "Spices", 1.99, 55),
        Product(10, "Flour", "All-purpose flour", "Baking", 4.99, 80),
    ]

def main():
    print("Initializing Product Recommender...")
    recommender = ProductRecommender()
    
    # Load and add sample products
    products = load_sample_products()
    recommender.add_products(products)
    print("Products loaded successfully!")
    
    while True:
        print("\n=== Product Recommender System ===")
        print("1. Search for products")
        print("2. Get recipe recommendations")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ")
        
        if choice == "1":
            query = input("\nEnter your search query: ")
            results = recommender.search(query, top_k=5)
            
            print("\nSearch Results:")
            for i, result in enumerate(results, 1):
                print(f"\n{i}. {result['name']}")
                print(f"   Category: {result['category']}")
                print(f"   Price: ${result['price']:.2f}")
                print(f"   In Stock: {result['inventory']}")
                print(f"   Relevance Score: {result['relevance_score']:.2f}")
                
        elif choice == "2":
            recipe = input("\nWhat would you like to make? ")
            recommendations = recommender.get_recipe_recommendations(recipe)
            
            print("\nRecommended Ingredients:")
            for i, ingredient in enumerate(recommendations['required_ingredients'], 1):
                print(f"\n{i}. {ingredient['name']}")
                print(f"   Price: ${ingredient['price']:.2f}")
                print(f"   In Stock: {ingredient['inventory']}")
            
            print(f"\nEstimated Total Cost: ${recommendations['total_cost']:.2f}")
            
        elif choice == "3":
            print("\nThank you for using the Product Recommender!")
            break
        else:
            print("\nInvalid choice. Please try again.")

if __name__ == "__main__":
    main()