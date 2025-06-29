/**
 * @description Displays the new features introduced in Next.js 15.
 */
export default function Next15Features() {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        🚀 Next.js 15 Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Async Request APIs */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
          <h3 className="text-xl font-semibold text-emerald-800 mb-3">
            🔄 Async Request APIs
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Async params, searchParams and cookies support.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-emerald-600">
              const params = await params
            </code>
          </div>
          <div className="mt-3 text-xs text-emerald-600">
            Used in all dynamic routes
          </div>
        </div>

        {/* Caching Semantics */}
        <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-lg border border-sky-200">
          <h3 className="text-xl font-semibold text-sky-800 mb-3">
            💾 Caching Semantics
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Improved caching with force-cache strategy.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-sky-600">
              cache: &apos;force-cache&apos;
            </code>
          </div>
          <div className="mt-3 text-xs text-sky-600">
            Recipe fetching uses new caching
          </div>
        </div>

        {/* React 19 Integration */}
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-lg border border-rose-200">
          <h3 className="text-xl font-semibold text-rose-800 mb-3">
            🤝 React 19 Integration
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Deep integration with all React 19 features.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-rose-600">
              &apos;react&apos;: &apos;19.0.0&apos;
            </code>
          </div>
          <div className="mt-3 text-xs text-rose-600">
            Full React 19 compatibility
          </div>
        </div>

        {/* Turbopack */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <h3 className="text-xl font-semibold text-orange-800 mb-3">
            ⚡ Turbopack
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Ultra-fast bundler for development.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-orange-600">
              --turbo flag available
            </code>
          </div>
          <div className="mt-3 text-xs text-orange-600">
            Run with npm run dev --turbo
          </div>
        </div>

        {/* Static Indicator */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-800 mb-3">
            📊 Static Indicator
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Visual indicators for static/dynamic routes.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-purple-600">
              Static/Dynamic indicators
            </code>
          </div>
          <div className="mt-3 text-xs text-purple-600">Check build output</div>
        </div>

        {/* next/form */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200">
          <h3 className="text-xl font-semibold text-indigo-800 mb-3">
            📝 next/form
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Enhanced form component with built-in features.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-indigo-600">
              import Form from &apos;next/form&apos;
            </code>
          </div>
          <div className="mt-3 text-xs text-indigo-600">
            All forms use next/form
          </div>
        </div>

        {/* TypeScript Support */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">
            📘 TypeScript Support
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Enhanced TS support with next.config.ts.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-blue-600">
              next.config.ts // TypeScript config
            </code>
          </div>
          <div className="mt-3 text-xs text-blue-600">
            Full TypeScript configuration
          </div>
        </div>

        {/* Secure Server Actions */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-3">
            🔒 Secure Server Actions
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Enhanced security for server actions.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-green-600">
              Automatic CSRF protection
            </code>
          </div>
          <div className="mt-3 text-xs text-green-600">
            All actions are secure
          </div>
        </div>

        {/* ESLint 9 */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-semibold text-red-800 mb-3">
            🔍 ESLint 9
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Latest ESLint with improved rules.
          </p>
          <div className="bg-white p-3 rounded-md">
            <code className="text-xs text-red-600">
              eslint.config.mjs // Flat config
            </code>
          </div>
          <div className="mt-3 text-xs text-red-600">
            Modern ESLint configuration
          </div>
        </div>
      </div>
    </div>
  );
}
