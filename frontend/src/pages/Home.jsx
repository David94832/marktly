// Homepage van Marktly: coming-soon tekst plus duidelijke call-to-action naar het nieuwe-product scherm.
import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-gray-50 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">Marktly</h1>
        <p className="text-base text-gray-500">coming soon</p>
      </div>

      <Link
        to="/nieuw"
        className="rounded-full bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm active:bg-gray-700"
      >
        + Nieuw product
      </Link>
    </main>
  )
}

export default Home
