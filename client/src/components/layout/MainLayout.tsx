import { Outlet, Link } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="z-100 bg-black">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">
            EsteBanquito
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <a href="/#inicio">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Inicio
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/#precios">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Precios
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/#contacto">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contacto
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/signin">Registrarse</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="z-100">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 EsteBanquito. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
