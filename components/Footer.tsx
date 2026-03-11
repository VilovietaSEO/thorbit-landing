import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
              Thorbit
            </Link>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Thorbit AI. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-8">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-orange-500 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-orange-500 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <a
              href="mailto:support@thorbit.ai"
              className="text-gray-400 hover:text-orange-500 text-sm transition-colors"
            >
              support@thorbit.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
