// data/menuData.js

export const menuData = [
  // BURGERS
  {
    id: 1,
    name: "Classic Smash Burger",
    description: "Double smashed patties with American cheese, lettuce, tomato, and special sauce on a brioche bun",
    price: 12.99,
    category: "burgers",
   image:"../../public/image.png",
    // image: "/images/menu/classic-smash-burger.jpg", // Replace with your image path or use placeholder
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: true,
    new: false,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 850,
    ingredients: [
      "Beef patties", "American cheese", "Lettuce", "Tomato", 
      "Special sauce", "Brioche bun"
    ]
  },
  {
    id: 2,
    name: "Spicy Jalapeño Burger",
    description: "Beef patty with pepper jack cheese, jalapeños, chipotle mayo, and crispy onion strings",
    price: 14.99,
    category: "burgers",
   image:"../../public/image.png",
    // image: "/images/menu/spicy-jalapeno-burger.jpg",
    spicy: true,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["dairy", "gluten"],
    calories: 920,
    ingredients: [
      "Beef patty", "Pepper jack cheese", "Jalapeños", "Chipotle mayo", 
      "Crispy onion strings", "Brioche bun"
    ]
  },
  {
    id: 3,
    name: "Impossible Plant Burger",
    description: "Plant-based patty with vegan cheese, avocado, arugula, and vegan aioli on a whole grain bun",
    price: 15.99,
    category: "burgers",
   image:"../../public/image.png",
    // image: "/images/menu/impossible-plant-burger.jpg",
    spicy: false,
    vegetarian: true,
    vegan: true,
    glutenFree: false,
    bestseller: false,
    new: true,
    allergens: ["gluten", "soy"],
    calories: 720,
    ingredients: [
      "Plant-based patty", "Vegan cheese", "Avocado", "Arugula", 
      "Vegan aioli", "Whole grain bun"
    ]
  },
  {
    id: 4,
    name: "Mushroom Swiss Burger",
    description: "Beef patty topped with sautéed mushrooms, Swiss cheese, and truffle aioli on a pretzel bun",
    price: 15.99,
    category: "burgers",
   image:"../../public/image.png",
    // image: "/images/menu/mushroom-swiss-burger.jpg",
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: true,
    new: false,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 880,
    ingredients: [
      "Beef patty", "Sautéed mushrooms", "Swiss cheese", "Truffle aioli", 
      "Pretzel bun"
    ]
  },

  // SANDWICHES
  {
    id: 5,
    name: "Chicken Avocado Club",
    description: "Grilled chicken breast with avocado, bacon, lettuce, tomato, and honey mustard on sourdough",
    price: 13.99,
    category: "sandwiches",
   image:"../../public/image.png",
    // image: "/images/menu/chicken-avocado-club.jpg",
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: true,
    new: false,
    allergens: ["gluten"],
    calories: 780,
    ingredients: [
      "Grilled chicken breast", "Avocado", "Bacon", "Lettuce", 
      "Tomato", "Honey mustard", "Sourdough bread"
    ]
  },
  {
    id: 6,
    name: "Mediterranean Veggie Wrap",
    description: "Hummus, feta, cucumber, roasted red peppers, olives, and mixed greens in a spinach wrap",
    price: 11.99,
    category: "sandwiches",
   image:"../../public/image.png",
    // image: "/images/menu/mediterranean-veggie-wrap.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["dairy", "gluten"],
    calories: 620,
    ingredients: [
      "Hummus", "Feta cheese", "Cucumber", "Roasted red peppers", 
      "Kalamata olives", "Mixed greens", "Spinach wrap"
    ]
  },
  {
    id: 7,
    name: "Buffalo Chicken Sandwich",
    description: "Crispy chicken tossed in buffalo sauce with blue cheese, celery slaw, and ranch on a potato roll",
    price: 12.99,
    category: "sandwiches",
   image:"../../public/image.png",
    // image: "/images/menu/buffalo-chicken-sandwich.jpg",
    spicy: true,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 850,
    ingredients: [
      "Crispy chicken", "Buffalo sauce", "Blue cheese", "Celery slaw", 
      "Ranch dressing", "Potato roll"
    ]
  },

  // PIZZAS
  {
    id: 8,
    name: "Margherita Pizza",
    description: "San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil",
    price: 14.99,
    category: "pizzas",
   image:"../../public/image.png",
    // image: "/images/menu/margherita-pizza.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: true,
    new: false,
    allergens: ["dairy", "gluten"],
    calories: 780,
    ingredients: [
      "San Marzano tomato sauce", "Fresh mozzarella", "Basil", 
      "Extra virgin olive oil", "Pizza dough"
    ]
  },
  {
    id: 9,
    name: "Pepperoni & Hot Honey Pizza",
    description: "Tomato sauce, mozzarella, pepperoni, and Mike's hot honey drizzle",
    price: 16.99,
    category: "pizzas",
   image:"../../public/image.png",
    // image: "/images/menu/pepperoni-hot-honey-pizza.jpg",
    spicy: true,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: true,
    allergens: ["dairy", "gluten"],
    calories: 920,
    ingredients: [
      "Tomato sauce", "Mozzarella", "Pepperoni", "Hot honey", "Pizza dough"
    ]
  },
  {
    id: 10,
    name: "Wild Mushroom Pizza",
    description: "White sauce, mozzarella, assorted wild mushrooms, truffle oil, and fresh thyme",
    price: 17.99,
    category: "pizzas",
   image:"../../public/image.png",
    // image: "/images/menu/wild-mushroom-pizza.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["dairy", "gluten"],
    calories: 820,
    ingredients: [
      "White sauce", "Mozzarella", "Assorted wild mushrooms", 
      "Truffle oil", "Fresh thyme", "Pizza dough"
    ]
  },

  // SALADS
  {
    id: 11,
    name: "Cobb Salad",
    description: "Romaine, grilled chicken, bacon, avocado, blue cheese, tomatoes, eggs, and ranch dressing",
    price: 13.99,
    category: "salads",
   image:"../../public/image.png",
    // image: "/images/menu/cobb-salad.jpg",
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    bestseller: true,
    new: false,
    allergens: ["dairy", "eggs"],
    calories: 640,
    ingredients: [
      "Romaine lettuce", "Grilled chicken", "Bacon", "Avocado", 
      "Blue cheese", "Cherry tomatoes", "Hard-boiled eggs", "Ranch dressing"
    ]
  },
  {
    id: 12,
    name: "Kale & Quinoa Salad",
    description: "Kale, quinoa, roasted sweet potatoes, dried cranberries, pumpkin seeds, and lemon tahini dressing",
    price: 12.99,
    category: "salads",
   image:"../../public/image.png",
    // image: "/images/menu/kale-quinoa-salad.jpg",
    spicy: false,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    bestseller: false,
    new: false,
    allergens: ["sesame"],
    calories: 520,
    ingredients: [
      "Kale", "Quinoa", "Roasted sweet potatoes", "Dried cranberries", 
      "Pumpkin seeds", "Lemon tahini dressing"
    ]
  },
  {
    id: 13,
    name: "Mediterranean Greek Salad",
    description: "Cucumber, tomato, red onion, kalamata olives, feta cheese, and Greek vinaigrette",
    price: 11.99,
    category: "salads",
   image:"../../public/image.png",
    // image: "/images/menu/greek-salad.jpg", 
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    bestseller: false,
    new: false,
    allergens: ["dairy"],
    calories: 480,
    ingredients: [
      "Cucumber", "Tomato", "Red onion", "Kalamata olives", 
      "Feta cheese", "Greek vinaigrette"
    ]
  },

  // MAIN DISHES
  {
    id: 14,
    name: "Grilled Salmon",
    description: "Atlantic salmon with lemon herb butter, roasted potatoes, and seasonal vegetables",
    price: 21.99,
    category: "mains",
   image:"../../public/image.png",
    // image: "/images/menu/grilled-salmon.jpg",
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    bestseller: true,
    new: false,
    allergens: ["dairy", "fish"],
    calories: 720,
    ingredients: [
      "Atlantic salmon", "Lemon herb butter", "Roasted potatoes", 
      "Seasonal vegetables"
    ]
  },
  {
    id: 15,
    name: "Ribeye Steak",
    description: "12oz aged ribeye with garlic herb butter, mashed potatoes, and grilled asparagus",
    price: 28.99,
    category: "mains",
   image:"../../public/image.png",
    // image: "/images/menu/ribeye-steak.jpg",
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    bestseller: false,
    new: false,
    allergens: ["dairy"],
    calories: 950,
    ingredients: [
      "12oz aged ribeye steak", "Garlic herb butter", "Mashed potatoes", 
      "Grilled asparagus"
    ]
  },
  {
    id: 16,
    name: "Tuscan Chicken Pasta",
    description: "Grilled chicken, sun-dried tomatoes, spinach, and creamy garlic parmesan sauce with fettuccine",
    price: 16.99,
    category: "mains",
   image:"../../public/image.png",
    // image: "/images/menu/tuscan-chicken-pasta.jpg",
    spicy: false,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: true,
    new: false,
    allergens: ["dairy", "gluten"],
    calories: 880,
    ingredients: [
      "Grilled chicken", "Sun-dried tomatoes", "Spinach", 
      "Garlic parmesan sauce", "Fettuccine pasta"
    ]
  },
  {
    id: 17,
    name: "Eggplant Parmesan",
    description: "Breaded eggplant layered with marinara, mozzarella, and parmesan, served with spaghetti",
    price: 15.99,
    category: "mains",
   image:"../../public/image.png",
    // image: "/images/menu/eggplant-parmesan.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["dairy", "gluten"],
    calories: 780,
    ingredients: [
      "Breaded eggplant", "Marinara sauce", "Mozzarella", 
      "Parmesan", "Spaghetti"
    ]
  },

  // SIDES
  {
    id: 18,
    name: "Truffle Fries",
    description: "Crispy fries tossed with truffle oil, parmesan cheese, and fresh herbs",
    price: 7.99,
    category: "sides",
   image:"../../public/image.png",
    // image: "/images/menu/truffle-fries.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    bestseller: true,
    new: false,
    allergens: ["dairy"],
    calories: 420,
    ingredients: [
      "Russet potatoes", "Truffle oil", "Parmesan cheese", 
      "Fresh herbs", "Sea salt"
    ]
  },
  {
    id: 19,
    name: "Sweet Potato Fries",
    description: "Crispy sweet potato fries with chipotle aioli dipping sauce",
    price: 6.99,
    category: "sides",
   image:"../../public/image.png",
    // image: "/images/menu/sweet-potato-fries.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    bestseller: false,
    new: false,
    allergens: ["eggs"],
    calories: 380,
    ingredients: [
      "Sweet potatoes", "Vegetable oil", "Sea salt", 
      "Chipotle aioli"
    ]
  },
  {
    id: 20,
    name: "Garlic Parmesan Brussels Sprouts",
    description: "Roasted Brussels sprouts tossed with garlic butter and parmesan cheese",
    price: 8.99,
    category: "sides",
   image:"../../public/image.png",
    // image: "/images/menu/garlic-brussels-sprouts.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    bestseller: false,
    new: false,
    allergens: ["dairy"],
    calories: 320,
    ingredients: [
      "Brussels sprouts", "Garlic butter", "Parmesan cheese", 
      "Black pepper"
    ]
  },

  // DESSERTS
  {
    id: 21,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream and berries",
    price: 8.99,
    category: "desserts",
   image:"../../public/image.png",
    // image: "/images/menu/chocolate-lava-cake.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: true,
    new: false,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 650,
    ingredients: [
      "Dark chocolate", "Butter", "Sugar", "Flour", 
      "Eggs", "Vanilla ice cream", "Fresh berries"
    ]
  },
  {
    id: 22,
    name: "New York Cheesecake",
    description: "Classic New York style cheesecake with graham cracker crust and seasonal berry compote",
    price: 7.99,
    category: "desserts",
   image:"../../public/image.png",
    // image: "/images/menu/new-york-cheesecake.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 580,
    ingredients: [
      "Cream cheese", "Sugar", "Eggs", "Vanilla", 
      "Graham cracker crust", "Seasonal berries"
    ]
  },
  {
    id: 23,
    name: "Tiramisu",
    description: "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream",
    price: 8.99,
    category: "desserts",
   image:"../../public/image.png",
    // image: "/images/menu/tiramisu.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    new: true,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 520,
    ingredients: [
      "Mascarpone cheese", "Espresso", "Ladyfingers", 
      "Cocoa powder", "Marsala wine"
    ]
  },

  // DRINKS
  {
    id: 24,
    name: "Craft IPA",
    description: "House brewed India Pale Ale with citrus and pine notes",
    price: 6.99,
    category: "drinks",
   image:"../../public/image.png",
    // image: "/images/menu/craft-ipa.jpg",
    spicy: false,
    vegetarian: true,
    vegan: true,
    glutenFree: false,
    bestseller: false,
    new: false,
    allergens: ["gluten"],
    calories: 220,
    ingredients: [
      "Malted barley", "Hops", "Yeast", "Water"
    ]
  },
  {
    id: 25,
    name: "Berry Smoothie",
    description: "Mixed berries, banana, almond milk, and honey",
    price: 5.99,
    category: "drinks",
   image:"../../public/image.png",
    // image: "/images/menu/berry-smoothie.jpg",
    spicy: false,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    bestseller: false,
    new: true,
    allergens: ["tree nuts"],
    calories: 280,
    ingredients: [
      "Strawberries", "Blueberries", "Banana", 
      "Almond milk", "Honey"
    ]
  },
  {
    id: 26,
    name: "Fresh Mint Lemonade",
    description: "House-made lemonade with fresh squeezed lemons and muddled mint leaves",
    price: 4.99,
    category: "drinks",
   image:"./",
    // image: "/images/menu/mint-lemonade.jpg",
    spicy: false,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    bestseller: true,
    new: false,
    allergens: [],
    calories: 180,
    ingredients: [
      "Fresh lemons", "Cane sugar", "Mint leaves", 
      "Filtered water"
    ]
  },
  {
    id: 27,
    name: "Cold Brew Coffee",
    description: "House-made cold brew coffee, steeped for 24 hours",
    price: 4.99,
    category: "drinks",
   image:"../../public/image.png",
    // image: "/images/menu/cold-brew.jpg",
    spicy: false,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    bestseller: false,
    new: false,
    allergens: [],
    calories: 15,
    ingredients: [
      "Single-origin coffee beans", "Filtered water"
    ]
  }
];

