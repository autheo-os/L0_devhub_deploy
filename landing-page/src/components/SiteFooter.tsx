import { BrandLogo } from "./BrandLogo";

export function SiteFooter() {
  return (
    <footer>
      <a className="brand footer-brand" href="/" aria-label="Autheo DevHub home">
        <BrandLogo />
      </a>
      <p>DevHub is available now. The Neighborhood Marketplace is coming soon.</p>
      <a href="#top">Back to top</a>
    </footer>
  );
}
