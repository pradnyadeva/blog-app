export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-white">
            <div className="container">
                <a href="/" className="navbar-brand">Blog</a>
                <ul class="nav justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/article">Article</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
