import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data (optional)
    await prisma.recipe.deleteMany();
    await prisma.user.deleteMany();
    
    // Create demo user with hashed password
    const hashedPassword = await bcrypt.hash('password', 12);
    const demoUser = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User',
        password: hashedPassword,
      },
    });

    console.log('Created demo user:', demoUser.email);
    
    // Create initial recipes
    const recipes = [
      {
        title: 'Pasta Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'],
        instructions: 'Cook pasta until al dente. In a bowl, mix eggs and cheese. Cook pancetta until crispy. Combine pasta with egg mixture and pancetta. Season with black pepper.',
        prepTime: 10,
        cookTime: 15,
        authorId: demoUser.id,
      },
      {
        title: 'Greek Salad',
        ingredients: ['Cucumber', 'Tomato', 'Red Onion', 'Feta Cheese', 'Olives', 'Olive Oil'],
        instructions: 'Dice cucumber, tomatoes, and red onion. Combine in a bowl with olives. Crumble feta cheese on top. Drizzle with olive oil and season with salt and oregano.',
        prepTime: 15,
        cookTime: 0,
        authorId: demoUser.id,
      },
      {
        title: 'Chocolate Chip Cookies',
        ingredients: ['Flour', 'Butter', 'Brown Sugar', 'White Sugar', 'Eggs', 'Vanilla Extract', 'Baking Soda', 'Salt', 'Chocolate Chips'],
        instructions: 'Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Fold in chocolate chips. Bake at 350°F for 10-12 minutes.',
        prepTime: 20,
        cookTime: 12,
        authorId: demoUser.id,
      }
    ];
    
    for (const recipe of recipes) {
      await prisma.recipe.create({ data: recipe });
    }
    
    console.log('Database has been seeded');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
