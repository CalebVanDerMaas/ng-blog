import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
