import { Link } from "react-router-dom";

export default function NotFound() {
    return (
    <section className="text-center py-20">
      <h2 className="text-3xl font-bold text-red-600 mb-4">404 – Page Not Found</h2>
      <Link to="/" className="text-blue-600 hover:underline">Go Home</Link>
    </section>
    );
}