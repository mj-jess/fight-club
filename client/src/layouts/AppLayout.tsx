import { Outlet, NavLink } from 'react-router-dom';

export default function AppLayout() {
    return (
        <div className="app-shell">
            <header className="header">
                <h1>GTA Fights</h1>
            </header>

            <aside className="sidebar">
                <NavLink to="/" end>
                    Dashboard
                </NavLink>
                <NavLink to="/organizations">Organizations</NavLink>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
