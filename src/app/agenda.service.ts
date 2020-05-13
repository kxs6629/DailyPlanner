import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  //attributes
  public entries: string[]=[];
  private archivedEntries: string[]=[];

  constructor(private storage: Storage) { }

  //Get entries array
  public getEntries(){
    this.loadData();
    return this.entries;
  }

  //load data if it exists from storage
  public loadData(){
    return this.storage.get('dataEntry').then((loadedData) => {
      if(loadedData===""){
        console.log('nothing here either');
        this.entries.push('Add some new entries!');
      }
      else{
        console.log('found '+loadedData);
        let data = loadedData.split(',');
        data.forEach(element => {
          this.entries.push(element);
        });
      }
    })
  }

  /**
   * Add entry to archive from desired index
   * @param entryIndex : desired index to archive
   */
  public archiveEntry(entryIndex:number){
    this.archivedEntries.push(this.entries[entryIndex]);
    this.entries.splice(entryIndex,1);
    this.storage.set('dataEntry',this.entries.toString());
  }

  /**
   * Restore entry from archive
   * @param entryIndex : index of entry
   */
  public restoreEntry(entryIndex:number){
    this.entries.push(this.archivedEntries[entryIndex]);
    this.archivedEntries.splice(entryIndex,1);
  }

  //return array of archived entries
  public getArchivedEntries(){
    return this.archivedEntries;
  }

  /**
   * Add a new entry to the list
   * @param newEntry : new entry to add
   */
  public addEntry(newEntry:string){
    this.entries.push(newEntry);
    this.storage.set('dataEntry',this.entries.toString());
  }

  /**
   * Edit an existing entry
   * @param curEntry current entry text
   * @param newEntry new entry text
   */
  public editEntry(curEntry:string,newEntry: string){
    let index = this.entries.indexOf(curEntry);
    this.entries[index] = newEntry;
    this.storage.set('dataEntry',this.entries.toString());
  }
}
