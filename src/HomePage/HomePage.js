import React from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';


var dataSource = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#FF5733',
            '#28C13E',
            '#283EA6'
        ]
    }],
    labels: []
};

function createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource
    });
}

function createD3Chart(budgetData) {
var chartContainer = d3.select("#new-chart")
.append("div")
.attr("class", "chart-container");
chartContainer.selectAll("div")
.data(budgetData)
.enter().append("div")
.style("width", function (d) { return parseFloat(d.budget) * 10 + "px" || "0px"; })
.text(function (d) { return d.title; });
}

function getBudget() {
            axios.get('http://localhost:3000/budget')
                .then(function (res) {
                    if (res.data && res.data.myBudget) {
                        console.log(dataSource.datasets[0].data)
                        for (var i = 0; i < res.data.myBudget.length; i++) {
                            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                            dataSource.labels[i] = res.data.myBudget[i].title;
                        }
                        createChart();
                        createD3Chart(res.data.myBudget) // Call D3.js chart creation
                    } else {
                        console.error('Invalid or null response data:', res.data);
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching budget data:', error);
                });
        }

getBudget();

function HomePage() {
  return (
    <div>
        <main className="center" id="main">

<section className="page-area">

    <article>
        <h2>Stay on track</h2>
        <p>Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
        </p>
    </article>

    <article>
        <h2>Alerts</h2>
        <p>What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
        </p>
    </article>

    <article>
        <h2>Results</h2>
        <p>People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives... since they expend without guilt or fear...
            because they know it is all good and accounted for.
        </p>
    </article>

    <article>
        <h2>Free</h2>
        <p>This app is free!!! And you are the only one holding your data!
        </p>
    </article>

    <article>
        <h2>Stay on track</h2>
        <p>Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
        </p>
    </article>

    <article>
        <h2>Alerts</h2>
        <p>What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
        </p>
    </article>

    <article>
        <h2>Results</h2>
        <p>People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives... since they expend without guilt or fear...
            because they know it is all good and accounted for.
        </p>
    </article>
    <article><div id="new-chart"></div></article>
    
    <article>
        <h2>Chart</h2>
        <figure role="img" aria-labelledby="myChartCaption">
            <canvas id="myChart" width="400" height="400" alt="Expense Distribution Chart"></canvas>
            <figcaption id="myChartCaption">Expense Distribution</figcaption>
        </figure>
    </article>

</section>


</main>
    </div>
  );
}

export default HomePage;
