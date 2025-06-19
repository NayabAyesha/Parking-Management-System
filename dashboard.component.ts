import { Component, ElementRef, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import {MasterService} from '../../services/master.service'
import { ResponeModel } from '../../model/user/user.module';
import { Isite } from '../../model/user/user.module';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,NgClass,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  siteslists: Isite[]=[]
  buildinglists: any[]=[]
  floorlists: any[]=[]
  masterserv= inject (MasterService)
  siteId:number=0;
  buildingId:number=0;
  floorId:number=0; 
  parkingSlots: number[] = [];
  autoRefresh: boolean = false;
refreshInterval: any;
  @ViewChild("bookspot") bookModal!: ElementRef;
bookSpotObj: any = {
   "parkId": 0,
  "floorId": 0,
  "custName": "",
  "custMobileNo": "",
  "vehicleNo": "",
  "parkDate": new Date(),
  "parkSpotNo": 0,
  "inTime": new Date(),
  "outTime": null,
  "amount": 0,
  "extraCharge": 0,
  "parkingNo": ""
}
bookspotLists: any[] = [];

  ngOnInit(): void {
    this.getsites();
    
  }

  openModal(spotNo:number)
  {
    this.bookSpotObj.parkSpotNo = spotNo;
    this.bookSpotObj.floorId = this.floorId;
    if(this.bookModal)
    {
      this.bookModal.nativeElement.style.display = "block";
    }
  }
  closeModal()
  {
    if(this.bookModal)
    {
      this.bookModal.nativeElement.style.display = "none";
    }
  }
  confirmBookSpot()
  {
    this.masterserv.bookSpot(this.bookSpotObj).subscribe((res: any) => {
      alert("slot booked successfully");
      this. getbookingAll();
  })
}



checkifspotBookedalready(spotNo:number)
{
  const isExist = this.bookspotLists.find(m => m.parkSpotNo == spotNo );
  if(isExist != undefined)
  {
  return isExist;
  }
  else
  {
    return undefined;
  }
}

toggleAutoRefresh(event: any) {
  this.autoRefresh = event.target.checked;

  if (this.autoRefresh) {
    this.refreshInterval = setInterval(() => {
      this.onfloorselect(); // or any method that reloads parkingSlots
    }, 5000); // refresh every 5 seconds
  } else {
    clearInterval(this.refreshInterval);
  }
}
getAvailableCount(): number {
  return this.parkingSlots.filter(spotNo => !this.checkifspotBookedalready(spotNo)).length;
}

getOccupiedCount(): number {
  return this.parkingSlots.filter(spotNo => this.checkifspotBookedalready(spotNo)).length;
}

getOccupiedRate(): number {
  const total = this.parkingSlots.length;
  const occupied = this.getOccupiedCount();
  return total > 0 ? Math.round((occupied / total) * 100) : 0;
}

  getsites()
  {
    this.masterserv.getsitesbyClientId().subscribe((res:ResponeModel)=>
    {
      this.siteslists=res.data;
    })
  }
  getBuilding()
  {
    this.masterserv.getBuildingsbysiteId(Number(this.siteId)).subscribe((res: any) => {

      this.buildinglists=res.data;
    })
  }
  getfloor()
  {
    this.masterserv.getFloorsByBuildingId((this.buildingId)).subscribe((res: any) => {

      this.floorlists=res.data;
    })
  }
  onfloorselect()
   {
    const floor = this.floorlists.find((m: any) => m.floorId == this.floorId);
    for (let index = 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSlots.push(index);
    }
     this.getbookingAll();
  }
  getbookingAll()
  {
    this.masterserv.getAllParkingByFloor(this.floorId).subscribe((res:any)=>
    {
      this.bookspotLists = res.data;
    })

  }

  exitSpot(spotNo: number) {
  const confirmExit = confirm("Are you sure you want to free this parking spot?");
  if (!confirmExit) return;

  const bookingIndex = this.bookspotLists.findIndex(b => b.parkSpotNo === spotNo);

  if (bookingIndex !== -1) {
    // OPTIONAL: Call API to mark exit, or just remove locally
    this.bookspotLists.splice(bookingIndex, 1);
    alert(`Spot A${spotNo} is now available.`);
  }
}


}
