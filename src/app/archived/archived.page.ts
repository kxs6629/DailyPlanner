import { Component, OnInit } from '@angular/core';
import{AgendaService} from '../agenda.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
})
export class ArchivedPage implements OnInit {
  archivedItems: string[] = [];

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
    this.archivedItems = this.agendaService.getArchivedEntries();
  }

  /**
   * Restores an entry to the agenda
   * @param itemSliding : ion slider
   * @param entryIndex : index of entry to restore
   */
  restoreEntry(itemSliding,entryIndex){
    console.log('Restore entry item: ');
    console.log(itemSliding);
    itemSliding.close().then(()=>this.agendaService.restoreEntry(entryIndex));
  }

}
