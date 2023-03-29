import Link from 'next/link';
import React from 'react';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">MyPocket.com</div>
      <div className="footer-column">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/signup">Signup</Link>
      </div>
      <div className="footer-column">
        <div>©Daniel Freitas</div>
        <div>daniel662@gmail.com</div>
      </div>
    </footer>
  );
}

export default Footer;
