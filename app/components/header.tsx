import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-lightgrey">
      <div className="container mx-auto px-5 py-4">
        <div className="flex justify-between align-middle">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tighter leading-none -mt-1 md:pr-8"
          >
            Dreamy Destinations
          </Link>
          <nav>
            <ul className="flex gap-4 font-bold leading-7">
              <li>
                <Link href="/hotels">Hotels</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
