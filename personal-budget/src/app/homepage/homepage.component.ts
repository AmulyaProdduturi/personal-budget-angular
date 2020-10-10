import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'
import * as D3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor : [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#808000',
          '#E74C3C ',
          '#A569BD ',
          '#33FFE0'
            ]
    }],

    labels: [

    ]
};

  constructor(private http: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    if (this.dataService.dataSource.length > 0){
      for (let i = 0; i < this.dataService.dataSource.length; i++) {
        this.dataSource.datasets[0].data[i] = this.dataService.dataSource[i].budget;
        this.dataSource.labels[i] = this.dataService.dataSource[i].title;
        this.createChart();
      }
    } else {
    this.dataService.getData().subscribe((data: any) => {
      this.dataService.dataSource = data;
      for (let i = 0; i < data.length; i++) {
        this.dataSource.datasets[0].data[i] = data[i].budget;
        this.dataSource.labels[i] = data[i].title;
        this.createChart();
      }
    });
  }
  }

  createChart() : void{
    var ctx : any = document.getElementById("myChart");
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data : this.dataSource
    });
}


}
