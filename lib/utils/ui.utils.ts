export const handleClickJumpToSection = (hash: string, offsetNavbar: boolean = false) => {
  const formattedHash = hash.toLowerCase().replaceAll(' ', '-');

  const navbar = document.querySelector('.ui-navbar') as HTMLElement | null;
  const jumpToBox = document.querySelector('.jump-to-section-ui') as HTMLElement | null;
  const jumpToBoxHeight = jumpToBox ? jumpToBox.offsetHeight : 0;
  const navbarHeight = offsetNavbar && navbar ? navbar.offsetHeight : 0;
  const totalOffset = jumpToBoxHeight + 10;

  const el = document.getElementById(formattedHash);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - totalOffset - 10;
  window.scrollTo({ top, behavior: 'smooth' });
};
