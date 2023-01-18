import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OptIntPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';
import { OnDEmandPreloadingStrategy } from './preloading-strategies/on-demand-preloading-strategy';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true //este querrá decir que este módulo se va a precargar bajo estrategias de precarga OptIn
    }
  },
  {
    path: 'home',
     //Permite carga cualquier componente de forma perezosa
    loadChildren: () => import('./modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then(m => m.ProfileModule),
    data: {
      preload: true //este querrá decir que este módulo se va a precargar bajo estrategias de precarga OptIn
    }
  },
  //Siempre el 404 se pondrá en el módoulo de enrrutado principal
  {
    path: '**',
    loadChildren: () => import('./modules/pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // * 1 - PRECARGAR TODOS los módulos de las rutas --> activar carga peresoza
      // preloadingStrategy: PreloadAllModules

      // * 2 - NO PRECARGAR NINGÚN módulo --> forzar carga peresoza
      // preloadingStrategy: NoPreloading

      // * 3 - Estrategia personalizada de Precarga por opciones en rutas
      // preloadingStrategy: OptIntPreloadingStrategy

      // * 4 - Estrategia presonalizada: precargar por conexión de usuario a internet
      // preloadingStrategy: NetworkAwarePreloadStrategy

      // * 5 - Estrategia Personalidad: Precarga por demanda por evento controlando desde servicio PreloadingService
      preloadingStrategy: OnDEmandPreloadingStrategy
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
