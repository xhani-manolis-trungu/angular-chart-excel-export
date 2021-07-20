import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { AxisModel, IAxisLabelRenderEventArgs, Chart, Series } from '@syncfusion/ej2-charts';
import { Workbook, Row } from '@syncfusion/ej2-excel-export';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  constructor() {
    for(let i = 0; i < 60; i++) {
      this.chartData.push({ x: i, y : Math.random()})
    }
  }

  @ViewChild('chart', {static: false})
  public chart: Chart| ChartComponet;
  public primaryXAxis: Object;
    public chartData: Object[] = [];  

    public width;
    public height;

    public Print = () => {
      //Printed chart dimensions
      this.chart.width = '200px';
      this.chart.height = '200px';     
      this.chart.dataBind();
      this.chart.print();
      //resrt to default dimensions
      this.chart.width = '800px';
      this.chart.height = '400px';  
       this.chart.dataBind();    
    }
    public Export = () => {
      let rowDatas: object[] = [];

  let series: Series = <Series>this.chart.series[0];
  rowDatas.push({
    index: 1,
    cells: [
      {
        index: 1, value: '<b>XValue</b>'
      },
      {
        index: 2, value: '<b>YValue</b>'
      }
    ]
  })
  for (let i: number = 0; i < (series.dataSource as Object[]).length; i++) {
    rowDatas.push({
      index: 2 + i,
      cells:
      [
        { index: 1, value: this.chart.series[0].dataSource[i].x },
      { index: 2, value: this.chart.series[0].dataSource[i].y }]
    });
  }

  let book: Workbook = new Workbook({
    worksheets: [
      {
        rows: rowDatas
      }
    ],

  }, 'xlsx');
  book.save('ChartExport.xlsx');
    }
    ngOnInit() {
      //default chart dimensions
      this.width = '800px';
      this.height = '400px';
    }
  
    
    
}
