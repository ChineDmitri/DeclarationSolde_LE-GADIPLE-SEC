import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-modal-delete-user',
  templateUrl: './modal-delete-user.component.html',
  styleUrls: ['./modal-delete-user.component.scss'],
})
export class ModalDeleteUserComponent implements OnInit, OnDestroy {
  constructor(private adminService: AdminService, private route: ActivatedRoute) {}

  modalDelete: Subscription; // subscription en state windows delete
  isVisibleModalDelete: boolean;

  ngOnInit(): void {
    this.modalDelete = this.adminService.stateModalDelete.subscribe((state) => {
      this.isVisibleModalDelete = state;
    });
  }

  onDeclineDelete(): void {
    this.adminService.setModalDelete(this.isVisibleModalDelete);
  }

  onAcceptDelete(): void {
    console.log(this.route.snapshot.params['id']);
  }

  ngOnDestroy(): void {
    this.modalDelete.unsubscribe()
  }
}
