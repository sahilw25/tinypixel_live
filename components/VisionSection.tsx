import Link from 'next/link'

export default function VisionSection() {
  return (
    <section className="vision-section">
      <div className="radial-ellipse" />

      {/* Blue plates - top right */}
      <div className="svg-deco svg-blue">
        <svg viewBox="0 0 476 462" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#f0)"><path d="M209.47 422.023C202.575 414.946 205.566 403.086 214.992 400.125L325.638 365.372C329.843 364.051 334.43 364.907 337.876 367.656L356.562 382.561C364.518 388.907 362.651 401.481 353.194 405.241L246.038 447.849C241.062 449.828 235.384 448.618 231.646 444.782L209.47 422.023Z" fill="url(#p0)"/></g>
          <g filter="url(#f1)"><path d="M162.493 332.365C163.288 323.947 169.832 317.215 178.224 316.181L381.256 291.182C391.1 289.969 400.072 296.944 401.325 306.784L403.551 324.265C404.814 334.184 397.754 343.234 387.825 344.424L180.937 369.213C169.534 370.579 159.782 361.068 160.862 349.635L162.493 332.365Z" fill="url(#p2)"/></g>
          <g filter="url(#f2)"><path d="M138.741 235.425C141.611 230.984 146.293 228.034 151.539 227.364L419.745 193.117C433.725 191.332 444.21 205.622 438.312 218.422L421.305 255.334C418.698 260.992 413.342 264.893 407.156 265.639L132.886 298.683C117.794 300.501 107.421 283.902 115.67 271.134L138.741 235.425Z" fill="url(#p4)"/></g>
          <g filter="url(#f3)"><path d="M172.815 129.669C175.02 128.151 177.597 127.265 180.268 127.106L437.687 111.782C450.782 111.003 458.246 126.481 449.482 136.243L411.439 178.618C401.677 189.492 387.803 195.775 373.191 195.94L119.775 198.808C105.28 198.972 99.3442 180.26 111.283 172.039L172.815 129.669Z" fill="url(#p6)"/></g>
          <g filter="url(#f4)"><path d="M112.721 61.3407C115.158 60.2354 117.851 59.8174 120.509 60.1319L376.595 90.442C389.623 91.9839 394.24 108.536 383.893 116.599L338.973 151.602C327.447 160.583 312.682 164.322 298.27 161.908L48.3193 120.043C34.0225 117.648 31.4796 98.183 44.6815 92.196L112.721 61.3407Z" fill="url(#p8)"/></g>
          <defs>
            <filter id="f0" x="204" y="364" width="159" height="87" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1.2"/><feGaussianBlur stdDeviation="0.6"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="f1" x="159" y="291" width="247" height="82" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1.7"/><feGaussianBlur stdDeviation="0.8"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="f2" x="110" y="192" width="333" height="111" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2.4"/><feGaussianBlur stdDeviation="1.2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="f3" x="102" y="111" width="354" height="92" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2.4"/><feGaussianBlur stdDeviation="1.2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="f4" x="17" y="44" width="390" height="139" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2.4"/><feGaussianBlur stdDeviation="9.1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <linearGradient id="p0" x1="320" y1="413" x2="315" y2="375" gradientUnits="userSpaceOnUse"><stop stopColor="#BFCFFC"/><stop offset="0.77" stopColor="#8BA9FB"/><stop offset="1" stopColor="#6D93FB"/></linearGradient>
            <linearGradient id="p2" x1="344" y1="335" x2="350" y2="278" gradientUnits="userSpaceOnUse"><stop stopColor="#BFCFFC"/><stop offset="0.77" stopColor="#8BA9FB"/><stop offset="1" stopColor="#6D93FB"/></linearGradient>
            <linearGradient id="p4" x1="292" y1="258" x2="300" y2="182" gradientUnits="userSpaceOnUse"><stop stopColor="#BFCFFC"/><stop offset="0.77" stopColor="#8BA9FB"/><stop offset="1" stopColor="#6D93FB"/></linearGradient>
            <linearGradient id="p6" x1="273" y1="175" x2="289" y2="101" gradientUnits="userSpaceOnUse"><stop stopColor="#BFCFFC"/><stop offset="0.77" stopColor="#8BA9FB"/><stop offset="1" stopColor="#6D93FB"/></linearGradient>
            <linearGradient id="p8" x1="203" y1="124" x2="232" y2="54" gradientUnits="userSpaceOnUse"><stop stopColor="#BFCFFC"/><stop offset="0.77" stopColor="#8BA9FB"/><stop offset="1" stopColor="#6D93FB"/></linearGradient>
          </defs>
        </svg>
      </div>

      {/* Green plates - bottom left */}
      <div className="svg-deco svg-green">
        <svg viewBox="0 0 638 473" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="214" height="173" rx="27" transform="matrix(-0.922 -0.387 -0.616 0.787 423 107)" fill="url(#g0)"/>
          <g filter="url(#gf0)"><rect width="273" height="165" rx="27" transform="matrix(-0.935 -0.355 -0.566 0.825 454 140)" fill="url(#g1)"/></g>
          <g filter="url(#gf1)"><rect width="411" height="158" rx="27" transform="matrix(-0.976 -0.216 -0.390 0.921 477 165)" fill="url(#g2)"/></g>
          <g filter="url(#gf2)"><rect width="448" height="153" rx="27" transform="matrix(-0.997 -0.080 -0.182 0.983 508 188)" fill="url(#g3)"/></g>
          <g filter="url(#gf3)"><rect width="469" height="151" rx="27" transform="matrix(-0.999 0.053 0.044 0.999 555 199)" fill="url(#g4)"/></g>
          <g filter="url(#gf4)"><rect width="501" height="152" rx="27" transform="matrix(-0.983 0.185 0.268 0.963 580 210)" fill="url(#g5)"/></g>
          <defs>
            <filter id="gf0" x="96" y="19" width="367" height="258" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-12"/><feGaussianBlur stdDeviation="9.95"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="gf1" x="0" y="49" width="491" height="283" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="11.1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="gf2" x="16" y="122" width="510" height="241" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="11.1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="gf3" x="65" y="169" width="518" height="232" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="11.1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            <filter id="gf4" x="72" y="183" width="565" height="289" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="11.1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter>
            {['g0','g1','g2','g3','g4','g5'].map(id => (
              <linearGradient key={id} id={id} x1="100" y1="30" x2="200" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#B8FF9B"/><stop offset="1" stopColor="#91E590"/>
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>

      {/* Pink blades - bottom right */}
      <div className="svg-deco svg-pink">
        <svg viewBox="0 0 584 606" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#pf0)"><path d="M158.22 120.107C173.454 116.976 188.815 124.864 195.148 139.069L348.346 482.722C355.774 499.385 348.333 518.918 331.7 526.414L302.152 539.733C285.384 547.292 265.669 539.744 258.235 522.921L103.333 172.371C94.7954 153.05 106.277 130.781 126.967 126.529L158.22 120.107Z" fill="url(#pp0)"/></g>
          <g filter="url(#pf1)"><path d="M134.744 89.0567C148.573 81.94 165.491 85.4006 175.414 97.3761L415.482 387.09C427.122 401.138 425.215 421.953 411.216 433.651L386.344 454.434C372.231 466.228 351.211 464.267 339.522 450.067L95.9567 154.169C82.5323 137.86 87.5935 113.322 106.376 103.656L134.744 89.0567Z" fill="url(#pp2)"/></g>
          <g filter="url(#pf2)"><path d="M147.953 89.5487C159.668 84.7166 173.081 86.5952 183.018 94.46L474.119 324.848C491.912 338.93 490.601 366.329 471.544 378.648L442.443 397.461C430.44 405.221 414.813 404.408 403.68 395.444L100.03 150.966C84.6358 138.572 88.1514 114.213 106.422 106.678L147.953 89.5487Z" fill="url(#pp4)"/></g>
          <g filter="url(#pf3)"><path d="M141.049 80.823C151.78 74.081 165.317 73.6665 176.44 79.7393L502.28 257.633C522.197 268.507 525.534 295.733 508.833 311.095L483.328 334.554C472.808 344.23 457.269 346.069 444.782 339.115L104.191 149.454C86.9247 139.839 86.2743 115.236 103.009 104.723L141.049 80.823Z" fill="url(#pp6)"/></g>
          <g filter="url(#pf4)"><path d="M134.928 74.502C144.501 66.197 157.815 63.7154 169.737 68.0142L518.965 193.94C540.312 201.637 547.777 228.031 533.623 245.769L512.01 272.855C503.095 284.027 488.021 288.223 474.616 283.262L109.009 147.965C90.4747 141.106 86.0665 116.894 100.994 103.942L134.928 74.502Z" fill="url(#pp8)"/></g>
          <g filter="url(#pf5)"><path d="M131.736 62.2124C139.713 52.3641 152.389 47.5968 164.878 49.7488L530.725 112.788C553.087 116.641 565.045 141.327 554.204 161.263L537.65 191.706C530.822 204.263 516.711 211.025 502.647 208.48L119.038 139.072C99.5902 135.553 91.0236 112.482 103.462 97.1237L131.736 62.2124Z" fill="url(#pp10)"/></g>
          <defs>
            {[0,1,2,3,4,5].map(i => (
              <filter key={i} id={`pf${i}`} x="80" y="40" width="500" height="520" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="10" dy="12"/><feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="e1"/>
                <feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/>
              </filter>
            ))}
            {[0,2,4,6,8,10].map(i => (
              <linearGradient key={i} id={`pp${i}`} x1="80" y1="80" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                <stop offset="0.08" stopColor="#FFCBA0"/>
                <stop offset="0.32" stopColor="#FFA7E2"/>
                <stop offset="0.70" stopColor="#FFA7E2"/>
                <stop offset="0.97" stopColor="#AFC4FF"/>
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>

      <div className="vision-container">
        <h2>Shape Your Vision with Us</h2>
        <p>
          Whether you&apos;re building from scratch or refreshing your brand—<br />
          our team is ready to turn your vision into impact.
        </p>
        <Link href="/contact">
          <button className="vision-btn">Kickstart Your Project</button>
        </Link>
      </div>
    </section>
  )
}
