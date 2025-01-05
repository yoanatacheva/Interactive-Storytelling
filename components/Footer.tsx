'use client'

import Link from "next/link"

export default function Footer() {

  return (
    <footer className="w-full p-3 md:p-4 bg-background text-sm">
      <div className="flex justify-between items-center">
        <div>
          <p>Personal Website</p>
          <Link 
            href="https://www.meganmajocha.com/"
            target="_blank"
            className="hover:text-muted-foreground transition-color duration-300">
            PhD Megan Majocha
          </Link>
        </div>
        <div className="hidden md:block">
          <p>Information Resource</p>
          <Link 
            href="https://www.nature.com/articles/d41586-024-00705-5?utm_source=twitter&utm_medium=organic_social&utm_campaign=CONR_NCARS_AWA1_GL_PCOM_SMEDA_NATURECAREERS&utm_content=140324&utm_term=null"
            target="_blank"
            className="hover:text-muted-foreground transition-color duration-300">
            Scientific Journal Nature
          </Link>
        </div>
        <div>
          <p>Design and code</p>
          <Link 
            href="https://www.instagram.com/yo.chita/"
            target="_blank"
            className="hover:text-muted-foreground flex justify-end transition-color duration-300">
            Yoana Tacheva
          </Link>
        </div>
      </div>
    </footer>
  )
}
