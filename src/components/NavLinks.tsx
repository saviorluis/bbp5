import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/contact", label: "Contact" },
];

export const NavLinks = () => {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-primary hover:text-secondary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

export const MobileNavLinks = () => {
  return (
    <div className="flex flex-col space-y-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-medium text-primary hover:text-secondary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}; 