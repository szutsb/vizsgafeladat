import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleScrollSpyModule } from "angular-simple-scroll-spy";
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsListComponent } from './pages/news-list/news-list.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { HttpService } from './services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { LoginComponent } from './pages/login/login.component';
import { fakeBackendProvider } from './helpers/fake.backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    NewsListComponent,
    NewsDetailComponent,
    EventsListComponent,
    AdminComponent,
    EditEventComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SimpleScrollSpyModule,
    ConfirmationPopoverModule.forRoot(),
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
