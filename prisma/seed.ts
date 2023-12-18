import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedRecipeLabels();
  if (process.env.VERCEL_ENV !== "production") {
    await seedUserRecipes();
  }
}

async function seedRecipeLabels() {
  await prisma.recipeLabelCategory.upsert({
    where: { name: "Cuisine" },
    update: {},
    create: {
      name: "Cuisine",
      RecipeLabel: {
        create: [
          {
            name: "American",
          },
          {
            name: "Chinese",
          },
          {
            name: "French",
          },
          {
            name: "Indian",
          },
          {
            name: "Italian",
          },
          {
            name: "Japanese",
          },
          {
            name: "Mexican",
          },
          {
            name: "Thai",
          },
          {
            name: "Vietnamese",
          },
        ],
      },
    },
  });

  await prisma.recipeLabelCategory.upsert({
    where: { name: "Diet" },
    update: {},
    create: {
      name: "Diet",
      RecipeLabel: {
        create: [
          {
            name: "Gluten-Free",
          },
          {
            name: "Keto",
          },
          {
            name: "Low-Carb",
          },
          {
            name: "Low-Fat",
          },
          {
            name: "Paleo",
          },
          {
            name: "Vegan",
          },
          {
            name: "Vegetarian",
          },
        ],
      },
    },
  });
}

