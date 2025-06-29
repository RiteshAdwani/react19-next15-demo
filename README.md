# RecipEase - React 19 Showcase App

A recipe sharing application demonstrating **React 19's cutting-edge features** with proper separation of concerns.

## 🚀 React 19 Features Demonstrated

### 1. **useOptimistic** - Instant UI Updates
- **Like buttons** provide immediate feedback without loading states
- UI updates instantly while server action runs in background
- Automatic error handling and reversion

```tsx
// Pure optimistic updates - no loading spinners needed!
const [optimisticLikeState, addOptimisticLike] = useOptimistic(
  { isLiked: isInitiallyLiked, likes: recipe.likes },
  (state, newIsLiked: boolean) => ({
    isLiked: newIsLiked,
    likes: newIsLiked ? state.likes + 1 : state.likes - 1,
  })
);

const handleLike = async () => {
  addOptimisticLike(!optimisticLikeState.isLiked); // Instant!
  await toggleRecipeLike(recipe.id); // Background sync
};
```

### 2. **useTransition** - Loading States for Heavy Operations
- **Delete operations** show proper loading states
- Used for operations that need user feedback during processing

```tsx
const [isDeleting, startDeleteTransition] = useTransition();

const handleDelete = () => {
  startDeleteTransition(async () => {
    // Heavy operation with loading state
    await deleteRecipe(recipe.id);
  });
};
```

### 3. **Ref as Prop** - No More forwardRef!
- Buttons accept `ref` as regular props
- Cleaner component APIs

```tsx
// React 19: Direct ref usage, no forwardRef needed!
<button ref={likeButtonRef} onClick={handleLike}>
  Like
</button>
```

### 4. **useActionState** - Modern Form Handling
- Direct server action integration
- Built-in loading and error states

```tsx
const [state, formAction, isPending] = useActionState(loginAction, { message: "" });
```

### 5. **Enhanced use() API** - Better Context & Data Fetching
- Cleaner context consumption
- Improved error boundaries

```tsx
const user = use(UserContext); // React 19 enhanced use()
```

### 6. **Server Actions** - No API Routes Needed
- Direct function calls to server
- Simplified data mutations

## 🏗️ Architecture

### Hook Separation Strategy
- **useOptimistic**: For immediate UI feedback (likes, favorites)
- **useTransition**: For heavy operations requiring loading states (delete, create)
- **useActionState**: For form submissions with validation
- **Ref as Prop**: For direct DOM access without forwardRef

### Key Files
- `components/RecipeCard.tsx` - Demonstrates useOptimistic + useTransition separation
- `components/ActionButton.tsx` - Ref as prop implementation
- `components/LoginForm.tsx` - useActionState for forms
- `context/UserContext.tsx` - Enhanced use() API
- `actions/*.ts` - Server actions replacing API routes

## 🚀 Quick Start

```bash
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

## 🎯 Testing React 19 Features

1. **useOptimistic**: Click like buttons - see instant updates!
2. **useTransition**: Delete a recipe - see loading spinner
3. **Ref as Prop**: Check ActionButton component code
4. **useActionState**: Try login/register forms
5. **Server Actions**: All CRUD operations work without API routes

## 🔐 Features

- User authentication with bcrypt
- Recipe CRUD operations
- Like/unlike functionality
- Author-only edit/delete permissions
- Responsive design

Built with **Next.js 15**, **React 19**, **Prisma**, **MongoDB**, and **TypeScript**.
