import { FaBars, FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

type HeaderProps = {
    isDesktop: boolean;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    onOpenMobile: () => void;
};

export default function Header({
    isDesktop,
    isCollapsed,
    onToggleCollapse,
    onOpenMobile,
}: HeaderProps) {
    return (
        <header className="header">
            <div className="header-left">
                {!isDesktop && (
                    <button className="icon-btn" onClick={onOpenMobile} aria-label="Abrir menu">
                        <FaBars />
                    </button>
                )}
                <h1 className="header-title">Fight Club</h1>
            </div>

            {isDesktop && (
                <button
                    className="icon-btn"
                    onClick={onToggleCollapse}
                    aria-pressed={isCollapsed}
                    aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                >
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            )}
        </header>
    );
}
