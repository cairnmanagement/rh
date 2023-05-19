<template>
    <div class="card-body">
        <div class="d-flex align-items-center">
            <h3 class="card-title fs-5 m-0">Évolution des effectifs</h3>
            <span class="fw-light ms-2 text-secondary">12 mois</span>
        </div>
        <div class="col-11">
            <div id="curve_chart" style="width: 100%;"></div>
        </div>
    </div>
</template>
<script>

import {GoogleCharts} from 'google-charts';
import { getDisplayFormatedType } from '../js/contrat';

    
export default {
        
    props: {
        contratStats: Object
    },
    
    methods: {        
        /**
         * Affiche les timeLines
         */
        drawChart() {
            let div = document.getElementById('curve_chart');

            let data = [];

            let i = 0;

            let header;

            for (const month in this.contratStats) {

                let stats = this.contratStats[month];

                if (!i) {
                    header = ['Mois'];

                    for (const type in stats) {
                        header.push(getDisplayFormatedType(type));
                    }
                }
                
                let date = new Date(month);
                let monthString = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });


                let row = [monthString];

                for (const key in stats) {
                    row.push(stats[key]);
                }

                data.unshift(row);

                i++;
            }

            data.unshift(header);

            let options ={
                //title: 'Évolution des effectifs',
                curveType: 'none',
                legend: {position: 'top', alignment:'center', textStyle:{fontSize: 14,bold:1,}},
                lineWidth:'3',
                series: {
                    0:{color: "#ffc107"},
                    1:{color: "#28a745"},
                    2:{color: "#007bff"},
                    3:{color: "#6610f2"},
                    4:{color: "#6f42c1"},
                    5:{color: "#fd7e14"},
                    6:{color: "#ffc107"},
                    7:{color: "#20c997"},
                }
                
            }

            var visData = GoogleCharts.api.visualization.arrayToDataTable(data);
            var chart = new GoogleCharts.api.visualization.LineChart(div);

            chart.draw(visData, options);
        }
    },

    updated() {
        this.drawChart();
    },

    beforeUnmount() {
        window.removeEventListener("resize", this.drawChart);
    },

    mounted() {
        GoogleCharts.load(this.drawChart);
        window.addEventListener("resize", this.drawChart);
    }
}
</script>