// Helper function to filter menu items by category
export function getMenuItemsByCategory(category) {
  if (category === 'all') {
    return menuData;
  }
  return menuData.filter(item => item.category === category);
}

// Helper function to get menu item by ID
export function getMenuItemById(id) {
  return menuData.find(item => item.id === parseInt(id));
}

// Helper function to get featured menu items (bestsellers)
export function getFeaturedItems(limit = 6) {
  return menuData
    .filter(item => item.bestseller)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, limit);
}

// Helper function to get new menu items
export function getNewItems(limit = 6) {
  return menuData
    .filter(item => item.new)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, limit);
}

// Helper function to get related menu items
export function getRelatedItems(category, currentId, limit = 3) {
  return menuData
    .filter(item => item.category === category && item.id !== currentId)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, limit);
}

// Helper function to search menu items
export function searchMenuItems(query) {
  const lowercaseQuery = query.toLowerCase();
  return menuData.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) || 
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.category.toLowerCase().includes(lowercaseQuery) ||
    item.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(lowercaseQuery)
    )
  );
}

// Helper function to filter menu items by dietary preferences
export function filterMenuItems({ 
  category = 'all', 
  vegetarian = false, 
  vegan = false, 
  glutenFree = false,
  spicy = false
}) {
  let filteredItems = category === 'all' 
    ? [...menuData] 
    : menuData.filter(item => item.category === category);

  if (vegetarian) {
    filteredItems = filteredItems.filter(item => item.vegetarian);
  }

  if (vegan) {
    filteredItems = filteredItems.filter(item => item.vegan);
  }

  if (glutenFree) {
    filteredItems = filteredItems.filter(item => item.glutenFree);
  }

  if (spicy) {
    filteredItems = filteredItems.filter(item => item.spicy);
  }

  return filteredItems;
}