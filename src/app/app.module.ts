import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnPushComponent } from './components/on-push/on-push.component';
import { DetachComponent, DataListProvider } from './components/detach/detach.component';
import { ReattachComponent, PrecioBitcoinProvider } from './components/reattach/reattach.component';
import { NgZoneComponent } from './components/ng-zone/ng-zone.component';
import { AsyncPipeComponent } from './components/async-pipe/async-pipe.component';
import { EjemploAttrComponent } from './components/directivas/ejemplo-attr/ejemplo-attr.component';
import { EjemploStructComponent } from './components/directivas/ejemplo-struct/ejemplo-struct.component';
import { EjemploLifeCycleComponent } from './components/directivas/ejemplo-life-cycle/ejemplo-life-cycle.component';
import { AttrDirective } from './directives/attr.directive';
import { StructDirective } from './directives/struct.directive';
import { LifeCycleDirective } from './directives/life-cycle.directive';
import { AuthFormsModule } from './modules/auth-forms/auth-forms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OptIntPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';
import { OnDEmandPreloadingStrategy } from './preloading-strategies/on-demand-preloading-strategy';
import { ShoppingListComponent } from './widgets/shopping-list/shopping-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OnPushComponent,
    DetachComponent,
    ReattachComponent,
    NgZoneComponent,
    AsyncPipeComponent,
    EjemploAttrComponent,
    EjemploStructComponent,
    EjemploLifeCycleComponent,
    AttrDirective,
    StructDirective,
    LifeCycleDirective,
    NavComponent,
    ShoppingListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Módulo personalizado de formulario de autenticación
    // Auth form module para poder usar los componentes login y register forms
    AuthFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    DataListProvider,
    PrecioBitcoinProvider,
    // ? Importante
    // Disponemos las estrategias de procarga
    // para poder ser empleadar en el módoulo de enrutado
    OptIntPreloadingStrategy,
    NetworkAwarePreloadStrategy,
    OnDEmandPreloadingStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
