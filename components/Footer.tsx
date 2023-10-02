import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/constants";

type ColumnProps = {
    title: string; links: { title: string; href: string }[]
   
};

const FooterColumn = ({ title, links }: ColumnProps) => (
    
    <div className="footer_column">
        <h4 className="font-semibold">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
           
            {links.map((link) => 
            <Link href={link.href} key={link.title}>{link.title}</Link>)}
            
        </ul>
    </div>
);

const Footer = () => (//footter under every page
    <section className="flexStart footer">
        <div className="flex flex-col gap-12 w-full">
            <div className="flex items-start flex-col">
            <Link  href='/' >
          <Image
            src='/logo5.svg'
            width={146}
            height={73}
            alt='logo'
          />
        </Link>
                <p className="text-start text-sm font-normal mt-5 max-w-s ">
                    PetCare is the best place to find or to become a Pet Sitter.
                </p>
            </div>
            <div className="flex flex-wrap gap-12">{/**the footer columns take their data from arrays in the constants */}
                <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

                <div className="flex-1 flex flex-col gap-4">
                    <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                </div>
                


                
                
            </div>
        </div>

        <div className="flexBetween footer_copyright">
            <p>@ 2023 PetCare. All rights reserved</p>
            <p className="text-gray">
                <span className="text-black font-semibold">5000</span> Pet Sitters world wide
            </p>
        </div>
    </section>
);

export default Footer;