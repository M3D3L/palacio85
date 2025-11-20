import {useUrl, Link} from '@shopify/hydrogen';

import {Section} from '~/components';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer() {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  return (
    <Section divider={isHome ? 'none' : 'top'} as="footer" role="contentinfo">
      <div className="flex flex-row w-full justify-between">
        <div className={`opacity-50 mt-1 md:text-base text-sm`}>
          &copy; {new Date().getFullYear()} / Palacio 85
          {/* reservados /<Link href="/legal">Aviso legal</Link> /{' '}
          <Link href="/privacy">Política de privacidad</Link> */}
        </div>
        <div className="flex flex-row space-x-2">
          <a
            target="_blank"
            href="https://www.google.com/search?q=palacio%20de%20dulces&oq=palacio+de+dulces&aqs=chrome..69i57.4120j0j1&sourceid=chrome&ie=UTF-8&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:10&tbm=lcl&sxsrf=ALiCzsYO9nd40VOuAS1dF8ZEfz3pfEMhxg:1667000474046&rflfq=1&num=10&rldimm=11396624116208227234&lqi=ChFwYWxhY2lvIGRlIGR1bGNlc0jNnfPA54CAgAhaIxAAEAEQAhgAGAEYAiIRcGFsYWNpbyBkZSBkdWxjZXMyAmVzkgELY2FuZHlfc3RvcmWqARkQASoVIhFwYWxhY2lvIGRlIGR1bGNlcygO&phdesc=rXBp2wr2sqU&ved=2ahUKEwio6uHYjIT7AhU7AzQIHUfkA34QvS56BAgMEAE&sa=X&rlst=f#rlfi=hd:;si:11396624116208227234,l,ChFwYWxhY2lvIGRlIGR1bGNlc0jNnfPA54CAgAhaIxAAEAEQAhgAGAEYAiIRcGFsYWNpbyBkZSBkdWxjZXMyAmVzkgELY2FuZHlfc3RvcmWqARkQASoVIhFwYWxhY2lvIGRlIGR1bGNlcygO,y,rXBp2wr2sqU;mv:[[30.146278,-67.49227820000002],[2.9831851,-112.35053269999999]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:10"
            rel="noreferrer"
          >
            <div className="w-8 h-8 rounded-full bg-[#f13030] pt-[0.25rem] hover:translate-y-[-2px] cursor-pointer hover:opacity-100 opacity-90 ease-in-out transfrom duration-150 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 m-auto fill-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
            </div>
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/palacio85/"
            rel="noreferrer"
          >
            <div className="w-8 h-8 rounded-full bg-[#f13030] hover:translate-y-[-2px] cursor-pointer hover:opacity-100 opacity-90 ease-in-out transfrom duration-150 transition-all">
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z"></path>
              </svg>
            </div>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/palacio85.obregon/"
            rel="noreferrer"
          >
            <div className="w-8 h-8 rounded-full bg-[#f13030] hover:translate-y-[-2px] cursor-pointer hover:opacity-100 opacity-90 ease-in-out transfrom duration-150 transition-all">
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20.145" cy="11.892" r="1"></circle>
                <path d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"></path>
                <path d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z"></path>
              </svg>
            </div>
          </a>
          <a
            href="https://wa.me/5216441010907"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-8 h-8 rounded-full bg-[#f13030] hover:translate-y-[-2px] cursor-pointer hover:opacity-100 opacity-90 ease-in-out transfrom duration-150 transition-all">
              <svg
                className="w-6 h-6 fill-current mx-auto pt-1"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </Section>
  );
}
