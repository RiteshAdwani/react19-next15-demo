/**
 * @description React 19 Features showcase component
 */
export default function React19Features() {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ⚛️ React 19 Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* useOptimistic Demo */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            🚀 useOptimistic
          </h3>
          <p className="text-gray-700 mb-4">
            Click any ❤️ like button on recipes to see instant UI updates
            without loading spinners!
          </p>
          <div className="bg-white p-4 rounded-md">
            <code className="text-sm text-green-600">
              addOptimistic(!isLiked) // Instant feedback!
            </code>
          </div>
        </div>

        {/* useTransition Demo */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            ⚡ useTransition
          </h3>
          <p className="text-gray-700 mb-4">
            Delete your own recipes to see loading states for heavy operations.
          </p>
          <div className="bg-white p-4 rounded-md">
            <code className="text-sm text-blue-600">
              startTransition(() =&gt; deleteRecipe())
            </code>
          </div>
        </div>

        {/* Ref as Prop Demo */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">
            📎 Ref as Prop
          </h3>
          <p className="text-gray-700 mb-4">
            No more forwardRef! Buttons accept ref as regular props.
          </p>
          <div className="bg-white p-4 rounded-md">
            <code className="text-sm text-purple-600">
              &lt;button ref=&#123;myRef&#125; /&gt; // No forwardRef!
            </code>
          </div>
          <div className="mt-4 text-sm text-purple-600">
            Check ActionButton.tsx code
          </div>
        </div>

        {/* useActionState Demo */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <h3 className="text-xl font-semibold text-orange-800 mb-4">
            📝 useActionState
          </h3>
          <p className="text-gray-700 mb-4">
            Modern form handling with server actions and built-in states.
          </p>
          <div className="bg-white p-4 rounded-md">
            <code className="text-sm text-orange-600">
              useActionState(serverAction, initialState)
            </code>
          </div>
        </div>

        {/* Enhanced use() API Demo */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">
            🎯 Enhanced use() API
          </h3>
          <p className="text-gray-700 mb-4">
            Cleaner context consumption without Consumer components.
          </p>
          <div className="bg-white p-4 rounded-md">
            <code className="text-sm text-indigo-600">
              const user = use(UserContext); // Clean!
            </code>
          </div>
          <div className="mt-4 text-sm text-indigo-600">
            Check UserContext.tsx implementation
          </div>
        </div>

        {/* useFormStatus Demo */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border border-teal-200">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">
            📋 useFormStatus
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Track form submission state automatically.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-teal-600">
              const {`{pending}`} = useFormStatus()
            </code>
          </div>
          <div className="mt-3 text-xs text-teal-600">
            Used in SubmitButton component
          </div>
        </div>

        {/* Document Metadata Demo */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
          <h3 className="text-xl font-semibold text-pink-800 mb-3">
            📄 Document Metadata
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Direct metadata in components, no Head needed!
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-pink-600">
              &lt;title&gt;Recipe Title&lt;/title&gt;
            </code>
          </div>
          <div className="mt-3 text-xs text-pink-600">
            Check recipe detail pages
          </div>
        </div>

        {/* Actions for Async Operations */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border border-cyan-200">
          <h3 className="text-xl font-semibold text-cyan-800 mb-3">
            🔄 Actions & Transitions
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Built-in async operation handling.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-cyan-600">
              action={`{formAction}`} Auto handling
            </code>
          </div>
          <div className="mt-3 text-xs text-cyan-600">
            All forms use action prop
          </div>
        </div>

        {/* RSC Demo */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
          <h3 className="text-xl font-semibold text-amber-800 mb-3">
            🖥️ React Server Components
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Server-side rendering with zero JS bundle.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-amber-600">
              Server Component by default
            </code>
          </div>
          <div className="mt-3 text-xs text-amber-600">All pages are RSC</div>
        </div>

        {/* Streaming Demo */}
        <div className="bg-gradient-to-br from-lime-50 to-lime-100 p-6 rounded-lg border border-lime-200">
          <h3 className="text-xl font-semibold text-lime-800 mb-3">
            🌊 Streaming
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Progressive page loading with Suspense.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-lime-600">
              &lt;Suspense fallback={`<Loading/>`}&gt;
            </code>
          </div>
          <div className="mt-3 text-xs text-lime-600">
            Recipe list uses streaming
          </div>
        </div>

        {/* Server Functions Demo */}
        <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-lg border border-violet-200">
          <h3 className="text-xl font-semibold text-violet-800 mb-3">
            ⚡ Server Functions
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Direct server function calls from client.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-violet-600">
              &quot;use server&quot; // Server function
            </code>
          </div>
          <div className="mt-3 text-xs text-violet-600">
            All actions are server functions
          </div>
        </div>
      </div>
    </div>
  );
}
