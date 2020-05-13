import { Component,NgZone,OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AgendaService} from '../agenda.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  //attribtues
  public entries: string[];
  reorderIsDisabled = true;

  constructor(public alertController: AlertController, private _ngZone: NgZone, 
    private agendaService: AgendaService) {
  }

  //get entries on load
  ngOnInit(){
    this.entries = this.agendaService.getEntries();
  }
  /**
   * Delete an item from the list and add it to archive
   * @param itemSliding : ion slider
   * @param todoIndex : index of item to be deleted
   */
  archiveEntry(itemSliding,todoIndex){
    console.log('Archvie entry item: ');
    console.log(itemSliding);
    itemSliding.close().then(()=>this.agendaService.archiveEntry(todoIndex));
  }

  //Toggles reorder
  toggleReorder(){
    this.reorderIsDisabled = !this.reorderIsDisabled;
  }

  /**
   * reorder items from entire list
   * @param indexes : new indexes
   */
  reorderItems(indexes) {
    console.log('About to rearrange agenda items');
    console.log(indexes);
    const element = this.entries[indexes.detail.from];
    this.entries.splice(indexes.detail.from, 1);
    this.entries.splice(indexes.detail.to, 0, element);
    indexes.detail.complete();
}

/**
 * Delete item from list
 * @param entry : string to be deleted
 */
  deleteItem(entry: string){
      let index = this.entries.indexOf(entry);
      this.entries.splice(index,1);
    }

    //Edit an existing entry
    async editItem(entryStr:string){
      console.log(entryStr);
      const editEntry = await this.alertController.create(
        {
          header: 'Edit entry',
          message: 'Enter new text',
          inputs:[
            {
              type:'text',
              name: 'editEntryItem',
              placeholder: entryStr
            }
          ],
          buttons:[
            {
              text:'Cancel',
              role:'cancel',
              handler: ()=>{
                console.log('Confirm Cancel');
              }
            },{
              text:'Edit',
              handler:(inputData) =>{
                let entry;
                if(inputData.editEntryItem){
                  entry=inputData.editEntryItem.trim();
                  if(entry !== ''){
                    this._ngZone.run(()=>{
                      this.agendaService.editEntry(entryStr,entry);
                    });
                  } else{
                    console.log('The input string is empty');
                  }
                } else{
                  console.log('This input string is not set.');
                }
                return entry;
              }
              }
            ]
        });
        await editEntry.present();
      }

    //Add a new entry
    async presentAddNewPrompt(){
      console.log('Adding new entry');
      const addEntryAlert = await this.alertController.create(
        {
          header: 'Add a Todo',
          message: 'Enter your todo',
          inputs: [
                    {
                        type: 'text',
                        name: 'newTodoItem',
                        placeholder: 'New Item'
                    }
                ],
          buttons:[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () =>{
                console.log('Confirm Cancel');
              }
            },{
              text: 'OK',
              handler: (inputData) =>{
                let newEntry;
                if(inputData.newTodoItem){
                  newEntry=inputData.newTodoItem.trim();
                  if(newEntry !== ''){
                    this._ngZone.run(()=>{
                      this.agendaService.addEntry(newEntry);
                    });
                  } else{
                    console.log('The input string is empty');
                  }
                } else{
                  console.log('This input string is not set.');
                }
                return newEntry;
              }
            }
          ]
        });
        await addEntryAlert.present();
    }
}
