import { OrderPipe } from './../../directive/orderByPipe.directive';
import { TodoComponent } from './../todo/todo.component';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit, PipeTransform, Pipe, Directive } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';

//import _ from 'underscore';
import * as _ from 'underscore';
declare var jquery:any;
declare var $ :any;
//import{PipeTransform}
//import { ActivatedRoute } from '@angular/router/src/router_state';
//import { TableDetailsDirective, Pipe } from '@angular/core';



@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
@Directive({
  selector:'appTableDetails'
})
//@Pipe({name: 'keys'})
export class TodoTableComponent implements OnInit {
  public file_Id: number;
  public path: any = null;
  public file_desc: string;
  public count_type:string;
  public check_id:any;
  public addBlock:boolean;
  public tableDetails: any = null;
  public header_details:any = [];
  public export:any = [];
  display='none';
  public check:boolean=true;

  public isDesc: boolean = false;
  public column: string = 'CategoryName';
  public direction: number;
  constructor(private route: ActivatedRoute, private todoInstance: TodoService, private router:Router) { }

  ngOnInit() {

    this.addBlock = true;
    //this.orgService.getOrgDetails(this.org_id).subscribe(response => {
      //this.orgDetails=response;
      //console.log(this.orgDetails);

    let sub = this.route.params.subscribe(params =>{
      this.file_Id=params.fileInfoId
      this.path=params.path
    });
   
    let flds = this.route.queryParams.subscribe(params =>{
      //debugger;
      this.file_desc=params['desc'];
      });

      // let allCnt = this.route.queryParams.subscribe(params =>{
      //   debugger;
      //   this.count_type=params['countType'];
      //  console.log(this.count_type);
      //   });

      // let checkRecord = this.route.queryParams.subscribe(params =>{
      //   this.check_id=params['toDoCheck'];
      //   console.log(this.check_id);
      //   });
    //let sub1 = this.route.queryParams.subscribe(params =>this.usrnm=params.username)
  
    this.todoInstance.toDoTableDetails(this.file_Id,this.path).subscribe(response =>{  
      var header_data:any = [];
     //debugger;
     this.tableDetails = [];
     response.map((obj,i)=>{
      var tmp:any ={};
      for(let key in obj){
        if(i==0)
          header_data.push(key)
          tmp[key.replace(/\)/g,"").replace(/\(/g,"").replace(/ /g,"_").replace(/:/g,"")] = obj[key];
      }
      this.tableDetails.push(tmp);
      //console.log(this.tableDetails);
     })
     //console.log(this.tableDetails);
      this.header_details=header_data;
     // console.log(this.tableDetails);
      });
  }

  public checkingField(indx){
   var newIndex = indx + 1;
    if( $('#first-row'+newIndex).hasClass('disableColor')){
      $('#first-row'+newIndex).removeClass('disableColor');
      $('#content-checkbox-'+newIndex).attr('checked', false);
    }else{
      $('#first-row'+newIndex).addClass('disableColor');
      $('#content-checkbox-'+newIndex).attr('checked', true);
    }
  
    
  }
  public getExportExcel(file_Id){
    this.todoInstance.toDoExportExcel(file_Id);
  }
  public getCheckedRecord(){
     this.tableDetails = _.filter(this.tableDetails, function(obj:any){ return !obj.isChecked});
  
  }
 public getSortDetails(property){
  
    
  this.isDesc = !this.isDesc; //change the direction    
    this.column = property.replace(/\)/g,"").replace(/\(/g,"").replace(/ /g,"_").replace(/:/g,"");
   // if(this.direction){
      this.direction = this.isDesc ? 1 : -1;
    //}
   //this.direction = this.isDesc ? 1 : -1;
   this.tableDetails = _.sortBy(this.tableDetails, (obj:any)=> { return obj[this.column]});
  }
  
}
