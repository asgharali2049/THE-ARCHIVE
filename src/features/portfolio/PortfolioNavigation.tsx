"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function PortfolioNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const markContactAtPageEnd = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        setActiveSection("contact");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const currentSection = visibleSections[0]?.target.id;
        if (currentSection) setActiveSection(currentSection);
        markContactAtPageEnd();
      },
      { rootMargin: "-18% 0px -68% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>("[data-portfolio-section]")
      .forEach((section) => observer.observe(section));

    window.addEventListener("scroll", markContactAtPageEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", markContactAtPageEnd);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#363934] bg-[#111211]/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <a
          href="#home"
          onClick={closeMenu}
          aria-current={activeSection === "home" ? "location" : undefined}
          className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] outline-none focus-visible:ring-2 focus-visible:ring-[#C18A49] ${
            activeSection === "home" ? "text-[#e5bd82]" : "text-[#D8D0BE]"
          }`}
        >
          THE ARCHIVE
        </a>

        <button
          aria-controls="portfolio-section-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close section navigation" : "Open section navigation"}
          className="flex min-h-10 min-w-10 flex-col items-center justify-center gap-1.5 border border-[#454841] text-[#D8D0BE] outline-none focus-visible:ring-2 focus-visible:ring-[#C18A49] lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
        </button>

        <nav
          aria-label="Portfolio sections"
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b border-[#363934] bg-[#111211] px-5 py-3 lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0`}
          id="portfolio-section-navigation"
        >
          {sections.map(({ id, label }) => (
            <a
              aria-current={activeSection === id ? "location" : undefined}
              className={`border-l-2 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] outline-none transition-colors hover:text-[#D8D0BE] focus-visible:ring-2 focus-visible:ring-[#C18A49] lg:border-l-0 lg:border-b-2 lg:px-3 lg:py-2 ${
                activeSection === id
                  ? "border-[#C18A49] text-[#D8D0BE]"
                  : "border-transparent text-[#9e9d93]"
              }`}
              href={`#${id}`}
              key={id}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
