import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule, MatIconModule],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NavbarComponent,
    RouterModule,
    MatIconModule,
  ],
})
export class SharedModule {}
