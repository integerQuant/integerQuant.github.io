
export default function Footer() {
  return (
    <footer className="site-footer container" id="contact">
      <span>© {new Date().getFullYear()} RMTB</span>
      <a href="mailto:rodrigomtorresb@gmail.com" className="button">get in touch</a>
    </footer>
  );
}
