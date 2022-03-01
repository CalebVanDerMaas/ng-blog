import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { PostsModule } from "./posts/posts.module";
import { RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/blog", pathMatch: "full" },
  { path: "", loadChildren: "./posts/posts.module#PostsModule" },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatSliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PostsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
