import {
  CreditCard,
  CreditCardBack,
  CreditCardChip,
  CreditCardExpiry,
  CreditCardFlipper,
  CreditCardFront,
  CreditCardMagStripe,
  CreditCardName,
  CreditCardNumber,
} from '@/components/ui/shadcn-io/credit-card'
import { ContainerTextFlip } from '@/components/ui/shadcn-io/container-text-flip'
import { Magnetic } from '@/components/ui/shadcn-io/magnetic'

const Hero = () => {
  return (
    <section id="inicio" className="relative pt-8 pb-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-xl mx-auto text-center lg:text-left">
            <h1 className="text-4xl font-bold sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300">
                Un
                <ContainerTextFlip
                  words={['banco', 'lugar', 'app']}
                  interval={3000}
                  animationDuration={1000}
                  className="bg-transparent border-0"
                />
                hecho de estudiantes para estudiantes
              </span>
            </h1>
            <p className="mt-5 text-base text-zinc-400 sm:text-xl">
              Olvídate de las complicaciones bancarias. EsteBanquito te ofrece una experiencia
              simple, rápida y diseñada para tu vida universitaria.
            </p>

            <Magnetic>
              <span className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-2 mt-0 mb-0 font-semibold text-white transition-all duration-200 bg-zinc-800 rounded-lg sm:mt-12 hover:bg-zinc-700 focus:bg-zinc-700"
                  role="button"
                >
                  Regístrate Ahora
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </span>
            </Magnetic>

            <div className="grid grid-cols-1 mt-12 text-left gap-x-12 gap-y-8 sm:grid-cols-3">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0"
                  width="31"
                  height="25"
                  viewBox="0 0 31 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.1667 14.187H20.3333C17.6637 14.187 15.5 16.3507 15.5 19.0203V19.8258C15.5 19.8258 18.0174 20.6314 22.75 20.6314C27.4826 20.6314 30 19.8258 30 19.8258V19.0203C30 16.3507 27.8363 14.187 25.1667 14.187Z"
                    stroke="#A1A1AA"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.7227 6.9369C18.7227 4.71276 20.5263 2.90912 22.7504 2.90912C24.9746 2.90912 26.7782 4.71276 26.7782 6.9369C26.7782 9.16104 24.9746 11.7702 22.7504 11.7702C20.5263 11.7702 18.7227 9.16104 18.7227 6.9369Z"
                    stroke="#A1A1AA"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.2231 15.8512H7.11157C3.73595 15.8512 1 18.5871 1 21.9628V22.9814C1 22.9814 4.18311 24 10.1674 24C16.1516 24 19.3347 22.9814 19.3347 22.9814V21.9628C19.3347 18.5871 16.5988 15.8512 13.2231 15.8512Z"
                    fill="#27272A"
                    stroke="#71717A"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.07422 6.68386C5.07422 3.87152 7.35485 1.59088 10.1672 1.59088C12.9795 1.59088 15.2602 3.87152 15.2602 6.68386C15.2602 9.4962 12.9795 12.7954 10.1672 12.7954C7.35485 12.7954 5.07422 9.4962 5.07422 6.68386Z"
                    fill="#27272A"
                    stroke="#71717A"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="ml-3 text-sm text-zinc-300">Adiós a las filas</p>
              </div>

              <div className="flex items-center">
                <svg
                  className="flex-shrink-0"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8335 21.9166H3.16683C2.6143 21.9166 2.08439 21.6972 1.69369 21.3065C1.30299 20.9158 1.0835 20.3858 1.0835 19.8333V3.16665C1.0835 2.61411 1.30299 2.08421 1.69369 1.69351C2.08439 1.30281 2.6143 1.08331 3.16683 1.08331H19.8335C20.386 1.08331 20.9159 1.30281 21.3066 1.69351C21.6973 2.08421 21.9168 2.61411 21.9168 3.16665V19.8333C21.9168 20.3858 21.6973 20.9158 21.3066 21.3065C20.9159 21.6972 20.386 21.9166 19.8335 21.9166Z"
                    stroke="#71717A"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12.6667L9.25 15L16 8"
                    stroke="#A1A1AA"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="ml-3 text-sm text-zinc-300">Sin cargos ocultos</p>
              </div>

              <div className="flex items-center">
                <svg
                  className="flex-shrink-0"
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 11H3C1.89543 11 1 11.8954 1 13V21C1 22.1046 1.89543 23 3 23H17C18.1046 23 19 22.1046 19 21V13C19 11.8954 18.1046 11 17 11Z"
                    stroke="#71717A"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"
                    stroke="#A1A1AA"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 7V6C15.0131 4.68724 14.5042 3.42303 13.5853 2.48539C12.6664 1.54776 11.4128 1.01346 10.1 1H10C8.68724 0.986939 7.42303 1.4958 6.48539 2.41469C5.54776 3.33357 5.01346 4.58724 5 5.9V7"
                    stroke="#A1A1AA"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="ml-3 text-sm text-zinc-300">Totalmente seguro</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full max-w-xl mx-auto lg:mt-0">
            <div className="relative w-full max-w-sm">
              <CreditCard aria-label="Tarjeta de crédito demo" className="[perspective:2000px]">
                <CreditCardFlipper>
                  <CreditCardFront className="bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/60 shadow-2xl">
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex items-start justify-between">
                        <CreditCardChip className="left-4 top-1/4 -translate-y-1/2 w-14" />
                      </div>
                      <div className="space-y-6 pt-10">
                        <CreditCardNumber className="tracking-widest text-zinc-100 drop-shadow">
                          XXXX XXXX XXXX XXXX
                        </CreditCardNumber>
                        <div className="flex items-end justify-between">
                          <div className="space-y-1">
                            <p className="text-[10px] tracking-wider text-zinc-500">TITULAR</p>
                            <CreditCardName className="text-sm tracking-wide text-zinc-200">
                              ESTE BANQUITO
                            </CreditCardName>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-[10px] tracking-wider text-zinc-500">VENCE</p>
                            <CreditCardExpiry className="text-sm tracking-wider text-zinc-200">
                              12/29
                            </CreditCardExpiry>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CreditCardFront>
                  <CreditCardBack className="bg-gradient-to-br from-zinc-800 via-zinc-900 to-black ring-1 ring-zinc-700/60 shadow-2xl">
                    <CreditCardMagStripe />
                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                      <div className="flex justify-end">
                        <div className="bg-zinc-200 text-zinc-900 px-2 py-1 rounded text-xs font-mono tracking-widest shadow">
                          123
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-tight">
                        Tarjeta estudiantil demostrativa · Desliza o toca para ver reverso
                      </p>
                    </div>
                  </CreditCardBack>
                </CreditCardFlipper>
              </CreditCard>
              <div
                className="absolute -inset-6 -z-10 bg-gradient-to-br from-zinc-800/30 via-transparent to-zinc-900/30 blur-2xl rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