async function seedUserRecipes() {
  +(await prisma.user.upsert({
    where: { email: "testUser@example.com" },
    update: {},
    create: {
      name: "testUser",
      email: "testUser@example.com",
      emailVerified: new Date(),
      image: "https://placekitten.com/200/200",
      recipes: {
        create: [
          {
            name: "Spaghetti Carbonara",
            description:
              "A classic Italian pasta dish with creamy egg sauce and crispy bacon.",
            difficulty: "MEDIUM",
            images: [],
            labels: {
              connect: [
                {
                  name: "Italian",
                },
              ],
            },
            tags: ["Creamy", "Pasta", "Family Favorite"],
            steps: {
              create: [
                {
                  description:
                    "Bring water to a boil in a large pot and cook the spaghetti until al dente as indicated on the package. Drain and set aside.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Spaghetti",
                        quantity: 300,
                        unit: "GRAM",
                      },
                    ],
                  },
                },
                {
                  description:
                    "In a skillet, sauté the diced bacon over medium heat until it becomes crispy. Drain any excess fat.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: {
                      name: "Bacon",
                      quantity: 150,
                      unit: "GRAM",
                    },
                  },
                },
                {
                  description:
                    "In a bowl, whisk the eggs, add the grated Parmesan, and mix well. Season with salt and pepper.",
                  stepType: "MIX",
                  duration: 3,
                  ingredients: {
                    create: [
                      {
                        name: "Eggs",
                        quantity: 2,
                      },
                      {
                        name: "Parmesan",
                        quantity: 100,
                        unit: "GRAM",
                      },
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Pepper",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add the hot, drained spaghetti to the skillet with the bacon and mix.",
                  stepType: "MIX",
                  duration: 2,
                },
                {
                  description:
                    "Pour the egg-cheese mixture over the spaghetti and immediately toss well. The egg will turn into a creamy sauce due to the residual heat of the pasta.",
                  stepType: "COOK",
                  duration: 2,
                },
                {
                  description:
                    "Add a little pasta cooking water if needed to achieve the desired consistency.",
                  stepType: "COOK",
                  duration: 1,
                },
                {
                  description:
                    "Season with salt and pepper, and drizzle with a bit of olive oil.",
                  stepType: "PREP",
                  duration: 1,
                  ingredients: {
                    create: {
                      name: "Olive Oil",
                      quantity: 1,
                      unit: "TABLESPOON",
                    },
                  },
                },
                {
                  description:
                    "Serve and garnish with additional Parmesan if desired.",
                  stepType: "SERVE",
                  duration: 1,
                  ingredients: {
                    create: {
                      name: "Parmesan",
                      quantity: 50,
                      unit: "GRAM",
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Grilled Chicken Salad",
            description:
              "A healthy and delicious salad with grilled chicken and fresh veggies.",
            difficulty: "EASY",
            images: [],
            labels: {
              connect: [
                {
                  name: "Gluten-Free",
                },
                {
                  name: "Low-Carb",
                },
              ],
            },
            tags: ["Light Meal", "Summer Salad", "Grilled"],
            steps: {
              create: [
                {
                  description: "Preheat the grill to medium-high heat.",
                  stepType: "PREP",
                  duration: 10,
                },
                {
                  description:
                    "Season chicken breasts with salt, pepper, and olive oil. Grill for 6-8 minutes per side or until cooked through. Let them rest for a few minutes, then slice.",
                  stepType: "COOK",
                  duration: 15,
                  ingredients: {
                    create: [
                      {
                        name: "Chicken Breasts",
                        quantity: 2,
                      },
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Pepper",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Olive Oil",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "In a salad bowl, combine mixed greens, cherry tomatoes, cucumber, and red onion.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [
                      {
                        name: "Mixed Greens",
                        quantity: 150,
                        unit: "GRAM",
                      },
                      {
                        name: "Cherry Tomatoes",
                        quantity: 200,
                        unit: "GRAM",
                      },
                      {
                        name: "Cucumber",
                        quantity: 1,
                      },
                      {
                        name: "Red Onion",
                        quantity: 1,
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add the sliced grilled chicken to the salad. Drizzle with balsamic vinaigrette and toss well.",
                  stepType: "PREP",
                  duration: 2,
                  ingredients: {
                    create: {
                      name: "Balsamic Vinaigrette",
                      quantity: 3,
                      unit: "TABLESPOON",
                    },
                  },
                },
                {
                  description: "Serve the grilled chicken salad and enjoy.",
                  stepType: "SERVE",
                  duration: 1,
                },
              ],
            },
          },
          {
            name: "Pasta Primavera",
            description:
              "A colorful pasta dish with fresh spring vegetables and a creamy sauce.",
            difficulty: "MEDIUM",
            images: [],
            labels: {
              connect: [
                {
                  name: "Italian",
                },
                {
                  name: "Vegetarian",
                },
              ],
            },
            tags: [
              "Spring Dish",
              "Vegetable Pasta",
              "Colorful",
              "Weeknight Dinner",
            ],
            steps: {
              create: [
                {
                  description:
                    "Cook the pasta in a large pot of salted boiling water until al dente. Drain and set aside.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Pasta",
                        quantity: 300,
                        unit: "GRAM",
                      },
                    ],
                  },
                },
                {
                  description:
                    "In a skillet, sauté garlic and onion in olive oil until softened. Add asparagus, bell peppers, and cherry tomatoes. Cook until tender-crisp.",
                  stepType: "COOK",
                  duration: 7,
                  ingredients: {
                    create: [
                      {
                        name: "Garlic cloves",
                        quantity: 2,
                      },
                      {
                        name: "Onion",
                        quantity: 1,
                      },
                      {
                        name: "Asparagus",
                        quantity: 200,
                        unit: "GRAM",
                      },
                      {
                        name: "Bell Peppers",
                        quantity: 2,
                      },
                      {
                        name: "Cherry Tomatoes",
                        quantity: 250,
                        unit: "GRAM",
                      },
                    ],
                  },
                },
                {
                  description:
                    "In a bowl, mix cream, grated Parmesan, and basil. Season with salt and pepper.",
                  stepType: "PREP",
                  duration: 3,
                  ingredients: {
                    create: [
                      {
                        name: "Heavy Cream",
                        quantity: 150,
                        unit: "MILLILITER",
                      },
                      {
                        name: "Parmesan",
                        quantity: 100,
                        unit: "GRAM",
                      },
                      {
                        name: "Basil",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Pepper",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add the cooked pasta and the cream sauce to the skillet with the vegetables. Toss well to combine.",
                  stepType: "PREP",
                  duration: 2,
                },
                {
                  description:
                    "Serve the pasta primavera with a sprinkle of extra Parmesan and fresh basil leaves.",
                  stepType: "SERVE",
                  duration: 1,
                },
              ],
            },
          },
          {
            name: "Classic Beef Stew",
            description:
              "A hearty and comforting beef stew with tender meat and a rich, flavorful broth.",
            difficulty: "EXPERT",
            images: [],
            labels: {
              connect: [
                {
                  name: "American",
                },
              ],
            },
            tags: [
              "Slow Cooked",
              "Winter Comfort",
              "Family Favorite",
              "One-Pot Meal",
            ],
            steps: {
              create: [
                {
                  description:
                    "In a large bowl, toss cubed beef with flour, salt, and pepper. In a Dutch oven, heat oil over medium-high heat. Brown the beef in batches, then set it aside.",
                  stepType: "COOK",
                  duration: 15,
                  ingredients: {
                    create: [
                      {
                        name: "Beef Stew Meat",
                        quantity: 1,
                        unit: "KILOGRAM",
                      },
                      {
                        name: "Flour",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Pepper",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Vegetable Oil",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add chopped onions, carrots, and celery to the Dutch oven. Sauté until they start to soften. Return the browned beef to the pot.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [
                      {
                        name: "Onions",
                        quantity: 2,
                      },
                      {
                        name: "Carrots",
                        quantity: 3,
                      },
                      {
                        name: "Celery",
                        quantity: 3,
                      },
                    ],
                  },
                },
                {
                  description:
                    "Stir in beef broth, tomato paste, and red wine. Season with thyme, bay leaves, and Worcestershire sauce. Bring to a boil, then reduce heat and simmer for 2-3 hours.",
                  stepType: "COOK",
                  duration: 180,
                  ingredients: {
                    create: [
                      {
                        name: "Beef Broth",
                        quantity: 1,
                        unit: "LITER",
                      },
                      {
                        name: "Tomato Paste",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Red Wine",
                        quantity: 250,
                        unit: "MILLILITER",
                      },
                      {
                        name: "Thyme",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Bay Leaves",
                        quantity: 2,
                      },
                      {
                        name: "Worcestershire Sauce",
                        quantity: 2,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add diced potatoes and simmer for an additional 30-45 minutes until the beef and vegetables are tender. Adjust seasoning as needed.",
                  stepType: "COOK",
                  duration: 45,
                  ingredients: {
                    create: {
                      name: "Potatoes",
                      quantity: 500,
                      unit: "GRAM",
                    },
                  },
                },
                {
                  description:
                    "Serve the classic beef stew hot, garnished with fresh parsley.",
                  stepType: "SERVE",
                  duration: 1,
                },
              ],
            },
          },
          {
            name: "Spaghetti Aglio e Olio",
            description:
              "A simple yet flavorful Italian pasta dish with garlic, olive oil, and red pepper flakes.",
            difficulty: "EASY",
            labels: {
              connect: [
                {
                  name: "Italian",
                },
                {
                  name: "Vegetarian",
                },
              ],
            },
            tags: [
              "Classic",
              "Garlic Lovers",
              "Easy Dinner",
              "Weeknight Pasta",
            ],
            steps: {
              create: [
                {
                  description:
                    "Cook the spaghetti in a large pot of salted boiling water until al dente. Drain and set aside.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Spaghetti",
                        quantity: 300,
                        unit: "GRAM",
                      },
                    ],
                  },
                },
                {
                  description:
                    "In a skillet, heat olive oil over medium heat. Add minced garlic and red pepper flakes. Sauté for 2-3 minutes until fragrant.",
                  stepType: "COOK",
                  duration: 3,
                  ingredients: {
                    create: [
                      {
                        name: "Olive Oil",
                        quantity: 4,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Garlic cloves",
                        quantity: 4,
                      },
                      {
                        name: "Red Pepper Flakes",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Toss the cooked spaghetti in the skillet with the garlic and oil mixture. Season with salt and pepper. Serve hot, garnished with chopped parsley.",
                  stepType: "SEASON",
                  duration: 2,
                  ingredients: {
                    create: [
                      {
                        name: "Parsley",
                        quantity: 1,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Salt",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Pepper",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Homemade Margherita Pizza",
            description:
              "A classic and simple Italian pizza with fresh tomatoes, mozzarella, basil, and olive oil.",
            difficulty: "EASY",
            images: [],
            labels: {
              connect: [
                {
                  name: "Italian",
                },
                {
                  name: "Vegetarian",
                },
              ],
            },
            tags: [
              "Margherita",
              "Homemade Pizza",
              "Fresh Ingredients",
              "Family Favorite",
            ],
            steps: {
              create: [
                {
                  description:
                    "Preheat the oven with a pizza stone (if available) to the highest temperature (usually around 500°F or 260°C).",
                  stepType: "PREP",
                  duration: 15,
                },
                {
                  description:
                    "Roll out the pizza dough on a floured surface to your desired thickness. Transfer it to a pizza stone or baking sheet lined with parchment paper.",
                  stepType: "PREP",
                  duration: 10,
                },
                {
                  description:
                    "Spread a thin layer of tomato sauce on the pizza dough. Top with slices of fresh mozzarella, tomato slices, and fresh basil leaves.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [
                      {
                        name: "Pizza Dough",
                        quantity: 1,
                      },
                      {
                        name: "Tomato Sauce",
                        quantity: 1,
                        unit: "CUP",
                      },
                      {
                        name: "Fresh Mozzarella",
                        quantity: 200,
                        unit: "GRAM",
                      },
                      {
                        name: "Tomato",
                        quantity: 2,
                      },
                      {
                        name: "Fresh Basil Leaves",
                        quantity: 1,
                        unit: "CUP",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Drizzle olive oil over the pizza and season with salt and pepper.",
                  stepType: "PREP",
                  duration: 2,
                  ingredients: {
                    create: {
                      name: "Olive Oil",
                      quantity: 2,
                      unit: "TABLESPOON",
                    },
                  },
                },
                {
                  description:
                    "Bake the pizza in the preheated oven for 10-12 minutes, or until the crust is golden and the cheese is bubbly and slightly browned.",
                  stepType: "COOK",
                  duration: 12,
                },
                {
                  description:
                    "Slice the homemade Margherita pizza and serve hot.",
                  stepType: "SERVE",
                  duration: 1,
                },
              ],
            },
          },
          {
            name: "Vegetarian Stir-Fry",
            description:
              "A quick and healthy vegetarian stir-fry with a colorful mix of vegetables and tofu.",
            difficulty: "EASY",
            labels: {
              connect: [
                {
                  name: "Vegetarian",
                },
              ],
            },
            tags: [
              "Quick Meal",
              "Meatless Monday",
              "Asian Inspired",
              "Colorful",
            ],
            steps: {
              create: [
                {
                  description:
                    "Heat a wok or large skillet over medium-high heat. Add a tablespoon of vegetable oil.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [
                      {
                        name: "Vegetable Oil",
                        quantity: 1,
                        unit: "TABLESPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add diced tofu to the hot wok and stir-fry until golden brown on all sides.",
                  stepType: "COOK",
                  duration: 8,
                  ingredients: {
                    create: [
                      {
                        name: "Tofu",
                        quantity: 200,
                        unit: "GRAM",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Add a mix of colorful vegetables, such as bell peppers, broccoli, and snap peas. Stir-fry until the vegetables are tender-crisp.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [
                      {
                        name: "Bell Peppers",
                        quantity: 1,
                      },
                      {
                        name: "Broccoli Florets",
                        quantity: 1,
                        unit: "CUP",
                      },
                      {
                        name: "Snap Peas",
                        quantity: 1,
                        unit: "CUP",
                      },
                    ],
                  },
                },
                {
                  description:
                    "In a small bowl, mix soy sauce, sesame oil, and a pinch of sugar. Pour the sauce over the stir-fry and toss to combine.",
                  stepType: "MIX",
                  duration: 3,
                  ingredients: {
                    create: [
                      {
                        name: "Soy Sauce",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Sesame Oil",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      {
                        name: "Sugar",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
                {
                  description:
                    "Serve the vegetarian stir-fry over cooked rice or noodles. Garnish with chopped green onions and sesame seeds.",
                  stepType: "SERVE",
                  duration: 3,
                  ingredients: {
                    create: [
                      {
                        name: "Green Onions",
                        quantity: 2,
                        unit: "TABLESPOON",
                      },
                      {
                        name: "Sesame Seeds",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Fruit Smoothie",
            description: "A refreshing and easy-to-make fruit smoothie.",
            difficulty: "EASY",
            labels: {
              connect: [{ name: "Vegan" }, { name: "Gluten-Free" }],
            },
            steps: {
              create: [
                {
                  description:
                    "Blend together your favorite fruits with yogurt and ice cubes.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Assorted Fruits", quantity: 300, unit: "GRAM" },
                      { name: "Yogurt", quantity: 500, unit: "GRAM" },
                      { name: "Ice Cubes", quantity: 10, unit: "PIECE" },
                    ],
                  },
                },
                {
                  description: "Pour into a glass and enjoy!",
                  stepType: "SERVE",
                  duration: 2,
                },
              ],
            },
          },
          {
            name: "Beef Stir-Fry with Broccoli",
            description:
              "A savory beef stir-fry with fresh broccoli and a flavorful sauce.",
            difficulty: "MEDIUM",
            labels: {
              connect: [{ name: "Chinese" }],
            },
            steps: {
              create: [
                {
                  description:
                    "Slice beef thinly and marinate in soy sauce and cornstarch.",
                  stepType: "PREP",
                  duration: 20,
                  ingredients: {
                    create: [
                      { name: "Beef", quantity: 300, unit: "GRAM" },
                      { name: "Soy Sauce", quantity: 2, unit: "TABLESPOON" },
                      { name: "Cornstarch", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Blanch broccoli in boiling water. Drain and set aside.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [{ name: "Broccoli", quantity: 1, unit: "CUP" }],
                  },
                },
                {
                  description:
                    "Stir-fry marinated beef until browned. Add broccoli and sauce.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [
                      { name: "Sauce", quantity: 1, unit: "CUP" },
                      { name: "Additional Ingredients", quantity: 1 },
                    ],
                  },
                },
                {
                  description: "Serve over rice and garnish with sesame seeds.",
                  stepType: "SERVE",
                  duration: 3,
                  ingredients: {
                    create: [
                      { name: "Sesame Seeds", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Avocado Toast with Poached Egg",
            description:
              "A trendy and satisfying snack featuring creamy avocado on toasted bread with a perfectly poached egg.",
            difficulty: "MEDIUM",
            labels: {
              connect: [{ name: "Low-Fat" }, { name: "Vegetarian" }],
            },
            tags: ["Quick Breakfast", "Brunch"],
            steps: {
              create: [
                {
                  description:
                    "Toast slices of whole-grain bread until golden brown.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [{ name: "Whole-Grain Bread", quantity: 2 }],
                  },
                },
                {
                  description:
                    "Mash ripe avocado and spread it onto the toasted bread slices.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [{ name: "Ripe Avocado", quantity: 1 }],
                  },
                },
                {
                  description:
                    "Poach eggs until the whites are set but the yolks remain runny.",
                  stepType: "COOK",
                  duration: 4,
                  ingredients: {
                    create: [{ name: "Eggs", quantity: 2 }],
                  },
                },
                {
                  description:
                    "Place a poached egg on each avocado toast. Season with salt and pepper.",
                  stepType: "SEASON",
                  duration: 3,
                  ingredients: {
                    create: [
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Caprese Skewers",
            description:
              "A refreshing and bite-sized snack with cherry tomatoes, fresh mozzarella, and basil.",
            difficulty: "EASY",
            labels: {
              connect: [{ name: "Italian" }, { name: "Vegetarian" }],
            },
            tags: ["Appetizer", "Quick Bite"],
            steps: {
              create: [
                {
                  description:
                    "Thread one cherry tomato, one mozzarella ball, and one basil leaf onto each skewer.",
                  stepType: "PREP",
                  duration: 10,
                  ingredients: {
                    create: [
                      { name: "Cherry Tomatoes", quantity: 20 },
                      { name: "Fresh Mozzarella Balls", quantity: 20 },
                      { name: "Fresh Basil Leaves", quantity: 20 },
                      {
                        name: "Balsamic Glaze",
                        quantity: 1,
                        unit: "TABLESPOON",
                      },
                    ],
                  },
                },
                {
                  description: "Drizzle with balsamic glaze before serving.",
                  stepType: "SERVE",
                  duration: 2,
                },
              ],
            },
          },
          {
            name: "Hummus and Veggie Wraps",
            description:
              "A healthy and satisfying snack with whole wheat wraps, hummus, and colorful vegetables.",
            difficulty: "EASY",
            labels: {
              connect: [{ name: "Vegetarian" }, { name: "Low-Fat" }],
            },
            tags: ["Quick Lunch", "On-the-go"],
            steps: {
              create: [
                {
                  description:
                    "Spread a generous layer of hummus on a whole wheat wrap.",
                  stepType: "PREP",
                  duration: 3,
                  ingredients: {
                    create: [
                      { name: "Hummus", quantity: 4, unit: "TABLESPOON" },
                      { name: "Whole Wheat Wrap", quantity: 1 },
                    ],
                  },
                },
                {
                  description:
                    "Add sliced cucumbers, cherry tomatoes, red bell peppers, and spinach leaves.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Cucumbers", quantity: 1, unit: "PIECE" },
                      { name: "Cherry Tomatoes", quantity: 1, unit: "PIECE" },
                      { name: "Red Bell Peppers", quantity: 1, unit: "PIECE" },
                      { name: "Spinach Leaves", quantity: 500, unit: "GRAM" },
                    ],
                  },
                },
                {
                  description:
                    "Roll up the wrap tightly and slice into bite-sized pieces.",
                  stepType: "PREP",
                  duration: 3,
                },
                {
                  description: "Secure with toothpicks and serve.",
                  stepType: "SERVE",
                  duration: 2,
                },
              ],
            },
          },
          {
            name: "Chicken Noodle Soup",
            description:
              "A classic chicken noodle soup with tender chicken and vegetables.",
            difficulty: "MEDIUM",
            labels: {
              connect: [{ name: "American" }],
            },
            tags: ["Comfort Food", "Winter Soup"],
            steps: {
              create: [
                {
                  description:
                    "In a large pot, heat oil over medium-high heat. Sauté chopped onions, carrots, and celery until softened.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Oil", quantity: 2, unit: "TABLESPOON" },
                      { name: "Onions", quantity: 2 },
                      { name: "Carrots", quantity: 3 },
                      { name: "Celery", quantity: 3 },
                    ],
                  },
                },
                {
                  description:
                    "Add chicken broth, water, and chicken breasts. Bring to a boil, then reduce heat and simmer for 20 minutes.",
                  stepType: "COOK",
                  duration: 20,
                  ingredients: {
                    create: [
                      { name: "Chicken Broth", quantity: 1, unit: "LITER" },
                      { name: "Water", quantity: 1, unit: "LITER" },
                      { name: "Chicken Breasts", quantity: 2 },
                    ],
                  },
                },
                {
                  description:
                    "Remove the chicken breasts from the pot and shred them with two forks. Return the shredded chicken to the pot.",
                  stepType: "PREP",
                  duration: 5,
                },
                {
                  description:
                    "Add egg noodles and cook until al dente. Season with salt and pepper.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [
                      { name: "Egg Noodles", quantity: 200, unit: "GRAM" },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Serve the chicken noodle soup hot, garnished with chopped parsley.",
                  stepType: "SERVE",
                  duration: 2,
                  ingredients: {
                    create: [
                      { name: "Parsley", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Chicken Parmesan",
            description:
              "A classic Italian dish with breaded chicken, tomato sauce, and mozzarella.",
            difficulty: "EXPERT",
            labels: {
              connect: [{ name: "Italian" }],
            },
            tags: ["Family Favorite", "Weeknight Dinner"],
            steps: {
              create: [
                {
                  description:
                    "Preheat the oven to 400°F (200°C). Line a baking sheet with parchment paper.",
                  stepType: "PREP",
                  duration: 10,
                },
                {
                  description:
                    "In a bowl, combine breadcrumbs, grated Parmesan, and Italian seasoning. Season with salt and pepper.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Breadcrumbs", quantity: 1, unit: "CUP" },
                      { name: "Parmesan", quantity: 100, unit: "GRAM" },
                      {
                        name: "Italian Seasoning",
                        quantity: 1,
                        unit: "TEASPOON",
                      },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "In a separate bowl, whisk the eggs and season with salt and pepper.",
                  stepType: "MIX",
                  duration: 3,
                  ingredients: {
                    create: [
                      { name: "Eggs", quantity: 2 },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Dip the chicken breasts into the egg mixture, then coat them with the breadcrumb mixture. Place them on the prepared baking sheet.",
                  stepType: "PREP",
                  duration: 10,
                  ingredients: {
                    create: [{ name: "Chicken Breasts", quantity: 4 }],
                  },
                },
                {
                  description:
                    "Bake the chicken breasts for 20 minutes, or until the internal temperature reaches 165°F (75°C).",
                  stepType: "COOK",
                  duration: 20,
                },
                {
                  description:
                    "Top each chicken breast with tomato sauce and mozzarella. Bake for an additional 5 minutes, or until the cheese is melted.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Tomato Sauce ", quantity: 1, unit: "CUP" },
                      { name: "Mozzarella", quantity: 200, unit: "GRAM" },
                    ],
                  },
                },
                {
                  description:
                    "Serve the chicken Parmesan hot, garnished with chopped basil.",
                  stepType: "SERVE",
                  duration: 2,
                  ingredients: {
                    create: [
                      { name: "Basil", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Chicken Fajitas",
            description: "A flavorful Mexican dish with chicken and peppers.",
            difficulty: "MEDIUM",
            labels: {
              connect: [{ name: "Mexican" }],
            },
            tags: ["Family Favorite", "Weeknight Dinner"],
            steps: {
              create: [
                {
                  description:
                    "In a bowl, combine chili powder, cumin, garlic powder, onion powder, salt, and pepper. Season the chicken breasts with the spice mixture.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Chili Powder", quantity: 1, unit: "TEASPOON" },
                      { name: "Cumin", quantity: 1, unit: "TEASPOON" },
                      { name: "Garlic Powder", quantity: 1, unit: "TEASPOON" },
                      { name: "Onion Powder", quantity: 1, unit: "TEASPOON" },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                      { name: "Chicken Breasts", quantity: 4 },
                    ],
                  },
                },
                {
                  description:
                    "In a large skillet, heat oil over medium-high heat. Add sliced bell peppers and onions. Sauté until tender.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [
                      { name: "Oil", quantity: 2, unit: "TABLESPOON" },
                      { name: "Bell Peppers", quantity: 2 },
                      { name: "Onions", quantity: 2 },
                    ],
                  },
                },
                {
                  description:
                    "Push the vegetables to the side of the skillet and add the seasoned chicken breasts. Cook for 5-7 minutes per side, or until cooked through.",
                  stepType: "COOK",
                  duration: 15,
                },
                {
                  description:
                    "Slice the chicken breasts and return them to the skillet. Toss with the vegetables.",
                  stepType: "PREP",
                  duration: 2,
                },
                {
                  description:
                    "Serve the chicken fajitas with warm tortillas and your favorite toppings.",
                  stepType: "SERVE",
                  duration: 3,
                  ingredients: {
                    create: [
                      { name: "Tortillas", quantity: 4 },
                      { name: "Additional Ingredients", quantity: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Super Easy Guacamole",
            description: "A simple and delicious guacamole recipe.",
            difficulty: "EASY",
            labels: {
              connect: [{ name: "Mexican" }, { name: "Vegetarian" }],
            },
            tags: ["Quick Snack", "Dip"],
            steps: {
              create: [
                {
                  description: "Mash ripe avocados in a bowl until smooth.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [{ name: "Ripe Avocados", quantity: 2 }],
                  },
                },
                {
                  description:
                    "Add chopped tomatoes, red onion, and cilantro. Season with salt and pepper.",
                  stepType: "PREP",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Tomatoes", quantity: 2 },
                      { name: "Red Onion", quantity: 1 },
                      { name: "Cilantro", quantity: 1, unit: "TABLESPOON" },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description: "Serve the guacamole with tortilla chips.",
                  stepType: "SERVE",
                  duration: 2,
                  ingredients: {
                    create: [
                      { name: "Tortilla Chips", quantity: 1, unit: "PIECE" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Chicken Tikka Masala",
            description:
              "A classic Indian dish with tender chicken in a creamy tomato sauce.",
            difficulty: "EXPERT",
            labels: { connect: [{ name: "Indian" }] },
            tags: ["Family Favorite", "Weeknight Dinner"],
            steps: {
              create: [
                {
                  description:
                    "In a large bowl, combine yogurt, lemon juice, cumin, cinnamon, cayenne, black pepper, ginger, and salt. Stir until well combined.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Yogurt", quantity: 250, unit: "GRAM" },
                      { name: "Lemon Juice", quantity: 2, unit: "TABLESPOON" },
                      { name: "Cumin", quantity: 1, unit: "TEASPOON" },
                      { name: "Cinnamon", quantity: 1, unit: "TEASPOON" },
                      { name: "Cayenne", quantity: 1, unit: "TEASPOON" },
                      { name: "Black Pepper", quantity: 1, unit: "TEASPOON" },
                      { name: "Ginger", quantity: 1, unit: "TEASPOON" },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Add chicken and stir until well coated. Cover and refrigerate for at least 1 hour.",
                  stepType: "PREP",
                  duration: 60,
                  ingredients: {
                    create: [{ name: "Chicken", quantity: 500, unit: "GRAM" }],
                  },
                },
                {
                  description: "Preheat the oven to 500°F (260°C).",
                  stepType: "PREP",
                  duration: 10,
                },
                {
                  description:
                    "Place the marinated chicken on a baking sheet lined with aluminum foil. Bake for 10-15 minutes, or until the chicken is cooked through.",
                  stepType: "COOK",
                  duration: 15,
                },
                {
                  description:
                    "In a large skillet, heat oil over medium-high heat. Add chopped onions and sauté until softened.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Oil", quantity: 2, unit: "TABLESPOON" },
                      { name: "Onions", quantity: 2 },
                    ],
                  },
                },
                {
                  description:
                    "Add minced garlic and ginger. Sauté until fragrant.",
                  stepType: "COOK",
                  duration: 2,
                  ingredients: {
                    create: [
                      { name: "Garlic", quantity: 2 },
                      { name: "Ginger", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Add tomato sauce, heavy cream, and garam masala. Bring to a simmer.",
                  stepType: "COOK",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Tomato Sauce", quantity: 1, unit: "CUP" },
                      { name: "Heavy Cream", quantity: 250, unit: "GRAM" },
                      { name: "Garam Masala", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Add the cooked chicken to the skillet and simmer for an additional 10 minutes.",
                  stepType: "COOK",
                  duration: 10,
                },
                {
                  description:
                    "Serve the chicken tikka masala over cooked rice. Garnish with chopped cilantro.",
                  stepType: "SERVE",
                  duration: 3,
                  ingredients: {
                    create: [
                      { name: "Rice", quantity: 1, unit: "CUP" },
                      { name: "Cilantro", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Spaghetti and Meat Balls",
            description:
              "A classic American dish with spaghetti and meat balls.",
            difficulty: "EXPERT",
            labels: { connect: [{ name: "American" }] },
            tags: ["Family Favorite", "Weeknight Dinner"],
            steps: {
              create: [
                {
                  description:
                    "In a large bowl, combine ground beef, breadcrumbs, Parmesan, egg, parsley, garlic, salt, and pepper. Mix until well combined.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Ground Beef", quantity: 500, unit: "GRAM" },
                      { name: "Breadcrumbs", quantity: 1, unit: "CUP" },
                      { name: "Parmesan", quantity: 100, unit: "GRAM" },
                      { name: "Egg", quantity: 1 },
                      { name: "Parsley", quantity: 1, unit: "TABLESPOON" },
                      { name: "Garlic", quantity: 2 },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description: "Form the mixture into meatballs.",
                  stepType: "PREP",
                  duration: 5,
                },
                {
                  description:
                    "In a large skillet, heat oil over medium-high heat. Add the meatballs and cook until browned on all sides.",
                  stepType: "COOK",
                  duration: 10,
                  ingredients: {
                    create: [{ name: "Oil", quantity: 2, unit: "TABLESPOON" }],
                  },
                },
                {
                  description:
                    "Add tomato sauce and bring to a simmer. Cook for 10-15 minutes, or until the meatballs are cooked through.",
                  stepType: "COOK",
                  duration: 15,
                  ingredients: {
                    create: [
                      { name: "Tomato Sauce", quantity: 1, unit: "CUP" },
                    ],
                  },
                },
                {
                  description:
                    "Serve the spaghetti and meatballs hot, garnished with chopped parsley.",
                  stepType: "SERVE",
                  duration: 2,
                  ingredients: {
                    create: [
                      { name: "Spaghetti", quantity: 200, unit: "GRAM" },
                      { name: "Parsley", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Serve the spaghetti and meatballs hot, garnished with chopped parsley.",
                  stepType: "SERVE",
                  duration: 2,
                  ingredients: {
                    create: [
                      { name: "Spaghetti", quantity: 200, unit: "GRAM" },
                      { name: "Parsley", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Sweet Rolls",
            description: "A Whiterun guards favorite dessert",
            difficulty: "EASY",
            labels: {
              connect: [{ name: "French" }],
            },
            tags: ["Family Favorite", "Weeknight Dinner"],
            steps: {
              create: [
                {
                  description:
                    "In a large bowl, combine flour, sugar, salt, and yeast. Mix until well combined.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Flour", quantity: 500, unit: "GRAM" },
                      { name: "Sugar", quantity: 1, unit: "CUP" },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Yeast", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "Add warm milk, melted butter, and egg. Mix until well combined.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Milk", quantity: 250, unit: "GRAM" },
                      { name: "Butter", quantity: 50, unit: "GRAM" },
                      { name: "Egg", quantity: 1 },
                    ],
                  },
                },
                {
                  description:
                    "Knead the dough until smooth and elastic. Cover and let rise for 1 hour.",
                  stepType: "PREP",
                  duration: 60,
                },
                {
                  description:
                    "In a small bowl, combine brown sugar and cinnamon. Set aside.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Brown Sugar", quantity: 1, unit: "CUP" },
                      { name: "Cinnamon", quantity: 1, unit: "TABLESPOON" },
                    ],
                  },
                },
                {
                  description:
                    "On a floured surface, roll out the dough into a large rectangle. Spread softened butter on top, then sprinkle with the brown sugar mixture.",
                  stepType: "PREP",
                  duration: 10,
                  ingredients: {
                    create: [{ name: "Butter", quantity: 50, unit: "GRAM" }],
                  },
                },
                {
                  description:
                    "Roll up the dough and cut into 12 rolls. Place them in a greased baking dish.",
                  stepType: "PREP",
                  duration: 5,
                },
                {
                  description:
                    "Cover and let rise for 30 minutes. Bake at 350°F (180°C) for 20-25 minutes, or until golden brown.",
                  stepType: "COOK",
                  duration: 25,
                },
                {
                  description:
                    "In a small bowl, combine powdered sugar, milk, and vanilla. Drizzle over the warm rolls.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Powdered Sugar", quantity: 1, unit: "CUP" },
                      { name: "Milk", quantity: 1, unit: "TABLESPOON" },
                      { name: "Vanilla", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description: "Serve the sweet rolls warm.",
                  stepType: "SERVE",
                  duration: 2,
                },
              ],
            },
          },
          {
            name: "Omelette du Fromage",
            description: "A classic French dish with eggs and cheese.",
            difficulty: "EASY",
            labels: { connect: [{ name: "French" }] },
            tags: ["Family Favorite", "Breakfast"],
            steps: {
              create: [
                {
                  description:
                    "In a bowl, whisk together eggs, salt, and pepper.",
                  stepType: "MIX",
                  duration: 5,
                  ingredients: {
                    create: [
                      { name: "Eggs", quantity: 2 },
                      { name: "Salt", quantity: 1, unit: "TEASPOON" },
                      { name: "Pepper", quantity: 1, unit: "TEASPOON" },
                    ],
                  },
                },
                {
                  description:
                    "In a skillet, melt butter over medium-high heat. Add the egg mixture and cook for 2-3 minutes, or until the bottom is set.",
                  stepType: "COOK",
                  duration: 3,
                  ingredients: {
                    create: [{ name: "Butter", quantity: 50, unit: "GRAM" }],
                  },
                },
                {
                  description:
                    "Sprinkle shredded cheese on top of the omelette. Cook for an additional 1-2 minutes, or until the cheese is melted.",
                  stepType: "COOK",
                  duration: 2,
                  ingredients: {
                    create: [{ name: "Cheese", quantity: 50, unit: "GRAM" }],
                  },
                },
                {
                  description: "Fold the omelette in half and serve hot.",
                  stepType: "SERVE",
                  duration: 2,
                },
              ],
            },
          },
        ],
      },
    },
  }));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
