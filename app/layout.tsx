import Link from "next/link";
import "./globals.css";
import { getUser } from "@/actions/getUser.action";
import { UserProvider } from "@/context/UserContext";
import { logoutAction } from "@/actions/logout.action";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      {/* React 19 Document Metadata */}

      <title>RecipEase</title>
      <meta
        name="description"
        content="A modern recipe app built with React 19 and Next.js 15."
      />
      <body className="antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex flex-col font-sans">
        <UserProvider user={user}>
          <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link
                    href={navigationRoutes.home}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
                  >
                    RecipEase
                  </Link>
                </div>

                <nav className="flex items-center space-x-4">
                  <Link
                    href={navigationRoutes.home}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all hover:bg-blue-50"
                  >
                    Home
                  </Link>

                  {user ? (
                    <>
                      <Link
                        href={navigationRoutes.createRecipe}
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                      >
                        Add Recipe
                      </Link>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-700">
                          Welcome, {user.name}
                        </span>
                        <form action={logoutAction}>
                          <button
                            type="submit"
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 cursor-pointer"
                          >
                            Logout
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Link
                        href={navigationRoutes.login}
                        className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                      >
                        Login
                      </Link>
                      <Link
                        href={navigationRoutes.register}
                        className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="text-center py-8 text-gray-500 text-sm bg-white/50 backdrop-blur-sm border-t border-gray-200/50 mt-16">
            <p className="font-medium">
              RecipEase - Demonstrating React 19 & Next.js 15 Features
            </p>
            <p className="text-xs mt-1 opacity-75">
              Built with modern web technologies
            </p>
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
